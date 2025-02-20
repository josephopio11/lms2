"use client";

import { courseImageSchema, CourseImageType } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Course } from "@prisma/client";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface ImageUploadFormProps {
  initialData: Course;
}

const ImageUploadForm = ({ initialData }: ImageUploadFormProps) => {
  // const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<CourseImageType>({
    resolver: zodResolver(courseImageSchema),
    defaultValues: {
      imageUrl: initialData.imageUrl || "",
    },
  });

  const toggleEdit = () => setIsEditing(!isEditing);

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = (values: CourseImageType) => {
    console.log(values);
  };
  return (
    <div className="flex flex-col items-center font-medium">
      <div className="flex w-full items-center justify-between gap-x-2">
        <span className="text-sm text-muted-foreground">Course Image:</span>
        <Button variant={"ghost"} onClick={toggleEdit}>
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add an image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit image
            </>
          )}
          {isEditing && <>Cancel</>}
        </Button>
      </div>

      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex aspect-video h-60 items-center justify-center rounded-md bg-slate-200 dark:bg-slate-800">
            <ImageIcon className="h-10 w-10 text-muted-foreground" />
          </div>
        ) : (
          <></>
        ))}

      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="file"
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

export default ImageUploadForm;
