import { useState } from "react";
import { useForm } from "react-hook-form";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
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
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const RequestAuditSchema = z.object({
  requestType: z.string().nonempty("Request type is required"),
  selectedCenters: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "At least one service center must be selected.",
    }),
});

const serviceCenters = [
  { id: "1", label: "Murtala Muhammed International Airport, Lagos" },
  { id: "2", label: "Maiduguri International Airport, Borno" },
  { id: "3", label: "Lekki Deep Sea Port, Lagos" },
] as const;

const requestTypes = ["Current Card Number", "Previous Card Number", "Other"];

export default function AuditRequest({ onClose }: { onClose: () => void }) {
  const form = useForm<z.infer<typeof RequestAuditSchema>>({
    resolver: zodResolver(RequestAuditSchema),
    defaultValues: {
      requestType: "",
      selectedCenters: [],
    },
  });

  function onSubmit(data: z.infer<typeof RequestAuditSchema>) {
    toast.success("Request sent successfully!");
    console.log(data);
    onClose();
  }
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCenters = serviceCenters.filter((value) =>
    value.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-center">
        Specify your Audit Request
      </h2>
      <p className="text-sm text-gray-500 text-center">
        Select the reason for your audit request and choose the destination for
        submission.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 mt-10"
        >
          <div className="grid grid-cols-2">
            <FormField
              control={form.control}
              name="requestType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Port</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Request Type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {requestTypes.map((email) => (
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

          <div className="flex justify-between items-center">
            <FormLabel className="text-sm font-medium">
              Select Port Health Service Centre for audit request
            </FormLabel>
            <div className="relative mt-1">
              <SearchIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="checkbox"
                className="w-full p-2 pl-10 border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="border rounded-lg">
            <FormField
              control={form.control}
              name="selectedCenters"
              render={() => (
                <FormItem className="grid grid-cols-2 gap-0">
                  {filteredCenters.map((item, i) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="selectedCenters"
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

          <div className="pt-8 flex justify-end space-x-2">
            <Button
              onClick={onClose}
              className="px-8 py-2 border rounded-md bg-transparent hover:bg-background"
            >
              Cancel
            </Button>
            <Button type="submit" className="px-8 py-2  text-white rounded-md">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
