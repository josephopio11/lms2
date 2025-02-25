"use client";

import { updateCourseTitle } from "@/app/(front)/actions/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import LoadingButton2 from "../loading-button2";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface TitleFormProps {
  initialData: {
    title: string;
  };
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

const TitleForm = ({ initialData, courseId }: TitleFormProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const toggleEdit = () => setIsEditing(!isEditing);

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
      const answer = await updateCourseTitle(values, courseId);

      if (answer) {
        router.push(`/teacher/courses/${answer.id}`);
      }
      toast.success("Course title updated.");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  return (
    <div className="flex flex-col items-center font-medium">
      <div className="flex w-full items-center justify-between gap-x-2">
        <span className="text-sm text-muted-foreground">Title:</span>
        <Button variant={"ghost"} size={"icon"} onClick={toggleEdit}>
          {isEditing ? (
            <>
              <X className="h-4 w-4" />
              <span className="sr-only">Cancel</span>
            </>
          ) : (
            <>
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit title</span>
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <span className="w-full text-lg font-bold">{initialData.title}</span>
      )}

      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Advanced web development'"
                      {...field}
                    />
                  </FormControl>
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

export default TitleForm;
