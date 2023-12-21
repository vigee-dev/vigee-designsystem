"use client";
import React from "react";
import Link from "next/link";
import { Button as ShadButton } from "../ui/button";
import { LoadingButton } from "./LoadingButton";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  reversed?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  ring?: string;
  href?: string;
  className?: string;
  pending?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}

export function Button({
  children,
  onClick,
  variant,
  type,
  disabled,
  href,
  className,
  pending,
}: ButtonProps) {
  return pending ? (
    <LoadingButton variant={variant}>{children}</LoadingButton>
  ) : href && !pending ? (
    <ShadButton
      asChild
      className={"font-bold text-sm border " + className}
      variant={variant}
    >
      <Link href={href}>{children}</Link>
    </ShadButton>
  ) : (
    <ShadButton
      variant={variant}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={"font-bold text-sm border " + className}
    >
      {children}
    </ShadButton>
  );
}
