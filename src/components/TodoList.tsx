import { colors, type ColorToken } from "../tokens";

export type TodoItem = {
  title: string;
  meta: string;
  points: number;
  urgency: "error" | "warning" | "slate";
};

const urgencyToColor: Record<TodoItem["urgency"], ColorToken> = {
  error: "error",
  warning: "warning",
  slate: "slate",
};

type TodoListProps = {
  items: TodoItem[];
};

export const TodoList = ({ items }: TodoListProps) => (
  <section className="flex flex-col gap-4">
    <div className="flex items-baseline justify-between">
      <h2 className="text-caption font-semibold uppercase tracking-[0.12em] text-slate">
        To Do
      </h2>
      <span className="text-[12px] font-medium leading-4 text-slate">
        {items.length} items
      </span>
    </div>
    <ul className="flex flex-col">
      {items.map((item, i) => {
        const accent = colors[urgencyToColor[item.urgency]];
        return (
          <li
            key={i}
            className={`flex items-start gap-3 border-t border-rule py-3.5 ${
              i === items.length - 1 ? "border-b" : ""
            }`}
          >
            <div
              className="mt-0.5 h-10 w-1 flex-shrink-0 rounded-sm"
              style={{ backgroundColor: accent }}
            />
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <div className="text-small font-semibold text-ink">
                {item.title}
              </div>
              <div className="text-[12px] font-normal leading-4 text-slate">
                {item.meta}
              </div>
            </div>
            <div
              className="flex-shrink-0 text-[11px] font-semibold leading-[14px] tracking-[0.06em]"
              style={{ color: accent }}
            >
              {item.points} PTS
            </div>
          </li>
        );
      })}
    </ul>
  </section>
);
