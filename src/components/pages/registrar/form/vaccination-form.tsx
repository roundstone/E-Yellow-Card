import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import React from "react";

const vaccineList = [
  "Yellow Fever Vaccine",
  "Yellow Fever (Lifetime)",
  "Tetanus",
  "CSM",
  "Small Pox",
  "OPV",
];

const VaccineSchema = z.object({
  vaccines: z.array(z.string()).min(1, "Please select at least one vaccine"),
});

const VaccinationForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const form = useForm<z.infer<typeof VaccineSchema>>({
    resolver: zodResolver(VaccineSchema),
    defaultValues: {
      vaccines: [],
    },
  });

  function onSubmit(data: z.infer<typeof VaccineSchema>) {
    toast.success("Vaccination info updated successfully!");
    console.log("Selected Vaccines:", data.vaccines);
    onSuccess();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="vaccines"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="border rounded-lg p-4 grid grid-cols-2">
                  {vaccineList.map((vaccine) => (
                    <label
                      key={vaccine}
                      className="flex items-center space-x-3 py-4"
                    >
                      <Checkbox
                        checked={field.value.includes(vaccine)}
                        onCheckedChange={(checked) =>
                          checked
                            ? field.onChange([...field.value, vaccine])
                            : field.onChange(
                                field.value.filter((v) => v !== vaccine)
                              )
                        }
                      />
                      <span>{vaccine}</span>
                    </label>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className=" text-white">
          Update Vaccination Info
        </Button>
      </form>
    </Form>
  );
};

export default VaccinationForm;
