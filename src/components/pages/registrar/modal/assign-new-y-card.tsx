import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import AppModal from "@/components/common/modal";
import Confirm from "../../director/dashboard/modal/confirm";

const AssignYellowCardSchema = z.object({
  passportNumber: z.string().min(6, "Passport number is required"),
  referenceNumber: z.string().min(6, "Reference number is required"),
  fullName: z.string().min(3, "Full name is required"),
  vaccinationsReceived: z.string().min(3, "Enter vaccinations received"),
  yellowCardNumber: z.string().min(6, "Yellow card number is required"),
});

export default function AssignNewYellowCard({
  onClose,
}: {
  onClose: () => void;
}) {
  const [isOpenStatusInfo, setOpenStatusInfo] = React.useState(false);
  const [isSuccess, setSuccess] = React.useState(false);

  const form = useForm<z.infer<typeof AssignYellowCardSchema>>({
    resolver: zodResolver(AssignYellowCardSchema),
    defaultValues: {
      passportNumber: "",
      referenceNumber: "",
      fullName: "",
      vaccinationsReceived: "",
      yellowCardNumber: "",
    },
  });

  function onSubmit(data: z.infer<typeof AssignYellowCardSchema>) {
    console.log(data);
    setOpenStatusInfo(true);
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Passport Number */}
          <FormField
            control={form.control}
            name="passportNumber"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter Passport Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Reference Number */}
          <FormField
            control={form.control}
            name="referenceNumber"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter Reference Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Full Name */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="FULL NAME HERE" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Vaccinations Received */}
          <FormField
            control={form.control}
            name="vaccinationsReceived"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Vaccinations Received" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Yellow Card Number */}
          <div>
            {/* <p className="font-medium">Your yellow card number</p> */}
            <FormField
              control={form.control}
              name="yellowCardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your yellow card number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Yellow Card Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white"
          >
            Assign
          </Button>
        </form>
      </Form>

      <AppModal
        open={isOpenStatusInfo}
        setOpen={setOpenStatusInfo}
        className="sm:max-w-[400px] bg-white"
      >
        <Confirm
          buttonOne={() => setOpenStatusInfo(false)}
          buttonTwo={() => {
            setOpenStatusInfo(false);
            setSuccess(true);
            toast.success("Yellow Card Assigned Successfully!");
          }}
          title={"Confirm Assign Yellow Card"}
          message={
            "Are you sure you want to assign the yellow card with the number YC/2343430 to Ismail Muhammad?"
          }
          type="success"
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
}
