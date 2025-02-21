import PageHeader from "@/components/dashboard/dash-page-header";
import CourseName from "./CourseName";

export const generateMetadata = () => ({
  title: "Create Course",
});

const CreateCoursesPage = () => {
  return (
    <>
      <PageHeader title3="Create Course" />
      <div className="flex flex-1 flex-col gap-4 p-4 sm:pt-4">
        <div className="flex min-h-[calc(100vh-6rem)] flex-col gap-4 md:flex-row">
          <div className="rounded-xl bg-muted/50 p-6 md:min-h-min lg:w-3/5">
            <h1 className="text-2xl">Name your course</h1>
            <p className="text-sm text-muted-foreground">
              What would you like to call this course? You can always change
              this any time you change your mind
            </p>
            <CourseName />
          </div>
          <div className="hidden rounded-xl bg-muted/50 p-6 md:min-h-min lg:block lg:w-2/5">
            another row
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCoursesPage;
