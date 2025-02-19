import PageHeader from "@/components/dashboard/dash-page-header";

type PageProps = {
  params: {
    id: string;
  };
};

const CoursePage = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div>
      <PageHeader title="Course" />
      CoursePage
      {id}
    </div>
  );
};

export default CoursePage;
