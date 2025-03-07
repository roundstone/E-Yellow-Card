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
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Confirm from "./confirm";

const AssignBatchYCSchema = z.object({
  cardCode: z.string().nonempty("Card code is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  type: z.enum(["state", "zone"]),
  state: z.string().optional(),
  port: z.string().optional(),
});

const AssignBatchOfYellowCards = ({ onClose }: { onClose: () => void }) => {
  const [isConfirm, setConfirm] = React.useState(false);
  const [isSuccess, setSuccess] = React.useState(false);
  const form = useForm<z.infer<typeof AssignBatchYCSchema>>({
    resolver: zodResolver(AssignBatchYCSchema),
    defaultValues: {
      cardCode: "",
      quantity: null,
      type: "state",
      state: "",
      port: "",
    },
  });

  function onSubmit(data: z.infer<typeof AssignBatchYCSchema>) {
  
    console.log(data);
    setConfirm(true);
    // goTo(ROUTES.AUTH.DIRECTOR.LOGIN);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                        {["Code 1", "Code 2", "Code 3"].map((email) => (
                          <SelectItem key={email} value={email}>
                            {email}
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

          <StateSelect control={form.control} name="state" label="State" />

          <div className="grid grid-cols-2">
            <FormField
              control={form.control}
              name="port"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Port</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select destination port" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {["Port 1", "Port 2", "Port 3"].map((email) => (
                          <SelectItem key={email} value={email}>
                            {email}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
