import { useMemo, useState } from "react";

import {
  ArrowLeft,
  Search,
  Filter,
  Eye,
  CalendarDays,
  UserRound,
  Clock3,
  FileCheck2,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  BriefcaseBusiness,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import "../styles/adminPriestApplications.css";


function AdminPriestApplications() {
  const navigate = useNavigate();

  // =========================================
  // MOBILE SIDEBAR
  // =========================================

  const [menuOpen, setMenuOpen] = useState(false);

  // =========================================
  // SEARCH / FILTER
  // =========================================

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // =========================================
  // TEMPORARY SAMPLE DATA
  // Later this will come from FastAPI + DB
  // =========================================

  const applications = [
    {
      id: "PM-PRI-1001",
      name: "Ravi Kumar",
      phone: "+91 9876543210",
      specialization: "Vedic Pooja",
      submitted: "04 Oct 2026",
      status: "Under Review",
      interview: "Not Scheduled",
    },
    {
      id: "PM-PRI-1002",
      name: "Suresh Sharma",
      phone: "+91 9123456780",
      specialization: "Marriage Ceremonies",
      submitted: "03 Oct 2026",
      status: "Interview Scheduled",
      interview: "Scheduled",
    },
    {
      id: "PM-PRI-1003",
      name: "Anil Rao",
      phone: "+91 9988776655",
      specialization: "Griha Pravesh",
      submitted: "02 Oct 2026",
      status: "Documents Submitted",
      interview: "Not Scheduled",
    },
    {
      id: "PM-PRI-1004",
      name: "Mohan Das",
      phone: "+91 9876123456",
      specialization: "Child Ceremonies",
      submitted: "01 Oct 2026",
      status: "Under Review",
      interview: "Not Scheduled",
    },
    {
      id: "PM-PRI-1005",
      name: "Ramesh Acharya",
      phone: "+91 9012345678",
      specialization: "Satyanarayana Pooja",
      submitted: "30 Sep 2026",
      status: "Approved",
      interview: "Completed",
    },
    {
      id: "PM-PRI-1006",
      name: "Krishna Murthy",
      phone: "+91 9345678901",
      specialization: "Funeral & Last Rites",
      submitted: "29 Sep 2026",
      status: "Rejected",
      interview: "Completed",
    },
  ];

  // =========================================
  // FILTER APPLICATIONS
  // =========================================

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        application.name.toLowerCase().includes(searchText) ||
        application.id.toLowerCase().includes(searchText) ||
        application.specialization
          .toLowerCase()
          .includes(searchText) ||
        application.phone.includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        application.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  // =========================================
  // STATUS CLASS
  // =========================================

  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "status-approved";

      case "Rejected":
        return "status-rejected";

      case "Interview Scheduled":
        return "status-interview";

      case "Documents Submitted":
        return "status-documents";

      case "Under Review":
        return "status-review";

      default:
        return "";
    }
  };

  // =========================================
  // INTERVIEW CLASS
  // =========================================

  const getInterviewClass = (status) => {
    return status === "Scheduled"
      ? "interview-scheduled"
      : status === "Completed"
        ? "interview-completed"
        : "interview-not";
  };

  // =========================================
  // CLOSE MOBILE MENU
  // =========================================

  const closeMobileMenu = () => {
    setMenuOpen(false);
  };

  // =========================================
  // NAVIGATION
  // =========================================

  const handleNavigation = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  // =========================================
  // VIEW APPLICATION
  // =========================================

  const handleViewApplication = (application) => {
    setMenuOpen(false);

    navigate("/admin-priest-application-details", {
      state: {
        application,
      },
    });
  };

  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = () => {
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <div className="admin-applications-page">

      {/* =========================================
          MOBILE OVERLAY
      ========================================= */}

      {menuOpen && (
        <button
          type="button"
          className="admin-mobile-overlay"
          onClick={closeMobileMenu}
          aria-label="Close admin menu"
        />
      )}

      {/* =========================================
          SIDEBAR
      ========================================= */}

      <aside
        className={`admin-sidebar ${
          menuOpen ? "admin-sidebar-open" : ""
        }`}
      >

        {/* BRAND */}

        <div className="admin-brand">

          <div>
            <h2>PoojaMitra</h2>
            <span>Admin Panel</span>
          </div>

          {/* MOBILE CLOSE */}

          <button
            type="button"
            className="admin-mobile-close"
            onClick={closeMobileMenu}
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
            className="admin-nav-item"
            onClick={() =>
              handleNavigation("/admin-dashboard")
            }
          >
            <FileCheck2 size={19} />
            <span>Dashboard</span>
          </button>


          {/* PRIEST APPLICATIONS */}

          <button
            type="button"
            className="admin-nav-item active"
            onClick={() =>
              handleNavigation("/admin-priest-applications")
            }
          >
            <UserRound size={19} />
            <span>Priest Applications</span>
          </button>


          {/* APPROVED PRIESTS */}

          <button
            type="button"
            className="admin-nav-item"
            onClick={() =>
              handleNavigation("/admin-approved-priests")
            }
          >
            <UserRound size={19} />
            <span>Approved Priests</span>
          </button>


          {/* CUSTOMERS */}

          <button
            type="button"
            className="admin-nav-item"
            onClick={() =>
              handleNavigation("/admin-customers")
            }
          >
            <UserRound size={19} />
            <span>Customers</span>
          </button>


          {/* BOOKINGS */}

          <button
            type="button"
            className="admin-nav-item"
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
            className="admin-nav-item"
            onClick={() =>
              handleNavigation("/admin-services")
            }
          >
            <BriefcaseBusiness size={19} />
            <span>Services</span>
          </button>


          {/* INTERVIEWS */}

          <button
            type="button"
            className="admin-nav-item"
            onClick={() =>
              handleNavigation("/admin-interviews")
            }
          >
            <Clock3 size={19} />
            <span>Interviews</span>
          </button>


          {/* PAYMENTS */}

          <button
            type="button"
            className="admin-nav-item"
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
            className="admin-nav-item"
            onClick={() =>
              handleNavigation("/admin-reports")
            }
          >
            <FileCheck2 size={19} />
            <span>Reports</span>
          </button>


          {/* NOTIFICATIONS */}

          <button
            type="button"
            className="admin-nav-item"
            onClick={() =>
              handleNavigation("/admin-notifications")
            }
          >
            <Bell size={19} />
            <span>Notifications</span>
          </button>


          {/* SETTINGS */}

          <button
            type="button"
            className="admin-nav-item"
            onClick={() =>
              handleNavigation("/admin-settings")
            }
          >
            <Settings size={19} />
            <span>Settings</span>
          </button>

        </nav>


        {/* =========================================
            LOGOUT
        ========================================= */}

        <button
          type="button"
          className="admin-logout"
          onClick={handleLogout}
        >
          <LogOut size={19} />
          <span>Logout</span>
        </button>

      </aside>


      {/* =========================================
          MAIN CONTENT
      ========================================= */}

      <main className="admin-main">

        {/* =========================================
            HEADER
        ========================================= */}

        <header className="admin-page-header">

          <div className="admin-header-left">

            {/* MOBILE MENU BUTTON */}

            <button
              type="button"
              className="admin-mobile-menu-button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open admin menu"
            >
              <Menu size={22} />
            </button>


            {/* BACK BUTTON */}

            <button
              type="button"
              className="admin-back-button"
              onClick={() =>
                navigate("/admin-dashboard")
              }
              aria-label="Back to dashboard"
            >
              <ArrowLeft size={20} />
            </button>


            <div>

              <h1>Priest Applications</h1>

              <p>
                Review and manage priest registration
                applications
              </p>

            </div>

          </div>


          {/* APPLICATION COUNT */}

          <div className="application-count">
            {filteredApplications.length} Applications
          </div>

        </header>


        {/* =========================================
            FILTERS
        ========================================= */}

        <section className="application-filters">

          {/* SEARCH */}

          <div className="search-box">

            <Search size={19} />

            <input
              type="text"
              placeholder="Search by name, ID, specialization or phone..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            {search && (
              <button
                type="button"
                className="clear-search"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <X size={17} />
              </button>
            )}

          </div>


          {/* STATUS FILTER */}

          <div className="status-filter">

            <Filter size={18} />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option value="All">
                All Status
              </option>

              <option value="Under Review">
                Under Review
              </option>

              <option value="Documents Submitted">
                Documents Submitted
              </option>

              <option value="Interview Scheduled">
                Interview Scheduled
              </option>

              <option value="Approved">
                Approved
              </option>

              <option value="Rejected">
                Rejected
              </option>
            </select>

          </div>

        </section>


        {/* =========================================
            DESKTOP TABLE
        ========================================= */}

        <section className="applications-table-wrapper">

          <table className="applications-table">

            <thead>

              <tr>
                <th>Application ID</th>
                <th>Priest</th>
                <th>Specialization</th>
                <th>Submitted</th>
                <th>Verification Status</th>
                <th>Interview</th>
                <th>Action</th>
              </tr>

            </thead>


            <tbody>

              {filteredApplications.length > 0 ? (

                filteredApplications.map(
                  (application) => (

                    <tr key={application.id}>

                      {/* APPLICATION ID */}

                      <td>
                        <span className="application-id">
                          {application.id}
                        </span>
                      </td>


                      {/* PRIEST */}

                      <td>

                        <div className="priest-info">

                          <div className="priest-avatar">

                            {application.name
                              .split(" ")
                              .map((word) => word[0])
                              .join("")
                              .substring(0, 2)}

                          </div>

                          <div>

                            <strong>
                              {application.name}
                            </strong>

                            <small>
                              {application.phone}
                            </small>

                          </div>

                        </div>

                      </td>


                      {/* SPECIALIZATION */}

                      <td>

                        <span className="specialization">
                          {application.specialization}
                        </span>

                      </td>


                      {/* SUBMITTED */}

                      <td>

                        <span className="submitted-date">
                          {application.submitted}
                        </span>

                      </td>


                      {/* STATUS */}

                      <td>

                        <span
                          className={`status-badge ${getStatusClass(
                            application.status
                          )}`}
                        >
                          {application.status}
                        </span>

                      </td>


                      {/* INTERVIEW */}

                      <td>

                        <span
                          className={`interview-badge ${getInterviewClass(
                            application.interview
                          )}`}
                        >
                          {application.interview}
                        </span>

                      </td>


                      {/* ACTION */}

                      <td>

                        <button
                          type="button"
                          className="view-application-button"
                          onClick={() =>
                            handleViewApplication(
                              application
                            )
                          }
                        >
                          <Eye size={17} />
                          View
                        </button>

                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td colSpan="7">

                    <div className="no-applications">

                      <div className="no-data-icon">
                        <Search size={28} />
                      </div>

                      <h3>
                        No applications found
                      </h3>

                      <p>
                        Try changing your search
                        or status filter.
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

        <section className="mobile-applications">

          {filteredApplications.length > 0 ? (

            filteredApplications.map(
              (application) => (

                <div
                  className="application-card"
                  key={application.id}
                >

                  <div className="application-card-top">

                    <div className="priest-info">

                      <div className="priest-avatar">

                        {application.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .substring(0, 2)}

                      </div>

                      <div>

                        <strong>
                          {application.name}
                        </strong>

                        <small>
                          {application.phone}
                        </small>

                      </div>

                    </div>


                    <span className="application-id">
                      {application.id}
                    </span>

                  </div>


                  <div className="mobile-info-row">

                    <div>
                      <label>
                        Specialization
                      </label>

                      <span>
                        {application.specialization}
                      </span>
                    </div>


                    <div>
                      <label>
                        Submitted
                      </label>

                      <span>
                        {application.submitted}
                      </span>
                    </div>

                  </div>


                  <div className="mobile-status-row">

                    <span
                      className={`status-badge ${getStatusClass(
                        application.status
                      )}`}
                    >
                      {application.status}
                    </span>


                    <span
                      className={`interview-badge ${getInterviewClass(
                        application.interview
                      )}`}
                    >
                      {application.interview}
                    </span>

                  </div>


                  <button
                    type="button"
                    className="mobile-view-button"
                    onClick={() =>
                      handleViewApplication(
                        application
                      )
                    }
                  >
                    <Eye size={17} />
                    View Application
                  </button>

                </div>

              )
            )

          ) : (

            <div className="no-applications mobile-no-data">

              <div className="no-data-icon">
                <Search size={28} />
              </div>

              <h3>
                No applications found
              </h3>

              <p>
                Try changing your search
                or status filter.
              </p>

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default AdminPriestApplications;