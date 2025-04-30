import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
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
import AppModal from "@/components/common/modal";
import AssignVaccines from "./assign-vaccines";
import Loading from "@/components/loading";
import { apiFetch } from "@/utils/api";
import { useAtomValue } from "jotai";
import { userAtom } from "@/stores/user";

const AssignYellowCardSchema = z.object({
  yellowCardNumber: z.string().min(1, "Yellow Card Number is required"),
});

// const availableNumbers = [
//   "B234568",
//   "B234569",
//   "B234570",
//   "B234571",
//   "B234572",
// ];

export default function AssignYellowCard({ onClose, userData }: { onClose: () => void, userData: any }) {
  const [isOpenAssignVaccine, setOpenAssignVaccine] = React.useState(false);
  const [user] = useState<UserDetails | null>(userData);

  const [availableNumbers, setAvailableNumbers] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const registrar = useAtomValue(userAtom);

  // Initialize the form
  const form = useForm<z.infer<typeof AssignYellowCardSchema>>({
    resolver: zodResolver(AssignYellowCardSchema),
    defaultValues: {
      yellowCardNumber: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof AssignYellowCardSchema>) => {
    setIsLoading(true);
    try {
      const response = await apiFetch("registrar/yellow-card/assign", {
        method: "POST",
        body: JSON.stringify({
          passportNumber: user.passportNumber,
          yellowCardNumber: data.yellowCardNumber,
        }),
      });

      console.log(response);

      if (response.statusCode == 200) {
        toast.success(`Assigned Yellow Card: ${data.yellowCardNumber}`);
        console.log(data);
        onClose(); // Close the modal or perform other actions
      } else {
        throw new Error(response.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.message || "Failed to assign yellow card.");
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAvailableCards = async () => {
    setIsLoading(true);
    try {
      const response = await apiFetch("registrar/yellow-card/list", {
        method: "POST",
        body: JSON.stringify({
          phsc: registrar.user.phsLocation
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="-mt-6">
          <div className="flex justify-center items-center w-full">
            { isLoading ? <Loading /> : '' }

            <div className="w-full p6 relative">
              {/* User Details */}
              <div className="flex flex-col gap-2 rounded-lg bg-background p-4 text-sm">
                <p>Yellow Card Number will be assigned to</p>
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
              <p className="mt-4 text-sm font-medium">
                Select or input available YC number
              </p>
              <div className="flex flex-wrap gap-2 mt-2 max-h-20 overflow-auto">
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

              {/* Manual Input */}
              <FormField
                control={form.control}
                name="yellowCardNumber"
                render={({ field }) => (
                  <FormItem className="mt-3">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter yellow card number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="mt-5 flex justify-end">
                <Button
                  type="submit"
                  disabled={!form.watch("yellowCardNumber")}
                  className={cn(
                    "text-white",
                    !form.watch("yellowCardNumber") &&
                      "bg-gray-300 text-gray-500 cursor-not-allowed"
                  )}
                >
                  Assign Yellow Card Number
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>

      <AppModal
        open={isOpenAssignVaccine}
        setOpen={setOpenAssignVaccine}
        title="Assign Vaccines"
        className="sm:max-w-[567px] bg-white"
      >
        <AssignVaccines userData={user} onClose={() => setOpenAssignVaccine(false)} />
      </AppModal>
    </>
  );
}
