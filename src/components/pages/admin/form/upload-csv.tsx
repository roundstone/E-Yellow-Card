import { useState } from "react";
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
import { FileIcon, UploadCloud } from "lucide-react";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import React from "react";
import AppModal from "@/components/common/modal";
import SystemCheck from "../modal/system-check";

const UploadSchema = z.object({
  images: z.array(z.instanceof(File)).nonempty("At least one file is required"),
  zone: z.string().min(1, "Please select a zone"),
});

const UploadCSVForm = () => {
  const [open, setOpen] = React.useState(false);
  const form = useForm({
    resolver: zodResolver(UploadSchema),
    defaultValues: {
      images: [],
      zone: "",
    },
  });

  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState({});

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length) {
      setFiles(selectedFiles);
      const newProgress = {};
      selectedFiles.forEach((file: File) => {
        newProgress[file.name] = 0;
      });
      setProgress(newProgress);
      simulateUpload(selectedFiles);
    }
  };

  const simulateUpload = (fileList) => {
    fileList.forEach((file) => {
      let uploadProgress = 0;
      const interval = setInterval(() => {
        uploadProgress += 10;
        setProgress((prev) => ({ ...prev, [file.name]: uploadProgress }));
        if (uploadProgress >= 100) clearInterval(interval);
      }, 500);
    });
  };

  function onSubmit(data: any) {
    toast.success("Files uploaded successfully!");
    console.log(data);
    setOpen(true);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <label
                    htmlFor="file"
                    className="border border-dashed rounded-lg p-6 text-center cursor-pointer bg-gray-100"
                  >
                    {files.length > 0 &&
                      files.map((file, index) => (
                        <div
                          key={index}
                          className="flex gap-4 items-start border bg-white mb-3 border-primary p-4 rounded-lg text-start"
                        >
                          <div className="bg-[#EBFFF6] border-8 border-[#F9F5FF] h-fit p-2 rounded-full">
                            <FileIcon className="w-4 h-4 text-primary" />
                          </div>
                          <div className="w-full">
                            <p className="font-medium">{file.name}</p>
                            <p className="text-sm text-gray-500">
                              {(file.size / 1024).toFixed(2)} KB
                            </p>
                            <div className="flex gap-2 items-center w-full">
                              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                <div
                                  className="bg-green-600 h-2.5 rounded-full"
                                  style={{ width: `${progress[file.name]}%` }}
                                ></div>
                              </div>
                              <p className="text-sm text-gray-500 text-right mt-1">
                                {progress[file.name]}%
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    <UploadCloud className="mx-auto text-gray-500" size={40} />
                    <p className="text-green-600 font-semibold">
                      Click to upload
                    </p>
                    <p className="text-sm text-gray-500">or drag and drop</p>
                    <p className="text-xs text-gray-400">
                      SVG, PNG, JPG or GIF (max. 800x400px)
                    </p>
                    <input
                      id="file"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      multiple
                      onChange={(e) => {
                        field.onChange(Array.from(e.target.files));
                        handleFileChange(e);
                      }}
                    />
                  </label>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="zone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zone</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      --Select Zone--
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="zone1">Zone 1</SelectItem>
                      <SelectItem value="zone2">Zone 2</SelectItem>
                      <SelectItem value="zone3">Zone 3</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <Button type="submit" className="text-white">
              Upload
            </Button>
          </div>
        </form>
      </Form>

      <AppModal
        open={open}
        setOpen={setOpen}
        title="System Check"
        className="sm:max-w-[604px] bg-white"
      >
        <SystemCheck />
      </AppModal>
    </>
  );
};

export default UploadCSVForm;
