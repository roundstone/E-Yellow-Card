import React, { useEffect, useState } from "react";
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
import Loading from "@/components/loading";
import { apiFetch } from "@/utils/api";
import { useAtomValue } from "jotai";
import { userAtom } from "@/stores/user";

const AssignYellowCardSchema = z.object({
  passportNumber: z.string().min(6, "Passport number is required"),
  referenceNumber: z.string().min(6, "Reference number is required"),
  fullName: z.string().min(3, "Full name is required"),
  // vaccinationsReceived: z.string().min(3, "Enter vaccinations received"),
  yellowCardNumber: z.string().min(6, "Yellow card number is required"),
});

export default function AssignNewYellowCard({
  onClose,
  onSubmit
}: {
  onClose: () => void;
  onSubmit: any;
}) {
  const [isOpenStatusInfo, setOpenStatusInfo] = React.useState(false);
  const [isSuccess, setSuccess] = React.useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [availableNumbers, setAvailableNumbers] = useState([]);

  const lastSearchedPassport = React.useRef<string>("");

  const user = useAtomValue(userAtom);

  const form = useForm<z.infer<typeof AssignYellowCardSchema>>({
    resolver: zodResolver(AssignYellowCardSchema),
    defaultValues: {
      passportNumber: "",
      referenceNumber: "",
      fullName: "",
      // vaccinationsReceived: "",
      yellowCardNumber: "",
    },
  });

  function onSubmitHandler(data: z.infer<typeof AssignYellowCardSchema>) {
    setFormData(data);
    console.log(data);
    setOpenStatusInfo(true);
  }

  const handlePNChange = async (value) => {
    
    const passportNumber = value;
    
    if (passportNumber.length >= 6) { // Only query when enough characters are entered
      setIsLoading(true);
      try {
        const response = await apiFetch("registrar/user/search", {
          method: "POST",
          body: JSON.stringify({
            searchParam: passportNumber
          }),
        });
  
        console.log(response);
  
        if (response.statusCode !== 200) {
          throw new Error("Something went wrong!");
        }

        if(!response.data.latestTransaction || !response.data.latestTransaction.rrr) {
          toast.error("User found, but hasn't completed payment!");
        } else {
          toast.success("User found!");
        }

        setUserData(response.data);
        form.setValue('fullName', response.data.firstName+" "+response.data.surName);
        form.setValue('referenceNumber', response.data.latestTransaction.rrr);
      } catch (error) {
        toast.error("User not found!");
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  }

  const fetchAvailableCards = async () => {
    setIsLoading(true);
    try {
      const response = await apiFetch("registrar/yellow-card/list", {
        method: "POST",
        body: JSON.stringify({
          phsc: user.user.phsLocation
        }),
      }, true);

      if (response.statusCode !== 200) {
        throw new Error(response.message || "Something went wrong");
      }

      setAvailableNumbers(response.data);
    } catch (err) {
      toast.error(err.message || "Error getting available yellow cards!");
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };
    
  useEffect(() => {
    fetchAvailableCards();
  }, []);
  
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitHandler)} className="space-y-6">
          { isLoading ? <Loading /> : '' }

          {/* Passport Number */}
          <FormField
            control={form.control}
            name="passportNumber"
            render={({ field }) => (
              <FormItem>
                <FormControl
                  onBlur={(e) => {
                    const currentValue = field.value;

                    if (currentValue && currentValue !== lastSearchedPassport.current) {
                      lastSearchedPassport.current = currentValue;
                      handlePNChange(currentValue); // call API only if it's a new value
                    }
                  }}
                >
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
                  <Input placeholder="Reference Number" readOnly={true} {...field} />
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
                  <Input placeholder="Full Name " readOnly={true} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Vaccinations Received */}
          {/* <FormField
            control={form.control}
            name="vaccinationsReceived"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Vaccinations Received" readOnly {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          {/* Yellow Card Number */}
          <div>
            {/* <p className="font-medium">Your yellow card number</p> */}
            <FormField
              control={form.control}
              name="yellowCardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your yellow card number</FormLabel>
                  <div className="flex gap-2 my-2 max-h-20 overflow-auto">
                    {availableNumbers.map((number) => (
                      <button
                        key={number}
                        type="button" // Prevent form submission
                        onClick={() => {
                          form.setValue("yellowCardNumber", number); // Set the form value
                          form.clearErrors("yellowCardNumber"); // Clear any errors
                        }}
                        className={`px-3 py-1 rounded-xl border ${
                          form.watch("yellowCardNumber") === number
                            ? "bg-green-600 text-white"
                            : "bg-background text-gray-700"
                        }`}
                      >
                        {number}
                      </button>
                    ))}
                  </div>
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
          buttonTwo={async () => {
            const response = await onSubmit(formData);

            if(!response || response?.statusCode !== 200) {
              return;
            }

            toast.success("Yellow Card Assigned Successfully!");
            setOpenStatusInfo(false);
            setSuccess(true);
          }}
          title={"Confirm Assign Yellow Card"}
          message={
            `Are you sure you want to assign the yellow card with the number ${formData?.yellowCardNumber} to ${userData?.firstName} ${userData?.surName}?`
          }
          type="confirm"
        />
      </AppModal>

      <AppModal
        open={isSuccess}
        setOpen={setSuccess}
        className="sm:max-w-[400px] bg-white"
      >
        <Confirm
          buttonOne={() => { 
            onClose();
            setSuccess(false); 
          }}
          buttonTwo={() => {
            form.reset();
            setSuccess(false);
          }}
          buttonOneLabel="View history"
          buttonTwoLabel="Done"
          title={"Card Assigned!"}
          type="success"
          message={
            <p className="text-gray-600 mt-2">
              The card {" "}
              <span className="font-semibold">{formData?.yellowCardNumber}</span> has been
              assigned to{" "}
              <span className="font-semibold">{`${userData?.firstName} ${userData?.surName}`}</span>
            </p>
          }
        />
      </AppModal>
    </>
  );
}
