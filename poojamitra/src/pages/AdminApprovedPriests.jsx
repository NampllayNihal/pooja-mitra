import { useMemo, useState } from "react";

import {
  LayoutDashboard,
  Users,
  UserCheck,
  UserRound,
  CalendarDays,
  BriefcaseBusiness,
  Video,
  CreditCard,
  FileText,
  Bell,
  Settings,
  LogOut,
  Search,
  Filter,
  Eye,
  MapPin,
  Phone,
  Mail,
  Award,
  X,
  Menu,
  ArrowLeft,
  Power,
  FileCheck,
  MessageCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import "../styles/adminApprovedPriests.css";

function AdminApprovedPriests() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedPriest, setSelectedPriest] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [priests, setPriests] = useState([
    {
      id: "PM-PRI-1001",
      name: "Ravi Kumar",
      phone: "+91 9876543210",
      email: "ravikumar@example.com",
      priestType: "Vedic Priest",
      specialization: "Vedic Pooja",
      experience: "8 Years",
      location: "Kukatpally, Hyderabad",
      services:
        "Vedic Pooja, Homam, Griha Pravesh",
      languages:
        "Telugu, Hindi, English, Sanskrit",
      approvalDate: "06 Oct 2026",
      status: "Active",
    },
    {
      id: "PM-PRI-1002",
      name: "Suresh Sharma",
      phone: "+91 9988776655",
      email: "sureshsharma@example.com",
      priestType: "Temple Priest",
      specialization: "Homam & Rituals",
      experience: "12 Years",
      location: "Madhapur, Hyderabad",
      services:
        "Homam, Satyanarayana Pooja",
      languages:
        "Telugu, Hindi, Sanskrit",
      approvalDate: "05 Oct 2026",
      status: "Active",
    },
    {
      id: "PM-PRI-1003",
      name: "Venkatesh Rao",
      phone: "+91 9123456789",
      email: "venkateshrao@example.com",
      priestType: "Vedic Priest",
      specialization: "Griha Pravesh",
      experience: "10 Years",
      location: "Secunderabad",
      services:
        "Griha Pravesh, Vastu Pooja",
      languages:
        "Telugu, English, Sanskrit",
      approvalDate: "03 Oct 2026",
      status: "Active",
    },
    {
      id: "PM-PRI-1004",
      name: "Anil Acharya",
      phone: "+91 9012345678",
      email: "anilacharya@example.com",
      priestType: "Purohit",
      specialization: "Marriage Ceremonies",
      experience: "15 Years",
      location: "LB Nagar, Hyderabad",
      services:
        "Marriage, Engagement, Pooja",
      languages:
        "Telugu, Hindi, English",
      approvalDate: "01 Oct 2026",
      status: "Suspended",
    },
  ]);

  const filteredPriests = useMemo(() => {
    const search = searchTerm
      .toLowerCase()
      .trim();

    return priests.filter((priest) => {
      const matchesSearch =
        priest.name
          .toLowerCase()
          .includes(search) ||
        priest.phone
          .toLowerCase()
          .includes(search) ||
        priest.id
          .toLowerCase()
          .includes(search) ||
        priest.specialization
          .toLowerCase()
          .includes(search) ||
        priest.location
          .toLowerCase()
          .includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        priest.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [priests, searchTerm, statusFilter]);

  const activePriests = priests.filter(
    (priest) => priest.status === "Active"
  ).length;

  const suspendedPriests = priests.filter(
    (priest) => priest.status === "Suspended"
  ).length;

  const handleNavigation = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const handleToggleStatus = (priest) => {
    const nextStatus =
      priest.status === "Active"
        ? "Suspended"
        : "Active";

    setPriests((previous) =>
      previous.map((item) =>
        item.id === priest.id
          ? {
              ...item,
              status: nextStatus,
            }
          : item
      )
    );

    setSelectedPriest((previous) =>
      previous && previous.id === priest.id
        ? {
            ...previous,
            status: nextStatus,
          }
        : previous
    );
  };

  const handleViewApplication = (priest) => {
    setSelectedPriest(null);

    navigate(
      "/admin-priest-application-details",
      {
        state: {
          application: {
            id: priest.id,
            name: priest.name,
            phone: priest.phone,
            email: priest.email,
            specialization:
              priest.specialization,
            status: "Approved",
          },
        },
      }
    );
  };

  const handleViewInterview = (priest) => {
    setSelectedPriest(null);

    navigate(
      "/admin-interview-details",
      {
        state: {
          interview: {
            id: `INT-${priest.id.replace(
              "PM-PRI-",
              ""
            )}`,
            applicationId: priest.id,
            priestName: priest.name,
            phone: priest.phone,
            email: priest.email,
            specialization:
              priest.specialization,
            date: priest.approvalDate,
            time: "11:00 AM",
            mode: "Video Interview",
            status: "Completed",
            result: "Passed",
            location: priest.location,
            experience: priest.experience,
            priestType: priest.priestType,
          },
        },
      }
    );
  };

  return (
    <div className="admin-approved-page">

      {/* MOBILE HEADER */}
      <header className="approved-mobile-header">

        <button
          type="button"
          className="approved-mobile-menu-btn"
          onClick={() =>
            setMobileMenuOpen(true)
          }
          aria-label="Open admin menu"
        >
          <Menu size={22} />
        </button>

        <div className="approved-mobile-brand">
          <strong>PoojaMitra</strong>
          <span>Admin Panel</span>
        </div>

        <button
          type="button"
          className="approved-mobile-back-btn"
          onClick={() =>
            navigate("/admin-dashboard")
          }
          aria-label="Back to dashboard"
        >
          <ArrowLeft size={20} />
        </button>

      </header>

      {/* MOBILE OVERLAY */}
      {mobileMenuOpen && (
        <button
          type="button"
          className="approved-mobile-overlay"
          onClick={() =>
            setMobileMenuOpen(false)
          }
          aria-label="Close admin menu"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`admin-approved-sidebar ${
          mobileMenuOpen
            ? "admin-approved-sidebar-open"
            : ""
        }`}
      >

        <div className="admin-approved-brand">
          <span>PoojaMitra</span>
          <small>Admin Panel</small>
        </div>

        <nav className="admin-approved-nav">

          <button
            type="button"
            className="admin-approved-nav-item"
            onClick={() =>
              handleNavigation(
                "/admin-dashboard"
              )
            }
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            className="admin-approved-nav-item"
            onClick={() =>
              handleNavigation(
                "/admin-priest-applications"
              )
            }
          >
            <UserCheck size={18} />
            <span>Priest Applications</span>
          </button>

          <button
            type="button"
            className="admin-approved-nav-item active"
          >
            <UserCheck size={18} />
            <span>Approved Priests</span>
          </button>

          <button
            type="button"
            className="admin-approved-nav-item"
            onClick={() =>
              handleNavigation(
                "/admin-customers"
              )
            }
          >
            <UserRound size={18} />
            <span>Customers</span>
          </button>

          <button
            type="button"
            className="admin-approved-nav-item"
            onClick={() =>
              handleNavigation(
                "/admin-bookings"
              )
            }
          >
            <CalendarDays size={18} />
            <span>Bookings</span>
          </button>

          <button
            type="button"
            className="admin-approved-nav-item"
            onClick={() =>
              handleNavigation(
                "/admin-services"
              )
            }
          >
            <BriefcaseBusiness size={18} />
            <span>Services</span>
          </button>

          <button
            type="button"
            className="admin-approved-nav-item"
            onClick={() =>
              handleNavigation(
                "/admin-interviews"
              )
            }
          >
            <Video size={18} />
            <span>Interviews</span>
          </button>

          <button
            type="button"
            className="admin-approved-nav-item"
            onClick={() =>
              handleNavigation(
                "/admin-payments"
              )
            }
          >
            <CreditCard size={18} />
            <span>Payments</span>
          </button>

          <button
            type="button"
            className="admin-approved-nav-item"
            onClick={() =>
              handleNavigation(
                "/admin-reports"
              )
            }
          >
            <FileText size={18} />
            <span>Reports</span>
          </button>

          <button
            type="button"
            className="admin-approved-nav-item"
            onClick={() =>
              handleNavigation(
                "/admin-notifications"
              )
            }
          >
            <Bell size={18} />
            <span>Notifications</span>
          </button>

          <button
            type="button"
            className="admin-approved-nav-item"
            onClick={() =>
              handleNavigation(
                "/admin-settings"
              )
            }
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>

        </nav>

        <button
          type="button"
          className="admin-approved-logout"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>

      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-approved-main">

        {/* PAGE HEADER */}
        <header className="admin-approved-header">

          <div>
            <span className="approved-page-label">
              PRIEST MANAGEMENT
            </span>

            <h1>Approved Priests</h1>

            <p>
              Manage priests who have successfully
              completed verification.
            </p>
          </div>

          <div className="admin-approved-header-count">
            <UserCheck size={20} />
            <span>
              {priests.length} Priests
            </span>
          </div>

        </header>

        {/* STATISTICS */}
        <section className="admin-approved-stats">

          <div className="admin-approved-stat-card">
            <div className="admin-approved-stat-icon">
              <UserCheck size={22} />
            </div>

            <div>
              <span>Total Approved</span>
              <strong>{priests.length}</strong>
            </div>
          </div>

          <div className="admin-approved-stat-card">
            <div className="admin-approved-stat-icon active-icon">
              <Award size={22} />
            </div>

            <div>
              <span>Active Priests</span>
              <strong>{activePriests}</strong>
            </div>
          </div>

          <div className="admin-approved-stat-card">
            <div className="admin-approved-stat-icon suspended-icon">
              <X size={22} />
            </div>

            <div>
              <span>Suspended</span>
              <strong>{suspendedPriests}</strong>
            </div>
          </div>

        </section>

        {/* SEARCH */}
        <section className="admin-approved-filter-card">

          <div className="admin-approved-search">
            <Search size={19} />

            <input
              type="text"
              placeholder="Search by name, ID, phone or specialization..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value
                )
              }
            />
          </div>

          <div className="admin-approved-status-filter">
            <Filter size={18} />

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value
                )
              }
            >
              <option value="All">
                All Status
              </option>
              <option value="Active">
                Active
              </option>
              <option value="Suspended">
                Suspended
              </option>
            </select>
          </div>

        </section>

        {/* PRIEST DIRECTORY */}
        <section className="admin-approved-list-card">

          <div className="admin-approved-list-header">

            <div>
              <span>VERIFIED PRIESTS</span>

              <h2>Priest Directory</h2>

              <p>
                {filteredPriests.length} priest
                {filteredPriests.length !== 1
                  ? "s"
                  : ""}{" "}
                found
              </p>
            </div>

          </div>

          {/* DESKTOP TABLE */}
          <div className="admin-approved-table-wrapper">

            <table className="admin-approved-table">

              <thead>
                <tr>
                  <th>Priest</th>
                  <th>Type</th>
                  <th>Specialization</th>
                  <th>Experience</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th className="action-column">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>

                {filteredPriests.length > 0 ? (
                  filteredPriests.map(
                    (priest) => (
                      <tr key={priest.id}>

                        <td>
                          <div className="admin-priest-name-cell">

                            <div className="admin-priest-avatar">
                              {priest.name.charAt(
                                0
                              )}
                            </div>

                            <div>
                              <strong>
                                {priest.name}
                              </strong>

                              <small>
                                {priest.id}
                              </small>
                            </div>

                          </div>
                        </td>

                        <td>
                          {priest.priestType}
                        </td>

                        <td>
                          <span className="specialization-badge">
                            {priest.specialization}
                          </span>
                        </td>

                        <td>
                          {priest.experience}
                        </td>

                        <td>
                          <div className="location-cell">
                            <MapPin size={15} />
                            <span>
                              {priest.location}
                            </span>
                          </div>
                        </td>

                        <td>
                          <span
                            className={`priest-status ${
                              priest.status ===
                              "Active"
                                ? "status-active"
                                : "status-suspended"
                            }`}
                          >
                            {priest.status}
                          </span>
                        </td>

                        <td className="action-column">

                          <button
                            type="button"
                            className="view-priest-btn"
                            onClick={() =>
                              setSelectedPriest(
                                priest
                              )
                            }
                          >
                            <Eye size={16} />
                            View
                          </button>

                        </td>

                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan="7">

                      <div className="admin-approved-empty">
                        <Users size={40} />

                        <h3>
                          No priests found
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

          </div>

          {/* MOBILE CARDS */}
          <div className="admin-approved-mobile-list">

            {filteredPriests.length > 0 ? (
              filteredPriests.map((priest) => (
                <div
                  className="approved-priest-mobile-card"
                  key={priest.id}
                >

                  <div className="mobile-priest-top">

                    <div className="admin-priest-name-cell">

                      <div className="admin-priest-avatar">
                        {priest.name.charAt(0)}
                      </div>

                      <div>
                        <strong>
                          {priest.name}
                        </strong>

                        <small>
                          {priest.id}
                        </small>
                      </div>

                    </div>

                    <span
                      className={`priest-status ${
                        priest.status === "Active"
                          ? "status-active"
                          : "status-suspended"
                      }`}
                    >
                      {priest.status}
                    </span>

                  </div>

                  <div className="mobile-priest-details">

                    <div>
                      <span>Type</span>
                      <strong>
                        {priest.priestType}
                      </strong>
                    </div>

                    <div>
                      <span>Specialization</span>
                      <strong>
                        {priest.specialization}
                      </strong>
                    </div>

                    <div>
                      <span>Experience</span>
                      <strong>
                        {priest.experience}
                      </strong>
                    </div>

                    <div>
                      <span>Location</span>
                      <strong>
                        {priest.location}
                      </strong>
                    </div>

                  </div>

                  <button
                    type="button"
                    className="view-priest-btn mobile-view-btn"
                    onClick={() =>
                      setSelectedPriest(priest)
                    }
                  >
                    <Eye size={16} />
                    View Priest
                  </button>

                </div>
              ))
            ) : (
              <div className="mobile-empty-state">

                <Users size={38} />

                <h3>No priests found</h3>

                <p>
                  Try changing your search or filter.
                </p>

              </div>
            )}

          </div>

        </section>

      </main>

      {/* PRIEST DETAILS MODAL */}
      {selectedPriest && (
        <div
          className="approved-priest-modal-overlay"
          onClick={() =>
            setSelectedPriest(null)
          }
        >

          <div
            className="approved-priest-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="approved-priest-modal-header">

              <div>
                <h2>
                  {selectedPriest.name}
                </h2>

                <p>
                  {selectedPriest.id}
                </p>
              </div>

              <button
                type="button"
                className="modal-close-btn"
                onClick={() =>
                  setSelectedPriest(null)
                }
              >
                <X size={20} />
              </button>

            </div>

            <div className="approved-priest-modal-body">

              <div className="modal-priest-profile">

                <div className="large-priest-avatar">
                  {selectedPriest.name.charAt(0)}
                </div>

                <div>

                  <h3>
                    {selectedPriest.name}
                  </h3>

                  <span
                    className={`priest-status ${
                      selectedPriest.status ===
                      "Active"
                        ? "status-active"
                        : "status-suspended"
                    }`}
                  >
                    {selectedPriest.status}
                  </span>

                </div>

              </div>

              <div className="modal-detail-grid">

                <div className="modal-detail-item">
                  <span>Priest Type</span>
                  <strong>
                    {selectedPriest.priestType}
                  </strong>
                </div>

                <div className="modal-detail-item">
                  <span>Specialization</span>
                  <strong>
                    {selectedPriest.specialization}
                  </strong>
                </div>

                <div className="modal-detail-item">
                  <span>Experience</span>
                  <strong>
                    {selectedPriest.experience}
                  </strong>
                </div>

                <div className="modal-detail-item">
                  <span>Approval Date</span>
                  <strong>
                    {selectedPriest.approvalDate}
                  </strong>
                </div>

                <div className="modal-detail-item">
                  <span>Phone</span>
                  <strong>
                    <Phone size={15} />
                    {selectedPriest.phone}
                  </strong>
                </div>

                <div className="modal-detail-item">
                  <span>Email</span>
                  <strong>
                    <Mail size={15} />
                    {selectedPriest.email}
                  </strong>
                </div>

                <div className="modal-detail-item">
                  <span>Location</span>
                  <strong>
                    <MapPin size={15} />
                    {selectedPriest.location}
                  </strong>
                </div>

                <div className="modal-detail-item">
                  <span>Languages</span>
                  <strong>
                    {selectedPriest.languages}
                  </strong>
                </div>

              </div>

              <div className="modal-services-section">

                <span>Services</span>

                <p>
                  {selectedPriest.services}
                </p>

              </div>

            </div>

            <div className="approved-priest-modal-footer">

              <button
                type="button"
                className="modal-secondary-btn"
                onClick={() =>
                  setSelectedPriest(null)
                }
              >
                Close
              </button>

              <button
                type="button"
                className="modal-secondary-btn"
                onClick={() =>
                  handleViewInterview(
                    selectedPriest
                  )
                }
              >
                <Video size={15} />
                Interview
              </button>

              <button
                type="button"
                className="modal-secondary-btn"
                onClick={() =>
                  handleViewApplication(
                    selectedPriest
                  )
                }
              >
                <FileCheck size={15} />
                Application
              </button>

              <button
                type="button"
                className="modal-primary-btn"
                onClick={() =>
                  handleToggleStatus(
                    selectedPriest
                  )
                }
              >
                <Power size={15} />

                {selectedPriest.status ===
                "Active"
                  ? "Suspend Priest"
                  : "Activate Priest"}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default AdminApprovedPriests;