import { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

type TruncatedTextProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  lines?: 1 | 2 | 3;
  title?: string;
};

const clampClassMap: Record<NonNullable<TruncatedTextProps["lines"]>, string> = {
  1: "truncate",
  2: "line-clamp-2",
  3: "line-clamp-3"
};

export function TruncatedText({ as, children, className, lines = 1, title }: TruncatedTextProps) {
  const Component = (as ?? "span") as ElementType;
  const resolvedTitle = title ?? (typeof children === "string" ? children : undefined);

  return (
    <Component className={cn("min-w-0 max-w-full break-anywhere", clampClassMap[lines], className)} title={resolvedTitle}>
      {children}
    </Component>
  );
}
