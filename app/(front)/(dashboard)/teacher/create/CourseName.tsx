"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { courseTitleSchema, CourseTitleType } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { createCourseTitle } from "../../../actions/course";

const CourseName = () => {
  const router = useRouter();
  const form = useForm<CourseTitleType>({
    resolver: zodResolver(courseTitleSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: CourseTitleType) => {
    try {
      const answer = await createCourseTitle(values);

      if (answer) {
        router.push(`/teacher/courses/${answer.id}`);
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course title</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="e.g. 'Advanced web development'"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  What will you teach in this course?
                </FormDescription>
              </FormItem>
            )}
          />

          <div className="flex items-center justify-end">
            <Button type="button" variant={"outline"}>
              <Link href={"/teacher/courses"}>Cancel</Link>
            </Button>
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="ml-2 text-white"
            >
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CourseName;
