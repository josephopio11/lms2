import PageHeader from "@/components/dashboard/dash-page-header";

type Props = {
  params: {
    slug: string[];
  };
};

const Slug = async ({ params }: Props) => {
  const props = await params;
  console.log(props);
  return (
    <div>
      <PageHeader
        title={props.slug[0]}
        link={props.slug[0]}
        title2={props.slug[1]}
        link2={props.slug[1]}
        title3={props.slug[2]}
        link3={props.slug[2]}
      />
      Slug
    </div>
  );
};

export default Slug;
