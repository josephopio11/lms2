"use client";

import { updateCourseTitle } from "@/app/(front)/actions/course";
import { courseTitleSchema, CourseTitleType } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chapter, Course } from "@prisma/client";
import { PlusCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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

interface ChaptersFormProps {
  initialData: Course & { chapters: Chapter[] };
  courseId: string;
}

const ChaptersForm = ({ initialData, courseId }: ChaptersFormProps) => {
  const [isCreating, setIsCreating] = useState(false);

  const form = useForm<CourseTitleType>({
    resolver: zodResolver(courseTitleSchema),
    defaultValues: {
      title: "",
    },
  });

  const router = useRouter();

  const toggleCreate = () => setIsCreating(!isCreating);

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: CourseTitleType) => {
    try {
      console.log(values);
      const answer = await updateCourseTitle(values, courseId);

      toggleCreate();

      if (answer) {
        toast.success("Course description updated.");
        router.push(`/teacher/courses/${answer.slug}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center font-medium">
      <div className="flex w-full items-center justify-between gap-x-2">
        <span className="text-sm text-muted-foreground">Chapters:</span>
        <Button variant={"ghost"} size={"icon"} onClick={toggleCreate}>
          {isCreating ? (
            <>
              <X className="h-4 w-4" />
              <span className="sr-only">Cancel</span>
            </>
          ) : (
            <>
              <PlusCircle className="h-4 w-4" />
              <span className="sr-only">Add a chapter</span>
            </>
          )}
        </Button>
      </div>

      {isCreating && (
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
                      placeholder="e.g. 'Introduction to the course'"
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
                type="submit"
                size="sm"
              >
                Create
              </LoadingButton2>
            </div>
          </form>
        </Form>
      )}

      {!isCreating && (
        <span
          className={cn(
            "w-full font-serif text-base",
            !initialData.chapters.length && "italic text-slate-500",
          )}
        >
          {!initialData.chapters.length && "No chapters"}
          {/* TODO: Add a list of chapters. No chapters */}
        </span>
      )}
      {!isCreating && (
        <span className="w-full text-xs">
          Drag and drop to reorder the chapters.
        </span>
      )}
    </div>
  );
};

export default ChaptersForm;
