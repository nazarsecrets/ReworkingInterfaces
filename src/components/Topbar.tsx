import { BellIcon, SearchIcon } from "./icons";

type TopbarProps = {
  userName: string;
  userInitials: string;
  context: string;
};

export const Topbar = ({ userName, userInitials, context }: TopbarProps) => (
  <header className="flex flex-shrink-0 flex-wrap items-center justify-between gap-4 border-b border-rule bg-page px-6 py-5 md:px-12">
    <label className="flex min-w-[240px] max-w-[360px] flex-1 items-center gap-3 rounded-md border border-rule bg-paper px-4 py-2.5 text-slate">
      <span className="sr-only">Search</span>
      <SearchIcon className="flex-shrink-0" />
      <input
        type="search"
        placeholder="Search courses, assignments, people"
        className="min-w-0 flex-1 bg-transparent text-small text-ink outline-none placeholder:text-slate"
      />
    </label>
    <div className="flex flex-shrink-0 items-center gap-6">
      <button
        type="button"
        aria-label="Notifications"
        className="text-ink"
      >
        <BellIcon />
      </button>
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-crimson text-[13px] font-semibold leading-[18px] text-white">
          {userInitials}
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-small font-semibold leading-[18px] text-ink">
            {userName}
          </span>
          <span className="text-caption font-normal normal-case tracking-normal text-slate">
            {context}
          </span>
        </div>
      </div>
    </div>
  </header>
);
