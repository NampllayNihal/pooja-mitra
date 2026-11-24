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
  Phone,
  Mail,
  MapPin,
  Calendar,
  X,
  ShoppingBag,
  ArrowLeft,
  Menu,
  Power,
  MessageCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import "../styles/adminCustomers.css";

function AdminCustomers() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All");

  const [selectedCustomer, setSelectedCustomer] =
    useState(null);

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [customers, setCustomers] = useState([
    {
      id: "PM-CUS-1001",
      name: "Priya Reddy",
      phone: "+91 9876543210",
      email: "priyareddy@example.com",
      location: "Kukatpally, Hyderabad",
      bookings: 8,
      completedBookings: 7,
      registrationDate: "12 Sep 2026",
      status: "Active",
    },
    {
      id: "PM-CUS-1002",
      name: "Rahul Sharma",
      phone: "+91 9988776655",
      email: "rahulsharma@example.com",
      location: "Madhapur, Hyderabad",
      bookings: 5,
      completedBookings: 4,
      registrationDate: "18 Sep 2026",
      status: "Active",
    },
    {
      id: "PM-CUS-1003",
      name: "Lakshmi Devi",
      phone: "+91 9123456789",
      email: "lakshmidevi@example.com",
      location: "Secunderabad",
      bookings: 12,
      completedBookings: 11,
      registrationDate: "02 Aug 2026",
      status: "Active",
    },
    {
      id: "PM-CUS-1004",
      name: "Arjun Kumar",
      phone: "+91 9012345678",
      email: "arjunkumar@example.com",
      location: "LB Nagar, Hyderabad",
      bookings: 3,
      completedBookings: 2,
      registrationDate: "25 Sep 2026",
      status: "Blocked",
    },
    {
      id: "PM-CUS-1005",
      name: "Sneha Rao",
      phone: "+91 9345678901",
      email: "sneharao@example.com",
      location: "Banjara Hills, Hyderabad",
      bookings: 6,
      completedBookings: 6,
      registrationDate: "28 Aug 2026",
      status: "Active",
    },
  ]);

  const filteredCustomers = useMemo(() => {
    const search =
      searchTerm.toLowerCase().trim();

    return customers.filter((customer) => {
      const matchesSearch =
        customer.name
          .toLowerCase()
          .includes(search) ||
        customer.phone
          .toLowerCase()
          .includes(search) ||
        customer.email
          .toLowerCase()
          .includes(search) ||
        customer.id
          .toLowerCase()
          .includes(search) ||
        customer.location
          .toLowerCase()
          .includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        customer.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    customers,
    searchTerm,
    statusFilter,
  ]);

  const activeCustomers =
    customers.filter(
      (customer) =>
        customer.status === "Active"
    ).length;

  const blockedCustomers =
    customers.filter(
      (customer) =>
        customer.status === "Blocked"
    ).length;

  const totalBookings =
    customers.reduce(
      (total, customer) =>
        total + customer.bookings,
      0
    );

  const handleNavigation = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  const handleBackToDashboard = () => {
    navigate("/admin-dashboard");
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const handleToggleCustomerStatus = (
    customer
  ) => {
    const nextStatus =
      customer.status === "Active"
        ? "Blocked"
        : "Active";

    setCustomers((previous) =>
      previous.map((item) =>
        item.id === customer.id
          ? {
              ...item,
              status: nextStatus,
            }
          : item
      )
    );

    setSelectedCustomer((previous) =>
      previous &&
      previous.id === customer.id
        ? {
            ...previous,
            status: nextStatus,
          }
        : previous
    );
  };

  const handleViewBookings = (customer) => {
    setSelectedCustomer(null);

    navigate("/admin-bookings", {
      state: {
        customer: {
          id: customer.id,
          name: customer.name,
        },
      },
    });
  };

  const handleContactCustomer = (
    customer
  ) => {
    window.location.href = `tel:${customer.phone}`;
  };

  return (
    <div className="admin-customers-page">

      {/* MOBILE HEADER */}
      <header className="customers-mobile-header">

        <button
          type="button"
          className="customers-mobile-menu-btn"
          onClick={() =>
            setMobileMenuOpen(true)
          }
          aria-label="Open admin menu"
        >
          <Menu size={22} />
        </button>

        <div className="customers-mobile-brand">
          <strong>PoojaMitra</strong>
          <span>Admin Panel</span>
        </div>

        <button
          type="button"
          className="customers-mobile-back-btn"
          onClick={handleBackToDashboard}
          aria-label="Back to dashboard"
        >
          <ArrowLeft size={20} />
        </button>

      </header>

      {/* MOBILE OVERLAY */}
      {mobileMenuOpen && (
        <button
          type="button"
          className="customers-mobile-overlay"
          onClick={() =>
            setMobileMenuOpen(false)
          }
          aria-label="Close admin menu"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`admin-customers-sidebar ${
          mobileMenuOpen
            ? "admin-customers-sidebar-open"
            : ""
        }`}
      >

        <div className="admin-customers-brand">
          <span>PoojaMitra</span>
          <small>Admin Panel</small>
        </div>

        <nav className="admin-customers-nav">

          <button
            type="button"
            className="admin-customers-nav-item"
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
            className="admin-customers-nav-item"
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
            className="admin-customers-nav-item"
            onClick={() =>
              handleNavigation(
                "/admin-approved-priests"
              )
            }
          >
            <Users size={18} />
            <span>Approved Priests</span>
          </button>

          <button
            type="button"
            className="admin-customers-nav-item active"
          >
            <UserRound size={18} />
            <span>Customers</span>
          </button>

          <button
            type="button"
            className="admin-customers-nav-item"
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
            className="admin-customers-nav-item"
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
            className="admin-customers-nav-item"
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
            className="admin-customers-nav-item"
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
            className="admin-customers-nav-item"
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
            className="admin-customers-nav-item"
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
            className="admin-customers-nav-item"
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
          className="admin-customers-logout"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>

      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-customers-main">

        {/* PAGE HEADER */}
        <header className="admin-customers-header">

          <div className="customers-header-left">

            <button
              type="button"
              className="customers-back-button"
              onClick={handleBackToDashboard}
              aria-label="Back to Admin Dashboard"
            >
              <ArrowLeft size={22} />
            </button>

            <div>

              <span className="customers-page-label">
                CUSTOMER MANAGEMENT
              </span>

              <h1>Customers</h1>

              <p>
                Manage registered PoojaMitra
                customers and their account
                activity.
              </p>

            </div>

          </div>

          <div className="admin-customers-count">
            <UserRound size={20} />
            <span>
              {customers.length} Customers
            </span>
          </div>

        </header>

        {/* STATISTICS */}
        <section className="admin-customers-stats">

          <div className="admin-customer-stat-card">

            <div className="admin-customer-stat-icon">
              <Users size={22} />
            </div>

            <div>
              <span>Total Customers</span>
              <strong>
                {customers.length}
              </strong>
            </div>

          </div>

          <div className="admin-customer-stat-card">

            <div className="admin-customer-stat-icon active">
              <UserCheck size={22} />
            </div>

            <div>
              <span>Active Customers</span>
              <strong>
                {activeCustomers}
              </strong>
            </div>

          </div>

          <div className="admin-customer-stat-card">

            <div className="admin-customer-stat-icon blocked">
              <X size={22} />
            </div>

            <div>
              <span>Blocked Customers</span>
              <strong>
                {blockedCustomers}
              </strong>
            </div>

          </div>

          <div className="admin-customer-stat-card">

            <div className="admin-customer-stat-icon bookings">
              <ShoppingBag size={22} />
            </div>

            <div>
              <span>Total Bookings</span>
              <strong>
                {totalBookings}
              </strong>
            </div>

          </div>

        </section>

        {/* SEARCH & FILTER */}
        <section className="admin-customers-filter">

          <div className="admin-customers-search">

            <Search size={19} />

            <input
              type="text"
              placeholder="Search by name, ID, phone, email or location..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value
                )
              }
            />

          </div>

          <div className="admin-customers-status-filter">

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

              <option value="Blocked">
                Blocked
              </option>
            </select>

          </div>

        </section>

        {/* CUSTOMER DIRECTORY */}
        <section className="admin-customers-list-card">

          <div className="admin-customers-list-header">

            <div>

              <span>
                CUSTOMER DIRECTORY
              </span>

              <h2>Customer Directory</h2>

              <p>
                {filteredCustomers.length} customer
                {filteredCustomers.length !== 1
                  ? "s"
                  : ""}{" "}
                found
              </p>

            </div>

          </div>

          {/* DESKTOP TABLE */}
          <div className="admin-customers-table-wrapper">

            <table className="admin-customers-table">

              <thead>

                <tr>
                  <th>Customer</th>
                  <th>Contact</th>
                  <th>Location</th>
                  <th>Bookings</th>
                  <th>Registered</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {filteredCustomers.length >
                0 ? (
                  filteredCustomers.map(
                    (customer) => (
                      <tr key={customer.id}>

                        <td>

                          <div className="admin-customer-name">

                            <div className="admin-customer-avatar">
                              {customer.name.charAt(
                                0
                              )}
                            </div>

                            <div>

                              <strong>
                                {customer.name}
                              </strong>

                              <small>
                                {customer.id}
                              </small>

                            </div>

                          </div>

                        </td>

                        <td>

                          <div className="customer-contact">

                            <span>
                              <Phone size={13} />
                              {customer.phone}
                            </span>

                            <span>
                              <Mail size={13} />
                              {customer.email}
                            </span>

                          </div>

                        </td>

                        <td>

                          <div className="customer-location">
                            <MapPin size={14} />
                            <span>
                              {customer.location}
                            </span>
                          </div>

                        </td>

                        <td>

                          <div className="customer-bookings">

                            <strong>
                              {customer.bookings}
                            </strong>

                            <small>
                              {
                                customer.completedBookings
                              }{" "}
                              completed
                            </small>

                          </div>

                        </td>

                        <td>

                          <div className="customer-registration">

                            <Calendar size={14} />

                            <span>
                              {
                                customer.registrationDate
                              }
                            </span>

                          </div>

                        </td>

                        <td>

                          <span
                            className={`customer-status ${
                              customer.status ===
                              "Active"
                                ? "customer-active"
                                : "customer-blocked"
                            }`}
                          >
                            {customer.status}
                          </span>

                        </td>

                        <td>

                          <button
                            type="button"
                            className="customer-view-btn"
                            onClick={() =>
                              setSelectedCustomer(
                                customer
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

                      <div className="customers-empty">

                        <UserRound size={40} />

                        <h3>
                          No customers found
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
          <div className="admin-customers-mobile-list">

            {filteredCustomers.length >
            0 ? (
              filteredCustomers.map(
                (customer) => (
                  <div
                    className="customer-mobile-card"
                    key={customer.id}
                  >

                    <div className="customer-mobile-top">

                      <div className="admin-customer-name">

                        <div className="admin-customer-avatar">
                          {customer.name.charAt(
                            0
                          )}
                        </div>

                        <div>

                          <strong>
                            {customer.name}
                          </strong>

                          <small>
                            {customer.id}
                          </small>

                        </div>

                      </div>

                      <span
                        className={`customer-status ${
                          customer.status ===
                          "Active"
                            ? "customer-active"
                            : "customer-blocked"
                        }`}
                      >
                        {customer.status}
                      </span>

                    </div>

                    <div className="customer-mobile-details">

                      <div>
                        <span>Phone</span>
                        <strong>
                          {customer.phone}
                        </strong>
                      </div>

                      <div>
                        <span>Bookings</span>
                        <strong>
                          {customer.bookings}
                        </strong>
                      </div>

                      <div>
                        <span>Location</span>
                        <strong>
                          {customer.location}
                        </strong>
                      </div>

                      <div>
                        <span>Registered</span>
                        <strong>
                          {
                            customer.registrationDate
                          }
                        </strong>
                      </div>

                    </div>

                    <button
                      type="button"
                      className="customer-view-btn customer-mobile-view"
                      onClick={() =>
                        setSelectedCustomer(
                          customer
                        )
                      }
                    >
                      <Eye size={16} />
                      View Customer
                    </button>

                  </div>
                )
              )
            ) : (
              <div className="mobile-empty-state">

                <UserRound size={38} />

                <h3>
                  No customers found
                </h3>

                <p>
                  Try changing your search
                  or filter.
                </p>

              </div>
            )}

          </div>

        </section>

      </main>

      {/* CUSTOMER DETAILS MODAL */}
      {selectedCustomer && (
        <div
          className="customer-modal-overlay"
          onClick={() =>
            setSelectedCustomer(null)
          }
        >

          <div
            className="customer-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="customer-modal-header">

              <div>
                <h2>
                  Customer Details
                </h2>

                <p>
                  {selectedCustomer.id}
                </p>
              </div>

              <button
                type="button"
                className="customer-modal-close"
                onClick={() =>
                  setSelectedCustomer(null)
                }
              >
                <X size={20} />
              </button>

            </div>

            <div className="customer-modal-body">

              <div className="customer-modal-profile">

                <div className="customer-large-avatar">
                  {selectedCustomer.name.charAt(
                    0
                  )}
                </div>

                <div>

                  <h3>
                    {selectedCustomer.name}
                  </h3>

                  <span
                    className={`customer-status ${
                      selectedCustomer.status ===
                      "Active"
                        ? "customer-active"
                        : "customer-blocked"
                    }`}
                  >
                    {selectedCustomer.status}
                  </span>

                </div>

              </div>

              <div className="customer-modal-grid">

                <div className="customer-detail-box">

                  <span>Phone</span>

                  <strong>
                    <Phone size={15} />
                    {selectedCustomer.phone}
                  </strong>

                </div>

                <div className="customer-detail-box">

                  <span>Email</span>

                  <strong>
                    <Mail size={15} />
                    {selectedCustomer.email}
                  </strong>

                </div>

                <div className="customer-detail-box">

                  <span>Location</span>

                  <strong>
                    <MapPin size={15} />
                    {selectedCustomer.location}
                  </strong>

                </div>

                <div className="customer-detail-box">

                  <span>
                    Registration Date
                  </span>

                  <strong>
                    <Calendar size={15} />
                    {
                      selectedCustomer.registrationDate
                    }
                  </strong>

                </div>

                <div className="customer-detail-box">

                  <span>Total Bookings</span>

                  <strong>
                    {
                      selectedCustomer.bookings
                    }
                  </strong>

                </div>

                <div className="customer-detail-box">

                  <span>
                    Completed Bookings
                  </span>

                  <strong>
                    {
                      selectedCustomer.completedBookings
                    }
                  </strong>

                </div>

              </div>

            </div>

            <div className="customer-modal-footer">

              <button
                type="button"
                className="customer-modal-secondary"
                onClick={() =>
                  setSelectedCustomer(null)
                }
              >
                Close
              </button>

              <button
                type="button"
                className="customer-modal-secondary"
                onClick={() =>
                  handleViewBookings(
                    selectedCustomer
                  )
                }
              >
                <ShoppingBag size={15} />
                View Bookings
              </button>

              <button
                type="button"
                className="customer-modal-secondary"
                onClick={() =>
                  handleContactCustomer(
                    selectedCustomer
                  )
                }
              >
                <Phone size={15} />
                Contact
              </button>

              <button
                type="button"
                className="customer-modal-primary"
                onClick={() =>
                  handleToggleCustomerStatus(
                    selectedCustomer
                  )
                }
              >
                <Power size={15} />

                {selectedCustomer.status ===
                "Active"
                  ? "Block Customer"
                  : "Unblock Customer"}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default AdminCustomers;