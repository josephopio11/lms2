"use client";

import {
  courseDelete,
  coursePublishUnpublish,
} from "@/app/(front)/actions/course";
import ConfirmModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface CourseActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

const CourseActions = ({
  disabled,
  courseId,
  isPublished,
}: CourseActionsProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const publishChapter = async () => {
    try {
      setIsLoading(true);

      const result = await coursePublishUnpublish(courseId);

      if (result?.success) {
        toast.success(result.message);
        if (
          result.success &&
          result.message === "Course published successfully"
        ) {
          confetti.onOpen();
        }
        setIsLoading(false);
        router.push(`/teacher/courses/${courseId}`);
      } else {
        toast.error(result?.message);
      }
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

      const answer = await courseDelete(courseId);

      if (!answer.success) {
        toast.error(answer.message);
        return;
      }

      toast.success(answer.message);

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
          <Trash2 className="text-white" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default CourseActions;
