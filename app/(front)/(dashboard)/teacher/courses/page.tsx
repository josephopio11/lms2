import { getAllCourses } from "@/app/(front)/actions/course";
import PageHeader from "@/components/dashboard/course/dash-page-header";
import StatCard from "@/components/dashboard/course/stat-card";
import { InfoCard } from "@/components/dashboard/info-card";
import { Button } from "@/components/ui/button";
import { BookOpenCheck, CheckCircle, School } from "lucide-react";
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
          <InfoCard
            title="Total Courses"
            value={courses.length}
            description="The total number of courses you have created."
            trendValue={-10}
            Icon={School}
          />
          <InfoCard
            title="Published"
            value={3}
            description="Courses you have published this week"
            Icon={BookOpenCheck}
            trendValue={100}
          />
          <InfoCard
            title="Purchased"
            value={123}
            description="Total number of courses purchased this month"
            Icon={BookOpenCheck}
            trendValue={132}
            isCurrency
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
