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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import React, { useState } from "react";
import { useNavigation } from "@/utils/navigation";
import { ROUTES } from "@/config/route";
import { apiFetch } from "@/utils/api";
import Loading from "@/components/loading";

const ForgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const ForgotPasswordForm = () => {
  const { goTo } = useNavigation();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const requestReset = async (credentials) => {
    try {
      const response = await apiFetch("auth/forget-password/alt", {
        method: "POST",
        body: JSON.stringify(credentials),
      }, false); // No auth token needed for login

      if (response.statusCode !== 200) {
        throw new Error(response.message || "Something went wrong");
      }

      toast.success("Password reset link sent to your email!");

      return true;
    } catch (error) {
      toast.error("Reset failed: "+error.message);
      console.error("Reset failed:", error.message);
      return false
    }
  };

  async function onSubmit(data: z.infer<typeof ForgotPasswordSchema>) {
    setLoading(true);
    const resp = await requestReset(data);
    setLoading(false);

    if(!resp) {
      return;
    }

    goTo(ROUTES.AUTH.ADMIN.LOGIN);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        { loading ? <Loading /> : '' }
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-3 text-gray-400"
                    size={18}
                  />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Reset Button */}
        <Button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-800 text-white"
        >
          Send Reset Link
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
