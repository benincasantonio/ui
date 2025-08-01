import React from "react";
import {Input as BaseInput} from "@/shadcn/ui/input";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({className, type, ...props}, ref) => {
        return (
            <BaseInput
                className={className}
                ref={ref}
                type={type}
                {...props}
            />
        )
    })