"use client";

import { updateCoursePrice } from "@/app/(front)/actions/course";
import { coursePriceSchema, CoursePriceType } from "@/lib/schemas";
import { formatCurrency } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import LoadingButton from "../loading-button";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface PriceFormProps {
  initialData: {
    price: number;
  };
  courseId: string;
}

const PriceForm = ({ initialData, courseId }: PriceFormProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<CoursePriceType>({
    resolver: zodResolver(coursePriceSchema),
    defaultValues: {
      price: initialData.price,
    },
  });

  const toggleEdit = () => setIsEditing(!isEditing);

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: CoursePriceType) => {
    try {
      console.log(values);
      const answer = await updateCoursePrice(values, courseId);

      toggleEdit();

      if (answer) {
        toast.success("Course price updated.");
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
        <span className="text-sm text-muted-foreground">Price:</span>
        <Button variant={"ghost"} size={"icon"} onClick={toggleEdit}>
          {isEditing ? (
            <>
              <X className="h-4 w-4" />
              <span className="sr-only">Cancel</span>
            </>
          ) : (
            <>
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit price</span>
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <span className="w-full">
          {formatCurrency(initialData.price) || "Free"}
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Advanced web development'"
                      {...field}
                      min={0}
                      step={0.01}
                    />
                  </FormControl>
                  <FormDescription>
                    {formatCurrency(0)} means free
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <LoadingButton
                size={"sm"}
                pending={!isValid || isSubmitting}
                type="submit"
              >
                Save
              </LoadingButton>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default PriceForm;
