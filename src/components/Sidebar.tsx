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
    className={`flex w-16 flex-col items-center gap-1 rounded-md py-3 ${
      active ? "bg-white/[0.06] text-white" : "text-[#9A9A9A]"
    }`}
  >
    {icon}
    <span className="text-[11px] font-medium leading-[14px]">{label}</span>
  </div>
);

export const Sidebar = () => (
  <nav className="flex h-full w-nav flex-shrink-0 flex-col items-center gap-1 bg-ink py-6">
    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-md bg-crimson text-[18px] font-bold leading-6 tracking-[-0.02em] text-white">
      IU
    </div>
    <NavItem label="Dashboard" icon={<DashboardIcon />} active />
    <NavItem label="Courses" icon={<CoursesIcon />} />
    <NavItem label="Calendar" icon={<CalendarIcon />} />
    <NavItem label="Inbox" icon={<InboxIcon />} />
    <NavItem label="Help" icon={<HelpIcon />} />
  </nav>
);
