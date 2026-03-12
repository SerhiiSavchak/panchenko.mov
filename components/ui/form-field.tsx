"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  children: ReactNode;
  className?: string;
  required?: boolean;
  error?: string;
}

export function FormField({
  label,
  children,
  className,
  required,
  error,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
        {required && " *"}
      </label>
      {children}
      {error && (
        <span className="text-xs text-red-500 mt-0.5">{error}</span>
      )}
    </div>
  );
}
