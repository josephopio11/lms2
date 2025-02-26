"use server";

import db from "@/lib/db";

export async function getUser(userId: string) {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
      description: true,
      purchases: true,
      userProfile: true,
      _count: {
        select: {
          courses: true,
        },
      },
    },
  });

  if (user) {
    await db.userProfile.upsert({
      where: {
        userId: user.id,
      },
      create: {
        userId: user.id,
      },
      update: {
        userId: user.id,
      },
    });
  }

  return user;
}
