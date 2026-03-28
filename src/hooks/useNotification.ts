import * as React from "react";

export type NotificationVariant = "success" | "info" | "warning" | "danger";

export interface NotificationData {
    id: string;
    title?: string;
    message: string;
    variant: NotificationVariant;
    duration?: number;
}

export interface NotificationContextValue {
    notify: (opts: Omit<NotificationData, "id">) => string;
    dismiss: (id: string) => void;
    dismissAll: () => void;
}

export const NotificationContext =
    React.createContext<NotificationContextValue | null>(null);

export function useNotification(): NotificationContextValue {
    const ctx = React.useContext(NotificationContext);
    if (!ctx) {
        throw new Error(
            "useNotification must be used within a NotificationProvider",
        );
    }
    return ctx;
}
