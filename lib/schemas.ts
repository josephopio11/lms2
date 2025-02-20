import { z } from "zod";

export const courseTitleSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

export type CourseTitleType = z.infer<typeof courseTitleSchema>;

export const courseDescriptionSchema = z.object({
  description: z.string().min(1, {
    message: "Description is required",
  }),
});

export type CourseDescriptionType = z.infer<typeof courseDescriptionSchema>;

export const courseImageSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export type CourseImageType = z.infer<typeof courseImageSchema>;
