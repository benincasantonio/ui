import * as React from "react";
import { cn } from "@/lib/utils";
import "./Checkbox.css";

export interface CheckboxProps
    extends Omit<React.ComponentProps<"input">, "type"> { }

function Checkbox({ className, ...props }: CheckboxProps) {
    return (
        <input
            type="checkbox"
            data-slot="checkbox"
            className={cn("checkbox", className)}
            {...props}
        />
    );
}

export { Checkbox };
