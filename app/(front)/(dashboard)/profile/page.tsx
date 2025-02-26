import { auth } from "@/auth";
import PageHeader from "@/components/dashboard/course/dash-page-header";
import HtmlRender from "@/components/dashboard/html-render";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFirstLettersOfName } from "@/lib/utils";
import {
  CalendarDays,
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  MessageCircle,
  ThumbsUp,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { getUser } from "../../actions/user";

export default async function Page() {
  const session = await auth();

  if (!session?.user) return;

  const userDetails = await getUser(session.user.id || "");

  return (
    <>
      <PageHeader />
      {/* <pre>{JSON.stringify(userDetails, null, 2)}</pre> */}
      <div className="min-h-[100vh] flex-1 space-y-6 rounded-xl p-6 md:min-h-min">
        <div className="flex flex-col gap-6 md:flex-row">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32">
                <AvatarImage
                  src={userDetails?.image || "/userp.svg"}
                  alt={userDetails?.name || "No Name"}
                />
                <AvatarFallback>
                  {getFirstLettersOfName(userDetails?.name)}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-2xl font-bold">{userDetails?.name}</h2>
                <p className="text-gray-500">{userDetails?.email}</p>
                <Badge className="mt-2 text-white">
                  {userDetails?.role === "GUEST"
                    ? "SUBSCRIBER"
                    : userDetails?.role}
                </Badge>
              </div>
              <div className="flex flex-row items-center justify-center gap-2 space-y-2 text-sm text-gray-500">
                <Link href={userDetails?.userProfile?.facebook || "#"}>
                  <Facebook />
                </Link>
                <Link href={userDetails?.userProfile?.instagram || "#"}>
                  <Instagram />
                </Link>
                <Link href={userDetails?.userProfile?.twitter || "#"}>
                  <Twitter />
                </Link>
                <Link href={userDetails?.userProfile?.linkedin || "#"}>
                  <Linkedin />
                </Link>
                <Link href={userDetails?.userProfile?.website || "#"}>
                  <Globe />
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Bio</CardTitle>
            </CardHeader>
            <CardContent className="">
              <HtmlRender htmlText={userDetails?.userProfile?.bio} />
            </CardContent>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">
                  {userDetails?._count.courses}
                </p>
                <p className="text-sm text-gray-500">Courses</p>
              </div>
              <div>
                <p className="text-2xl font-bold">12.4k</p>
                <p className="text-sm text-gray-500">Followers</p>
              </div>
              <div>
                <p className="text-2xl font-bold">1.5k</p>
                <p className="text-sm text-gray-500">Following</p>
              </div>
              <div>
                <p className="text-2xl font-bold">98</p>
                <p className="text-sm text-gray-500">Projects</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <ThumbsUp className="text-blue-500" />
                <div>
                  <p className="font-medium">Liked a post</p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <MessageCircle className="text-green-500" />
                <div>
                  <p className="font-medium">Commented on a thread</p>
                  <p className="text-sm text-gray-500">1 day ago</p>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <CalendarDays className="text-purple-500" />
                <div>
                  <p className="font-medium">Created a new event</p>
                  <p className="text-sm text-gray-500">3 days ago</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <CardContent>{/* <EditProfileForm /> */}</CardContent>
        </Card>
      </div>
    </>
  );
}
