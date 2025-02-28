import { getAllCourseCategories } from "@/app/(front)/actions/course";
import Categories from "@/components/dashboard/categories";
import PageHeader from "@/components/dashboard/course/dash-page-header";

const BrowsePage = async () => {
  const categories = await getAllCourseCategories();
  return (
    <>
      <PageHeader title="Browse Courses" />
      <div className="flex w-full flex-col gap-4 p-4 sm:pt-4">
        {/* TODO: Work on scroll area */}
        <div className="container flex-row items-center justify-between gap-2 backdrop-blur-lg">
          <Categories items={categories} />
        </div>
        <div className="flex min-h-[calc(100vh-6rem)] flex-col gap-4 md:flex-row">
          <div className="rounded-xl bg-muted/50 p-6 md:min-h-min lg:w-3/5">
            <h1 className="text-2xl">Name your course</h1>
            <p className="text-sm text-muted-foreground">
              What would you like to call this course? You can always change
              this any time you change your mind
            </p>
          </div>
          <div className="hidden rounded-xl bg-muted/50 p-6 md:min-h-min lg:block lg:w-2/5">
            another row
          </div>
        </div>
      </div>
    </>
  );
};

export default BrowsePage;
