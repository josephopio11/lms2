import { getAllCourses } from "@/app/(front)/actions/course";
import PageHeader from "@/components/dashboard/course/dash-page-header";
import StatCard from "@/components/dashboard/course/stat-card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Grid, School } from "lucide-react";
import Link from "next/link";

export const generateMetadata = () => ({
  title: "Courses",
});

const CoursesPage = async () => {
  const courses = await getAllCourses();

  if (!courses) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4 sm:pt-4">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-6 md:min-h-min">
          <div className="flex flex-row justify-between">
            <h2>Created Courses</h2>
            <Button>
              <Link href="/teacher/create">Create Course</Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            You have no created courses yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHeader title="Courses" />
      <div className="flex flex-1 flex-col gap-4 p-4 sm:pt-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-4">
          <StatCard
            title="Total Courses"
            value={courses.length}
            percentage={8}
            Icon={School}
          />
          <StatCard
            title="Total Courses"
            value={courses.length}
            percentage={16}
            Icon={Grid}
          />
          <StatCard
            title="Total Courses"
            value={courses.length}
            percentage={3}
            Icon={School}
          />
          <StatCard
            title="Total Courses"
            value={courses.length}
            percentage={500}
            Icon={CheckCircle}
          />
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
