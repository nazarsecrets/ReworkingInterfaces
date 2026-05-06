import { colors, type ColorToken } from "../tokens";

export type AnnouncementProps = {
  course: string;
  courseAccent?: ColorToken;
  title: string;
  body?: string;
  meta: string;
};

export const Announcement = ({
  course,
  courseAccent = "crimson",
  title,
  body,
  meta,
}: AnnouncementProps) => (
  <article className="flex flex-col gap-2 rounded-md border border-rule bg-page p-4">
    <div
      className="text-[11px] font-medium uppercase leading-[14px] tracking-[0.08em]"
      style={{ color: colors[courseAccent] }}
    >
      {course}
    </div>
    <h3 className="text-small font-semibold text-ink">{title}</h3>
    {body && (
      <p className="text-[12px] font-normal leading-[18px] text-slate">
        {body}
      </p>
    )}
    <div className="pt-1 text-[11px] font-medium leading-[14px] text-slate">
      {meta}
    </div>
  </article>
);
