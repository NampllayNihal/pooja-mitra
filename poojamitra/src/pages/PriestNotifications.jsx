import React, { useState } from "react";
import {
  Bell,
  CheckCheck,
  CalendarDays,
  Wallet,
  ShieldCheck,
} from "lucide-react";

import PriestLayout from "../components/PriestLayout";
import {
  getPriestData,
  markAllNotificationsRead,
  markNotificationRead,
} from "../utils/priestStore";

export default function PriestNotifications() {
  const [data, setData] = useState(getPriestData());

  const notifications = data.notifications;

  const getIcon = (type) => {
    if (type === "booking") {
      return <CalendarDays size={20} />;
    }

    if (type === "payment") {
      return <Wallet size={20} />;
    }

    return <ShieldCheck size={20} />;
  };

  const markRead = (id) => {
    const updated = markNotificationRead(id);
    setData(updated);
  };

  const markAll = () => {
    const updated = markAllNotificationsRead();
    setData(updated);
  };

  return (
    <PriestLayout
      title="Notifications"
      subtitle="Stay updated about your bookings and account"
      profile={data.profile}
    >
      <div className="notification-header">
        <div>
          <h2>
            Notifications{" "}
            <span className="notification-count">
              {
                notifications.filter(
                  (item) => !item.read
                ).length
              }
            </span>
          </h2>

          <p>
            Important updates from PoojaMitra.
          </p>
        </div>

        <button
          className="secondary-btn"
          onClick={markAll}
        >
          <CheckCheck size={17} />
          Mark all as read
        </button>
      </div>

      <div className="notifications-list">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification-item ${
              notification.read ? "read" : "unread"
            }`}
            onClick={() =>
              markRead(notification.id)
            }
          >
            <div className="notification-icon">
              {getIcon(notification.type)}
            </div>

            <div className="notification-content">
              <div className="notification-title-row">
                <strong>{notification.title}</strong>
                <small>{notification.date}</small>
              </div>

              <p>{notification.message}</p>

              {!notification.read && (
                <span className="unread-label">
                  New
                </span>
              )}
            </div>

            {!notification.read && (
              <div className="notification-dot" />
            )}
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="empty-state">
            <Bell size={35} />
            <p>No notifications.</p>
          </div>
        )}
      </div>
    </PriestLayout>
  );
}
