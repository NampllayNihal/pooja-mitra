import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Bell,
  CheckCircle2,
  UserCheck,
  CalendarDays,
  XCircle,
} from "lucide-react";

import "../styles/notifications.css";

function Notifications() {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      type: "confirmed",
      title: "Booking Confirmed",
      message:
        "Your Ganesh Pooja booking has been confirmed.",
      time: "Today, 10:30 AM",
      unread: true,
    },
    {
      id: 2,
      type: "priest",
      title: "Priest Assigned",
      message:
        "A priest has been assigned to your upcoming pooja.",
      time: "Yesterday, 6:20 PM",
      unread: true,
    },
    {
      id: 3,
      type: "calendar",
      title: "Upcoming Pooja",
      message:
        "Your pooja is scheduled for tomorrow at 10:00 AM.",
      time: "Yesterday, 2:15 PM",
      unread: false,
    },
    {
      id: 4,
      type: "completed",
      title: "Booking Completed",
      message:
        "Your previous pooja booking has been marked completed.",
      time: "20 Sep, 5:45 PM",
      unread: false,
    },
  ];

  const getIcon = (type) => {
    if (type === "confirmed") {
      return <CheckCircle2 size={20} />;
    }

    if (type === "priest") {
      return <UserCheck size={20} />;
    }

    if (type === "calendar") {
      return <CalendarDays size={20} />;
    }

    return <CheckCircle2 size={20} />;
  };

  return (
    <div className="notifications-page">

      {/* Header */}
      <header className="notifications-header">

        <button
          className="notifications-back"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={22} />
        </button>

        <h1>Notifications</h1>

        <div className="notifications-header-space"></div>

      </header>

      <main className="notifications-content">

        {/* Empty state */}
        {notifications.length === 0 ? (
          <div className="notifications-empty">

            <div className="empty-bell">
              <Bell size={32} />
            </div>

            <h2>No Notifications</h2>

            <p>
              You don't have any notifications yet.
            </p>

          </div>
        ) : (
          <div className="notification-list">

            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`notification-card ${
                  notification.unread
                    ? "notification-unread"
                    : ""
                }`}
              >

                <div className="notification-icon">
                  {getIcon(notification.type)}
                </div>

                <div className="notification-info">

                  <div className="notification-title-row">

                    <h3>
                      {notification.title}
                    </h3>

                    {notification.unread && (
                      <span className="unread-dot"></span>
                    )}

                  </div>

                  <p>
                    {notification.message}
                  </p>

                  <span className="notification-time">
                    {notification.time}
                  </span>

                </div>

              </div>
            ))}

          </div>
        )}

      </main>

    </div>
  );
}

export default Notifications;