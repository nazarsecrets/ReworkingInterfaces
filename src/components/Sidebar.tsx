import {
  CalendarIcon,
  CoursesIcon,
  DashboardIcon,
  HelpIcon,
  InboxIcon,
} from "./icons";
import type { ReactNode } from "react";

type NavItemProps = {
  label: string;
  icon: ReactNode;
  active?: boolean;
};

const NavItem = ({ label, icon, active }: NavItemProps) => (
  <div
    className={`flex min-w-0 flex-1 flex-col items-center gap-1 rounded-md px-1 py-2 md:w-16 md:flex-none md:px-0 md:py-3 ${
      active ? "bg-white/[0.06] text-white" : "text-[#9A9A9A]"
    }`}
  >
    {icon}
    <span className="truncate text-[10px] font-medium leading-[12px] md:text-[11px] md:leading-[14px]">{label}</span>
  </div>
);

export const Sidebar = () => (
  <nav className="fixed bottom-0 left-0 right-0 z-30 flex h-16 flex-shrink-0 items-center gap-1 bg-ink px-2 md:static md:h-full md:w-nav md:flex-col md:py-6">
    <div className="hidden h-12 w-12 items-center justify-center rounded-md bg-crimson text-[18px] font-bold leading-6 tracking-[-0.02em] text-white md:mb-6 md:flex">
      IU
    </div>
    <NavItem label="Dashboard" icon={<DashboardIcon />} active />
    <NavItem label="Courses" icon={<CoursesIcon />} />
    <NavItem label="Calendar" icon={<CalendarIcon />} />
    <NavItem label="Inbox" icon={<InboxIcon />} />
    <NavItem label="Help" icon={<HelpIcon />} />
  </nav>
);
