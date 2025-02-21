"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import {
  CourseCategoryType,
  CourseDescriptionType,
  CoursePriceType,
  CourseTitleType,
} from "@/lib/schemas";
import { sluggify } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function getAllCourses() {
  const session = await auth();
  if (!session?.user) return;
  const userId = session.user.id;
  if (!userId) return;

  const courses = db.course.findMany({
    select: {
      id: true,
      title: true,
      imageUrl: true,
      slug: true,
      price: true,
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  return courses;
}

export async function getCourseBySlug(slug: string) {
  const session = await auth();
  if (!session?.user) return;
  const userId = session.user.id;
  if (!userId) return;

  const course = db.course.findUnique({ where: { slug } });

  return course;
}

export async function createCourseTitle(values: CourseTitleType) {
  const session = await auth();
  if (!session?.user) return;
  const userId = session.user.id;
  const title = values.title;

  if (!userId) return;

  if (!title) return;

  const slug = sluggify(title);

  try {
    const result = await db.course.create({
      data: {
        title,
        slug,
        userId,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateCourseTitle(values: CourseTitleType, id: string) {
  const session = await auth();
  if (!session?.user) return;
  const userId = session.user.id;
  const title = values.title;

  if (!userId) return;
  if (!title) return;
  if (!id) return;

  const slug = sluggify(title);

  try {
    const result = await db.course.update({
      where: { id },
      data: {
        title,
        slug,
        userId,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function updateCourseDescription(
  values: CourseDescriptionType,
  id: string,
) {
  const session = await auth();
  if (!session?.user) return;
  if (!id) return;

  const description = values.description;

  if (!description) return;

  try {
    const result = await db.course.update({
      where: { id },
      data: {
        description,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function updateCoursePrice(values: CoursePriceType, id: string) {
  const session = await auth();
  if (!session?.user) return;
  if (!id) return;

  const price = values.price;

  if (!price) return;

  try {
    const result = await db.course.update({
      where: { id },
      data: {
        price,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function writeFileNameToDatabase(
  imageUrl: string,
  id: string,
  slug: string,
) {
  const session = await auth();
  if (!session?.user) return;
  if (!id) return;
  if (!imageUrl) return;

  try {
    await db.course.update({
      where: { id },
      data: {
        imageUrl,
      },
    });

    revalidatePath("/teacher/courses");
    revalidatePath(`/teacher/courses/${slug}`);
    return;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function getAllCourseCategories() {
  const session = await auth();
  if (!session?.user) return;
  const userId = session.user.id;
  if (!userId) return;

  const categories = db.category.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return categories;
}

export async function updateCourseCategory(
  values: CourseCategoryType,
  id: string,
) {
  const session = await auth();
  if (!session?.user) return;
  if (!id) return;

  const categoryId = values.categoryId;

  if (!categoryId) return;

  try {
    const result = await db.course.update({
      where: { id },
      data: {
        categoryId,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
    return;
  }
}
