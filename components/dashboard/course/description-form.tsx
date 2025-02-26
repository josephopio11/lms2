"use client";

import { updateCourseDescription } from "@/app/(front)/actions/course";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  courseAndChapterDescriptionSchema,
  CourseAndChapterDescriptionType,
} from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import LoadingButton2 from "../../loading-button2";
import MyRichTextEditor from "../editor";
import HtmlRender from "../html-render";

interface DescriptionFormProps {
  initialData: {
    description: string | null;
  };
  courseId: string;
}

const DescriptionForm = ({ initialData, courseId }: DescriptionFormProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<CourseAndChapterDescriptionType>({
    resolver: zodResolver(courseAndChapterDescriptionSchema),
    defaultValues: {
      description: initialData.description || "",
    },
  });

  const toggleEdit = () => setIsEditing(!isEditing);

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: CourseAndChapterDescriptionType) => {
    try {
      console.log(values);
      const answer = await updateCourseDescription(values, courseId);

      toggleEdit();

      if (answer) {
        toast.success("Course description updated.");
        router.push(`/teacher/courses/${answer.id}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  return (
    <div className="flex flex-col items-center font-medium">
      <div className="flex w-full items-center justify-between gap-x-2">
        <span className="text-sm text-muted-foreground">Description:</span>
        <Button variant={"ghost"} size={"icon"} onClick={toggleEdit}>
          {isEditing ? (
            <>
              <X className="h-4 w-4" />
              <span className="sr-only">Cancel</span>
            </>
          ) : (
            <>
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit description</span>
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <span className="w-full">
          <HtmlRender htmlText={initialData.description} />
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MyRichTextEditor {...field} />
                  </FormControl>
                  <FormDescription>
                    Describe in detail what will be taught in this course.
                  </FormDescription>
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

export default DescriptionForm;
