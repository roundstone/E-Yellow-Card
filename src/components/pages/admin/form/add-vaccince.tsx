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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import AppModal from "@/components/common/modal";
import Confirm from "../../director/dashboard/modal/confirm";

const VaccineSchema = z.object({
  vaccines: z.array(
    z.object({
      vaccineName: z.string().min(1, "Vaccine name is required"),
      amountDistributed: z.string().min(1, "Amount is required"),
      status: z.enum(["in_stock", "out_of_stock"]),
      validity: z.string().min(1, "Select vaccine validity"),
    })
  ),
});

const AddVaccineForm = () => {
  const [isSuccess, setSuccess] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(VaccineSchema),
    defaultValues: {
      vaccines: [
        {
          vaccineName: "",
          amountDistributed: "",
          status: "in_stock",
          validity: "",
        },
      ],
    },
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "vaccines",
  });

  const addVaccine = () => {
    append({
      vaccineName: "",
      amountDistributed: "",
      status: "in_stock",
      validity: "",
    });
  };

  function onSubmit(data) {
    toast.success("Vaccine details submitted successfully!");
    console.log(data);
    setSuccess(true);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-10 max-h-[626px] overflow-auto"
        >
          {fields.map((field, index) => (
            <>
              <div key={field.id} className={cn("space-y-4")}>
                <h3 className="text-sm font-semibold">
                  Enter New Vaccine Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`vaccines.${index}.vaccineName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vaccine Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter vaccine name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`vaccines.${index}.amountDistributed`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount Distributed</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter number distributed"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`vaccines.${index}.status`}
                    render={({ field }) => (
                      <FormItem className=" ">
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            className="flex space-x-5"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="in_stock" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                In Stock
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="out_of_stock" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Out of Stock
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`vaccines.${index}.validity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vaccine Validity</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="--Select vaccine validity--" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="6_months">6 Months</SelectItem>
                            <SelectItem value="1_year">1 Year</SelectItem>
                            <SelectItem value="2_years">2 Years</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div
                ref={(el) => el && el.scrollIntoView({ behavior: "smooth" })}
              />
            </>
          ))}

          <div className="flex justify-between items-center">
            <Button
              type="button"
              variant="ghost"
              onClick={addVaccine}
              className="text-gray-500 flex items-center gap-2"
            >
              + Add another vaccine
            </Button>

            <Button type="submit" className="px-10 text-white">
              Confirm
            </Button>
          </div>
        </form>
      </Form>

      <AppModal
        open={isSuccess}
        setOpen={setSuccess}
        className="sm:max-w-[400px] bg-white"
      >
        <Confirm
          buttonOne={() => setSuccess(false)}
          buttonTwo={() => {
            setSuccess(false);
          }}
          buttonOneLabel="Cancel"
          buttonTwoLabel="Add more vaccines"
          title={"New vaccine added"}
          type="success"
        />
      </AppModal>
    </>
  );
};

export default AddVaccineForm;
