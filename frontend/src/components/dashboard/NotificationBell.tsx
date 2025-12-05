import { Bell, X } from "lucide-react";
import { useState } from "react";
import { useNotifications } from "./NotificationContext";

const NotificationBell = () => {
  const { notifications, markRead, clearAll } = useNotifications();
  const [open, setOpen] = useState(false);

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((s) => !s)}
        aria-label="Notifications"
        className="p-2 rounded-full hover:bg-muted"
      >
        <Bell className="w-6 h-6" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium bg-destructive text-background">{unread}</span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 max-w-xs bg-card border rounded-xl shadow-lg z-50 overflow-hidden">
          <div className="flex items-center justify-between p-3 border-b">
            <strong>Notifications</strong>
            <div className="flex items-center gap-2">
              <button className="text-sm text-muted-foreground" onClick={() => clearAll()}>
                Clear
              </button>
              <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-muted">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="max-h-72 overflow-auto">
            {notifications.length === 0 && <div className="p-4 text-sm text-muted-foreground">No notifications</div>}
            {notifications.map((n) => (
              <div key={n.id} className={`p-3 border-b last:border-b-0 ${n.read ? "opacity-60" : ""}`}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    {n.title && <div className="text-sm font-semibold">{n.title}</div>}
                    <div className="text-sm text-foreground">{n.message}</div>
                    <div className="text-xs text-muted-foreground mt-1">{new Date(n.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="flex-shrink-0">
                    {!n.read && (
                      <button className="text-xs text-primary" onClick={() => markRead(n.id)}>
                        Mark read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
