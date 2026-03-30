import * as React from "react";
import { NotificationContext, type NotificationData } from "@/hooks/useNotification";
import { Notification } from "./Notification";
import "./Notification.css";

function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = React.useState<NotificationData[]>([]);
  const [exitingIds, setExitingIds] = React.useState<Set<string>>(new Set());
  const notificationsRef = React.useRef(notifications);
  notificationsRef.current = notifications;

  const removeDismissed = React.useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setExitingIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const dismiss = React.useCallback((id: string) => {
    setExitingIds((prev) => new Set(prev).add(id));
  }, []);

  const dismissAll = React.useCallback(() => {
    setExitingIds(new Set(notificationsRef.current.map((n) => n.id)));
  }, []);

  const notify = React.useCallback((opts: Omit<NotificationData, "id">): string => {
    const id = crypto.randomUUID();
    setNotifications((prev) => [{ ...opts, id }, ...prev]);
    return id;
  }, []);

  const value = React.useMemo(
    () => ({ notify, dismiss, dismissAll }),
    [notify, dismiss, dismissAll]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <div
        data-slot="notification-container"
        className="notification-container"
        role="log"
        aria-live="polite"
      >
        {notifications.map((n) => (
          <Notification
            key={n.id}
            {...n}
            onDismiss={removeDismissed}
            exiting={exitingIds.has(n.id)}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export { NotificationProvider };
