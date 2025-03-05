import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/config/route";

const FormSchema = z.object({
  nin: z.string().optional(),
  phoneNumber: z.string().optional(),
  otp: z.string().optional(),
});

const CreateAccountForm = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nin: "",
      phoneNumber: "",
      otp: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    navigate(ROUTES.AUTH.SET_PROFILE);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full  space-y-6"
      >
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
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel> Phone Number</FormLabel>
              <FormControl className="">
                <div className="flex w-full items-center space-x-2">
                  <Input
                    placeholder="+234 00 0000 0000"
                    className="w-full"
                    {...field}
                  />
                  <Button className="ml-2 px-4 py-2 h-11 bg-[#E3E7E5] hover:bg-none hover:opacity-75 rounded-md">
                    Get OTP
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel> Enter OTP</FormLabel>
              <FormControl>
                <Input placeholder="Enter 6 digit code" {...field} />
              </FormControl>
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
