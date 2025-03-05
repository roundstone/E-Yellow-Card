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

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const SearchYellowCardForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("Form submitted");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full  space-y-6"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Yellow Card Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter Yellow Card Number" {...field} />
              </FormControl>

              <FormLabel>Passport Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter Passport Number" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full text-white h-11">
          Search
        </Button>
      </form>
    </Form>
  );
};

export default SearchYellowCardForm;
