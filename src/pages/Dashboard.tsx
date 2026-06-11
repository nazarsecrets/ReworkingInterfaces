import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import { CourseCard } from "../components/CourseCard";
import { TodoList, type TodoItem } from "../components/TodoList";
import { Announcement } from "../components/Announcement";
import { BellIcon, ChatIcon, CheckIcon } from "../components/icons";
import { colors, type ColorToken } from "../tokens";

const courses = [
  {
    code: "COGS-Q 240 · 35421",
    title: "Introduction to Cognitive Science",
    instructor: "Prof. Dana Reyes",
    schedule: "TR 11:30",
    dueCount: 2,
    postCount: 12,
    accent: "crimson" as const,
  },
  {
    code: "ENGL-L 230 · 11782",
    title: "Modern Literary Theory",
    instructor: "Prof. Atanasov",
    schedule: "MWF 10:00",
    dueCount: 1,
    postCount: 8,
    accent: "ink" as const,
  },
  {
    code: "STAT-S 350 · 24905",
    title: "Statistical Modeling I",
    instructor: "Prof. K. Lin",
    schedule: "TR 14:00",
    dueCount: 0,
    postCount: 5,
    accent: "info" as const,
  },
  {
    code: "INFO-I 300 · 30118",
    title: "Human-Computer Interaction",
    instructor: "Prof. M. Park",
    schedule: "MW 13:00",
    dueCount: 3,
    postCount: 21,
    accent: "success" as const,
  },
];

const todos: TodoItem[] = [
  {
    title: "Reading Response 7",
    meta: "COGS-Q 240 · Due tonight 11:59 PM",
    points: 8,
    urgency: "error",
  },
  {
    title: "Problem Set 5",
    meta: "STAT-S 350 · Due Wed 11:59 PM",
    points: 25,
    urgency: "warning",
  },
  {
    title: "HCI Field Study Draft",
    meta: "INFO-I 300 · Due Fri 5:00 PM",
    points: 40,
    urgency: "slate",
  },
];

type ViewMode = "dashboard" | "iteration3" | "iteration4";
type UpdateKind = "announcements" | "feedback" | "discussions";

const calendarDays = [
  {
    label: "MON",
    date: "30",
    events: [
      { time: "11:30", title: "COGS Lecture", accent: "ink" as ColorToken },
      {
        time: "DUE 11:59PM",
        title: "Reading Resp. 7",
        accent: "error" as ColorToken,
        tone: "bg-[#F7E2E5]",
      },
    ],
  },
  {
    label: "TUE",
    date: "31",
    events: [{ time: "14:00", title: "STAT Lab", accent: "ink" as ColorToken }],
  },
  {
    label: "WED · TODAY",
    date: "01",
    active: true,
    events: [
      { time: "13:00", title: "HCI Studio", accent: "ink" as ColorToken },
      {
        time: "DUE 11:59PM",
        title: "PSet 5",
        accent: "warning" as ColorToken,
        tone: "bg-[#F2E8D8]",
      },
    ],
  },
  {
    label: "THU",
    date: "02",
    events: [{ time: "11:30", title: "COGS Lecture", accent: "ink" as ColorToken }],
  },
  {
    label: "FRI",
    date: "03",
    events: [
      { time: "10:00", title: "ENGL Seminar", accent: "ink" as ColorToken },
      {
        time: "DUE 5:00PM",
        title: "HCI Draft",
        accent: "warning" as ColorToken,
        tone: "bg-[#F2E8D8]",
      },
    ],
  },
  {
    label: "SAT",
    date: "04",
    events: [],
  },
  {
    label: "SUN",
    date: "05",
    events: [],
  },
];

const dueItems = [
  {
    id: "lab-reflection",
    date: "31",
    title: "Lab Reflection",
    course: "STAT-S 350",
    due: "2:00 PM",
    accent: "info" as ColorToken,
  },
  {
    id: "reading-response",
    date: "01",
    title: "Reading Response 7",
    course: "COGS-Q 240",
    due: "11:59 PM",
    accent: "crimson" as ColorToken,
  },
  {
    id: "problem-set",
    date: "01",
    title: "Problem Set 5",
    course: "STAT-S 350",
    due: "11:59 PM",
    accent: "info" as ColorToken,
  },
  {
    id: "hci-draft",
    date: "03",
    title: "HCI Field Study Draft",
    course: "INFO-I 300",
    due: "5:00 PM",
    accent: "success" as ColorToken,
  },
  {
    id: "discussion-reply",
    date: "04",
    title: "Discussion Reply",
    course: "COGS-Q 240",
    due: "11:00 AM",
    accent: "crimson" as ColorToken,
  },
  {
    id: "weekly-check",
    date: "05",
    title: "Weekly Check-in",
    course: "INFO-I 300",
    due: "7:30 PM",
    accent: "success" as ColorToken,
  },
  {
    id: "theory-note",
    date: "30",
    title: "Theory note annotation",
    course: "ENGL-L 230",
    due: "9:00 PM",
    accent: "ink" as ColorToken,
  },
];

const monthDays = [
  { date: "29", label: "Sun", muted: true },
  { date: "30", label: "Mon" },
  { date: "31", label: "Tue" },
  { date: "01", label: "Wed", active: true },
  { date: "02", label: "Thu" },
  { date: "03", label: "Fri" },
  { date: "04", label: "Sat" },
  { date: "05", label: "Sun" },
  { date: "06", label: "Mon" },
  { date: "07", label: "Tue" },
  { date: "08", label: "Wed" },
  { date: "09", label: "Thu" },
  { date: "10", label: "Fri" },
  { date: "11", label: "Sat" },
  { date: "12", label: "Sun" },
  { date: "13", label: "Mon" },
  { date: "14", label: "Tue" },
  { date: "15", label: "Wed" },
  { date: "16", label: "Thu" },
  { date: "17", label: "Fri" },
  { date: "18", label: "Sat" },
  { date: "19", label: "Sun" },
  { date: "20", label: "Mon" },
  { date: "21", label: "Tue" },
  { date: "22", label: "Wed" },
  { date: "23", label: "Thu" },
  { date: "24", label: "Fri" },
  { date: "25", label: "Sat" },
  { date: "26", label: "Sun" },
  { date: "27", label: "Mon" },
  { date: "28", label: "Tue" },
  { date: "29", label: "Wed" },
  { date: "30", label: "Thu" },
  { date: "01", label: "Fri", muted: true },
  { date: "02", label: "Sat", muted: true },
];

const courseInitial = (course: string) => course.charAt(0);

const timelineHours = Array.from({ length: 16 }, (_, index) => index + 8);
const weekHeaderHeight = 58;
const weekHourHeight = 58;
const weekDayColumnWidth = 175;
const weekTimeRailWidth = 88;
const weekGridHeight = weekHeaderHeight + timelineHours.length * weekHourHeight;

const formatTimelineHour = (hour24: number) => {
  const period = hour24 >= 12 ? "PM" : "AM";
  const hour = hour24 % 12 || 12;
  return `${hour} ${period}`;
};

const calendarTimePercent = (hour24: number, minute: number) => {
  const minutes = hour24 * 60 + minute;
  const dayStart = 8 * 60;
  const dayEnd = 24 * 60;
  const percent = ((minutes - dayStart) / (dayEnd - dayStart)) * 100;

  return Math.min(100, Math.max(0, percent));
};

const timelineGridTop = (percent: number) => {
  return `${weekHeaderHeight + (timelineHours.length * weekHourHeight * percent) / 100}px`;
};

const dueTimeTop = (due: string) => {
  const match = due.match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/i);
  if (!match) return "50%";

  const hour = Number(match[1]);
  const minute = Number(match[2] ?? 0);
  const period = match[3].toUpperCase();
  const hour24 = (hour % 12) + (period === "PM" ? 12 : 0);

  return `${Math.min(92, calendarTimePercent(hour24, minute))}%`;
};

const dueChipStyle = (due: string, stackIndex: number, stackCount: number): CSSProperties => {
  const match = due.match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/i);
  const hour = match ? Number(match[1]) : 12;
  const period = match?.[3].toUpperCase();
  const hour24 = (hour % 12) + (period === "PM" ? 12 : 0);

  if (hour24 >= 22) {
    return { bottom: (stackCount - stackIndex - 1) * 30 };
  }

  return {
    top: dueTimeTop(due),
    transform: `translateY(calc(-50% + ${stackIndex * 30}px))`,
  };
};

const formatCurrentTime = (date: Date) =>
  date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

const useCurrentTimeMarker = () => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(intervalId);
  }, []);

  return {
    label: formatCurrentTime(now),
    top: timelineGridTop(calendarTimePercent(now.getHours(), now.getMinutes())),
  };
};

const updateContent: Record<UpdateKind, { id: string; course: string; accent: ColorToken; title: string; meta: string }[]> = {
  announcements: [
    { id: "a1", course: "COGS-Q 240", accent: "crimson", title: "Office hours moved to Wells Library", meta: "Prof. Reyes · 2 hours ago" },
    { id: "a2", course: "STAT-S 350", accent: "info", title: "Midterm review session Saturday", meta: "Prof. Lin · Yesterday" },
    { id: "a3", course: "INFO-I 300", accent: "success", title: "Studio critique groups posted", meta: "Prof. Park · Yesterday" },
    { id: "a4", course: "ENGL-L 230", accent: "ink", title: "Bring printed annotation notes", meta: "Prof. Atanasov · Mon" },
    { id: "a5", course: "COGS-Q 240", accent: "crimson", title: "Guest talk slides available", meta: "Course staff · Mon" },
    { id: "a6", course: "STAT-S 350", accent: "info", title: "Lab data file corrected", meta: "TA team · Sun" },
  ],
  feedback: [
    { id: "f1", course: "INFO-I 300", accent: "success", title: "Field Study Draft comments returned", meta: "Prof. Park · 45 min ago" },
    { id: "f2", course: "COGS-Q 240", accent: "crimson", title: "Response 6 rubric notes", meta: "Prof. Reyes · 3 hours ago" },
    { id: "f3", course: "STAT-S 350", accent: "info", title: "Problem Set 4 score posted", meta: "Grades · Yesterday" },
  ],
  discussions: [
    { id: "d1", course: "ENGL-L 230", accent: "ink", title: "Modernism thread has 4 replies", meta: "Discussion board · 1 hour ago" },
    { id: "d2", course: "COGS-Q 240", accent: "crimson", title: "Perception reading question", meta: "Classmate · 4 hours ago" },
    { id: "d3", course: "INFO-I 300", accent: "success", title: "Study recruitment examples", meta: "Studio group · Yesterday" },
  ],
};

const tabs: { id: ViewMode; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "iteration3", label: "Iteration 3" },
  { id: "iteration4", label: "Iteration 4" },
];

const PageIntro = () => (
  <header className="flex flex-col gap-3">
    <div className="text-caption font-medium uppercase tracking-[0.12em] text-crimson">
      Spring 2026 · Week 11
    </div>
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
      <h1 className="text-[34px] font-bold leading-[40px] tracking-[-0.02em] text-ink md:text-[40px] md:leading-[48px]">
        Welcome back, Shreeya.
      </h1>
      <p className="text-small text-slate">3 due this week · 4 active courses</p>
    </div>
  </header>
);

const ViewSwitcher = ({
  active,
  onChange,
}: {
  active: ViewMode;
  onChange: (mode: ViewMode) => void;
}) => (
  <div className="flex w-fit rounded-md border border-rule bg-paper p-1">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        type="button"
        onClick={() => onChange(tab.id)}
        className={`motion-soft motion-press rounded px-4 py-2 text-[13px] font-semibold leading-[18px] ${
          active === tab.id ? "bg-page text-ink shadow-sm" : "text-slate"
        }`}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

const CoursesSection = ({ compact = false }: { compact?: boolean }) => (
  <section className="flex flex-col gap-5">
    <div className="flex items-baseline justify-between border-b border-rule pb-3">
      <h2 className="text-h3 font-semibold text-ink">Your courses</h2>
      <a href="#" className="text-[13px] font-medium leading-[18px] text-crimson">
        View all →
      </a>
    </div>
    <div className="flex flex-wrap gap-6">
      {courses.map((c) => (
        compact ? <CompactCourseCard key={c.code} {...c} /> : <CourseCard key={c.code} {...c} />
      ))}
    </div>
  </section>
);

const CompactCourseCard = ({
  code,
  title,
  dueCount,
  postCount,
  accent = "crimson",
}: (typeof courses)[number]) => (
  <article className="motion-soft flex min-w-[240px] flex-1 flex-col overflow-hidden rounded-md border border-rule bg-page hover:shadow-sm">
    <div className="h-1.5" style={{ backgroundColor: colors[accent] }} />
    <div className="flex flex-col gap-1.5 p-4">
      <div className="text-[11px] font-medium uppercase leading-[14px] tracking-[0.08em] text-slate">
        {code.split(" · ")[0]}
      </div>
      <h3 className="text-small font-semibold text-ink">{title}</h3>
      <div className="text-[12px] leading-4 text-slate">
        {dueCount} due · {postCount} posts
      </div>
    </div>
  </article>
);

const CalendarWorkspace = ({
  mode = "blobs",
  showCourseCalendarAction = false,
}: {
  mode?: "blobs" | "blocks";
  showCourseCalendarAction?: boolean;
}) => {
  const currentTime = useCurrentTimeMarker();
  const isMonthly = mode === "blobs";
  const [range, setRange] = useState(isMonthly ? "this-month" : "this-week");
  const sectionHeight = isMonthly ? 660 : 1160;
  const gridHeight = isMonthly ? 450 : weekGridHeight;
  const gridMinWidth = isMonthly ? 700 : weekTimeRailWidth + calendarDays.length * weekDayColumnWidth;
  const jumpOptions = isMonthly
    ? [
        { value: "this-month", label: "This month" },
        { value: "previous-3-months", label: "Previous 3 months" },
        { value: "next-3-months", label: "Next 3 months" },
        { value: "semester", label: "Semester" },
      ]
    : [
        { value: "this-week", label: "This week" },
        { value: "past-3-weeks", label: "Past 3 weeks" },
        { value: "next-3-weeks", label: "Next 3 weeks" },
        { value: "month", label: "Month" },
      ];

  return (
    <section className="relative overflow-hidden rounded-md border border-rule bg-paper p-4 md:p-8" style={{ height: sectionHeight }}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-[28px] font-bold leading-9 tracking-[-0.015em] text-ink md:text-[32px] md:leading-10">
            To Do
          </h2>
          <p className="text-small text-slate">
            {isMonthly ? "Deadlines placed directly into the month view" : "Deadlines placed directly into the week view"}
          </p>
        </div>
        <div className="flex w-fit flex-wrap gap-1 rounded-md border border-rule bg-page p-1">
          <button type="button" className="motion-soft motion-press rounded px-4 py-3 text-[13px] font-semibold text-slate hover:bg-paper">
            {isMonthly ? "Previous month" : "Previous week"}
          </button>
          <button type="button" className="motion-soft motion-press rounded bg-ink px-4 py-3 text-[13px] font-semibold text-white">
            {isMonthly ? "Next month" : "Next week"}
          </button>
          <label className="flex items-center gap-2 rounded border-l border-rule px-3 py-2 text-[13px] font-semibold text-slate">
            Jump
            <select
              value={range}
              onChange={(event) => setRange(event.target.value)}
              className="bg-transparent text-[13px] font-semibold text-ink outline-none"
            >
              {jumpOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto pb-2 md:mt-8">
      {isMonthly ? (
        <div className="grid gap-px overflow-visible rounded-md border border-rule bg-rule" style={{ height: gridHeight, minWidth: gridMinWidth, gridTemplateColumns: "repeat(7, minmax(0, 1fr))" }}>
          {monthDays.map((day, index) => {
            const items = day.muted ? [] : dueItems.filter((item) => item.date === day.date);
            const column = index % 7;
            const row = Math.floor(index / 7);
            const placement = row >= 3 ? "top" : column >= 5 ? "left" : column <= 1 ? "right" : "bottom";

            return (
              <div key={`${day.label}-${day.date}-${index}`} className="relative flex flex-col gap-3 bg-page p-3">
                <div className={day.active ? "text-crimson" : day.muted ? "text-[#9A9A9A]" : "text-slate"}>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.08em]">{day.label}</div>
                  <div className="text-[18px] font-semibold">{day.date}</div>
                </div>
                <div className="mt-auto flex flex-wrap gap-2">
                  {items.slice(0, 3).map((item) => (
                    <TooltipHint
                      key={item.id}
                      label={`${item.course}: ${item.title} due ${item.due}`}
                      placement={placement}
                    >
                      <button
                        type="button"
                        aria-label={`${item.title} due ${item.due}`}
                        className="motion-soft motion-press flex h-10 w-10 items-center justify-center rounded-sm border border-black/10 text-[13px] font-bold text-white shadow-sm"
                        style={{ backgroundColor: colors[item.accent] }}
                      >
                        {courseInitial(item.course)}
                      </button>
                    </TooltipHint>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-md border border-rule bg-rule xl:min-w-0" style={{ height: gridHeight, minWidth: gridMinWidth }}>
          {timelineHours.map((hour) => (
            <div
              key={hour}
              className="pointer-events-none absolute left-0 right-0 z-10 flex items-center"
              style={{ top: timelineGridTop(calendarTimePercent(hour, 0)) }}
              aria-hidden="true"
            >
              <span className="bg-page px-3 text-right text-[13px] font-medium leading-4 text-slate" style={{ width: weekTimeRailWidth }}>
                {formatTimelineHour(hour)}
              </span>
              <span className="h-px flex-1 bg-rule" />
            </div>
          ))}
          <div
            className="pointer-events-none absolute left-0 right-0 z-20 flex items-center"
            style={{ top: currentTime.top }}
            aria-hidden="true"
          >
            <span className="now-pulse ml-2 rounded-sm bg-crimson px-1.5 py-0.5 text-[10px] font-semibold leading-3 text-white">
              {currentTime.label}
            </span>
            <span className="h-px flex-1 bg-crimson" />
          </div>
          <div
            className="grid gap-px"
            style={{ height: weekHeaderHeight, gridTemplateColumns: `${weekTimeRailWidth}px repeat(${calendarDays.length}, ${weekDayColumnWidth}px)` }}
          >
            <div className="flex items-center bg-page px-3 text-[13px] font-medium text-slate">GMT-04</div>
            {calendarDays.map((day) => (
              <div key={day.date} className="relative flex flex-col justify-center gap-1 bg-page px-4 py-3" style={{ height: weekHeaderHeight }}>
                <div className={day.active ? "text-crimson" : "text-slate"}>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.08em]">
                    {day.label}
                  </div>
                  <div className="text-[18px] font-semibold">{day.date}</div>
                </div>
              </div>
            ))}
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 grid gap-px"
            style={{ top: weekHeaderHeight, gridTemplateColumns: `${weekTimeRailWidth}px repeat(${calendarDays.length}, ${weekDayColumnWidth}px)` }}
          >
            <div className="bg-page" aria-hidden="true" />
            {calendarDays.map((day) => {
              const items = dueItems.filter((item) => item.date === day.date);

              return (
                <div key={day.date} className="relative bg-page">
                  {items.map((item, index) => {
                    const stackIndex = items.slice(0, index).filter((entry) => entry.due === item.due).length;
                    const stackCount = items.filter((entry) => entry.due === item.due).length;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        aria-label={`${item.title} for ${item.course} due ${item.due}`}
                        className="absolute flex h-7 w-full items-center gap-2 rounded-sm border border-rule bg-paper px-2 text-left shadow-sm"
                        style={dueChipStyle(item.due, stackIndex, stackCount)}
                      >
                        <span className="h-4 w-[3px] flex-shrink-0 rounded-sm" style={{ background: colors[item.accent] }} />
                        <span className="min-w-0 truncate text-[11px] font-semibold leading-4 text-ink">
                          <span style={{ color: colors[item.accent] }}>{item.due}</span>
                          <span className="text-slate"> · </span>
                          {item.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}
      </div>

      {showCourseCalendarAction && (
        <button className={mode === "blocks" ? "ml-auto mt-5 flex rounded-md bg-ink px-6 py-3 text-small font-semibold text-white" : "absolute bottom-8 right-8 rounded-md bg-ink px-6 py-3 text-small font-semibold text-white"}>
          Course Calendar
        </button>
      )}
    </section>
  );
};

const TooltipHint = ({
  label,
  children,
  className = "",
  style,
  placement = "bottom",
}: {
  label: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  placement?: "top" | "right" | "bottom" | "left";
}) => (
  <span className={`group relative inline-flex ${className}`} style={style}>
    {children}
    <span
      className={`pointer-events-none absolute z-20 w-56 rounded-md bg-ink px-3 py-2 text-[12px] font-medium leading-4 text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 ${
        placement === "top"
          ? "bottom-full left-1/2 mb-2 -translate-x-1/2"
          : placement === "right"
            ? "left-full top-1/2 ml-2 -translate-y-1/2"
            : placement === "left"
              ? "right-full top-1/2 mr-2 -translate-y-1/2"
              : "left-1/2 top-full mt-2 -translate-x-1/2"
      }`}
    >
      {label}
    </span>
  </span>
);

const UpdateIconDock = () => {
  const [activeKind, setActiveKind] = useState<UpdateKind | null>(null);
  const activeItems = activeKind ? updateContent[activeKind] : [];
  const iconButtons: { id: UpdateKind; label: string; icon: JSX.Element }[] = [
    { id: "announcements", label: "Announcements", icon: <BellIcon /> },
    { id: "feedback", label: "Feedback", icon: <CheckIcon /> },
    { id: "discussions", label: "Discussions", icon: <ChatIcon /> },
  ];

  return (
    <section
      className="relative flex flex-col gap-4"
      onMouseLeave={() => setActiveKind(null)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setActiveKind(null);
        }
      }}
    >
      <div className="flex items-center gap-3">
        {iconButtons.map((item) => (
          <TooltipHint key={item.id} label={`${updateContent[item.id].length} pending ${item.label.toLowerCase()}`}>
            <button
              type="button"
              onMouseEnter={() => setActiveKind(item.id)}
              onFocus={() => setActiveKind(item.id)}
              onClick={() => setActiveKind(item.id)}
              className={`flex h-12 w-12 items-center justify-center rounded-md border ${
                activeKind === item.id ? "border-ink bg-ink text-white" : "border-rule bg-page text-slate"
              }`}
              aria-pressed={activeKind === item.id}
              aria-label={item.label}
            >
              {item.icon}
            </button>
          </TooltipHint>
        ))}
      </div>

      {activeKind && (
        <div className="motion-pop max-h-[420px] overflow-auto rounded-md border border-rule bg-page shadow-sm">
          <div className="sticky top-0 z-10 border-b border-rule bg-page px-4 py-3">
            <h2 className="text-h3 font-semibold text-ink">
              {iconButtons.find((item) => item.id === activeKind)?.label}
            </h2>
            <p className="text-[12px] leading-4 text-slate">Floating panel · scrolls after 5 pending</p>
          </div>
          {activeItems.map((item) => (
            <NotificationRow key={item.id} {...item} />
          ))}
        </div>
      )}
    </section>
  );
};

const NotificationRow = ({
  course,
  accent,
  title,
  meta,
  onDismiss,
}: {
  course: string;
  accent: ColorToken;
  title: string;
  meta: string;
  onDismiss?: () => void;
}) => (
  <div className="motion-soft flex items-start gap-3 border-b border-rule p-4 last:border-b-0 hover:bg-paper">
    <div
      className="h-10 w-10 flex-shrink-0 rounded-sm"
      style={{ backgroundColor: colors[accent] }}
    />
    <div className="min-w-0 flex-1">
      <div className="text-[11px] font-medium uppercase leading-[14px] tracking-[0.08em] text-slate">
        {course}
      </div>
      <div className="text-small font-semibold text-ink">{title}</div>
      <div className="truncate text-[12px] leading-4 text-slate">{meta}</div>
    </div>
    {onDismiss && (
      <button
        type="button"
        onClick={onDismiss}
        className="h-8 w-8 flex-shrink-0 rounded-md text-small font-semibold text-slate hover:bg-paper hover:text-ink"
        aria-label={`Dismiss ${title}`}
      >
        X
      </button>
    )}
  </div>
);

const SideList = ({ title }: { title: string }) => (
  <section className="flex flex-col gap-4">
    <h2 className="text-h3 font-semibold text-ink">{title}</h2>
    <div className="overflow-hidden rounded-md border border-rule bg-page">
      {todos.map((item) => (
        <div key={item.title} className="flex items-start gap-3 border-b border-rule p-4 last:border-b-0">
          <div className="h-10 w-10 flex-shrink-0 rounded bg-paper" />
          <div className="min-w-0 flex-1">
            <div className="text-small font-semibold text-ink">{item.title}</div>
            <div className="truncate text-[12px] leading-4 text-slate">{item.meta}</div>
          </div>
          <button className="text-small font-semibold text-slate">X</button>
        </div>
      ))}
    </div>
  </section>
);

const TabbedUpdates = () => {
  const [activeKind, setActiveKind] = useState<Extract<UpdateKind, "announcements" | "feedback">>("announcements");
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);
  const visibleItems = updateContent[activeKind].filter((item) => !hiddenIds.includes(item.id));
  const tabLabels: { id: Extract<UpdateKind, "announcements" | "feedback">; label: string }[] = [
    { id: "announcements", label: "Announcements" },
    { id: "feedback", label: "Feedback" },
  ];

  return (
    <section className="overflow-hidden rounded-md border border-rule bg-page">
      <div className="grid grid-cols-2 border-b border-rule">
        {tabLabels.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveKind(tab.id)}
            className={`px-4 py-4 text-small font-semibold ${
              activeKind === tab.id ? "bg-ink text-white" : "bg-paper text-ink"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="max-h-[390px] overflow-auto">
        {visibleItems.length > 0 ? (
          visibleItems.map((item) => (
            <NotificationRow
              key={item.id}
              {...item}
              onDismiss={() => setHiddenIds((current) => [...current, item.id])}
            />
          ))
        ) : (
          <div className="p-6 text-small text-slate">No unread {activeKind}.</div>
        )}
      </div>
    </section>
  );
};

const CourseStreamTabs = () => (
  <section className="overflow-hidden rounded-md border border-rule bg-page">
    <div className="grid grid-cols-2 border-b border-rule">
      <button className="bg-paper px-4 py-4 text-small font-semibold text-ink">
        Course Stream
      </button>
      <button className="bg-ink px-4 py-4 text-small font-semibold text-white">
        Course Notification
      </button>
    </div>
    <div>
      {courses.slice(0, 4).map((course) => (
        <div key={course.code} className="flex items-start gap-3 border-b border-rule p-4 last:border-b-0">
          <div
            className="h-12 w-12 flex-shrink-0 rounded"
            style={{ backgroundColor: colors[course.accent] }}
          />
          <div className="min-w-0 flex-1">
            <div className="text-small font-semibold text-ink">{course.title}</div>
            <div className="truncate text-[12px] leading-4 text-slate">{course.code}</div>
          </div>
          <button className="text-small font-semibold text-slate">X</button>
        </div>
      ))}
    </div>
  </section>
);

const DashboardView = () => (
  <div className="flex flex-1 flex-col overflow-visible xl:flex-row xl:overflow-auto">
    <main className="flex min-w-0 flex-1 flex-col gap-10 p-4 md:p-8 xl:overflow-auto xl:p-12">
      <PageIntro />
      <CoursesSection />
    </main>

    <aside className="flex w-full flex-shrink-0 flex-col gap-8 border-t border-rule bg-paper p-4 md:p-8 xl:w-rail xl:overflow-auto xl:border-l xl:border-t-0 xl:py-12 xl:pl-8 xl:pr-12">
      <TodoList items={todos} />
      <section className="flex flex-col gap-4">
        <h2 className="text-caption font-semibold uppercase tracking-[0.12em] text-slate">
          Recent announcements
        </h2>
        <Announcement
          course="COGS-Q 240"
          courseAccent="crimson"
          title="Office hours moved to Wells Library"
          body="Effective this week, Tuesday office hours will be held in Wells Library room E174 instead of Psych 128."
          meta="Prof. Reyes · 2 hours ago"
        />
        <Announcement
          course="STAT-S 350"
          courseAccent="info"
          title="Midterm review session Saturday"
          meta="Prof. Lin · Yesterday"
        />
      </section>
    </aside>
  </div>
);

const Iteration3View = () => (
  <div className="flex flex-1 flex-col overflow-visible xl:flex-row xl:overflow-auto">
    <main className="flex min-w-0 flex-1 flex-col gap-9 p-4 md:p-8 xl:overflow-auto xl:p-12">
      <PageIntro />
      <CalendarWorkspace mode="blobs" />
      <CoursesSection />
    </main>
    <aside className="flex w-full flex-shrink-0 flex-col gap-8 border-t border-rule bg-paper p-4 md:p-8 xl:w-[420px] xl:overflow-auto xl:border-l xl:border-t-0">
      <UpdateIconDock />
      <SideList title="Feedback" />
    </aside>
  </div>
);

const Iteration4View = () => (
  <div className="flex flex-1 flex-col overflow-visible xl:flex-row xl:overflow-auto">
    <main className="flex min-w-0 flex-1 flex-col gap-9 p-4 md:p-8 xl:overflow-auto xl:p-12">
      <PageIntro />
      <CalendarWorkspace mode="blocks" showCourseCalendarAction />
      <CoursesSection />
    </main>
    <aside className="flex w-full flex-shrink-0 flex-col gap-8 border-t border-rule bg-paper p-4 md:p-8 xl:w-[470px] xl:overflow-auto xl:border-l xl:border-t-0">
      <TabbedUpdates />
      <CourseStreamTabs />
    </aside>
  </div>
);

export const Dashboard = () => {
  const [view, setView] = useState<ViewMode>("dashboard");

  return (
  <div className="flex h-full flex-col bg-page pb-16 md:flex-row md:pb-0">
    <Sidebar />
    <div className="flex min-w-0 flex-1 flex-col">
      <Topbar
        userName="Shreeya Rokade"
        userInitials="SR"
        context="Spring 2026 · IU Bloomington"
        trailing={<ViewSwitcher active={view} onChange={setView} />}
      />
      <div className="min-h-0 flex-1 overflow-auto">
        {view === "dashboard" && <DashboardView />}
        {view === "iteration3" && <Iteration3View />}
        {view === "iteration4" && <Iteration4View />}
      </div>
    </div>
  </div>
  );
};
