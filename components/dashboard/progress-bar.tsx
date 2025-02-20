"use client";

import * as React from "react";

import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  level: number;
  className?: string;
}

export function ProgressBar({ level, className }: ProgressBarProps) {
  const [progress, setProgress] = React.useState(level);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(level), 500);
    return () => clearTimeout(timer);
  }, [level]);

  return <Progress value={progress} className={className} />;
}
