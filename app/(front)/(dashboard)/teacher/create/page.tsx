"use client";

import PageHeader from "@/components/dashboard/dash-page-header";
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
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createCourse } from "../actions";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

const CreateCoursesPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      const res = await createCourse(values.title);
      toast.success("Course created successfully");
      return redirect("/teacher/courses");
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };
  return (
    <>
      <PageHeader title3="Create Course" />
      <div className="flex flex-1 flex-col gap-4 p-4 sm:pt-4">
        {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div> */}
        <div className="flex min-h-[calc(100vh-6rem)] flex-col gap-4 md:flex-row">
          <div className="rounded-xl bg-muted/50 p-6 md:min-h-min lg:w-3/5">
            <h1 className="text-2xl">Name your course</h1>
            <p className="text-sm text-muted-foreground">
              What would you like to call this course? You can always change
              this any time you change your mind
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
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
          <div className="hidden rounded-xl bg-muted/50 p-6 md:min-h-min lg:block lg:w-2/5">
            another row
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCoursesPage;
