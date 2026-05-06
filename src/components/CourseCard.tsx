import { CheckIcon, ChatIcon } from "./icons";
import type { ColorToken } from "../tokens";
import { colors } from "../tokens";

export type CourseCardProps = {
  code: string;
  title: string;
  instructor: string;
  schedule: string;
  dueCount: number;
  postCount: number;
  accent?: ColorToken;
};

export const CourseCard = ({
  code,
  title,
  instructor,
  schedule,
  dueCount,
  postCount,
  accent = "crimson",
}: CourseCardProps) => (
  <article className="motion-soft flex w-[268px] flex-col overflow-hidden rounded-md border border-rule bg-page hover:shadow-sm">
    <div
      className="h-2 flex-shrink-0"
      style={{ backgroundColor: colors[accent] }}
    />
    <div className="flex flex-col gap-4 p-5">
      <div className="flex flex-col gap-1.5">
        <div className="text-caption font-medium uppercase text-slate">
          {code}
        </div>
        <h3 className="text-[18px] font-semibold leading-6 tracking-[-0.005em] text-ink">
          {title}
        </h3>
        <div className="text-[13px] font-normal leading-[18px] text-slate">
          {instructor} · {schedule}
        </div>
      </div>
      <div className="flex items-center gap-4 border-t border-rule pt-3 text-slate">
        <div className="flex items-center gap-1.5">
          <CheckIcon />
          <span className="text-[12px] font-medium leading-4">
            {dueCount} due
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <ChatIcon />
          <span className="text-[12px] font-medium leading-4">
            {postCount}
          </span>
        </div>
      </div>
    </div>
  </article>
);
