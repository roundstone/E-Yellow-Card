import React, { useState } from "react";
import { mockUser, UserDetails } from "@/data/mock-user";
import IMAGES from "@/assets/images";
import AppModal from "@/components/common/modal";
import AssignYellowCard from "./assign-y-card";
AssignYellowCard;
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CreditCard } from "lucide-react";
import StatusInfo from "./status-info";

const vTransactionSchema = z.object({
  passportNumber: z.string().nonempty("Passport number is required"),
  referenceNumber: z.string().nonempty("Reference number is required"),
});

export default function VerifyTransaction({
  onClose,
}: {
  onClose: () => void;
}) {

    const [isOpenStatusInfo, setOpenStatusInfo] = React.useState(false);

  const form = useForm<z.infer<typeof vTransactionSchema>>({
    resolver: zodResolver(vTransactionSchema),
    defaultValues: {
      passportNumber: "",
      referenceNumber: "",
    },
  });

  function onSubmit(data: z.infer<typeof vTransactionSchema>) {
    // toast.success("Password reset link sent to your email!");
    console.log(data);
    // onClose();
    setOpenStatusInfo(true)
  }

  return (
    <>
      <div className="py-6">
        <CreditCard className="w-16 h-16 mx-auto stroke-1 text-[#82868E]" />
        <h2 className="text-lg font-semibold text-center">
          Verify Remita Transaction Status
        </h2>
        <p className="text-sm text-gray-500 text-center">
          Enter passport number and reference number to verify remita
          transaction.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
            {/* Email Field */}
            <div className="flex gap-3 w-full mb-8">
              <FormField
                control={form.control}
                name="passportNumber"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Passport Number</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter passport number"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="referenceNumber"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Reference Number</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter reference number"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Reset Button */}
            <div className="flex justify-center">
              <Button type="submit" className="px-10 text-white">
                Verify
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <AppModal
        open={isOpenStatusInfo}
        setOpen={setOpenStatusInfo}
        className="sm:max-w-[790px] bg-white"
      >
        <StatusInfo onClose={() => setOpenStatusInfo(false)} statusType={"failed"} />
      </AppModal>
    </>
  );
}
