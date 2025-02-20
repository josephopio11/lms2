import { z } from "zod";

export const courseTitleSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

export type CourseTitleType = z.infer<typeof courseTitleSchema>;
