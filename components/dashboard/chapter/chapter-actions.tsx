"use client";

import {
  chapterDelete,
  chapterPublishUnpublish,
} from "@/app/(front)/actions/chapter";
import ConfirmModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ChapterActionsProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}

const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: ChapterActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const publishChapter = async () => {
    try {
      setIsLoading(true);

      await chapterPublishUnpublish(chapterId, courseId);

      toast.success("Chapter published.");

      setIsLoading(false);
      router.push(`/teacher/courses/${courseId}`);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await chapterDelete(chapterId, courseId);

      toast.success("Chapter deleted.");

      setIsLoading(false);
      router.push(`/teacher/courses/${courseId}`);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ml-auto mt-2 flex items-center gap-x-2">
      <Button
        onClick={publishChapter}
        disabled={disabled || isLoading}
        variant={"outline"}
        size={"sm"}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size={"sm"} disabled={isLoading}>
          <Trash2 />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default ChapterActions;
