"use client";

import { writeFileNameToDatabase } from "@/app/(front)/(dashboard)/teacher/actions";
import { Course } from "@prisma/client";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface ImageUploadFormProps {
  initialData: Course;
}

const ImageUploadForm = ({ initialData }: ImageUploadFormProps) => {
  const originalImage = initialData.imageUrl;

  const [isEditing, setIsEditing] = useState(false);

  const [file, setFile] = useState<File>();

  const toggleEdit = () => setIsEditing(!isEditing);

  // const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);
      data.set("oldFile", originalImage || "");

      const res = await fetch(`/api/imgeupload`, {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Something went wrong. Please try again.");

      const result = await res.json();

      await writeFileNameToDatabase(
        "/uploads/" + result.fileName,
        initialData.id,
        initialData.slug,
      );
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center font-medium">
      <div className="flex w-full items-center justify-between gap-x-2">
        <span className="text-sm text-muted-foreground">Course Image:</span>
        <Button variant={"ghost"} onClick={toggleEdit}>
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add an image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit image
            </>
          )}
          {isEditing && <>Cancel</>}
        </Button>
      </div>

      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex aspect-video w-full items-center justify-center rounded-md bg-slate-200 dark:bg-slate-800">
            <ImageIcon className="h-10 w-10 text-muted-foreground" />
          </div>
        ) : (
          <div></div>
        ))}

      {isEditing && (
        <form
          onSubmit={onSubmit}
          className="flex aspect-video w-full flex-col items-center justify-center gap-4 rounded-md border bg-primary-foreground text-xs text-muted-foreground"
        >
          <input type="hidden" name="oldFile" value={originalImage as string} />
          <Input
            type="file"
            accept="image/*"
            name="file"
            onChange={(e) => {
              setFile(e.target.files?.[0]);
            }}
            className="aspect-video w-2/3"
            id="file"
            multiple={false}
          />
          <span>16:9 aspect ratio recommended</span>
          <Button type="submit">Upload</Button>
        </form>
      )}
      {!isEditing && initialData.imageUrl && (
        <div className="flex aspect-video w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-md border bg-primary-foreground text-xs text-muted-foreground">
          <Image
            src={initialData.imageUrl}
            alt={initialData.title}
            width={500}
            height={500}
            className="aspect-video w-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploadForm;
