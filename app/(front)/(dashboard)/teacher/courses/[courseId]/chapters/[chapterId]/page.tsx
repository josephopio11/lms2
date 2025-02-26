import { getChapterById } from "@/app/(front)/actions/chapter";
import { auth } from "@/auth";
import Banner from "@/components/dashboard/banner";
import AccessForm from "@/components/dashboard/chapter/chapter-access-form";
import ChapterActions from "@/components/dashboard/chapter/chapter-actions";
import ChapterDescriptionForm from "@/components/dashboard/chapter/description-form";
import ChapterTitleForm from "@/components/dashboard/chapter/title-form";
import VideoUploadForm from "@/components/dashboard/chapter/video-upload-form";
import PageHeader from "@/components/dashboard/course/dash-page-header";
import { ProgressBar } from "@/components/dashboard/course/progress-bar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cache } from "react";

interface PageProps {
  params: {
    chapterId: string;
    courseId: string;
  };
}

export const getCachedPageStuff = cache(
  async (chapterId: string, courseId: string) => {
    const chapter = await getChapterById(chapterId, courseId);
    return chapter;
  },
);

export const generateMetadata = async ({ params }: PageProps) => {
  const { chapterId, courseId } = await params;
  const chapter = await getCachedPageStuff(chapterId, courseId);
  return {
    title:
      "Editing: " + chapter?.title + " - " + chapter?.course?.title ||
      "Chapter",
  };
};

const SingleChapter = async ({ params }: PageProps) => {
  const session = await auth();
  const userId = session?.user.id;

  const { chapterId, courseId } = await params;

  if (!userId) {
    return redirect("/login");
  }

  const chapter = await getCachedPageStuff(chapterId, courseId);

  if (!chapter) return redirect("/");

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionRate = Math.round((completedFields / totalFields) * 100);
  const completionText = `${completedFields}/${totalFields}`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      <PageHeader
        title={"Courses"}
        link="/teacher/courses"
        title2={chapter.course.title}
        link2={`/teacher/courses/${chapter.course.id}`}
        title3={"Chapter: " + chapter?.title}
      />
      {!chapter.isPublished && (
        <Banner
          variant={"warning"}
          label="This chapter is not published. It will not be visible in the course"
        />
      )}

      <div className="flex flex-1 flex-col gap-4 p-4 sm:pt-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          <div
            className={cn(
              "rounded-xl bg-muted/50 p-4 transition duration-300 hover:border-b-transparent hover:shadow-lg sm:col-span-2 xl:col-span-4",
              chapter.isFree
                ? "border-b border-b-green-500"
                : "border-b border-b-red-500",
            )}
          >
            <div className="flex items-center justify-start gap-2">
              <Button asChild size={"icon"} className="mr-2">
                <Link href={`/teacher/courses/${chapter.course.id}`}>
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <h1 className="text-2xl font-medium">
                Editing chapter:
                <span className="ml-1 font-semibold">{chapter.title}</span>
              </h1>
              <ChapterActions
                disabled={!isComplete}
                courseId={chapter.course.id}
                chapterId={chapter.id}
                isPublished={chapter.isPublished}
              />
            </div>
            <p className="my-2 text-sm text-muted-foreground">
              Any updates to this chapter will be reflected in the course
              immediately.
            </p>
            <span>Complete all fields {completionText}</span>
            <ProgressBar level={completionRate} className="w-full" />
          </div>
          <div className="space-y-4 sm:col-span-1">
            {/* <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customise your chapter</h2>
            </div> */}
            <div
              className={cn(
                "rounded-xl bg-muted/50 p-4 transition duration-300 hover:border-b-transparent hover:shadow-lg",
                chapter.isFree
                  ? "border-b border-b-green-500"
                  : "border-b border-b-red-500",
              )}
            >
              <ChapterTitleForm
                initialData={chapter}
                // courseId={courseId}
                chapterId={chapterId}
              />
            </div>
            <div
              className={cn(
                "rounded-xl bg-muted/50 p-4 transition duration-300 hover:border-b-transparent hover:shadow-lg",
                chapter.isFree
                  ? "border-b border-b-green-500"
                  : "border-b border-b-red-500",
              )}
            >
              <ChapterDescriptionForm
                initialData={chapter}
                chapterId={chapterId}
                courseId={courseId}
              />
            </div>
          </div>
          <div className="space-y-4 rounded-xl sm:col-span-1">
            <div
              className={cn(
                "rounded-xl bg-muted/50 p-4 transition duration-300 hover:border-b-transparent hover:shadow-lg",
                chapter.isFree
                  ? "border-b border-b-green-500"
                  : "border-b border-b-red-500",
              )}
            >
              <AccessForm
                initialData={chapter}
                chapterId={chapterId}
                courseId={courseId}
              />
            </div>
            <div
              className={cn(
                "rounded-xl bg-muted/50 p-4 transition duration-300 hover:border-b-transparent hover:shadow-lg",
                chapter.isFree
                  ? "border-b border-b-green-500"
                  : "border-b border-b-red-500",
              )}
            >
              <VideoUploadForm
                initialData={chapter}
                courseId={chapter.courseId}
                chapterId={chapter.id}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleChapter;
