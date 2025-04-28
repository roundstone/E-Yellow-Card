import Loading from "@/components/loading";
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
import { userAtom } from "@/stores/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtomValue, useSetAtom } from "jotai";
import { Camera } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const ProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z.string().min(10, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email"),
  profileImage: z.any().optional(),
});

const EditProfile = ({ onClose, initialValues = {}, onSubmitData  }: { onClose: () => void, initialValues: any, onSubmitData: (data) => void }) => {
  const [preview, setPreview] = React.useState(initialValues.photo);
  const form = useForm({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      firstName: initialValues.firstName || "",
      lastName: initialValues.surName || "",
      phoneNumber: initialValues.phone || "",
      email: initialValues.email || "",
      profileImage: initialValues.photo || null,
    },
  });

  const [isUploading, setIsUploading] = React.useState(false);

  const setUser = useSetAtom(userAtom);
  const user = useAtomValue(userAtom);

  // Function to upload image to endpoint
  const uploadImage = async (file) => {
    if (!file || !(file instanceof File)) {
      // If no new file was selected, return the existing URL
      return initialValues.photo;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

      const response = await fetch(API_URL+'/admin/photo/upload', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer '+localStorage.getItem('token')
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      toast.success('Profile image updated!');
      return data.fileUrl; // Return the URL of the uploaded image
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  async function onSubmit(data: any) {
    // toast.success("Profile updated successfully!");
    console.log(data);
    if (onSubmitData) {
      await onSubmitData(data);
    }
    onClose();
  }

  async function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      form.setValue("profileImage", file);
      const imageUrl = await uploadImage(file);
      user.user.photo = imageUrl;
      setUser(user);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          { isUploading ? <Loading /> : '' }
          <div className="flex flex- gap-5 items-center mb-10">
            <div className="relative w-28 h-28 rounded-full overflow-hidden border">
              {preview ? (
                <img
                  src={preview}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <Camera className="text-gray-500" size={32} />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-y-4">
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="upload"
                />
                <label
                  htmlFor="upload"
                  className="mt2 cursor-pointer text-sm hover:underline p-2 border bg-white rounded-lg shadow-sm"
                >
                  Upload new photo
                </label>
              </div>
              <div className="max-w-[233px] text-sm">
                <p>At least 800x800 px recommended. JPG or PNG is allowed</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
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

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="text-gray-700 px-10 border-gray-300"
            >
              Cancel
            </Button>
            <Button type="submit" className=" px-7 text-white">
              Save changes
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default EditProfile;
