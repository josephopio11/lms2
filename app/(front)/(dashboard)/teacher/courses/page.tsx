import PageHeader from "@/components/dashboard/dash-page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllCourses } from "../actions";

const CoursesPage = async () => {
  const courses = await getAllCourses();

  return (
    <>
      <PageHeader title="Courses" />
      <div className="flex flex-1 flex-col gap-4 p-4 sm:pt-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-6 md:min-h-min">
          <div className="flex flex-row justify-between">
            <h2>Created Courses</h2>
            <Button>
              <Link href="/teacher/create">Create Course</Link>
            </Button>
          </div>
          <pre>{JSON.stringify(courses, null, 2)}</pre>
        </div>
      </div>
    </>
  );
};

export default CoursesPage;
