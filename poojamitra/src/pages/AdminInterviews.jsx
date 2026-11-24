import { useMemo, useState } from "react";

import {
  ArrowLeft,
  Search,
  Filter,
  CalendarDays,
  Clock3,
  UserRound,
  Video,
  Eye,
  CheckCircle2,
  XCircle,
  AlertCircle,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  BriefcaseBusiness,
  Users,
  FileText,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import "../styles/adminInterviews.css";

function AdminInterviews() {
  const navigate = useNavigate();

  // =========================================
  // SEARCH / FILTER
  // =========================================

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // =========================================
  // TEMPORARY FRONTEND DATA
  // Later this will come from FastAPI + DB
  // =========================================

  const interviews = [
    {
      id: "INT-1001",
      applicationId: "PM-PRI-1002",
      priestName: "Suresh Sharma",
      phone: "+91 9123456780",
      specialization: "Marriage Ceremonies",
      date: "06 Oct 2026",
      time: "11:00 AM",
      status: "Scheduled",
      mode: "Video Interview",
    },
    {
      id: "INT-1002",
      applicationId: "PM-PRI-1007",
      priestName: "Ramesh Acharya",
      phone: "+91 9012345678",
      specialization: "Vedic Pooja",
      date: "07 Oct 2026",
      time: "02:00 PM",
      status: "Scheduled",
      mode: "Video Interview",
    },
    {
      id: "INT-1003",
      applicationId: "PM-PRI-1008",
      priestName: "Venkat Rao",
      phone: "+91 9876543211",
      specialization: "Griha Pravesh",
      date: "04 Oct 2026",
      time: "10:00 AM",
      status: "Completed",
      mode: "Video Interview",
      result: "Passed",
    },
    {
      id: "INT-1004",
      applicationId: "PM-PRI-1009",
      priestName: "Mahesh Sharma",
      phone: "+91 9988776651",
      specialization: "Homam",
      date: "03 Oct 2026",
      time: "04:00 PM",
      status: "Completed",
      mode: "Video Interview",
      result: "Additional Information",
    },
    {
      id: "INT-1005",
      applicationId: "PM-PRI-1010",
      priestName: "Prakash Swamy",
      phone: "+91 9345678910",
      specialization: "Child Ceremonies",
      date: "02 Oct 2026",
      time: "12:00 PM",
      status: "Completed",
      mode: "Video Interview",
      result: "Failed",
    },
    {
      id: "INT-1006",
      applicationId: "PM-PRI-1011",
      priestName: "Anand Kumar",
      phone: "+91 9012345670",
      specialization: "Satyanarayana Pooja",
      date: "08 Oct 2026",
      time: "03:30 PM",
      status: "Scheduled",
      mode: "Video Interview",
    },
  ];

  // =========================================
  // FILTER
  // =========================================

  const filteredInterviews = useMemo(() => {
    return interviews.filter((interview) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        interview.priestName
          .toLowerCase()
          .includes(searchText) ||
        interview.applicationId
          .toLowerCase()
          .includes(searchText) ||
        interview.id
          .toLowerCase()
          .includes(searchText) ||
        interview.specialization
          .toLowerCase()
          .includes(searchText) ||
        interview.phone.includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        interview.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  // =========================================
  // STATISTICS
  // =========================================

  const scheduledCount = interviews.filter(
    (item) => item.status === "Scheduled"
  ).length;

  const completedCount = interviews.filter(
    (item) => item.status === "Completed"
  ).length;

  const passedCount = interviews.filter(
    (item) => item.result === "Passed"
  ).length;

  const failedCount = interviews.filter(
    (item) => item.result === "Failed"
  ).length;

  // =========================================
  // RESULT CLASS
  // =========================================

  const getResultClass = (result) => {
    if (result === "Passed") {
      return "result-passed";
    }

    if (result === "Failed") {
      return "result-failed";
    }

    return "result-additional";
  };

  // =========================================
  // VIEW / MANAGE INTERVIEW
  // =========================================

  const handleView = (interview) => {
    navigate("/admin-interview-details", {
      state: {
        interview,
      },
    });
  };

  // =========================================
  // NAVIGATION
  // =========================================

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  // =========================================
  // RENDER
  // =========================================

  return (
    <div className="admin-interviews-page">

      {/* =========================================
          SIDEBAR
      ========================================= */}

      <aside className="admin-interviews-sidebar">

        {/* BRAND */}

        <div className="admin-interviews-brand">
          <h2>PoojaMitra</h2>
          <span>Admin Panel</span>
        </div>

        {/* NAVIGATION */}

        <nav className="admin-interviews-navigation">

          {/* DASHBOARD */}

          <button
            type="button"
            className="admin-interviews-nav-item"
            onClick={() =>
              handleNavigation("/admin-dashboard")
            }
          >
            <BriefcaseBusiness size={19} />
            <span>Dashboard</span>
          </button>

          {/* PRIEST APPLICATIONS */}

          <button
            type="button"
            className="admin-interviews-nav-item"
            onClick={() =>
              handleNavigation(
                "/admin-priest-applications"
              )
            }
          >
            <UserRound size={19} />
            <span>Priest Applications</span>
          </button>

          {/* APPROVED PRIESTS */}

          <button
            type="button"
            className="admin-interviews-nav-item"
            onClick={() =>
              handleNavigation(
                "/admin-approved-priests"
              )
            }
          >
            <UserRound size={19} />
            <span>Approved Priests</span>
          </button>

          {/* CUSTOMERS */}

          <button
            type="button"
            className="admin-interviews-nav-item"
            onClick={() =>
              handleNavigation("/admin-customers")
            }
          >
            <Users size={19} />
            <span>Customers</span>
          </button>

          {/* BOOKINGS */}

          <button
            type="button"
            className="admin-interviews-nav-item"
            onClick={() =>
              handleNavigation("/admin-bookings")
            }
          >
            <CalendarDays size={19} />
            <span>Bookings</span>
          </button>

          {/* SERVICES */}

          <button
            type="button"
            className="admin-interviews-nav-item"
            onClick={() =>
              handleNavigation("/admin-services")
            }
          >
            <FileText size={19} />
            <span>Services</span>
          </button>

          {/* INTERVIEWS */}

          <button
            type="button"
            className="admin-interviews-nav-item active"
            onClick={() =>
              handleNavigation("/admin-interviews")
            }
          >
            <Video size={19} />
            <span>Interviews</span>
          </button>

          {/* PAYMENTS */}

          <button
            type="button"
            className="admin-interviews-nav-item"
            onClick={() =>
              handleNavigation("/admin-payments")
            }
          >
            <CreditCard size={19} />
            <span>Payments</span>
          </button>

          {/* REPORTS */}

          <button
            type="button"
            className="admin-interviews-nav-item"
            onClick={() =>
              handleNavigation("/admin-reports")
            }
          >
            <FileText size={19} />
            <span>Reports</span>
          </button>

          {/* NOTIFICATIONS */}

          <button
            type="button"
            className="admin-interviews-nav-item"
            onClick={() =>
              handleNavigation(
                "/admin-notifications"
              )
            }
          >
            <Bell size={19} />
            <span>Notifications</span>
          </button>

          {/* SETTINGS */}

          <button
            type="button"
            className="admin-interviews-nav-item"
            onClick={() =>
              handleNavigation("/admin-settings")
            }
          >
            <Settings size={19} />
            <span>Settings</span>
          </button>

        </nav>

        {/* LOGOUT */}

        <button
          type="button"
          className="admin-interviews-logout"
          onClick={handleLogout}
        >
          <LogOut size={19} />
          <span>Logout</span>
        </button>

      </aside>

      {/* =========================================
          MAIN
      ========================================= */}

      <main className="admin-interviews-main">

        {/* HEADER */}

        <header className="admin-interviews-header">

          <div className="admin-interviews-header-left">

            <button
              type="button"
              className="admin-interviews-back"
              onClick={() =>
                navigate("/admin-dashboard")
              }
              aria-label="Back to admin dashboard"
            >
              <ArrowLeft size={20} />
            </button>

            <div>
              <h1>Interviews</h1>

              <p>
                Manage priest interviews and
                verification results
              </p>
            </div>

          </div>

        </header>

        {/* =========================================
            STATISTICS
        ========================================= */}

        <section className="interview-stats">

          <div className="interview-stat-card">

            <div className="interview-stat-icon scheduled">
              <CalendarDays size={20} />
            </div>

            <div>
              <span>Scheduled</span>
              <strong>{scheduledCount}</strong>
            </div>

          </div>

          <div className="interview-stat-card">

            <div className="interview-stat-icon completed">
              <CheckCircle2 size={20} />
            </div>

            <div>
              <span>Completed</span>
              <strong>{completedCount}</strong>
            </div>

          </div>

          <div className="interview-stat-card">

            <div className="interview-stat-icon passed">
              <CheckCircle2 size={20} />
            </div>

            <div>
              <span>Passed</span>
              <strong>{passedCount}</strong>
            </div>

          </div>

          <div className="interview-stat-card">

            <div className="interview-stat-icon pending">
              <Clock3 size={20} />
            </div>

            <div>
              <span>Failed</span>
              <strong>{failedCount}</strong>
            </div>

          </div>

        </section>

        {/* =========================================
            SEARCH / FILTER
        ========================================= */}

        <section className="interview-filters">

          <div className="interview-search">

            <Search size={19} />

            <input
              type="text"
              placeholder="Search priest, application ID or specialization..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
                aria-label="Clear search"
              >
                ×
              </button>
            )}

          </div>

          <div className="interview-status-filter">

            <Filter size={18} />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option value="All">
                All Interviews
              </option>

              <option value="Scheduled">
                Scheduled
              </option>

              <option value="Completed">
                Completed
              </option>
            </select>

          </div>

        </section>

        {/* =========================================
            DESKTOP TABLE
        ========================================= */}

        <section className="interviews-table-wrapper">

          <table className="interviews-table">

            <thead>

              <tr>
                <th>Interview ID</th>
                <th>Priest</th>
                <th>Specialization</th>
                <th>Date & Time</th>
                <th>Mode</th>
                <th>Status / Result</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {filteredInterviews.length > 0 ? (

                filteredInterviews.map(
                  (interview) => (

                    <tr key={interview.id}>

                      {/* INTERVIEW ID */}

                      <td>

                        <span className="interview-id">
                          {interview.id}
                        </span>

                        <small className="application-small-id">
                          {interview.applicationId}
                        </small>

                      </td>

                      {/* PRIEST */}

                      <td>

                        <div className="interview-priest">

                          <div className="interview-avatar">

                            {interview.priestName
                              .split(" ")
                              .map(
                                (word) =>
                                  word[0]
                              )
                              .join("")
                              .substring(0, 2)}

                          </div>

                          <div>

                            <strong>
                              {interview.priestName}
                            </strong>

                            <small>
                              {interview.phone}
                            </small>

                          </div>

                        </div>

                      </td>

                      {/* SPECIALIZATION */}

                      <td>

                        <span className="interview-specialization">
                          {interview.specialization}
                        </span>

                      </td>

                      {/* DATE / TIME */}

                      <td>

                        <div className="interview-date">

                          <span>
                            <CalendarDays size={14} />
                            {interview.date}
                          </span>

                          <span>
                            <Clock3 size={14} />
                            {interview.time}
                          </span>

                        </div>

                      </td>

                      {/* MODE */}

                      <td>

                        <span className="interview-mode">
                          <Video size={14} />
                          {interview.mode}
                        </span>

                      </td>

                      {/* STATUS */}

                      <td>

                        {interview.status ===
                        "Scheduled" ? (

                          <span className="interview-scheduled-status">
                            <Clock3 size={13} />
                            Scheduled
                          </span>

                        ) : (

                          <span
                            className={`interview-result ${getResultClass(
                              interview.result
                            )}`}
                          >

                            {interview.result ===
                              "Passed" && (
                              <CheckCircle2 size={13} />
                            )}

                            {interview.result ===
                              "Failed" && (
                              <XCircle size={13} />
                            )}

                            {interview.result ===
                              "Additional Information" && (
                              <AlertCircle size={13} />
                            )}

                            {interview.result}

                          </span>

                        )}

                      </td>

                      {/* ACTION */}

                      <td>

                        <button
                          type="button"
                          className="interview-view-button"
                          onClick={() =>
                            handleView(interview)
                          }
                        >
                          <Eye size={16} />
                          Manage
                        </button>

                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td colSpan="7">

                    <div className="interviews-empty">

                      <div className="empty-interview-icon">
                        <Video size={28} />
                      </div>

                      <h3>
                        No interviews found
                      </h3>

                      <p>
                        Try changing your
                        search or filter.
                      </p>

                    </div>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </section>

        {/* =========================================
            MOBILE CARDS
        ========================================= */}

        <section className="mobile-interviews">

          {filteredInterviews.length > 0 ? (

            filteredInterviews.map(
              (interview) => (

                <div
                  className="mobile-interview-card"
                  key={interview.id}
                >

                  <div className="mobile-interview-top">

                    <div className="interview-priest">

                      <div className="interview-avatar">

                        {interview.priestName
                          .split(" ")
                          .map(
                            (word) =>
                              word[0]
                          )
                          .join("")
                          .substring(0, 2)}

                      </div>

                      <div>

                        <strong>
                          {interview.priestName}
                        </strong>

                        <small>
                          {interview.applicationId}
                        </small>

                      </div>

                    </div>

                    <span className="interview-id">
                      {interview.id}
                    </span>

                  </div>

                  <div className="mobile-interview-info">

                    <div>
                      <label>
                        Specialization
                      </label>

                      <span>
                        {interview.specialization}
                      </span>
                    </div>

                    <div>
                      <label>Date</label>

                      <span>
                        {interview.date}
                      </span>
                    </div>

                    <div>
                      <label>Time</label>

                      <span>
                        {interview.time}
                      </span>
                    </div>

                    <div>
                      <label>Mode</label>

                      <span>
                        {interview.mode}
                      </span>
                    </div>

                  </div>

                  <div className="mobile-interview-status">

                    {interview.status ===
                    "Scheduled" ? (

                      <span className="interview-scheduled-status">
                        <Clock3 size={13} />
                        Scheduled
                      </span>

                    ) : (

                      <span
                        className={`interview-result ${getResultClass(
                          interview.result
                        )}`}
                      >
                        {interview.result}
                      </span>

                    )}

                  </div>

                  <button
                    type="button"
                    className="mobile-manage-button"
                    onClick={() =>
                      handleView(interview)
                    }
                  >
                    <Eye size={16} />
                    Manage Interview
                  </button>

                </div>

              )
            )

          ) : (

            <div className="interviews-empty">

              <div className="empty-interview-icon">
                <Video size={28} />
              </div>

              <h3>
                No interviews found
              </h3>

              <p>
                Try changing your search
                or filter.
              </p>

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default AdminInterviews;