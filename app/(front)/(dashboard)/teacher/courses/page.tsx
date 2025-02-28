import { getAllCourses } from "@/app/(front)/actions/course";
import PageHeader from "@/components/dashboard/course/dash-page-header";
import { InfoCard } from "@/components/dashboard/info-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { BookOpenCheck, School } from "lucide-react";
import Image from "next/image";
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
      <PageHeader title="Courses" link="/teacher/courses" />
      <div className="flex flex-1 flex-col gap-4 p-4 sm:pt-4">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <InfoCard
            title="Total Courses"
            value={courses.length}
            description="Courses created."
            trendValue={-10}
            Icon={School}
          />
          <InfoCard
            title="Published"
            value={3}
            description="Courses published this week"
            Icon={BookOpenCheck}
            trendValue={100}
          />
          <InfoCard
            title="Purchased"
            value={123}
            description="Courses purchased this month"
            Icon={BookOpenCheck}
            trendValue={132}
            isCurrency
          />
          <InfoCard
            title="Refunds"
            value={-46}
            description="Courses refunded this month"
            Icon={BookOpenCheck}
            trendValue={1}
            isCurrency
          />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-6 md:min-h-min">
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl font-bold">Created Courses</h2>
            <div className="flex w-1/2 flex-row items-center justify-end gap-2">
              <Input placeholder="Search" className="w-1/2" />
              <Button size={"sm"} asChild>
                <Link href="/teacher/create" className="font-bold text-white">
                  Create Course
                </Link>
              </Button>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Here are the courses you have created currently.
          </div>
          <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="relative flex aspect-video flex-col gap-2 overflow-hidden rounded-md border-2 border-white/50 shadow-md shadow-black/50 transition hover:shadow-lg hover:shadow-black/50"
              >
                <Link href={`/teacher/courses/${course.id}`}>
                  <Image
                    src={course.imageUrl || "/auth.jpg"}
                    alt={course.title}
                    width={550}
                    height={550}
                    className="aspect-video object-cover"
                  />
                  <span className="absolute right-2 top-2 flex gap-2">
                    <Badge
                      variant={course.isPublished ? "secondary" : "default"}
                      className="text-gray-700 dark:text-white"
                    >
                      {course.isPublished ? "Published" : "Draft"}
                    </Badge>
                    <Badge variant={"destructive"}>
                      {formatCurrency(course.price || 0)}
                    </Badge>
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-muted/50 to-muted p-4">
                    <div className="flex justify-between">
                      <p className="line-clamp-1 text-xs">
                        {course.category?.name}
                      </p>
                      <Badge className="ml-2 line-clamp-1 text-xs text-white">
                        {course.user.name?.split(" ")[0]}
                      </Badge>
                    </div>
                    <h2 className="text-base font-bold">{course.title}</h2>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          {/* <pre>{JSON.stringify(courses, null, 2)}</pre> */}
        </div>
      </div>
    </>
  );
};

export default CoursesPage;
