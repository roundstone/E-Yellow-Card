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
import { Eye, EyeOff, Lock } from "lucide-react";
import React, { useState } from "react";
import { useNavigation } from "@/utils/navigation";
import { ROUTES } from "@/config/route";
import { useLocation } from "react-router-dom";
import { apiFetch } from "@/utils/api";
import Loading from "@/components/loading";
import { defaultUser, userAtom } from "@/stores/user";
import { useSetAtom } from "jotai";

const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, "Current password is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ChangePasswordForm = () => {
  const { goTo } = useNavigation();
  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const passwordReset = async (credentials) => {
    try {
      const response = await apiFetch("admin/password/change", {
        method: "POST",
        body: JSON.stringify({
          oldPassword: credentials.currentPassword,
          newPassword: credentials.newPassword,
          repeatPassword: credentials.confirmPassword,
        }),
      }, true);

      if (response.statusCode !== 200) {
        throw new Error(response.message || "Something went wrong");
      }

    //   toast.success("Password changed successfully!");

      return true;
    } catch (error) {
      toast.error("Reset failed: "+error.message);
      console.error("Reset failed:", error.message);
      return false
    }
  };

  async function onSubmit(data: z.infer<typeof ChangePasswordSchema>) {
    setLoading(true);
    const resp = await passwordReset(data);
    setLoading(false);

    if(!resp) {
      return;
    }

    localStorage.removeItem("token"); // Remove JWT token

    toast.success("Password changed successfully!! Please login again.");

    goTo(ROUTES.AUTH.ADMIN.LOGIN);
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const togglePasswordVisibility3 = () => {
    setShowPassword3(!showPassword3);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        { loading ? <Loading /> : '' }

        {/* Current Password */}
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-3 text-gray-400"
                    size={18}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter current password"
                    className="pl-10"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1 text-gray-400 hover:text-gray-500"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* New Password */}
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-3 text-gray-400"
                    size={18}
                  />
                  <Input
                    type={showPassword2 ? "text" : "password"}
                    placeholder="Enter new password"
                    className="pl-10"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1 text-gray-400 hover:text-gray-500"
                    onClick={togglePasswordVisibility2}
                  >
                    {showPassword2 ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-3 text-gray-400"
                    size={18}
                  />
                  <Input
                    type={showPassword3 ? "text" : "password"}
                    placeholder="Confirm new password"
                    className="pl-10"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1 text-gray-400 hover:text-gray-500"
                    onClick={togglePasswordVisibility3}
                  >
                    {showPassword3 ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-800 text-white"
        >
          Change Password
        </Button>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
