import React, { useState } from "react";
import { mockUser, UserDetails } from "@/data/mock-user";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";

const AssignVaccinesSchema = z.object({
  vaccines: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "At least one vaccine must be selected.",
  }),
});

const serviceCenters = [
  { id: "1", label: "Yellow Fever Vaccine" },
  { id: "2", label: "Yellow Fever (Lifetime)" },
  { id: "3", label: "Tetanus" },
  { id: "4", label: "Small Pox" },
  { id: "5", label: "OPV" },
] as const;

export default function AssignVaccines({ onClose }: { onClose: () => void }) {
  const [user] = useState<UserDetails | null>(mockUser);

  // Initialize the form
  const form = useForm<z.infer<typeof AssignVaccinesSchema>>({
    resolver: zodResolver(AssignVaccinesSchema),
    defaultValues: {
      vaccines: [],
    },
  });

  // Handle form submission
  const onSubmit = (data: z.infer<typeof AssignVaccinesSchema>) => {
    toast.success("vaccine assigned");
    console.log(data);
    onClose(); // Close the modal or perform other actions
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="-mt-6">
        <div className="flex justify-center items-center w-full">
          <div className="w-full p6 relative">
            {/* User Details */}
            <div className="flex flex-col gap-2 rounded-lg bg-background p-4 text-sm">
              <p>Vaccines will be assigned to</p>
              <div className="flex items-center gap-3">
                <img
                  src={user.imageUrl}
                  alt={user.firstName}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <div className="font-medium text-right">
                    {user.firstName} {user.lastName} {user.middleName}
                  </div>
                  <p className="">{user.age}yrs</p>
                </div>
                <div className="">
                  <p className="">{user.passportNumber}</p>
                  <p className="font-medium">{user.stateOfOrigin}</p>
                </div>
              </div>
            </div>

            {/* Yellow Card Number Selection */}
            <p className="my-4 text-sm font-medium">
              Select a list of vaccines to Assign
            </p>

            <div className="border rounded-lg">
              <FormField
                control={form.control}
                name="vaccines"
                render={() => (
                  <FormItem className="grid grid-cols-2 gap-0">
                    {serviceCenters.map((item, i) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="vaccines"
                        render={({ field }) => {
                          return (
                            <div
                              className={cn("p-5", {
                                "border-b": i !== serviceCenters.length - 1,
                              })}
                            >
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            item.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            </div>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <div className="mt-5 flex justify-start">
              <Button
                type="submit"
                disabled={!form.watch("vaccines")}
                className={cn(
                  "text-white",
                  !form.watch("vaccines") &&
                    "bg-gray-300 text-gray-500 cursor-not-allowed"
                )}
              >
                Update Vaccination Info
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
