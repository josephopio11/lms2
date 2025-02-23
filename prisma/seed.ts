import { PrismaClient } from "@prisma/client";
import { categoryList } from "./categories";
const prisma = new PrismaClient();

async function insertCategories() {
  const categories = categoryList;

  categories.map(async (name: string) => {
    const created = await prisma.category.upsert({
      where: {
        name,
      },
      create: {
        name,
      },
      update: {
        name,
      },
    });

    console.log(created);
  });
}

async function main() {
  await insertCategories();
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
