"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  FcAbout,
  FcAlarmClock,
  FcApproval,
  FcBarChart,
  FcBusiness,
  FcCamcorderPro,
  FcEngineering,
  FcFilm,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
} from "react-icons/fc";
import { Button } from "../ui/button";
import CategoryItem from "./categoryItem";

interface CategoriesProps {
  items: { id: string; name: string }[] | undefined;
}

const iconMap = [
  FcFilm,
  FcMusic,
  FcOldTimeCamera,
  FcSportsMode,
  FcSalesPerformance,
  FcMultipleDevices,
  FcFilmReel,
  FcEngineering,
  FcAbout,
  FcAlarmClock,
  FcApproval,
  FcBarChart,
  FcBusiness,
  FcCamcorderPro,
];

const Categories = ({
  items,
  selectedCategory,
  onSelectCategory,
  className,
}: CategoriesProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkForArrows = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      checkForArrows();
      scrollContainer.addEventListener("scroll", checkForArrows);
      window.addEventListener("resize", checkForArrows);

      return () => {
        scrollContainer.removeEventListener("scroll", checkForArrows);
        window.removeEventListener("resize", checkForArrows);
      };
    }
  }, [checkForArrows]);

  if (!items) {
    return null;
  }

  return (
    <>
      <div className={cn("relative w-full", className)}>
        {showLeftArrow && (
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-background shadow-md"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
        <div
          ref={scrollContainerRef}
          className="no-scrollbar flex w-full items-center gap-2 overflow-x-auto px-4 py-2"
          role="tablist"
        >
          {items.map((item, index) => (
            <>
              <CategoryItem
                key={item.id}
                item={item}
                icon={iconMap[index % iconMap.length]}
              />
            </>
          ))}
        </div>
        {showRightArrow && (
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-background shadow-md"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </>
  );
};

export default Categories;
