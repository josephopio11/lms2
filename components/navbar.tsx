import { handleSignOut } from "@/app/(auth)/actions";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-slate-100/5 px-4 py-3 backdrop-blur-md">
      <Link href="/" className="text-xl font-bold">
        Auth.js
      </Link>
      {!session ? (
        <div className="flex justify-center gap-2">
          <Link href="/login">
            <Button variant="default">Sign In</Button>
          </Link>
          <Link href="/register">
            <Button variant="default">Sign Up</Button>
          </Link>
        </div>
      ) : (
        <form action={handleSignOut}>
          <Button variant="default" type="submit">
            Sign Out
          </Button>
        </form>
      )}
    </nav>
  );
}
