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
import Loading from "@/components/loading";
import { apiFetch } from "@/utils/api";

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

  const [isLoading, setIsLoading] = useState(false);
  const [verified, setVerified] = useState(0);

  async function onSubmit(data: z.infer<typeof vTransactionSchema>) {
    setIsLoading(true);
    try {
      const response = await apiFetch("registrar/remita/verify", {
        method: "POST",
        body: JSON.stringify({
          passportNumber: data.passportNumber,
          referenceNumber: data.referenceNumber
        }),
      }, true);

      if (response.statusCode !== 200) {
        throw new Error(response.message || "Something went wrong");
      }

      console.log(response.data.status);
      console.log(response.data);

      if(response.data.transaction.status == 'Success') {
        toast.success(response.message);
        setVerified(1);
      } else if (response.data.transaction.status == 'Pending') {
        toast.info(response.message);
        setVerified(2);
      } else {
        throw new Error(response.message || "Something went wrong");
      }

      console.log(response.data);
      // onClose();
      setOpenStatusInfo(true)
    } catch (err) {
      setVerified(0);
      setOpenStatusInfo(true)
      toast.error(err.message || "Error verifying transaction!");
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="py-6">
        { isLoading ? <Loading /> : '' }

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
        <StatusInfo onClose={() => setOpenStatusInfo(false)} statusType={(verified == 1) ? 'success' : (verified == 2) ? 'pending' : 'failed'} />
      </AppModal>
    </>
  );
}
