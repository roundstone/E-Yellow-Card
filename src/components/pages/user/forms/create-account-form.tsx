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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/config/route";
import useQueryParam from "@/hooks/use-query-param";
import Loading from "@/components/loading";
import { apiFetch } from "@/utils/api";

const FormSchema = z.object({
  nin: z.string().min(2, {
    message: "NIN is required.",
  }),
  phoneNumber: z.string().min(2, {
    message: "Phone number is required.",
  }),
  otp: z.string().min(2, {
    message: "OTP is required.",
  }),
});

const CreateAccountForm = () => {
  const navigate = useNavigate();
  const type = useQueryParam("type") ? useQueryParam("type") : "Adult";

  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nin: "",
      phoneNumber: "",
      otp: "",
    },
  });

  const handleOtpRequest = async (phone: string) => {
    setLoading(true);
    try {
      const data = await apiFetch("user/auth/getOtp", {
        method: "POST",
        body: JSON.stringify({
          phone,
        }),
      });
      if (data) {
        toast.success("OTP sent successfully!");
        setOtpSent(true);
      }
    } catch (error) {
      toast.error("Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleNinValidation = async (nin: string) => {
    try {
      const data = await apiFetch(`user/validate/nin/${nin}`, {
        method: "GET",
      });
      if (data.statusCode == 400) {
        toast.error("Invalid NIN.");
        return false;
      } else {
        sessionStorage.setItem("ninValidationData", JSON.stringify(data.data));
        return true;
      }
    } catch (error) {
      toast.error("Error while validating NIN!");
      return false;
    }
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);

    // Validate NIN before proceeding with account creation
    const validity = await handleNinValidation(data.nin);

    if (!validity) {
      setLoading(false);
      return;
    }

    // Create user only if NIN is valid
    if (data.nin) {
      try {
        const response = await apiFetch("user/auth/create", {
          method: "POST",
          body: JSON.stringify({
            nin: data.nin,
            phone: data.phoneNumber,
            userType: type.charAt(0).toUpperCase() + type.slice(1).toLowerCase(),
            otp: data.otp,
          }),
        });

        console.log();

        if (response) {
          toast.success("Account created successfully!");
          sessionStorage.setItem("userData", JSON.stringify(response.data));
          navigate(`${ROUTES.AUTH.SET_PROFILE}?type=${type}`);
        }
      } catch (error) {
        toast.error("Failed to create account.");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("An error occurred!");
      setLoading(false);
    }
  };

  // function onSubmit(data: z.infer<typeof FormSchema>) {
  //   toast.success("Form submitted successfully!");
  //   navigate(`${ROUTES.AUTH.SET_PROFILE}?type=${type}`);
  // }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        {/* <h2 className="text-lg font-semibold">Create an Account</h2> */}
        {/* <p>
          Please enter the NIN and phone number of the child’s parent/guardian
        </p> */}

        { loading ? <Loading /> : '' }

        {type === "child" ? (
          <>
            <FormField
              control={form.control}
              name="nin"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <div className="flex justify-between items-center">
                    <FormLabel>Parent/Guardian NIN</FormLabel>
                    <p className="text-xs text-gray-500 mt-1">
                      Dial *346# to retrieve
                    </p>
                  </div>
                  <FormControl>
                    <Input placeholder="Enter NIN" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Parent/Guardian Phone Number</FormLabel>
                  <FormControl>
                    <div className="flex w-full items-center space-x-2">
                      <Input
                        placeholder="+234 00 0000 0000"
                        className="w-full"
                        {...field}
                      />
                      <Button type="button" onClick={() => handleOtpRequest(field.value)} className="ml-2 px-4 py-2 h-11 bg-[#E3E7E5] hover:bg-none hover:opacity-75 rounded-md">
                        Get OTP
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        ) : (
          <>
            <FormField
              control={form.control}
              name="nin"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <div className="flex justify-between items-center">
                    <FormLabel>NIN</FormLabel>
                    <p className="text-xs text-gray-500 mt-1">
                      Dial *346# to retrieve
                    </p>
                  </div>
                  <FormControl>
                    <Input placeholder="Enter NIN" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <div className="flex w-full items-center space-x-2">
                      <Input
                        placeholder="+234 00 0000 0000"
                        className="w-full"
                        {...field}
                      />
                      <Button type="button" onClick={() => handleOtpRequest(field.value)} className="ml-2 px-4 py-2 h-11 bg-[#E3E7E5] hover:bg-none hover:opacity-75 rounded-md">
                        Get OTP
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Enter OTP</FormLabel>
              <FormControl>
                <Input placeholder="Enter 6 digit code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full text-white h-11">
          Continue
        </Button>
      </form>
    </Form>
  );
};

export default CreateAccountForm;
