import Link from "next/link";
import { FaBookReader } from "react-icons/fa";

const LogoAuth = () => {
  return (
    <Link href="/" className="flex items-center gap-2 self-center font-medium">
      <div className="flex h-6 w-auto items-center justify-center rounded-md text-primary-foreground">
        <Link href="/" className="flex gap-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground">
            <FaBookReader className="size-4" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-semibold dark:text-white">
              {process.env.NEXT_PUBLIC_APP_NAME}
            </span>
            <span className="text-xs text-muted-foreground">
              v {process.env.NEXT_PUBLIC_APP_VERSION}
            </span>
          </div>
        </Link>
      </div>
    </Link>
  );
};

export default LogoAuth;
