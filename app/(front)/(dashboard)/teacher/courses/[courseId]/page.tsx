import {
  getAllCourseCategories,
  getCourseById,
} from "@/app/(front)/actions/course";
import CategoryForm from "@/components/dashboard/course/category-form";
import ChaptersForm from "@/components/dashboard/course/chapters-form";
import PageHeader from "@/components/dashboard/course/dash-page-header";
import DescriptionForm from "@/components/dashboard/course/description-form";
import ImageUploadForm from "@/components/dashboard/course/image-uplad-form";
import PriceForm from "@/components/dashboard/course/price-form";
import { ProgressBar } from "@/components/dashboard/course/progress-bar";
import TitleForm from "@/components/dashboard/course/title-form";
import { redirect } from "next/navigation";
import { cache } from "react";

type PageProps = {
  params: {
    courseId: string;
  };
};

export const getCachedPageStuff = cache(async (id: string) => {
  const course = await getCourseById(id);
  const categories = await getAllCourseCategories();
  return { course, categories };
});

export const generateMetadata = async ({ params }: PageProps) => {
  const { courseId } = await params;
  const { course } = await getCachedPageStuff(courseId);
  return {
    title: "Editing - " + course?.title || "Course",
  };
};

const CoursePage = async ({ params }: PageProps) => {
  const { courseId } = await params;

  const { course, categories } = await getCachedPageStuff(courseId);
  if (!course) return redirect("/teacher/courses");

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionRate = Math.round((completedFields / totalFields) * 100);
  const completionText = `${completedFields}/${totalFields}`;

  return (
    <div>
      <PageHeader
        title="Courses"
        link="/teacher/courses"
        title2={course?.title}
      />
      <div className="flex flex-1 flex-col gap-4 p-4 sm:pt-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-muted/50 p-4 sm:col-span-2 xl:col-span-4">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <p className="text-sm text-muted-foreground">
              What would you like to call this course? You can always change
              this any time you change your mind
            </p>
            <span>Complete all fields {completionText}</span>
            <ProgressBar level={completionRate} className="w-full" />
          </div>
          <div className="space-y-4 sm:col-span-1">
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
              {/* TODO: Fix the issues with price */}
              <PriceForm
                initialData={{ price: course.price ?? 0 }}
                courseId={course.id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
