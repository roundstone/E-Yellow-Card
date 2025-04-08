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
import React, { useEffect, useState } from "react";
import { nigerianStates } from "@/data/states";
import { apiFetch } from "@/utils/api";

const UserSchema = z.object({
  surName: z.string().min(1, "Surname is required"),
  firstName: z.string().min(1, "First Name is required"),
  email: z.string().email("Invalid email address"),
  city: z.string().min(1, "City is required"),
  phsLocation: z.string().min(1, "PHS Location is required"),
  position: z.string().min(1, "Position is required"),
});

const AddUserForm = ({ initialData = null, onSubmit }) => {
  const [phsLocations, setPhsLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);

  const form = useForm({
    resolver: zodResolver(UserSchema),
    defaultValues: initialData || {
      surName: "",
      firstName: "",
      email: "",
      city: "",
      phsLocation: "",
      position: "",
    },
  });

  // Fetch PHS locations on component mount
  useEffect(() => {
    async function fetchPhsLocations() {
      try {
        const data = await apiFetch("admin/phsc/list", { method: "GET" });
        if (data.statusCode === 200) {
          setPhsLocations(data.data);
        }
      } catch (error) {
        console.error("Error fetching PHS locations:", error);
      }
    }
    fetchPhsLocations();
  }, []);

  // Handle state selection change
  function handleStateChange(state) {
    form.setValue("city", state); // Update state field
    form.setValue("phsLocation", ""); // Reset PHS location field
    const locations = phsLocations.filter((loc) => loc.state === state);
    setFilteredLocations(locations);
  }

  function handleSubmit(data) {
    const response = onSubmit(data);

    if (!response || response.statusCode !== 200) {
      return;
    }

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
            name="surName"
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
                <SelectContent className="bg-white">
                  <SelectItem value="Director">Director</SelectItem>
                  <SelectItem value="Registrar">Registrar</SelectItem>
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
                <FormLabel>PHS State</FormLabel>
                <Select
                  // onValueChange={field.onChange}
                  onValueChange={handleStateChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="--Select city--" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white">
                    {[...new Set(phsLocations.map((loc) => loc.state))].map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
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
                  disabled={!filteredLocations.length}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="--Select PHS Location--" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white">
                    {filteredLocations.length > 0 ? (
                      filteredLocations.map((location) => (
                        <SelectItem key={location.id} value={location.location}>
                          {location.location}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem disabled value="Location">
                        No locations available
                      </SelectItem>
                    )}
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
