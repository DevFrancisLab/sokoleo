import React, { createContext, useContext, useState } from "react";

export type NotificationItem = {
  id: string;
  title?: string;
  message: string;
  createdAt: string;
  read?: boolean;
};

type NotificationContextType = {
  notifications: NotificationItem[];
  addNotification: (message: string, title?: string) => void;
  markRead: (id: string) => void;
  clearAll: () => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const addNotification = (message: string, title?: string) => {
    const item: NotificationItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      title,
      message,
      createdAt: new Date().toISOString(),
      read: false,
    };
    setNotifications((prev) => [item, ...prev]);
  };

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearAll = () => setNotifications([]);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markRead, clearAll }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
  return ctx;
};

export default NotificationContext;
