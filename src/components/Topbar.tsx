import type { ReactNode } from "react";
import { SearchIcon } from "./icons";

type TopbarProps = {
  userName: string;
  userInitials: string;
  context: string;
  trailing?: ReactNode;
};

export const Topbar = ({ userName, userInitials, context, trailing }: TopbarProps) => (
  <header className="flex flex-shrink-0 flex-wrap items-center justify-between gap-3 border-b border-rule bg-page px-4 py-4 md:gap-4 md:px-12 md:py-5">
    <label className="order-2 flex w-full min-w-0 items-center gap-3 rounded-md border border-rule bg-paper px-4 py-2.5 text-slate sm:order-1 sm:max-w-[360px] sm:flex-1">
      <span className="sr-only">Search</span>
      <SearchIcon className="flex-shrink-0" />
      <input
        type="search"
        placeholder="Search courses, assignments, people"
        className="min-w-0 flex-1 bg-transparent text-small text-ink outline-none placeholder:text-slate"
      />
    </label>
    <div className="order-1 flex w-full flex-shrink-0 items-center justify-between gap-4 sm:order-2 sm:w-auto sm:justify-start sm:gap-6">
      {trailing}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-crimson text-[13px] font-semibold leading-[18px] text-white">
          {userInitials}
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-small font-semibold leading-[18px] text-ink">
            {userName}
          </span>
          <span className="hidden text-caption font-normal normal-case tracking-normal text-slate sm:block">
            {context}
          </span>
        </div>
      </div>
    </div>
  </header>
);
