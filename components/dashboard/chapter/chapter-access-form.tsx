"use client";

import { chapterFreedom } from "@/app/(front)/actions/chapter";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Pencil, X, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import LoadingButton2 from "../../loading-button2";

interface AccessFormProps {
  initialData: {
    isFree: boolean;
  };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  isFree: z.boolean().default(false),
});

const AccessForm = ({ initialData, courseId, chapterId }: AccessFormProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: !!initialData.isFree,
    },
  });

  const toggleEdit = () => setIsEditing(!isEditing);

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
      const answer = await chapterFreedom(values, chapterId, courseId);

      toggleEdit();

      if (answer) {
        toast.success("Chapter updated.");
        router.push(
          `/teacher/courses/${answer.courseId}/chapters/${answer.id}`,
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  return (
    <div className="flex flex-col items-center font-medium">
      <div className="flex w-full items-center justify-between gap-x-2">
        <span className="text-sm text-muted-foreground">Access settings:</span>
        <Button variant={"ghost"} size={"icon"} onClick={toggleEdit}>
          {isEditing ? (
            <>
              <X className="h-4 w-4" />
              <span className="sr-only">Cancel</span>
            </>
          ) : (
            <>
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit access settings</span>
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <span className="flex w-full items-center justify-start gap-2 rounded">
          {initialData.isFree ? (
            <>
              <CheckCircle className="h-6 w-6 text-green-500" />
              <span className="font-semibold text-green-500">Free</span>
            </>
          ) : (
            <>
              <XCircle className="h-6 w-6 text-red-500" />
              <span className="font-semibold text-red-500">Paid</span>
            </>
          )}
        </span>
      )}

      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormDescription>
                      Check this box if you want to make this chapter free for
                      preview purposes.
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <LoadingButton2
                pending={!isValid || isSubmitting}
                size="sm"
                type="submit"
              >
                Save
              </LoadingButton2>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default AccessForm;
