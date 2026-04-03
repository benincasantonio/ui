import * as React from "react";
import type { NotificationData } from "@/hooks/useNotification";
import { Alert } from "@/ui/Alert/Alert";

const DEFAULT_DURATION = 5000;

interface NotificationProps extends NotificationData {
  onDismiss: (id: string) => void;
  exiting?: boolean;
  className?: string;
}

function Notification({
  id,
  title,
  message,
  variant,
  duration,
  onDismiss,
  exiting,
  className,
}: NotificationProps) {
  const [autoDismissing, setAutoDismissing] = React.useState(false);

  React.useEffect(() => {
    const ms = duration ?? DEFAULT_DURATION;
    if (ms <= 0) return;
    const timer = setTimeout(() => setAutoDismissing(true), ms);
    return () => clearTimeout(timer);
  }, [duration]);

  const handleDismiss = React.useCallback(() => {
    onDismiss(id);
  }, [id, onDismiss]);

  return (
    <Alert
      title={title}
      message={message}
      variant={variant}
      context="notification"
      dismissible
      exiting={exiting || autoDismissing}
      onDismiss={handleDismiss}
      className={className}
    />
  );
}

export { Notification };
