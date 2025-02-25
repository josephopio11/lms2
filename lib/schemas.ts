import { z } from "zod";

export const courseAndChapterTitleSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

export type CourseAndChapterTitleType = z.infer<
  typeof courseAndChapterTitleSchema
>;

export const courseAndChapterDescriptionSchema = z.object({
  description: z.string().min(1, {
    message: "Description is required",
  }),
});

export type CourseAndChapterDescriptionType = z.infer<
  typeof courseAndChapterDescriptionSchema
>;

export const courseImageSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export type CourseImageType = z.infer<typeof courseImageSchema>;

export const courseCategorySchema = z.object({
  categoryId: z.string().min(1),
});

export type CourseCategoryType = z.infer<typeof courseCategorySchema>;

export const coursePriceSchema = z.object({
  price: z.coerce.number(),
});

export type CoursePriceType = z.infer<typeof coursePriceSchema>;
