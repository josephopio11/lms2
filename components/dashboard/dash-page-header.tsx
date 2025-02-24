import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface PageHeaderProps {
  title?: string;
  link?: string;
  title2?: string;
  link2?: string;
  title3?: string;
  link3?: string;
}

const PageHeader = ({
  title,
  title2,
  title3,
  link,
  link2,
  link3,
}: PageHeaderProps) => {
  return (
    <header className="sticky left-0 right-0 top-0 z-10 flex h-16 flex-row items-center justify-between gap-2 border-b px-4 backdrop-blur-lg">
      <div className="flex shrink-0 items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            {title && (
              <>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbLink href={link}>
                    <BreadcrumbPage className="capitalize">
                      {title}
                    </BreadcrumbPage>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            {title2 && (
              <>
                <BreadcrumbSeparator className="hidden max-w-full md:block" />
                <BreadcrumbItem>
                  <BreadcrumbLink href={link2}>
                    <BreadcrumbPage className="capitalize">
                      {title2.length > 35
                        ? title2.slice(0, 35) + "..."
                        : title2}
                    </BreadcrumbPage>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            {title3 && (
              <>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbLink href={link3}>
                    <BreadcrumbPage className="capitalize">
                      {title3}
                    </BreadcrumbPage>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {/* <DarkModeChangeButton /> */}
    </header>
  );
};

export default PageHeader;
