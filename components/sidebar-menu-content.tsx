"use client";

import { staticLinks } from "@/lib/static_data";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "./ui/sidebar";

const SidebarMenuContent = () => {
  const pathname = usePathname();
  console.log(pathname);

  const isActive = (url: string) => pathname === url;
  return (
    <div>
      <SidebarMenu className="gap-2">
        {staticLinks.navMain.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              className={cn(isActive(item.url) && "!bg-primary !text-white")}
            >
              <a href={item.url} className="font-medium">
                {item.title}
              </a>
            </SidebarMenuButton>
            {item.items?.length ? (
              <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                {item.items.map((item) => (
                  <SidebarMenuSubItem key={item.title}>
                    <SidebarMenuSubButton
                      asChild
                      // isActive={isActive(item.url)}
                      className={cn(
                        isActive(item.url) && "!bg-primary !text-white",
                      )}
                    >
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            ) : null}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </div>
  );
};

export default SidebarMenuContent;
