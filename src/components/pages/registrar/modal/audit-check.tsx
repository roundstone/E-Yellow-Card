import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { apiFetch } from "@/utils/api";
import Loading from "@/components/loading";

const AuditSchema = z.object({
  cardNumber: z.string().min(1, "Comment message is required"),
});

export default function AuditCheck({ onClose }: { onClose: () => void }) {
  const form = useForm<z.infer<typeof AuditSchema>>({
    resolver: zodResolver(AuditSchema),
    defaultValues: {
      cardNumber: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: z.infer<typeof AuditSchema>) {
    setIsLoading(true);
    try {
      const response = await apiFetch("registrar/alert/response", {
        method: "POST",
        body: JSON.stringify({
          alertId: localStorage.getItem('alertId'),
          response: data.cardNumber
        }),
      });

      console.log(response);

      if (response.statusCode == 200) {
        toast.success("Response sent successfully!");
        onClose();
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      toast.error(error.message || "Failed to send request.");
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
    // console.log(data);
  }


  return (
    <div className="-6">
      { isLoading ? <Loading /> : '' }
      <h2 className="text-lg font-semibold text-center">
        Audit Check Required
      </h2>
      <p className="text-sm text-gray-500 text-center">
        We've noticed an irregularity in card issuance. Please enter the number
        of cards currently available at your PHS Centre for verification.
      </p>

      <div className="my-10 sp w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex gap-3">
                      <Input
                        type="number"
                        placeholder="Enter Number of Cards"
                        {...field}
                      />
                      <Button type="submit" className="h-11 text-white">
                        Submit
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}
