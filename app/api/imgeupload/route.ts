import { sluggify } from "@/lib/utils";
import { existsSync, mkdirSync, unlink } from "fs";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file: File | null = data.get("file") as File;
  const oldFile: string | null = data.get("oldFile") as string;

  if (!file) {
    return NextResponse.json({ success: false, status: 400 });
  }

  if (oldFile) {
    try {
      await unlink(`public/${oldFile}`, (err) => {
        if (err) throw err;
        console.log(oldFile + " was deleted");
      });
    } catch (error) {
      console.log(error);
    }
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const todayDate = new Date();
  const fileExtension = file.name.split(".").pop();

  const fileName = `${sluggify(todayDate.toISOString())}.${fileExtension}`;

  const path = `public/uploads/${fileName}`;
  try {
    const result =
      (await existsSync("public/uploads")) || mkdirSync("public/uploads");
    console.log(result);
  } catch (error) {
    console.log(error);
  }

  try {
    await writeFile(path, buffer);
    return NextResponse.json({ success: true, status: 200, fileName });
  } catch (error) {
    console.log(error);
  }
}
