import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";
import "./Button.css";

const buttonVariants = cva("button", {
  variants: {
    variant: {
      default: "button--default",
      destructive: "button--destructive",
      outline: "button--outline",
      secondary: "button--secondary",
      ghost: "button--ghost",
      link: "button--link",
    },
    size: {
      default: "button--size-default",
      sm: "button--size-sm",
      lg: "button--size-lg",
      icon: "button--size-icon",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
