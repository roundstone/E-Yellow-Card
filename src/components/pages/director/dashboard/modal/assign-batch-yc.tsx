import AppModal from "@/components/common/modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { nigerianStates } from "@/data/states";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Confirm from "./confirm";
import { apiFetch } from "@/utils/api";

const AssignBatchYCSchema = z.object({
  cardCode: z.string().nonempty("Card code is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  type: z.enum(["state", "zone"]),
  state: z.string().optional(),
  zone: z.string().optional(),
  port: z.string().optional(),
});

const AssignBatchOfYellowCards = ({ onClose, onSubmit }) => {
  const [isConfirm, setConfirm] = React.useState(false);
  const [isSuccess, setSuccess] = React.useState(false);
  const form = useForm<z.infer<typeof AssignBatchYCSchema>>({
    resolver: zodResolver(AssignBatchYCSchema),
    defaultValues: {
      cardCode: "",
      quantity: null,
      type: "state",
      zone: "",
      state: "",
      port: "",
    },
  });

  const [phsLocations, setPhsLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);

  // Fetch PHS locations on component mount
  useEffect(() => {
    async function fetchPhsLocations() {
      try {
        const data = await apiFetch("admin/phsc/list", { method: "GET" });
        if (data.statusCode === 200) {
          setPhsLocations(data.data);
        }
      } catch (error) {
        console.error("Error fetching PHS locations:", error);
      }
    }
    fetchPhsLocations();
  }, []);

  const watchType = form.watch("type");

  useEffect(() => {
    if (watchType === "zone") {
      form.setValue("state", "");
      form.setValue("port", "");
      setFilteredLocations([]);
    }
  }, [watchType]);

  // Handle state selection change
  function handleStateChange(state) {
    form.setValue("state", state); // Update state field
    form.setValue("port", ""); // Reset PHS location field
    const locations = phsLocations.filter((loc) => loc.state === state);
    form.setValue("zone", locations[0].zone || "");
    setFilteredLocations(locations);
  }

  function onSubmitHandler(data: z.infer<typeof AssignBatchYCSchema>) {
    const response = onSubmit(data);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitHandler)} className="space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="cardCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select card code" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {["A", "B", "C", "D"].map((code) => (
                          <SelectItem key={code} value={code}>
                            {code}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quanity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="Enter quantity"
                      {...field}
                      isNumber
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-3"
                  >
                    <FormItem className="flex items-center space-x-1 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="state" />
                      </FormControl>
                      <FormLabel className="font-normal">State</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-1 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="zone" />
                      </FormControl>
                      <FormLabel className="font-normal">Zone/Region</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <StateSelect control={form.control} name="state" label="State" /> */}

          {watchType === "zone" && (
            <FormField
              control={form.control}
              name="zone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zones</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl> 
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="--Select zone--" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      {["NorthCentral", "NorthEast", "NorthWest", "SouthEast", "SouthSouth", "SouthWest"].map((zone) => (
                        <SelectItem key={zone} value={zone}>
                          {zone}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {watchType === "state" && (
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <Select
                    onValueChange={handleStateChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="--Select city--" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      {[...new Set(phsLocations.map((loc) => loc.state))].map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {watchType === "state" && (
            <div className="grid grid-cols-2">
              <FormField
                control={form.control}
                name="port"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PHS Location</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!filteredLocations.length}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="--Select PHS Location--" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
                        {filteredLocations.length > 0 ? (
                          filteredLocations.map((location) => (
                            <SelectItem key={location.id} value={location.location}>
                              {location.location}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem disabled value="Location">
                            No locations available
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <Button type="submit" className=" text-white py-2">
            Distribute Card Range
          </Button>
        </form>
      </Form>

      <AppModal
        open={isConfirm}
        setOpen={setConfirm}
        className="sm:max-w-[400px] bg-white"
      >
        <Confirm
          buttonOne={() => setConfirm(false)}
          buttonTwo={() => {
            setConfirm(false);
            setSuccess(true);
            toast.success("Distributed successfully!");
          }}
          title={"Confirm Selection"}
          type="confirm"
          message={
            <p className="text-gray-600 mt-2">
              Are you sure you want to assign the card range{" "}
              <span className="font-semibold">A133900 - A134900</span> to{" "}
              <span className="font-semibold">Tin Can Island Port</span>?
            </p>
          }
        />
      </AppModal>

      <AppModal
        open={isSuccess}
        setOpen={setSuccess}
        className="sm:max-w-[400px] bg-white"
      >
        <Confirm
          buttonOne={() => setSuccess(false)}
          buttonTwo={() => {
            onClose();
            setSuccess(false);
          }}
          buttonOneLabel="View history"
          buttonTwoLabel="Done"
          title={"Card Range Assigned!"}
          type="success"
          message={
            <p className="text-gray-600 mt-2">
              The card range{" "}
              <span className="font-semibold">A133900 - A134900</span> has been
              assigned to{" "}
              <span className="font-semibold">Tin Can Island Port</span>?
            </p>
          }
        />
      </AppModal>
    </>
  );
};

export default AssignBatchOfYellowCards;

interface StateSelectProps {
  control: any; // Replace with the correct type from react-hook-form
  name: string;
  label: string;
}

const StateSelect: React.FC<StateSelectProps> = ({ control, name, label }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {nigerianStates.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
