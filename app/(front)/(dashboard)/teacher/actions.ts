"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import { CourseTitleType } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCourse(values: CourseTitleType) {
  const session = await auth();
  let created;

  if (!session?.user) return;

  const userId = session.user.id;
  console.table({ userId, values });
  if (!userId) return;
  const { title } = values;
  if (!title) return;
  try {
    created = await db.course.create({
      data: { title, userId: userId as string },
    });
  } catch (error) {
    console.log(error);
  }

  if (!created) return;

  revalidatePath("/teacher/courses");
  redirect(`/teacher/courses/${created.id}`);
}

export async function getAllCourses() {
  const courses = db.course.findMany();

  return courses;
}
