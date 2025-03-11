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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import React from "react";

const UserSchema = z.object({
  surname: z.string().min(1, "Surname is required"),
  firstName: z.string().min(1, "First Name is required"),
  email: z.string().email("Invalid email address"),
  city: z.string().min(1, "City is required"),
  phsLocation: z.string().min(1, "PHS Location is required"),
  position: z.string().min(1, "Position is required"),
});

const AddUserForm = ({ initialData = null, onSubmit }) => {
  const form = useForm({
    resolver: zodResolver(UserSchema),
    defaultValues: initialData || {
      surname: "",
      firstName: "",
      email: "",
      city: "",
      phsLocation: "",
      position: "",
    },
  });

  function handleSubmit(data) {
    onSubmit(data);
    toast.success(
      initialData ? "User updated successfully!" : "User added successfully!"
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Surname</FormLabel>
                <FormControl>
                  <Input placeholder="Enter surname" {...field} />
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
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="--Select Role--" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value=" Registrar">Registrar</SelectItem>
                  <SelectItem value=" Manager">Manager</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vaccine Validity</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="--Select city--" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Abuja">Abuja</SelectItem>
                    <SelectItem value="Lagos">Lagos</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phsLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PHS Location</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="--Select PHS Location--" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value=" Nnamdi Azikwe International Airport">
                      Nnamdi Azikwe International Airport
                    </SelectItem>
                    <SelectItem value=" Murtala Muhammed Airport">
                      Murtala Muhammed Airport
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="px-10 text-white">
            {initialData ? "Update User" : "Add User"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddUserForm;
