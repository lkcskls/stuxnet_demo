"use client";

interface ViewPanelProps {
  title: string;
  ariaLabel?: string;
  children: React.ReactNode;
}

export function ViewPanel({ title, ariaLabel, children }: ViewPanelProps) {
  return (
    <section
      className="flex h-full flex-col rounded-lg border border-panel bg-panel px-2 pb-2 pt-4"
      aria-label={ariaLabel ?? title}
    >
      <h2 className="mb-2 text-base font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
        {title}
      </h2>
      {children}
    </section>
  );
}
