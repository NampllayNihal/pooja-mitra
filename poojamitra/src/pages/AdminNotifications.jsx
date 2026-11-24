import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  CalendarDays,
  BriefcaseBusiness,
  CreditCard,
  FileText,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  CheckCircle2,
  Clock3,
  AlertCircle,
  IndianRupee,
  Video,
  Search,
  Check,
  Trash2,
  Eye,
  ChevronRight,
  Info,
} from "lucide-react";

import "../styles/adminNotifications.css";

const AdminNotifications = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "priest",
      title: "New Priest Application",
      message:
        "Ravi Kumar has submitted a new priest registration application for verification.",
      time: "10 minutes ago",
      date: "06 Oct 2026",
      read: false,
      priority: "high",
    },
    {
      id: 2,
      type: "booking",
      title: "New Booking Received",
      message:
        "A new booking has been created for Satyanarayana Pooja by Priya Sharma.",
      time: "35 minutes ago",
      date: "06 Oct 2026",
      read: false,
      priority: "normal",
    },
    {
      id: 3,
      type: "payment",
      title: "Payment Successful",
      message:
        "Payment of ₹2,500 has been successfully received for booking PM-BKG-1001.",
      time: "1 hour ago",
      date: "06 Oct 2026",
      read: false,
      priority: "normal",
    },
    {
      id: 4,
      type: "interview",
      title: "Interview Scheduled",
      message:
        "Priest interview with Suresh Sharma has been scheduled for tomorrow at 11:00 AM.",
      time: "2 hours ago",
      date: "06 Oct 2026",
      read: true,
      priority: "normal",
    },
    {
      id: 5,
      type: "booking",
      title: "Booking Cancelled",
      message:
        "Booking PM-BKG-1006 has been cancelled by the customer.",
      time: "3 hours ago",
      date: "06 Oct 2026",
      read: true,
      priority: "normal",
    },
    {
      id: 6,
      type: "system",
      title: "System Maintenance",
      message:
        "Scheduled system maintenance is planned for tonight from 1:00 AM to 2:00 AM.",
      time: "5 hours ago",
      date: "06 Oct 2026",
      read: true,
      priority: "low",
    },
    {
      id: 7,
      type: "priest",
      title: "Priest Approved",
      message:
        "Anil Rao has successfully completed verification and has been approved.",
      time: "Yesterday",
      date: "05 Oct 2026",
      read: true,
      priority: "normal",
    },
    {
      id: 8,
      type: "payment",
      title: "Payment Pending",
      message:
        "Payment for booking PM-BKG-1004 is still pending confirmation.",
      time: "Yesterday",
      date: "05 Oct 2026",
      read: false,
      priority: "high",
    },
  ]);

  const handleNavigation = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const matchesSearch =
        notification.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        notification.message
          .toLowerCase()
          .includes(search.toLowerCase());

      let matchesFilter = true;

      if (filter === "Unread") {
        matchesFilter = !notification.read;
      }

      if (filter === "Read") {
        matchesFilter = notification.read;
      }

      if (filter === "Priests") {
        matchesFilter = notification.type === "priest";
      }

      if (filter === "Bookings") {
        matchesFilter = notification.type === "booking";
      }

      if (filter === "Payments") {
        matchesFilter = notification.type === "payment";
      }

      if (filter === "System") {
        matchesFilter =
          notification.type === "system" ||
          notification.type === "interview";
      }

      return matchesSearch && matchesFilter;
    });
  }, [notifications, search, filter]);

  const markAsRead = (id) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAsUnread = (id) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: false }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((current) =>
      current.filter((notification) => notification.id !== id)
    );
  };

  const clearReadNotifications = () => {
    setNotifications((current) =>
      current.filter((notification) => !notification.read)
    );
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "priest":
        return <UserCheck size={20} />;

      case "booking":
        return <CalendarDays size={20} />;

      case "payment":
        return <IndianRupee size={20} />;

      case "interview":
        return <Video size={20} />;

      case "system":
        return <Settings size={20} />;

      default:
        return <Info size={20} />;
    }
  };

  const getNotificationClass = (type) => {
    switch (type) {
      case "priest":
        return "notification-icon-priest";

      case "booking":
        return "notification-icon-booking";

      case "payment":
        return "notification-icon-payment";

      case "interview":
        return "notification-icon-interview";

      case "system":
        return "notification-icon-system";

      default:
        return "notification-icon-default";
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "high":
        return "priority-high";

      case "low":
        return "priority-low";

      default:
        return "priority-normal";
    }
  };

  return (
    <div className="notifications-layout">
      {/* Mobile Overlay */}
      {menuOpen && (
        <div
          className="notifications-overlay"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`notifications-sidebar ${
          menuOpen ? "notifications-mobile-open" : ""
        }`}
      >
        <div className="notifications-sidebar-header">
          <div className="notifications-brand">
            <span>PoojaMitra</span>
            <small>ADMIN PANEL</small>
          </div>

          <button
            className="notifications-mobile-close"
            onClick={() => setMenuOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        <nav className="notifications-nav">
          <button
            className="notifications-nav-item"
            onClick={() => handleNavigation("/admin-dashboard")}
          >
            <LayoutDashboard size={19} />
            <span>Dashboard</span>
          </button>

          <button
            className="notifications-nav-item"
            onClick={() =>
              handleNavigation("/admin-priest-applications")
            }
          >
            <UserCheck size={19} />
            <span>Priest Applications</span>
          </button>

          <button
            className="notifications-nav-item"
            onClick={() =>
              handleNavigation("/admin-approved-priests")
            }
          >
            <Users size={19} />
            <span>Approved Priests</span>
          </button>

          <button
            className="notifications-nav-item"
            onClick={() => handleNavigation("/admin-customers")}
          >
            <Users size={19} />
            <span>Customers</span>
          </button>

          <button
            className="notifications-nav-item"
            onClick={() => handleNavigation("/admin-bookings")}
          >
            <CalendarDays size={19} />
            <span>Bookings</span>
          </button>

          <button
            className="notifications-nav-item"
            onClick={() => handleNavigation("/admin-services")}
          >
            <BriefcaseBusiness size={19} />
            <span>Services</span>
          </button>

          <button
            className="notifications-nav-item"
            onClick={() => handleNavigation("/admin-interviews")}
          >
            <Video size={19} />
            <span>Interviews</span>
          </button>

          <button
            className="notifications-nav-item"
            onClick={() => handleNavigation("/admin-payments")}
          >
            <CreditCard size={19} />
            <span>Payments</span>
          </button>

          <button
            className="notifications-nav-item"
            onClick={() => handleNavigation("/admin-reports")}
          >
            <FileText size={19} />
            <span>Reports</span>
          </button>

          <button
            className="notifications-nav-item active"
            onClick={() =>
              handleNavigation("/admin-notifications")
            }
          >
            <Bell size={19} />
            <span>Notifications</span>

            {unreadCount > 0 && (
              <span className="sidebar-notification-count">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            className="notifications-nav-item"
            onClick={() => handleNavigation("/admin-settings")}
          >
            <Settings size={19} />
            <span>Settings</span>
          </button>
        </nav>

        <div className="notifications-sidebar-bottom">
          <button
            className="notifications-logout-btn"
            onClick={handleLogout}
          >
            <LogOut size={19} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="notifications-main">
        {/* Topbar */}
        <header className="notifications-topbar">
          <button
            className="notifications-menu-toggle"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={23} />
          </button>

          <div className="notifications-topbar-title">
            <h1>Notifications</h1>
            <p>Manage platform notifications and alerts</p>
          </div>

          <div className="notifications-topbar-actions">
            <button
              className="notifications-top-icon"
              onClick={() =>
                handleNavigation("/admin-notifications")
              }
            >
              <Bell size={20} />

              {unreadCount > 0 && (
                <span>{unreadCount}</span>
              )}
            </button>

            <button
              className="notifications-admin-profile"
              onClick={() => handleNavigation("/admin-settings")}
            >
              <div className="notifications-avatar">A</div>

              <div>
                <strong>Admin</strong>
                <small>Administrator</small>
              </div>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="notifications-content">
          {/* Back */}
          <button
            className="notifications-back-btn"
            onClick={() =>
              handleNavigation("/admin-dashboard")
            }
          >
            ← Back to Dashboard
          </button>

          {/* Header Card */}
          <section className="notifications-heading-card">
            <div className="notifications-heading-left">
              <div className="notifications-heading-icon">
                <Bell size={23} />
              </div>

              <div>
                <h2>Notification Center</h2>

                <p>
                  {unreadCount > 0
                    ? `You have ${unreadCount} unread notification${
                        unreadCount > 1 ? "s" : ""
                      }.`
                    : "You are all caught up."}
                </p>
              </div>
            </div>

            <div className="notifications-heading-actions">
              <button
                className="mark-all-btn"
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
              >
                <Check size={16} />
                Mark All Read
              </button>

              <button
                className="clear-read-btn"
                onClick={clearReadNotifications}
              >
                <Trash2 size={16} />
                Clear Read
              </button>
            </div>
          </section>

          {/* Statistics */}
          <section className="notification-stats">
            <div className="notification-stat-card">
              <div className="notification-stat-icon total">
                <Bell size={20} />
              </div>

              <div>
                <span>Total Notifications</span>
                <strong>{notifications.length}</strong>
              </div>
            </div>

            <div className="notification-stat-card">
              <div className="notification-stat-icon unread">
                <AlertCircle size={20} />
              </div>

              <div>
                <span>Unread</span>
                <strong>{unreadCount}</strong>
              </div>
            </div>

            <div className="notification-stat-card">
              <div className="notification-stat-icon read">
                <CheckCircle2 size={20} />
              </div>

              <div>
                <span>Read</span>
                <strong>
                  {notifications.length - unreadCount}
                </strong>
              </div>
            </div>

            <div className="notification-stat-card">
              <div className="notification-stat-icon pending">
                <Clock3 size={20} />
              </div>

              <div>
                <span>High Priority</span>
                <strong>
                  {
                    notifications.filter(
                      (notification) =>
                        notification.priority === "high"
                    ).length
                  }
                </strong>
              </div>
            </div>
          </section>

          {/* Search / Filter */}
          <section className="notifications-controls">
            <div className="notifications-search">
              <Search size={18} />

              <input
                type="text"
                placeholder="Search notifications..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="notifications-filter">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="All">All Notifications</option>
                <option value="Unread">Unread</option>
                <option value="Read">Read</option>
                <option value="Priests">Priests</option>
                <option value="Bookings">Bookings</option>
                <option value="Payments">Payments</option>
                <option value="System">System</option>
              </select>
            </div>
          </section>

          {/* Notification List */}
          <section className="notifications-list-card">
            <div className="notifications-list-header">
              <div>
                <h3>Recent Notifications</h3>
                <p>
                  Showing {filteredNotifications.length} notification
                  {filteredNotifications.length !== 1 ? "s" : ""}
                </p>
              </div>

              <span className="notification-result-count">
                {filteredNotifications.length}
              </span>
            </div>

            {filteredNotifications.length > 0 ? (
              <div className="notifications-list">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`notification-item ${
                      !notification.read
                        ? "notification-unread"
                        : ""
                    }`}
                  >
                    <div
                      className={`notification-item-icon ${getNotificationClass(
                        notification.type
                      )}`}
                    >
                      {getNotificationIcon(notification.type)}
                    </div>

                    <div className="notification-item-content">
                      <div className="notification-item-title-row">
                        <h4>{notification.title}</h4>

                        <span
                          className={`notification-priority ${getPriorityClass(
                            notification.priority
                          )}`}
                        >
                          {notification.priority}
                        </span>

                        {!notification.read && (
                          <span className="unread-dot"></span>
                        )}
                      </div>

                      <p>{notification.message}</p>

                      <div className="notification-item-meta">
                        <span>
                          <Clock3 size={13} />
                          {notification.time}
                        </span>

                        <span>{notification.date}</span>
                      </div>
                    </div>

                    <div className="notification-item-actions">
                      <button
                        title={
                          notification.read
                            ? "Mark as unread"
                            : "Mark as read"
                        }
                        onClick={() =>
                          notification.read
                            ? markAsUnread(notification.id)
                            : markAsRead(notification.id)
                        }
                      >
                        {notification.read ? (
                          <Eye size={17} />
                        ) : (
                          <Check size={17} />
                        )}
                      </button>

                      <button
                        title="Delete"
                        onClick={() =>
                          deleteNotification(notification.id)
                        }
                      >
                        <Trash2 size={17} />
                      </button>

                      <button
                        title="View"
                        onClick={() =>
                          markAsRead(notification.id)
                        }
                      >
                        <ChevronRight size={17} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="notifications-empty">
                <div className="notifications-empty-icon">
                  <Bell size={30} />
                </div>

                <h3>No notifications found</h3>

                <p>
                  There are no notifications matching your current
                  search or filter.
                </p>

                <button
                  onClick={() => {
                    setSearch("");
                    setFilter("All");
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </section>

          {/* Notification Types */}
          <section className="notification-type-grid">
            <div className="notification-type-card">
              <div className="type-icon priest">
                <UserCheck size={20} />
              </div>

              <div>
                <strong>Priest Alerts</strong>
                <span>
                  Applications, verification and approvals
                </span>
              </div>
            </div>

            <div className="notification-type-card">
              <div className="type-icon booking">
                <CalendarDays size={20} />
              </div>

              <div>
                <strong>Booking Alerts</strong>
                <span>
                  New, confirmed and cancelled bookings
                </span>
              </div>
            </div>

            <div className="notification-type-card">
              <div className="type-icon payment">
                <IndianRupee size={20} />
              </div>

              <div>
                <strong>Payment Alerts</strong>
                <span>
                  Successful, pending and failed payments
                </span>
              </div>
            </div>

            <div className="notification-type-card">
              <div className="type-icon system">
                <Settings size={20} />
              </div>

              <div>
                <strong>System Alerts</strong>
                <span>
                  Maintenance and platform notifications
                </span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminNotifications;