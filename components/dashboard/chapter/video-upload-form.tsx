"use client";

import { writeVideoNameToDatabase } from "@/app/(front)/actions/course";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Chapter, MuxData } from "@prisma/client";
import { ImageIcon, Pencil, PlusCircle, Upload, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import LoadingButton from "../../loading-button";

interface VideoUploadFormProps {
  initialData: Chapter & { muxData: MuxData | null };
  courseId: string;
  chapterId: string;
}

const VideoUploadForm = ({ initialData }: VideoUploadFormProps) => {
  const originalVideo = initialData.videoUrl;

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
      data.set("oldFile", originalVideo || "");

      const res = await fetch(`/api/videoupload`, {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Something went wrong. Please try again.");

      const result = await res.json();

      await writeVideoNameToDatabase(
        "/uploads/videos/" + result.fileName,
        initialData.id,
        initialData.courseId,
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
        <span className="text-sm text-muted-foreground">Video:</span>
        <Button variant={"ghost"} size={"icon"} onClick={toggleEdit}>
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4" />
              <span className="sr-only">Add an video</span>
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit video</span>
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
        (!initialData.videoUrl ? (
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
            backgroundImage: `url(${initialData.videoUrl})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="flex w-full flex-col items-center gap-2 bg-primary-foreground/70 p-4">
            <input
              type="hidden"
              name="oldFile"
              value={originalVideo as string}
            />
            <Label htmlFor="file" className="cursor-pointer">
              {file ? (
                <span className="text-center">Selected file: {file.name}</span>
              ) : (
                <Upload className="h-14 w-14 text-muted-foreground" />
              )}
            </Label>
            <Input
              type="file"
              accept="video/*"
              name="file"
              onChange={(e) => {
                setFile(e.target.files?.[0]);
              }}
              className="hidden aspect-video w-2/3"
              id="file"
              multiple={false}
              hidden
            />
            <span className="text-center">
              Select an image to upload.
              <br />
              16:9 aspect ratio recommended
            </span>
            {file && (
              <>
                <LoadingButton size="sm" type="submit" pending={false}>
                  Upload
                </LoadingButton>
              </>
            )}
          </div>
        </form>
      )}
      {initialData.videoUrl?.split("=").pop() as string}
      {!isEditing && initialData.videoUrl && (
        <div className="flex aspect-video w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-md border text-xs text-muted-foreground">
          {/* <YouTubeEmbed
            videoid={initialData.videoUrl?.split("=").pop() as string}
            params="controls=0&modestbranding=1"
            playlabel="Play"
            // height={400}
            width={550}
          /> */}
          {/* <iframe
            src={initialData.videoUrl as string}
            frameBorder={"0"}
            allowFullScreen
          /> */}
        </div>
      )}
    </div>
  );
};

export default VideoUploadForm;
