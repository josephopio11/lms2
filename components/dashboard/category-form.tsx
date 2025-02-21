"use client";

import { updateCourseCategory } from "@/app/(front)/(dashboard)/teacher/actions";
import { CourseCategoryType, courseCategorySchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Course } from "@prisma/client";
import { Pencil, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Combobox } from "../ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

interface CategoryFormProps {
  initialData: Course;
  courseId: string;
  options?: {
    value: string;
    label: string;
  }[];
}

const CategoryForm = ({
  initialData,
  courseId,
  options,
}: CategoryFormProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<CourseCategoryType>({
    resolver: zodResolver(courseCategorySchema),
    defaultValues: {
      categoryId: initialData.categoryId || "",
    },
  });

  const toggleEdit = () => setIsEditing(!isEditing);

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: CourseCategoryType) => {
    try {
      console.log(values);
      const answer = await updateCourseCategory(values, courseId);

      toggleEdit();

      if (answer) {
        toast.success("Course category updated.");
        router.push(`/teacher/courses/${answer.slug}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const selectedOption = options?.find(
    (option) => option.value === initialData.categoryId,
  );

  return (
    <div className="flex flex-col items-center font-medium">
      <div className="flex w-full items-center justify-between gap-x-2">
        <span className="text-sm text-muted-foreground">Category:</span>
        <Button variant={"ghost"} size={"icon"} onClick={toggleEdit}>
          {isEditing ? (
            <>
              <X className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </>
          ) : (
            <>
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <span className="w-full text-lg">
          {selectedOption?.label || "No category"}
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
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox options={options!} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default CategoryForm;
