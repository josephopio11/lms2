"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import { CourseTitleType } from "@/lib/schemas";

export async function handleCreateChapter(
  data: CourseTitleType,
  courseId: string,
) {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) return;

  const courseOwner = await db.course.findUnique({
    where: {
      id: courseId,
      userId: userId,
    },
  });

  if (!courseOwner) return;

  const lastChapter = await db.chapter.findFirst({
    where: {
      courseId: courseId,
    },
    orderBy: {
      position: "desc",
    },
  });

  const newPosition = lastChapter ? lastChapter.position + 1 : 1;

  const chapter = await db.chapter.create({
    data: {
      title: data.title,
      courseId: courseId,
      position: newPosition,
    },
  });

  return chapter;
}
