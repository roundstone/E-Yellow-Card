import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import Loading from "@/components/loading";
import { apiFetch } from "@/utils/api";

const CommentSchema = z.object({
  commentMessage: z.string().min(6, "Comment message is required"),
});

interface CommentProps {
  type: "highVoidedCards" | "lowIssuanceRate";
  onClose: () => void;
}

const messages = {
  highVoidedCards: {
    title: "High Voided Cards",
    description:
      "We've noticed a high number of voided cards. Please provide a reason for this to help us ensure accurate records.",
  },
  lowIssuanceRate: {
    title: "Abnormally Low Issuance Rate",
    description:
      "We've noticed an unusually low rate of card issuance on your account. Please share the reason for this.",
  },
};

export default function Comment({ type, onClose }: CommentProps) {
  const form = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      commentMessage: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: z.infer<typeof CommentSchema>) {
    setIsLoading(true);
    try {
      const response = await apiFetch("registrar/alert/response", {
        method: "POST",
        body: JSON.stringify({
          alertId: localStorage.getItem('alertId'),
          response: data.commentMessage
        }),
      });

      console.log(response);

      if (response.statusCode == 200) {
        toast.success("Response sent successfully!");
        onClose();
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      toast.error(error.message || "Failed to send request.");
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
    // toast.success("Commented successfully!");
    // console.log(data);
    // onClose();
  }

  const { title, description } = messages[type];

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-center">{title}</h2>
      <p className="text-sm text-gray-500 text-center">{description}</p>

      { isLoading ? <Loading /> : '' }

      <div className="mt-8 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="commentMessage"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about this issue"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 justify-center py-8">
              <Button
                onClick={onClose}
                className="px-8 py-3 border bg-transparent hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button type="submit" className="text-white">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
