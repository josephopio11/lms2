import { sluggify } from "@/lib/utils";
import { existsSync, mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file: File | null = data.get("file") as File;

  if (!file) {
    return NextResponse.json({ success: false, status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const todayDate = new Date();
  const fileExtension = file.name.split(".").pop();

  const fileName = `${sluggify(todayDate.toISOString())}.${fileExtension}`;

  console.log({ fileName });

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
    // console.log({ message: "File uploaded successfully", path });
    // console.log({ success: true, status: 200 });
    return NextResponse.json({ success: true, status: 200, fileName });
  } catch (error) {
    console.log(error);
  }
}
