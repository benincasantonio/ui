import { X } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import "./Alert.css";

export type AlertVariant = "success" | "info" | "warning" | "danger";
export type AlertContext = "inline" | "notification";

export interface AlertProps extends React.ComponentProps<"div"> {
  title?: string;
  message: string;
  variant: AlertVariant;
  context?: AlertContext;
  dismissible?: boolean;
  exiting?: boolean;
  onDismiss?: () => void;
}

function Alert({
  title,
  message,
  variant,
  context = "inline",
  dismissible = false,
  exiting,
  onDismiss,
  className,
  ...props
}: AlertProps) {
  const [dismissing, setDismissing] = React.useState(false);

  const exitAnimationName = context === "notification" ? "notification-exit" : "alert-exit";

  const handleDismiss = React.useCallback(() => {
    setDismissing(true);
  }, []);

  const handleAnimationEnd = React.useCallback(
    (e: React.AnimationEvent<HTMLDivElement>) => {
      if (e.animationName === exitAnimationName) {
        onDismiss?.();
      }
    },
    [exitAnimationName, onDismiss]
  );

  React.useEffect(() => {
    if (exiting) setDismissing(true);
  }, [exiting]);

  React.useEffect(() => {
    if (!dismissing) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      onDismiss?.();
    }
  }, [dismissing, onDismiss]);

  return (
    <div
      data-slot="alert"
      data-variant={variant}
      data-context={context}
      role="alert"
      className={cn(
        "alert",
        dismissible && "alert--dismissible",
        dismissing && "alert--dismissing",
        className
      )}
      onAnimationEnd={handleAnimationEnd}
      {...props}
    >
      {dismissible && (
        <button
          type="button"
          data-slot="alert-close"
          className="alert-close"
          onClick={handleDismiss}
          aria-label="Dismiss alert"
        >
          <X size={14} />
        </button>
      )}
      {title && (
        <div data-slot="alert-title" className="alert-title">
          {title}
        </div>
      )}
      <div data-slot="alert-message" className="alert-message">
        {message}
      </div>
    </div>
  );
}

export { Alert };
