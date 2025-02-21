import CategoryForm from "@/components/dashboard/category-form";
import ChaptersForm from "@/components/dashboard/chapters-form";
import PageHeader from "@/components/dashboard/dash-page-header";
import DescriptionForm from "@/components/dashboard/description-form";
import ImageUploadForm from "@/components/dashboard/image-uplad-form";
import PriceForm from "@/components/dashboard/price-form";
import { ProgressBar } from "@/components/dashboard/progress-bar";
import TitleForm from "@/components/dashboard/title-form";
import { redirect } from "next/navigation";
import { cache } from "react";
import { getAllCourseCategories, getCourseBySlug } from "../../actions";

type PageProps = {
  params: {
    slug: string;
  };
};

export const getCachedPageStuff = cache(async (slug: string) => {
  const course = await getCourseBySlug(slug);
  const categories = await getAllCourseCategories();
  return { course, categories };
});

export const generateMetadata = async ({ params }: PageProps) => {
  const { slug } = await params;
  const { course } = await getCachedPageStuff(slug);
  return {
    title: course?.title || "Course",
  };
};

const CoursePage = async ({ params }: PageProps) => {
  const { slug } = await params;

  const { course, categories } = await getCachedPageStuff(slug);
  if (!course) return redirect("/teacher/courses");

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
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
        <div className="grid auto-rows-min gap-4 md:grid-cols-3 xl:grid-cols-4">
          <div className="rounded-xl bg-muted/50 p-4 sm:col-span-3 xl:col-span-4">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <p className="text-sm text-muted-foreground">
              What would you like to call this course? You can always change
              this any time you change your mind
            </p>
            <span>Complete all fields {completionText}</span>
            <ProgressBar level={completionRate} className="w-full" />
          </div>
          <div className="space-y-4 sm:col-span-2 xl:col-span-2">
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
          <div className="space-y-4 rounded-xl xl:col-span-2">
            <div className="col-span-2 rounded-xl bg-muted/50 p-4">
              <ChaptersForm initialData={course} courseId={course.id} />
            </div>
            <div className="col-span-2 rounded-xl bg-muted/50 p-4">
              <PriceForm initialData={course} courseId={course.id} />
            </div>
            This is another one
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
