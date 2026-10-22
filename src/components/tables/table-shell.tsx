import { cn } from "@/lib/utils";

/** Scrolls horizontally inside its own box on narrow screens, so the page never does. */
export function TableShell({
  title,
  children,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <figure className={cn("min-w-0", className)}>
      {title && <figcaption className="mb-2 text-sm font-medium">{title}</figcaption>}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    </figure>
  );
}

export const th = "bg-muted/60 px-2 py-2 text-left font-medium whitespace-nowrap sm:px-3";
export const td = "border-t px-2 py-2 text-left align-top sm:px-3";
