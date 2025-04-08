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
import { Mail, Lock } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/config/route";
import { useNavigation } from "@/utils/navigation";
import { apiFetch } from "@/utils/api";
import { useAtomValue, useSetAtom } from "jotai";
import { userAtom } from "@/stores/user";
import Loading from "@/components/loading";

const FormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginForm = () => {
  const { goTo } = useNavigation();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const setUser = useSetAtom(userAtom);

  const login = async (credentials) => {
    try {
      const response = await apiFetch("auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      }, false); // No auth token needed for login

      if (response.statusCode !== 200) {
        throw new Error(response.message || "Something went wrong");
      }
  
      const { data, token } = response;
  
      localStorage.setItem("token", token); // Store token separately
  
      // Update user state in Jotai store
      const tempUserData = {
        user: data,
        token,
        role: data.userType,
        authenticated: true,
        language: "en", // Default language
      };

      setUser(tempUserData);

      toast.success("Login successful!");

      return tempUserData;
    } catch (error) {
      toast.error("Login failed: "+error.message);
      console.error("Login failed:", error.message);
      return false
    }
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    const loginResp = await login(data);
    setLoading(false);

    if(!loginResp) {
      return;
    }

    switch (loginResp.role) {
      case 'Admin':
        goTo(ROUTES.DASHBOARD.SUPERADMIN.HOME);
        break;
        
      case 'Director':
        goTo(ROUTES.DASHBOARD.DIRECTOR.HOME);
        break;

      case 'Registrar':
        goTo(ROUTES.DASHBOARD.REGISTRAR.HOME);
        break;
    
      default:
        toast.error("Error: Admin role not defined!");
        break;
    }
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

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-3 text-gray-400"
                    size={18}
                  />
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* */}
        <div className="text-right">
          <Link
            to={ROUTES.AUTH.ADMIN.FORGET_PASSWORD}
            className="text-sm text-green-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-800 text-white"
        >
          Log in
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
