import { cn } from "../lib/utils";

export function TypographyH1({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h1 className={cn(`flex items-center scroll-m-20 text-2xl font-bold  lg:text-2xl my-1`, className)}>{children}</h1>;
}

export function TypographyH2({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h2 className={cn(`scroll-m-20  pb-2 text-xl  tracking-tight first:mt-0 font-bold`, className)}>{children}</h2>;
}

export function TypographyH3({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={`scroll-m-20 text-lg text-primary tracking-tight ${className}`}>{children}</h3>;
}

export function TypographyH4({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h4 className={`scroll-m-20 text-md tracking-tight ${className}`}>{children}</h4>;
}

export function TypographyBlockquote({ children }: { children: React.ReactNode }) {
  return <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>;
}

export function Body({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-base text-foreground", className)}>{children}</p>;
}

export function BodySmall({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-sm text-foreground", className)}>{children}</p>;
}

export function Caption({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-xs text-foreground", className)}>{children}</p>;
}
