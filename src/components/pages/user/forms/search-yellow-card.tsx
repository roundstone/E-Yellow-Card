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
import {
  Dialog,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import UserQuery from "../modal(dialog)/query-user";
import AppModal from "@/components/common/modal";
import Loading from "@/components/loading";
import { apiFetch } from "@/utils/api";

const FormSchema = z.object({
  cardNumber: z.string().min(2, {
    message: "Yellow card number is required.",
  }),
  passportNumber: z.string().min(2, {
    message: "Passport number is required.",
  }),
});

const SearchYellowCardForm = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cardNumber: "",
      passportNumber: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    try {
      const resp = await apiFetch("user/query-user", {
        method: "POST",
        body: JSON.stringify({
          yellowCardNumber: data.cardNumber,
          passportNumber: data.cardNumber
        }),
      });
      if (resp.statusCode == 200) {
        toast.success("Result found!");
        setUser(resp.data);
        setOpen(true);
      } else {
        toast.success("User not found!");
      }
    } catch (error) {
      toast.error("Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full  space-y-6"
        >
          { loading ? <Loading /> : '' }
          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Yellow Card Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Yellow Card Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passportNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passport Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Passport Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full text-white h-11">
            Search
          </Button>
        </form>
      </Form>

      <AppModal
        open={open}
        setOpen={setOpen}
        title="QUERY USER"
        className="sm:max-w-[567px] bg-white"
      >
        <UserQuery userData={user} />
      </AppModal>
    </>
  );
};

export default SearchYellowCardForm;
