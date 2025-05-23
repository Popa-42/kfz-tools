"use client";

import * as React from "react";
import { Dices, GalleryVerticalEnd, List } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Popa",
    email: "me@just-popa.de",
    avatar: "/assets/images/popa.png",
  },
  navMain: [
    {
      title: "Kennzeichen-Spiele",
      url: "#",
      icon: Dices,
      items: [
        {
          title: "Kfz-Kennzeichen zuorden",
          url: "#",
        },
        {
          title: "Landkreis zuorden",
          url: "#",
        },
        {
          title: "Bundesland zuorden",
          url: "#",
        },
      ],
    },
    {
      title: "Alle Kennzeichen",
      url: "#",
      icon: List,
      items: [
        {
          title: "Alphabetisch",
          url: "#",
        },
        {
          title: "Nach Landkreis",
          url: "#",
        },
        {
          title: "Nach Bundesland",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div
            className={`
              bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center
              rounded-lg
            `}
          >
            <GalleryVerticalEnd className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">Kfz Learner</span>
            <span className="truncate text-xs"></span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
