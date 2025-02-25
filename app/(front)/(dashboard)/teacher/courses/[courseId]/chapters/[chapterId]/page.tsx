import { getChapterById } from "@/app/(front)/actions/chapter";
import { auth } from "@/auth";
import PageHeader from "@/components/dashboard/course/dash-page-header";
import { ProgressBar } from "@/components/dashboard/course/progress-bar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cache } from "react";

interface PageProps {
  params: {
    chapterId: string;
    slug: string;
  };
}

export const getCachedPageStuff = cache(
  async (chapterId: string, slug: string) => {
    const chapter = await getChapterById(chapterId, slug);
    return chapter;
  },
);

export const generateMetadata = async ({ params }: PageProps) => {
  const { chapterId, slug } = await params;
  const chapter = await getCachedPageStuff(chapterId, slug);
  return {
    title:
      "Editing: " + chapter?.title + " - " + chapter?.course?.title ||
      "Chapter",
  };
};

const SingleChapter = async ({ params }: PageProps) => {
  const session = await auth();
  const userId = session?.user.id;

  const { chapterId, slug } = await params;

  if (!userId) {
    return redirect("/login");
  }

  const chapter = await getCachedPageStuff(chapterId, slug);

  if (!chapter) return redirect("/");

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionRate = Math.round((completedFields / totalFields) * 100);
  const completionText = `${completedFields}/${totalFields}`;

  return (
    <>
      <PageHeader
        title={chapter.course.title}
        title2={"Chapter: " + chapter?.title}
        title3="Editing"
      />
      {/* <pre>{JSON.stringify(chapter, null, 2)}</pre> */}
      <div className="flex flex-1 flex-col gap-4 p-4 sm:pt-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-muted/50 p-4 sm:col-span-2 xl:col-span-4">
            <div className="flex items-center justify-start">
              <Button asChild size={"icon"} className="mr-2">
                <Link href={`/teacher/courses/${chapter.course.id}`}>
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <h1 className="text-2xl font-medium">
                Editing chapter:
                <span className="ml-1 font-semibold">{chapter.title}</span>
              </h1>
            </div>
            <p className="my-2 text-sm text-muted-foreground">
              Any updates to this chapter will be reflected in the course
              immediately.
            </p>
            <span>Complete all fields {completionText}</span>
            <ProgressBar level={completionRate} className="w-full" />
          </div>
          <div className="space-y-4 sm:col-span-1">
            <div className="rounded-xl bg-muted/50 p-4">
              {/* <TitleForm initialData={course} courseId={course.id} /> */}
            </div>
            <div className="rounded-xl bg-muted/50 p-4">
              {/* <DescriptionForm initialData={course} courseId={course.id} /> */}
            </div>
            <div className="rounded-xl bg-muted/50 p-4">
              {/* <ImageUploadForm initialData={course} /> */}
            </div>
            <div className="rounded-xl bg-muted/50 p-4">
              {/* <CategoryForm
                initialData={course}
                courseId={course.id}
                options={categories?.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
              /> */}
            </div>
          </div>
          {/* 
          <div className="space-y-4 rounded-xl sm:col-span-1">
            <div className="rounded-xl bg-muted/50 p-4">
              <ChaptersForm initialData={course} courseId={course.id} />
            </div>
            <div className="rounded-xl bg-muted/50 p-4">
              <PriceForm
                initialData={{ price: course.price ?? 0 }}
                courseId={course.id}
              />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default SingleChapter;
