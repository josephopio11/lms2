"use server";

import { auth } from "@/auth";
import db from "@/lib/db";

export async function createCourse(title: string) {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }
  const userId = session.user.id;
  console.log(userId);
  console.log(title);
  const created = await db.course.create({
    data: { title, userId: userId as string },
  });
  return {
    success: true,
    message: "Course created successfully",
    data: created,
  };
}

export async function getAllCourses() {
  const courses = db.course.findMany();

  return courses;
}
