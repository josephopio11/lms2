import { getChapterById } from "@/app/(front)/actions/chapter";
import { auth } from "@/auth";
import PageHeader from "@/components/dashboard/dash-page-header";
import { ProgressBar } from "@/components/dashboard/progress-bar";
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

const SingleChapter = async ({ params }: PageProps) => {
  const session = await auth();
  const userId = session?.user.id;

  const { chapterId, slug } = await params;

  if (!userId) {
    return redirect("/login");
  }

  const chapter = await getCachedPageStuff(chapterId, slug);

  if (!chapter) return redirect("/");
  return (
    <>
      <PageHeader title={chapter.course.title} title2={chapter?.title} />
      <pre>{JSON.stringify(chapter, null, 2)}</pre>
      <div className="flex flex-1 flex-col gap-4 p-4 sm:pt-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-muted/50 p-4 sm:col-span-2 xl:col-span-4">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <p className="text-sm text-muted-foreground">
              What would you like to call this course? You can always change
              this any time you change your mind
            </p>
            {/* <span>Complete all fields {completionText}</span> */}
            <ProgressBar level={7} className="w-full" />
          </div>
          {/* <div className="space-y-4 sm:col-span-1">
            <div className="col-span-2 rounded-xl bg-muted/50 p-4">
              <TitleForm initialData={course} courseId={course.id} />
            </div>
            <div className="col-span-2 rounded-xl bg-muted/50 p-4">
              <DescriptionForm initialData={course} courseId={course.id} />
            </div>
            <div className="col-span-2 rounded-xl bg-muted/50 p-4">
              <ImageUploadForm initialData={course} />
            </div>
            <div className="col-span-2 rounded-xl bg-muted/50 p-4">
              <CategoryForm
                initialData={course}
                courseId={course.id}
                options={categories?.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
              />
            </div>
          </div>
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
