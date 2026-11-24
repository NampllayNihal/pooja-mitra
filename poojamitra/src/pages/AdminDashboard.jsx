import React from "react";
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
  ChevronRight,
  Clock3,
  CheckCircle2,
  AlertCircle,
  Video,
  IndianRupee,
} from "lucide-react";

import "../styles/adminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] =
    React.useState(false);

  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = () => {
    setMenuOpen(false);
    navigate("/login");
  };

  // =========================================
  // NAVIGATION
  // =========================================

  const handleMenuClick = (path) => {
    if (!path) return;

    setMenuOpen(false);
    navigate(path);
  };

  // =========================================
  // SIDEBAR TOGGLE
  // =========================================

  const toggleSidebar = () => {
    if (window.matchMedia("(max-width: 900px)").matches) {
      setMenuOpen((isOpen) => !isOpen);
      return;
    }

    setSidebarCollapsed((isCollapsed) => !isCollapsed);
  };

  // =========================================
  // STAT CARD NAVIGATION
  // =========================================

  const handleStatClick = (type) => {
    const routes = {
      priests: "/admin-approved-priests",
      pending: "/admin-priest-applications",
      interviews: "/admin-interviews",
      approved: "/admin-approved-priests",
      bookings: "/admin-bookings",
      completed: "/admin-bookings",
    };

    const route = routes[type];

    if (route) {
      handleMenuClick(route);
    }
  };

  // =========================================
  // DASHBOARD STATS
  // =========================================

  const stats = [
    {
      title: "Total Priests",
      value: "28",
      description: "Registered priests",
      icon: UserCheck,
      type: "priests",
    },
    {
      title: "Pending Applications",
      value: "12",
      description: "Need admin review",
      icon: FileText,
      type: "pending",
    },
    {
      title: "Interviews Scheduled",
      value: "5",
      description: "Upcoming interviews",
      icon: Video,
      type: "interviews",
    },
    {
      title: "Approved Priests",
      value: "16",
      description: "Active priests",
      icon: CheckCircle2,
      type: "approved",
    },
    {
      title: "Pending Bookings",
      value: "16",
      description: "Awaiting action",
      icon: CalendarDays,
      type: "bookings",
    },
    {
      title: "Completed Bookings",
      value: "84",
      description: "This month",
      icon: BriefcaseBusiness,
      type: "completed",
    },
  ];

  // =========================================
  // RECENT APPLICATIONS
  // =========================================

  const recentApplications = [
    {
      id: "PM-PR-1001",
      name: "Ravi Kumar",
      specialization: "Vedic Pooja",
      submitted: "Today",
      status: "Under Review",
    },
    {
      id: "PM-PR-1002",
      name: "Suresh Sharma",
      specialization: "Marriage Ceremonies",
      submitted: "Yesterday",
      status: "Interview Scheduled",
    },
    {
      id: "PM-PR-1003",
      name: "Anil Rao",
      specialization: "Griha Pravesh",
      submitted: "2 days ago",
      status: "Documents Submitted",
    },
    {
      id: "PM-PR-1004",
      name: "Mohan Das",
      specialization: "Child Ceremonies",
      submitted: "3 days ago",
      status: "Under Review",
    },
  ];

  // =========================================
  // STATUS CLASS
  // =========================================

  const getStatusClass = (status) => {
    return status
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z-]/g, "");
  };

  return (
    <main
      className={`admin-dashboard-page ${
        sidebarCollapsed ? "sidebar-is-collapsed" : ""
      }`}
    >
      {/* =========================================
          MOBILE OVERLAY
      ========================================= */}

      {menuOpen && (
        <button
          type="button"
          className="admin-sidebar-overlay"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        />
      )}

      {/* =========================================
          SIDEBAR
      ========================================= */}

      <aside
        className={`admin-sidebar ${
          menuOpen ? "admin-sidebar-open" : ""
        } ${
          sidebarCollapsed ? "admin-sidebar-collapsed" : ""
        }`}
      >
        {/* SIDEBAR HEADER */}

        <div className="admin-sidebar-top">
          {/* TEXT BRAND ONLY - NO LOGO IMAGE */}

          <button
            type="button"
            className="admin-sidebar-brand-button"
            onClick={() =>
              handleMenuClick("/admin-dashboard")
            }
          >
            <div className="admin-sidebar-logo">
              PoojaMitra
            </div>

            <div className="admin-panel-label">
              ADMIN PANEL
            </div>
          </button>

          {/* MOBILE CLOSE */}

          <button
            type="button"
            className="admin-mobile-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={21} />
          </button>
        </div>

        {/* =========================================
            NAVIGATION
        ========================================= */}

        <nav className="admin-navigation">
          {/* DASHBOARD */}

          <button
            type="button"
            className="admin-nav-item active"
            onClick={() =>
              handleMenuClick("/admin-dashboard")
            }
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>

          {/* PRIEST APPLICATIONS */}

          <button
            type="button"
            className="admin-nav-item"
            onClick={() =>
              handleMenuClick(
                "/admin-priest-applications"
              )
            }
          >
            <UserCheck size={18} />
            <span>Priest Applications</span>
            <span className="admin-nav-count">12</span>
          </button>

          {/* APPROVED PRIESTS */}

          <button
            type="button"
            className="admin-nav-item"
            onClick={() =>
              handleMenuClick("/admin-approved-priests")
            }
          >
            <Users size={18} />
            <span>Approved Priests</span>
          </button>

          {/* CUSTOMERS */}

          <button
            type="button"
            className="admin-nav-item"
            onClick={() =>
              handleMenuClick("/admin-customers")
            }
          >
            <Users size={18} />
            <span>Customers</span>
          </button>

          {/* BOOKINGS */}

          <button
            type="button"
            className="admin-nav-item"
            onClick={() =>
              handleMenuClick("/admin-bookings")
            }
          >
            <CalendarDays size={18} />
            <span>Bookings</span>
            <span className="admin-nav-count">16</span>
          </button>

          {/* SERVICES */}

          <button
            type="button"
            className="admin-nav-item"
            onClick={() =>
              handleMenuClick("/admin-services")
            }
          >
            <BriefcaseBusiness size={18} />
            <span>Services</span>
          </button>

          {/* INTERVIEWS */}

          <button
            type="button"
            className="admin-nav-item"
            onClick={() =>
              handleMenuClick("/admin-interviews")
            }
          >
            <Video size={18} />
            <span>Interviews</span>
          </button>

          {/* PAYMENTS */}

          <button
            type="button"
            className="admin-nav-item"
            onClick={() =>
              handleMenuClick("/admin-payments")
            }
          >
            <CreditCard size={19} />
            <span>Payments</span>
          </button>

          {/* REPORTS */}

          <button
            type="button"
            className="admin-nav-item"
            onClick={() =>
              handleMenuClick("/admin-reports")
            }
          >
            <FileText size={18} />
            <span>Reports</span>
          </button>

          {/* NOTIFICATIONS */}

          <button
            type="button"
            className="admin-nav-item"
            onClick={() =>
              handleMenuClick("/admin-notifications")
            }
          >
            <Bell size={18} />
            <span>Notifications</span>
          </button>

          {/* SETTINGS */}

          <button
            type="button"
            className="admin-nav-item"
            onClick={() =>
              handleMenuClick("/admin-settings")
            }
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>
        </nav>

        {/* =========================================
            LOGOUT
        ========================================= */}

        <div className="admin-sidebar-bottom">
          <button
            type="button"
            className="admin-logout-button"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* =========================================
          MAIN CONTENT
      ========================================= */}

      <section className="admin-main">
        {/* =========================================
            HEADER
        ========================================= */}

        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              type="button"
              className="admin-menu-button"
              onClick={toggleSidebar}
              aria-label="Toggle navigation menu"
            >
              <Menu size={22} />
            </button>

            <div>
              <span className="admin-topbar-label">
                POOJAMITRA ADMIN
              </span>

              <h1>Dashboard</h1>
            </div>
          </div>

          <div className="admin-topbar-right">
            {/* NOTIFICATION */}

            <button
              type="button"
              className="admin-notification-button"
              aria-label="Notifications"
              onClick={() =>
                handleMenuClick(
                  "/admin-notifications"
                )
              }
            >
              <Bell size={19} />
              <span />
            </button>

            {/* PROFILE */}

            <button
              type="button"
              className="admin-profile"
              onClick={() =>
                handleMenuClick("/admin-settings")
              }
            >
              <div className="admin-profile-avatar">
                A
              </div>

              <div className="admin-profile-info">
                <strong>Administrator</strong>
                <small>Super Admin</small>
              </div>
            </button>
          </div>
        </header>

        {/* =========================================
            CONTENT
        ========================================= */}

        <div className="admin-content">
          {/* WELCOME */}

          <section className="admin-welcome">
            <div>
              <span className="admin-section-label">
                OVERVIEW
              </span>

              <h2>
                Welcome to PoojaMitra Admin
              </h2>

              <p>
                Manage priests, bookings, services and
                platform operations from one place.
              </p>
            </div>

            <div className="admin-welcome-icon">
              <LayoutDashboard size={27} />
            </div>
          </section>

          {/* =========================================
              STAT CARDS
          ========================================= */}

          <section className="admin-stats-grid">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <button
                  type="button"
                  className={`admin-stat-card ${stat.type}`}
                  key={stat.title}
                  onClick={() =>
                    handleStatClick(stat.type)
                  }
                  aria-label={`Open ${stat.title}`}
                >
                  <div className="admin-stat-top">
                    <div className="admin-stat-icon">
                      <Icon size={20} />
                    </div>

                    {stat.type === "pending" && (
                      <span className="admin-stat-alert">
                        Action
                      </span>
                    )}
                  </div>

                  <div className="admin-stat-value">
                    {stat.value}
                  </div>

                  <h3>{stat.title}</h3>

                  <p>{stat.description}</p>

                  <span className="admin-stat-link">
                    View details
                    <ChevronRight size={14} />
                  </span>
                </button>
              );
            })}
          </section>

          {/* =========================================
              MAIN GRID
          ========================================= */}

          <section className="admin-dashboard-grid">
            {/* RECENT APPLICATIONS */}

            <div className="admin-panel-card applications-panel">
              <div className="admin-panel-header">
                <div>
                  <span className="admin-panel-small-label">
                    PRIEST VERIFICATION
                  </span>

                  <h2>Recent Applications</h2>
                </div>

                <button
                  type="button"
                  className="admin-view-all"
                  onClick={() =>
                    handleMenuClick(
                      "/admin-priest-applications"
                    )
                  }
                >
                  <span>View All</span>
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className="admin-applications-list">
                {recentApplications.map(
                  (application) => (
                    <button
                      type="button"
                      className="admin-application-row"
                      key={application.id}
                      onClick={() =>
                        handleMenuClick(
                          "/admin-priest-applications"
                        )
                      }
                    >
                      <div className="admin-application-avatar">
                        {application.name.charAt(0)}
                      </div>

                      <div className="admin-application-info">
                        <strong>
                          {application.name}
                        </strong>

                        <span>
                          {application.specialization}
                        </span>

                        <small>
                          {application.id} •{" "}
                          {application.submitted}
                        </small>
                      </div>

                      <div className="admin-application-status">
                        <span
                          className={`status-badge ${getStatusClass(
                            application.status
                          )}`}
                        >
                          {application.status}
                        </span>
                      </div>

                      <span className="admin-row-action">
                        <ChevronRight size={17} />
                      </span>
                    </button>
                  )
                )}
              </div>
            </div>

            {/* RIGHT COLUMN */}

            <div className="admin-right-column">
              {/* =========================================
                  INTERVIEW CARD
              ========================================= */}

              <div className="admin-panel-card">
                <div className="admin-panel-header compact">
                  <div>
                    <span className="admin-panel-small-label">
                      TODAY
                    </span>

                    <h2>Interview Schedule</h2>
                  </div>

                  <Video size={19} />
                </div>

                <div className="admin-interview-card">
                  <div className="admin-interview-time">
                    <Clock3 size={18} />
                    <strong>10:30 AM</strong>
                  </div>

                  <div>
                    <strong>
                      Priest Verification Interview
                    </strong>

                    <span>
                      1 interview scheduled today
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="admin-outline-button"
                  onClick={() =>
                    handleMenuClick(
                      "/admin-interviews"
                    )
                  }
                >
                  View Interviews
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* =========================================
                  QUICK ACTIONS
              ========================================= */}

              <div className="admin-panel-card">
                <div className="admin-panel-header compact">
                  <div>
                    <span className="admin-panel-small-label">
                      QUICK ACTIONS
                    </span>

                    <h2>Needs Attention</h2>
                  </div>

                  <AlertCircle size={19} />
                </div>

                <div className="admin-quick-list">
                  {/* APPLICATIONS */}

                  <button
                    type="button"
                    onClick={() =>
                      handleMenuClick(
                        "/admin-priest-applications"
                      )
                    }
                  >
                    <div>
                      <UserCheck size={17} />
                    </div>

                    <span>
                      Review 12 priest applications
                    </span>

                    <ChevronRight size={16} />
                  </button>

                  {/* INTERVIEWS */}

                  <button
                    type="button"
                    onClick={() =>
                      handleMenuClick(
                        "/admin-interviews"
                      )
                    }
                  >
                    <div>
                      <Video size={17} />
                    </div>

                    <span>
                      Check scheduled interviews
                    </span>

                    <ChevronRight size={16} />
                  </button>

                  {/* APPROVED PRIESTS */}

                  <button
                    type="button"
                    onClick={() =>
                      handleMenuClick(
                        "/admin-approved-priests"
                      )
                    }
                  >
                    <div>
                      <UserCheck size={17} />
                    </div>

                    <span>
                      Manage approved priests
                    </span>

                    <ChevronRight size={16} />
                  </button>

                  {/* PENDING BOOKINGS */}

                  <button
                    type="button"
                    onClick={() =>
                      handleMenuClick(
                        "/admin-bookings"
                      )
                    }
                  >
                    <div>
                      <CalendarDays size={17} />
                    </div>

                    <span>
                      Check 16 pending bookings
                    </span>

                    <ChevronRight size={16} />
                  </button>

                  {/* PAYMENTS */}

                  <button
                    type="button"
                    onClick={() =>
                      handleMenuClick(
                        "/admin-payments"
                      )
                    }
                  >
                    <div>
                      <CreditCard size={17} />
                    </div>

                    <span>
                      Review payment transactions
                    </span>

                    <ChevronRight size={16} />
                  </button>

                  {/* SERVICES */}

                  <button
                    type="button"
                    onClick={() =>
                      handleMenuClick(
                        "/admin-services"
                      )
                    }
                  >
                    <div>
                      <BriefcaseBusiness size={17} />
                    </div>

                    <span>
                      Manage platform services
                    </span>

                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================
              PLATFORM SUMMARY
          ========================================= */}

          <section className="admin-panel-card admin-summary-panel">
            <div className="admin-panel-header">
              <div>
                <span className="admin-panel-small-label">
                  PLATFORM
                </span>

                <h2>Quick Summary</h2>
              </div>
            </div>

            <div className="admin-summary-grid">
              {/* CUSTOMERS */}

              <button
                type="button"
                className="admin-summary-item"
                onClick={() =>
                  handleMenuClick(
                    "/admin-customers"
                  )
                }
              >
                <Users size={18} />

                <div>
                  <strong>1,248</strong>
                  <span>Total Customers</span>
                </div>
              </button>

              {/* REVENUE */}

              <button
                type="button"
                className="admin-summary-item"
                onClick={() =>
                  handleMenuClick(
                    "/admin-payments"
                  )
                }
              >
                <IndianRupee size={18} />

                <div>
                  <strong>₹84,600</strong>
                  <span>Monthly Revenue</span>
                </div>
              </button>

              {/* SERVICES */}

              <button
                type="button"
                className="admin-summary-item"
                onClick={() =>
                  handleMenuClick(
                    "/admin-services"
                  )
                }
              >
                <BriefcaseBusiness size={18} />

                <div>
                  <strong>44</strong>
                  <span>Active Services</span>
                </div>
              </button>

              {/* COMPLETION */}

              <button
                type="button"
                className="admin-summary-item"
                onClick={() =>
                  handleMenuClick(
                    "/admin-reports"
                  )
                }
              >
                <CheckCircle2 size={18} />

                <div>
                  <strong>92%</strong>
                  <span>Completion Rate</span>
                </div>
              </button>
            </div>
          </section>

          {/* =========================================
              FOOTER
          ========================================= */}

          <footer className="admin-dashboard-footer">
            <span>PoojaMitra Admin Portal</span>

            <span>•</span>

            <span>Platform Management</span>
          </footer>
        </div>
      </section>
    </main>
  );
}

export default AdminDashboard;