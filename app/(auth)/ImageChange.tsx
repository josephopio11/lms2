"use client";

import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const ImageChange = ({ children }: Props) => {
  const pathname = usePathname();

  let displayImage;
  if (pathname === "/login") {
    displayImage = "/login.jpg";
  } else if (pathname === "/register") {
    displayImage = "/signup.jpg";
  } else if (pathname === "/forgot") {
    displayImage = "/forgot.jpg";
  } else if (pathname === "/confirm") {
    displayImage = "/confirm.jpg";
  }
  return (
    <div
      style={{
        backgroundImage: `url(${displayImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="transition-all duration-1000 ease-in-out"
    >
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 transition-all duration-500 dark:bg-black/50 md:p-10">
        {children}
      </div>
    </div>
  );
};

export default ImageChange;
