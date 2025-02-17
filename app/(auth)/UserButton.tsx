import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings } from "lucide-react";
import { User } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { handleSignOut } from "./actions";

const UserButton = ({ user }: { user?: User }) => {
  return (
    <div className="ml-auto md:ml-0">
      {!!user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={"icon"} className="flex-none rounded-full">
              <Image
                src={user.image || "/userp.svg"}
                alt={"Profile Picture"}
                width={32}
                height={32}
                className={
                  "aspect-square rounded-full bg-background object-cover dark:text-white"
                }
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>{user.name || "User"}</DropdownMenuLabel>
            <DropdownMenuLabel />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              {/* {user.role === "admin" && (
                <DropdownMenuItem asChild>
                  <Link href="/admin">
                    <Lock className="mr-2 h-4 w-4" />
                    <span>Admin</span>
                  </Link>
                </DropdownMenuItem>
              )} */}
            </DropdownMenuGroup>
            <DropdownMenuLabel />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <form action={handleSignOut}>
                  <button type="submit" className="flex w-full items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button asChild>
          <Link href="/api/auth/signin">Sign In</Link>
        </Button>
      )}
    </div>
  );
};

export default UserButton;
