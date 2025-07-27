import {Button as BaseButton, buttonVariants} from "@/shadcn/ui/button"
import {cn} from "@/shadcn/lib/utils.ts";
import type {VariantProps} from "class-variance-authority";
import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
}
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (props, ref) => {
        const {variant, size, className, disabled, children } = props;

        return (
            <BaseButton
                ref={ref}
                className={cn(
                    "disabled:cursor-not-allowed",
                     "enabled:cursor-pointer",
                    buttonVariants({variant, size,
                    className
                }))}
                size={size}
                variant={variant}
                disabled={disabled}
                {...props}
            >
                {children}
            </BaseButton>
        );
    })
