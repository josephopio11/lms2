"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

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
  return (
    <div className="ml-auto mt-2 flex items-center gap-x-2">
      <Button
        onClick={() => {}}
        disabled={disabled}
        variant={"outline"}
        size={"sm"}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <Button size={"sm"}>
        <Trash2 />
      </Button>
    </div>
  );
};

export default ChapterActions;
