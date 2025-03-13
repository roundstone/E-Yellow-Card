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
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/config/route";
import { useNavigation } from "@/utils/navigation";
import useQueryParam from "@/hooks/use-query-param";

const FormSchema = z.object({
  surname: z.string().min(2, "Surname is required"),
  firstName: z.string().min(2, "First name is required"),
  dob: z.string().min(1, "Date of birth is required"),
  phoneNumber: z.string().min(10, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email"),
  state: z.string().optional(),
  address: z.string().optional(),
  passportNumber: z.string().optional(),

  parentFirstName: z.string().optional(),
  parentSurname: z.string().optional(),
});

const SetProfileForm = () => {
  const { goTo } = useNavigation();
  const type = useQueryParam("type");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      surname: "",
      firstName: "",
      dob: "",
      phoneNumber: "",
      email: "",
      state: "",
      address: "",
      passportNumber: "",
      parentFirstName: "",
      parentSurname: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.success("Form submitted successfully!");
    goTo(ROUTES.PAYMENT);
  }

  const isChild = () => type === "child";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        {/* Surname & First Name */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{isChild && "Child's "}Surname</FormLabel>
                <FormControl>
                  <Input placeholder="Akintade" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{isChild && "Child's "}First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Temitope" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {isChild && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="parentSurname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {isChild && "Parent/Guardian "}Surname
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Akintade" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="parentFirstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {isChild && "Parent/Guardian "}First Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Temitope" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        )}

        {/* Date of Birth */}
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{isChild && "Child's "}Date of Birth</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Number */}
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {isChild && "Parent/Guardian  "}Phone Number
              </FormLabel>
              <FormControl>
                <Input placeholder="+234 (555) 000-0000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{isChild && "Parent/Guardian  "}Email</FormLabel>
              <FormControl>
                <Input placeholder="olivia@untitledui.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* State of Residence */}
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State of Residence</FormLabel>
              <FormControl>
                <Input placeholder="Abuja, FCT" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter your address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Passport Number */}
        <FormField
          control={form.control}
          name="passportNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {isChild && "Parent/Guardian  "}Passport Number
              </FormLabel>
              <FormControl>
                <Input placeholder="1234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" className="w-full text-white h-11">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default SetProfileForm;
