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
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/config/route";
import { useNavigation } from "@/utils/navigation";
import useQueryParam from "@/hooks/use-query-param";
import { apiFetch } from "@/utils/api";
import Loading from "@/components/loading";

const FormSchema = z.object({
  surname: z.string().min(2, "Surname is required"),
  firstName: z.string().min(2, "First name is required"),
  dob: z.string().min(1, "Date of birth is required"),
  phoneNumber: z.string().min(10, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email"),
  state: z.string(),
  address: z.string(),
  gender: z.string(),
  passportNumber: z.string(),

  parentFirstName: z.string().optional(),
  parentSurname: z.string().optional(),
});

const SetProfileForm = () => {
  const { goTo } = useNavigation();
  const type = useQueryParam("type");
  const isChild = (type == "child") ? true : false;

  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");

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
      gender: "",
      passportNumber: "",
      parentFirstName: "",
      parentSurname: "",
    },
  });

  useEffect(() => {
    // Retrieve data from sessionStorage
    const ninValidationData = sessionStorage.getItem("ninValidationData");
    const userData = sessionStorage.getItem("userData");

    if (ninValidationData && userData) {
      try {
        const ninData = JSON.parse(ninValidationData);
        const user = JSON.parse(userData);

        setUserId(user.userId);

        const fullName = ninData.name.split(" ");

        // Populate the form with stored data
        form.reset({
          surname: fullName[fullName.length - 1] || "",
          firstName: fullName[0] || "",
          dob: ninData.dob.replace(/-/g, "/") || "",
          phoneNumber: user.phone || ""
        });
      } catch (error) {
        console.error("Error parsing sessionStorage data:", error);
      }
    }
  }, [form]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    try {
      const response = await apiFetch(`user/auth/profile/${userId}`, {
        method: "POST",
        body: JSON.stringify({
          firstName: data.firstName,
          surName: data.surname,
          guardianFirstName: data.parentFirstName,
          guardianSurName: data.parentSurname,
          email: data.email,
          dob: data.dob,
          state: data.state,
          address: data.address,
          gender: data.gender,
          passportNumber: data.passportNumber
        }),
      });

      if (response.statusCode == 200) {
        toast.success("Profile completed successfully!");
        sessionStorage.setItem("userData", JSON.stringify(response.data));
        goTo(ROUTES.PAYMENT);
      } else {
        toast.error("An error occurred while updating profile!");
      }
    } catch (error) {
      toast.error("An error occurred!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        { loading ? <Loading /> : '' }

        {/* Surname & First Name */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{isChild && "Child's "}Surname</FormLabel>
                <FormControl>
                  <Input placeholder="Akintade" {...field} readOnly />
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
                  <Input placeholder="Temitope" {...field} readOnly />
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
                <Input placeholder="+234 (555) 000-0000" {...field} readOnly />
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
                {/* <Input placeholder="Abuja, FCT" {...field} /> */}
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectGroup>
                      {[
                        "Abia",
                        "Adamawa",
                        "Akwa Ibom",
                        "Anambra",
                        "Bauchi",
                        "Bayelsa",
                        "Benue",
                        "Borno",
                        "Cross River",
                        "Delta",
                        "Ebonyi",
                        "Edo",
                        "Ekiti",
                        "Enugu",
                        "FCT",
                        "Gombe",
                        "Imo",
                        "Jigawa",
                        "Kaduna",
                        "Kano",
                        "Katsina",
                        "Kebbi",
                        "Kogi",
                        "Kwara",
                        "Lagos",
                        "Nasarawa",
                        "Niger",
                        "Ogun",
                        "Ondo",
                        "Osun",
                        "Oyo",
                        "Plateau",
                        "Rivers",
                        "Sokoto",
                        "Taraba",
                        "Yobe",
                        "Zamfara"
                      ].map((state) => (
                        <SelectItem key={state} value={state} className="cursor-pointer">
                          {state}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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

        {/* Gender */}
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange} >
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Select an gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectGroup>
                      <SelectItem value="Male" className="cursor-pointer">Male</SelectItem>
                      <SelectItem value="Female" className="cursor-pointer">Female</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
