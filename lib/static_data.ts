import { BadgeCheck, Brain, SchoolIcon } from "lucide-react";

export const staticLinks = {
  navMain: [
    {
      title: "My Content",
      url: "#",
      icon: Brain,
      items: [
        {
          title: "Browse",
          url: "/browse",
        },
        {
          title: "Bookings",
          url: "/bookings",
        },
        {
          title: "Upcoming events",
          url: "/upcoming-events",
        },
      ],
    },
    {
      title: "Profile",
      url: "/profile",
      icon: BadgeCheck,
    },
  ],
};

export const teacherLinks = {
  navMain: [
    {
      title: "Teaching",
      url: "/teacher",
      icon: SchoolIcon,
      items: [
        {
          title: "Courses",
          url: "/teacher/courses",
        },
        {
          title: "Analytics",
          url: "/teacher/analytics",
        },
      ],
    },
  ],
};
