import Image from "next/image";
import Link from "next/link";

const LogoAuth = () => {
  return (
    <Link href="/" className="flex items-center gap-2 self-center font-medium">
      <div className="flex h-6 w-auto items-center justify-center rounded-md text-primary-foreground">
        <Image
          src={"/logo.png"}
          width={200}
          height={200}
          alt="logo"
          className="h-8 w-8"
        />
      </div>
      <span className="text-2xl font-bold">
        {process.env.NEXT_PUBLIC_APP_NAME || "My App"}
      </span>
    </Link>
  );
};

export default LogoAuth;
