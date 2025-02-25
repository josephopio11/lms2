"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import {
  CourseAndChapterDescriptionType,
  CourseAndChapterTitleType,
} from "@/lib/schemas";

export async function handleCreateChapter(
  data: CourseAndChapterTitleType,
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

export async function reorderChapters(
  list: { id: string; position: number }[],
) {
  console.log(list);
  // await new Promise((resolve) => setTimeout(resolve, 10000));

  if (!list) return { success: false };

  list.map(
    async (item) =>
      await db.chapter.update({
        where: {
          id: item.id,
        },
        data: {
          position: item.position,
        },
      }),
  );
  return { success: true };
}

export async function getChapterById(id: string, courseId: string) {
  const chapter = await db.chapter.findUnique({
    where: {
      id: id,
      course: {
        id: courseId,
      },
    },
    include: {
      muxData: true,
      course: true,
    },
  });

  return chapter;
}

export async function updateChapterTitle(
  values: CourseAndChapterTitleType,
  chapterId: string,
) {
  console.log({ values, chapterId });
  const { title } = values;

  const answer = await db.chapter.update({
    where: {
      id: chapterId,
    },
    data: {
      title,
    },
  });

  return answer;
}

export async function updateChapterDescription(
  values: CourseAndChapterDescriptionType,
  chapterId: string,
) {
  console.log({ values, chapterId });
  const { description } = values;

  const answer = await db.chapter.update({
    where: {
      id: chapterId,
    },
    data: {
      description,
    },
  });

  return answer;
}

export async function chapterFreedom(
  values: { isFree: boolean },
  chapterId: string,
) {
  console.log({ values, chapterId });
  const { isFree } = values;

  const answer = await db.chapter.update({
    where: {
      id: chapterId,
    },
    data: {
      isFree,
    },
  });

  return answer;
}
