"use client";

import { writeFileNameToDatabase } from "@/app/(front)/(dashboard)/teacher/actions";
import { Course } from "@prisma/client";
import { ImageIcon, Pencil, PlusCircle, Upload, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import LoadingButton from "../loading-button";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

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
      setFile(undefined);
      toast.success("Course image updated.");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center font-medium">
      <div className="flex w-full items-center justify-between gap-x-2">
        <span className="text-sm text-muted-foreground">Image:</span>
        <Button variant={"ghost"} size={"icon"} onClick={toggleEdit}>
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4" />
              <span className="sr-only">Add an image</span>
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit image</span>
            </>
          )}
          {isEditing && (
            <>
              <X className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </>
          )}
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
          style={{
            backgroundImage: `url(${initialData.imageUrl})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="flex w-full flex-col items-center gap-2 bg-primary-foreground/70 p-4">
            <input
              type="hidden"
              name="oldFile"
              value={originalImage as string}
            />
            <Label htmlFor="file" className="cursor-pointer">
              {file ? (
                <>Selected file: {file.name}</>
              ) : (
                <Upload className="h-14 w-14 text-muted-foreground" />
              )}
            </Label>
            <Input
              type="file"
              accept="image/*"
              name="file"
              onChange={(e) => {
                setFile(e.target.files?.[0]);
              }}
              className="hidden aspect-video w-2/3"
              id="file"
              multiple={false}
              hidden
            />
            <span>16:9 aspect ratio recommended</span>
            <LoadingButton size="sm" type="submit" pending={false}>
              Upload
            </LoadingButton>
          </div>
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
