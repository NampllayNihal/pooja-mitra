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
  MapPin,
  Clock3,
  X,
  ArrowLeft,
  Menu,
  IndianRupee,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Ban,
  User,
  Receipt,
  Briefcase,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/adminBookings.css";

function AdminBookings() {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [bookings, setBookings] = useState([
    {
      id: "PM-BKG-1001",
      customer: "Priya Reddy",
      customerPhone: "+91 9876543210",
      customerId: "PM-CUS-1001",
      priest: "Sri Ramesh Sharma",
      priestId: "PM-PRI-1001",
      service: "Satyanarayana Swamy Pooja",
      serviceId: "PM-SRV-1001",
      date: "08 Oct 2026",
      time: "10:00 AM",
      amount: 2500,
      paymentStatus: "Paid",
      status: "Confirmed",
      location: "Kukatpally, Hyderabad",
      createdDate: "02 Oct 2026",
    },
    {
      id: "PM-BKG-1002",
      customer: "Rahul Sharma",
      customerPhone: "+91 9988776655",
      customerId: "PM-CUS-1002",
      priest: "Sri Venkatesh Rao",
      priestId: "PM-PRI-1003",
      service: "Griha Pravesh Pooja",
      serviceId: "PM-SRV-1002",
      date: "10 Oct 2026",
      time: "8:00 AM",
      amount: 4500,
      paymentStatus: "Paid",
      status: "Pending",
      location: "Madhapur, Hyderabad",
      createdDate: "03 Oct 2026",
    },
    {
      id: "PM-BKG-1003",
      customer: "Lakshmi Devi",
      customerPhone: "+91 9123456789",
      customerId: "PM-CUS-1003",
      priest: "Sri Anand Kumar",
      priestId: "PM-PRI-1005",
      service: "Lakshmi Pooja",
      serviceId: "PM-SRV-1003",
      date: "05 Oct 2026",
      time: "6:00 PM",
      amount: 1800,
      paymentStatus: "Paid",
      status: "Completed",
      location: "Secunderabad",
      createdDate: "28 Sep 2026",
    },
    {
      id: "PM-BKG-1004",
      customer: "Arjun Kumar",
      customerPhone: "+91 9012345678",
      customerId: "PM-CUS-1004",
      priest: "Sri Suresh Acharya",
      priestId: "PM-PRI-1002",
      service: "Ganesh Pooja",
      serviceId: "PM-SRV-1004",
      date: "12 Oct 2026",
      time: "11:00 AM",
      amount: 1500,
      paymentStatus: "Pending",
      status: "Pending",
      location: "LB Nagar, Hyderabad",
      createdDate: "04 Oct 2026",
    },
    {
      id: "PM-BKG-1005",
      customer: "Sneha Rao",
      customerPhone: "+91 9345678901",
      customerId: "PM-CUS-1005",
      priest: "Sri Krishna Murthy",
      priestId: "PM-PRI-1006",
      service: "Durga Pooja",
      serviceId: "PM-SRV-1005",
      date: "03 Oct 2026",
      time: "5:30 PM",
      amount: 2200,
      paymentStatus: "Paid",
      status: "Completed",
      location: "Banjara Hills, Hyderabad",
      createdDate: "25 Sep 2026",
    },
    {
      id: "PM-BKG-1006",
      customer: "Anjali Reddy",
      customerPhone: "+91 9000012345",
      customerId: "PM-CUS-1006",
      priest: "Sri Hari Prasad",
      priestId: "PM-PRI-1007",
      service: "Navagraha Pooja",
      serviceId: "PM-SRV-1006",
      date: "15 Oct 2026",
      time: "9:00 AM",
      amount: 3200,
      paymentStatus: "Paid",
      status: "Confirmed",
      location: "Kondapur, Hyderabad",
      createdDate: "04 Oct 2026",
    },
  ]);

  /*
   * Navigation context
   *
   * Customer page:
   *   state.customer
   *
   * Services page:
   *   state.service
   *
   * Payments page:
   *   state.booking
   */
  const selectedCustomerFromNavigation =
    location.state?.customer || null;

  const selectedServiceFromNavigation =
    location.state?.service || null;

  const selectedBookingFromNavigation =
    location.state?.booking || null;

  /*
   * Filter bookings based on whichever admin page
   * navigated here.
   */
  const filteredBookings = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return bookings.filter((booking) => {
      const matchesSearch =
        !search ||
        booking.id.toLowerCase().includes(search) ||
        booking.customer.toLowerCase().includes(search) ||
        booking.customerPhone.toLowerCase().includes(search) ||
        booking.priest.toLowerCase().includes(search) ||
        booking.service.toLowerCase().includes(search) ||
        booking.location.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        booking.status === statusFilter;

      const matchesCustomer =
        !selectedCustomerFromNavigation ||
        booking.customerId === selectedCustomerFromNavigation.id;

      const matchesService =
        !selectedServiceFromNavigation ||
        booking.serviceId === selectedServiceFromNavigation.id ||
        booking.service === selectedServiceFromNavigation.name;

      const matchesBooking =
        !selectedBookingFromNavigation ||
        booking.id === selectedBookingFromNavigation.id;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCustomer &&
        matchesService &&
        matchesBooking
      );
    });
  }, [
    bookings,
    searchTerm,
    statusFilter,
    selectedCustomerFromNavigation,
    selectedServiceFromNavigation,
    selectedBookingFromNavigation,
  ]);

  /*
   * Statistics must use the currently filtered bookings.
   */
  const totalBookings = filteredBookings.length;

  const pendingBookings = filteredBookings.filter(
    (booking) => booking.status === "Pending"
  ).length;

  const confirmedBookings = filteredBookings.filter(
    (booking) => booking.status === "Confirmed"
  ).length;

  const completedBookings = filteredBookings.filter(
    (booking) => booking.status === "Completed"
  ).length;

  const cancelledBookings = filteredBookings.filter(
    (booking) => booking.status === "Cancelled"
  ).length;

  const totalRevenue = filteredBookings
    .filter((booking) => booking.paymentStatus === "Paid")
    .reduce(
      (total, booking) => total + booking.amount,
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

  const clearNavigationFilter = () => {
    setSearchTerm("");
    setStatusFilter("All");

    navigate("/admin-bookings", {
      replace: true,
      state: null,
    });
  };

  const getStatusClass = (status) => {
    if (status === "Confirmed") {
      return "booking-confirmed";
    }

    if (status === "Completed") {
      return "booking-completed";
    }

    if (status === "Pending") {
      return "booking-pending";
    }

    if (status === "Cancelled") {
      return "booking-cancelled";
    }

    return "";
  };

  const updateBookingStatus = (
    bookingId,
    nextStatus
  ) => {
    setBookings((previous) =>
      previous.map((booking) =>
        booking.id === bookingId
          ? {
              ...booking,
              status: nextStatus,
            }
          : booking
      )
    );

    setSelectedBooking((previous) =>
      previous && previous.id === bookingId
        ? {
            ...previous,
            status: nextStatus,
          }
        : previous
    );
  };

  const handleConfirmBooking = (booking) => {
    updateBookingStatus(
      booking.id,
      "Confirmed"
    );
  };

  const handleCompleteBooking = (booking) => {
    updateBookingStatus(
      booking.id,
      "Completed"
    );
  };

  const handleCancelBooking = (booking) => {
    updateBookingStatus(
      booking.id,
      "Cancelled"
    );
  };

  const handleCallCustomer = (booking) => {
    window.location.href =
      `tel:${booking.customerPhone}`;
  };

  /*
   * Booking -> Customer
   */
  const handleViewCustomer = (booking) => {
    setSelectedBooking(null);

    navigate("/admin-customers", {
      state: {
        customer: {
          id: booking.customerId,
          name: booking.customer,
        },
      },
    });
  };

  /*
   * Booking -> Payment
   */
  const handleViewPayment = (booking) => {
    setSelectedBooking(null);

    navigate("/admin-payments", {
      state: {
        booking: {
          id: booking.id,
          customer: booking.customer,
          amount: booking.amount,
        },
      },
    });
  };

  /*
   * Booking -> Service
   */
  const handleViewService = (booking) => {
    setSelectedBooking(null);

    navigate("/admin-services", {
      state: {
        service: {
          id: booking.serviceId,
          name: booking.service,
        },
      },
    });
  };

  return (
    <div className="admin-bookings-page">

      {/* MOBILE HEADER */}
      <header className="bookings-mobile-header">
        <button
          type="button"
          className="bookings-mobile-menu-btn"
          onClick={() =>
            setMobileMenuOpen(true)
          }
          aria-label="Open admin menu"
        >
          <Menu size={22} />
        </button>

        <div className="bookings-mobile-brand">
          <strong>PoojaMitra</strong>
          <span>Admin Panel</span>
        </div>

        <button
          type="button"
          className="bookings-mobile-back-btn"
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
          className="bookings-mobile-overlay"
          onClick={() =>
            setMobileMenuOpen(false)
          }
          aria-label="Close admin menu"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`admin-bookings-sidebar ${
          mobileMenuOpen
            ? "admin-bookings-sidebar-open"
            : ""
        }`}
      >
        <div className="admin-bookings-brand">
          <span>PoojaMitra</span>
          <small>Admin Panel</small>
        </div>

        <nav className="admin-bookings-nav">

          <button
            type="button"
            className="admin-bookings-nav-item"
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
            className="admin-bookings-nav-item"
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
            className="admin-bookings-nav-item"
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
            className="admin-bookings-nav-item"
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
            className="admin-bookings-nav-item active"
          >
            <CalendarDays size={18} />
            <span>Bookings</span>
          </button>

          <button
            type="button"
            className="admin-bookings-nav-item"
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
            className="admin-bookings-nav-item"
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
            className="admin-bookings-nav-item"
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
            className="admin-bookings-nav-item"
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
            className="admin-bookings-nav-item"
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
            className="admin-bookings-nav-item"
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
          className="admin-bookings-logout"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-bookings-main">

        {/* HEADER */}
        <header className="admin-bookings-header">

          <div className="bookings-header-left">

            <button
              type="button"
              className="bookings-back-button"
              onClick={handleBackToDashboard}
              aria-label="Back to Admin Dashboard"
            >
              <ArrowLeft size={22} />
            </button>

            <div>
              <span className="bookings-page-label">
                BOOKING MANAGEMENT
              </span>

              <h1>Bookings</h1>

              <p>
                Manage customer bookings,
                priests, services and booking
                status.
              </p>

              {/* CUSTOMER CONTEXT */}
              {selectedCustomerFromNavigation && (
                <div
                  style={{
                    marginTop: "8px",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  Showing bookings for{" "}
                  {selectedCustomerFromNavigation.name}
                </div>
              )}

              {/* SERVICE CONTEXT */}
              {selectedServiceFromNavigation && (
                <div
                  style={{
                    marginTop: "8px",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  Showing bookings for service:{" "}
                  {selectedServiceFromNavigation.name}
                </div>
              )}

              {/* BOOKING CONTEXT */}
              {selectedBookingFromNavigation && (
                <div
                  style={{
                    marginTop: "8px",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  Showing booking:{" "}
                  {selectedBookingFromNavigation.id}
                </div>
              )}

            </div>
          </div>

          <div className="admin-bookings-count">
            <CalendarDays size={20} />
            <span>
              {totalBookings} Bookings
            </span>
          </div>

        </header>

        {/* CONTEXT CLEAR BUTTON */}
        {(selectedCustomerFromNavigation ||
          selectedServiceFromNavigation ||
          selectedBookingFromNavigation) && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "16px",
            }}
          >
            <button
              type="button"
              onClick={clearNavigationFilter}
              style={{
                border: "1px solid #d7b08b",
                background: "#fffaf5",
                color: "#7b1e1e",
                borderRadius: "8px",
                padding: "8px 13px",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Clear Linked Filter
            </button>
          </div>
        )}

        {/* STATISTICS */}
        <section className="admin-bookings-stats">

          <div className="admin-booking-stat-card">
            <div className="admin-booking-stat-icon">
              <CalendarDays size={22} />
            </div>

            <div>
              <span>Total Bookings</span>
              <strong>{totalBookings}</strong>
            </div>
          </div>

          <div className="admin-booking-stat-card">
            <div className="admin-booking-stat-icon pending">
              <AlertCircle size={22} />
            </div>

            <div>
              <span>Pending</span>
              <strong>{pendingBookings}</strong>
            </div>
          </div>

          <div className="admin-booking-stat-card">
            <div className="admin-booking-stat-icon confirmed">
              <CheckCircle2 size={22} />
            </div>

            <div>
              <span>Confirmed</span>
              <strong>{confirmedBookings}</strong>
            </div>
          </div>

          <div className="admin-booking-stat-card">
            <div className="admin-booking-stat-icon completed">
              <IndianRupee size={22} />
            </div>

            <div>
              <span>Paid Revenue</span>
              <strong>
                ₹{totalRevenue.toLocaleString("en-IN")}
              </strong>
            </div>
          </div>

        </section>

        {/* EXTRA STATUS SUMMARY */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "18px",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            Completed: {completedBookings}
          </span>

          <span
            style={{
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            Cancelled: {cancelledBookings}
          </span>
        </div>

        {/* SEARCH & FILTER */}
        <section className="admin-bookings-filter">

          <div className="admin-bookings-search">
            <Search size={19} />

            <input
              type="text"
              placeholder="Search booking ID, customer, priest, service or location..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value
                )
              }
            />
          </div>

          <div className="admin-bookings-status-filter">
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

              <option value="Pending">
                Pending
              </option>

              <option value="Confirmed">
                Confirmed
              </option>

              <option value="Completed">
                Completed
              </option>

              <option value="Cancelled">
                Cancelled
              </option>
            </select>
          </div>

        </section>

        {/* BOOKING DIRECTORY */}
        <section className="admin-bookings-list-card">

          <div className="admin-bookings-list-header">

            <span>
              BOOKING DIRECTORY
            </span>

            <h2>All Bookings</h2>

            <p>
              {filteredBookings.length} booking
              {filteredBookings.length !== 1
                ? "s"
                : ""}{" "}
              found
            </p>

          </div>

          {/* DESKTOP TABLE */}
          <div className="admin-bookings-table-wrapper">

            <table className="admin-bookings-table">

              <thead>
                <tr>
                  <th>Booking</th>
                  <th>Customer</th>
                  <th>Priest</th>
                  <th>Service</th>
                  <th>Date & Time</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredBookings.length > 0 ? (
                  filteredBookings.map(
                    (booking) => (
                      <tr key={booking.id}>

                        <td>
                          <div className="booking-id-cell">
                            <strong>
                              {booking.id}
                            </strong>

                            <small>
                              {booking.createdDate}
                            </small>
                          </div>
                        </td>

                        <td>
                          <div className="booking-person">

                            <div className="booking-avatar">
                              {booking.customer.charAt(0)}
                            </div>

                            <div>
                              <strong>
                                {booking.customer}
                              </strong>

                              <small>
                                <Phone size={11} />
                                {booking.customerPhone}
                              </small>
                            </div>

                          </div>
                        </td>

                        <td>
                          <div className="booking-priest">
                            <strong>
                              {booking.priest}
                            </strong>
                          </div>
                        </td>

                        <td>
                          <div className="booking-service">
                            {booking.service}
                          </div>
                        </td>

                        <td>
                          <div className="booking-date">

                            <span>
                              <Calendar size={13} />
                              {booking.date}
                            </span>

                            <span>
                              <Clock3 size={13} />
                              {booking.time}
                            </span>

                          </div>
                        </td>

                        <td>
                          <div className="booking-amount">

                            <strong>
                              ₹
                              {booking.amount.toLocaleString(
                                "en-IN"
                              )}
                            </strong>

                            <small>
                              {booking.paymentStatus}
                            </small>

                          </div>
                        </td>

                        <td>
                          <span
                            className={`booking-status ${getStatusClass(
                              booking.status
                            )}`}
                          >
                            {booking.status}
                          </span>
                        </td>

                        <td>
                          <button
                            type="button"
                            className="booking-view-btn"
                            onClick={() =>
                              setSelectedBooking(
                                booking
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
                    <td colSpan="8">
                      <div className="bookings-empty">
                        <CalendarDays size={40} />

                        <h3>
                          No bookings found
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
          <div className="admin-bookings-mobile-list">

            {filteredBookings.length > 0 ? (
              filteredBookings.map(
                (booking) => (
                  <div
                    className="booking-mobile-card"
                    key={booking.id}
                  >

                    <div className="booking-mobile-top">

                      <div>
                        <strong>
                          {booking.id}
                        </strong>

                        <small>
                          {booking.createdDate}
                        </small>
                      </div>

                      <span
                        className={`booking-status ${getStatusClass(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>

                    </div>

                    <div className="booking-mobile-service">
                      <span>Service</span>

                      <strong>
                        {booking.service}
                      </strong>
                    </div>

                    <div className="booking-mobile-details">

                      <div>
                        <span>Customer</span>
                        <strong>
                          {booking.customer}
                        </strong>
                      </div>

                      <div>
                        <span>Priest</span>
                        <strong>
                          {booking.priest}
                        </strong>
                      </div>

                      <div>
                        <span>Date</span>
                        <strong>
                          {booking.date}
                        </strong>
                      </div>

                      <div>
                        <span>Time</span>
                        <strong>
                          {booking.time}
                        </strong>
                      </div>

                      <div>
                        <span>Amount</span>
                        <strong>
                          ₹
                          {booking.amount.toLocaleString(
                            "en-IN"
                          )}
                        </strong>
                      </div>

                      <div>
                        <span>Payment</span>
                        <strong>
                          {booking.paymentStatus}
                        </strong>
                      </div>

                    </div>

                    <div className="booking-mobile-location">
                      <MapPin size={15} />

                      <span>
                        {booking.location}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="booking-view-btn booking-mobile-view"
                      onClick={() =>
                        setSelectedBooking(
                          booking
                        )
                      }
                    >
                      <Eye size={16} />
                      View Booking
                    </button>

                  </div>
                )
              )
            ) : (
              <div className="bookings-empty">
                <CalendarDays size={40} />

                <h3>
                  No bookings found
                </h3>

                <p>
                  Try changing your search
                  or status filter.
                </p>
              </div>
            )}

          </div>

        </section>

      </main>

      {/* BOOKING DETAILS MODAL */}
      {selectedBooking && (
        <div
          className="booking-modal-overlay"
          onClick={() =>
            setSelectedBooking(null)
          }
        >

          <div
            className="booking-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="booking-modal-header">

              <div>
                <h2>
                  Booking Details
                </h2>

                <p>
                  {selectedBooking.id}
                </p>
              </div>

              <button
                type="button"
                className="booking-modal-close"
                onClick={() =>
                  setSelectedBooking(null)
                }
                aria-label="Close booking details"
              >
                <X size={20} />
              </button>

            </div>

            <div className="booking-modal-body">

              <div className="booking-modal-title">

                <div className="booking-large-icon">
                  <CalendarDays size={26} />
                </div>

                <div>

                  <h3>
                    {selectedBooking.service}
                  </h3>

                  <span
                    className={`booking-status ${getStatusClass(
                      selectedBooking.status
                    )}`}
                  >
                    {selectedBooking.status}
                  </span>

                </div>

              </div>

              <div className="booking-modal-grid">

                <div className="booking-detail-box">
                  <span>Customer</span>

                  <strong>
                    <User size={15} />
                    {selectedBooking.customer}
                  </strong>
                </div>

                <div className="booking-detail-box">
                  <span>
                    Customer Phone
                  </span>

                  <strong>
                    <Phone size={15} />
                    {selectedBooking.customerPhone}
                  </strong>
                </div>

                <div className="booking-detail-box">
                  <span>Priest</span>

                  <strong>
                    {selectedBooking.priest}
                  </strong>
                </div>

                <div className="booking-detail-box">
                  <span>Service</span>

                  <strong>
                    {selectedBooking.service}
                  </strong>
                </div>

                <div className="booking-detail-box">
                  <span>Date</span>

                  <strong>
                    <Calendar size={15} />
                    {selectedBooking.date}
                  </strong>
                </div>

                <div className="booking-detail-box">
                  <span>Time</span>

                  <strong>
                    <Clock3 size={15} />
                    {selectedBooking.time}
                  </strong>
                </div>

                <div className="booking-detail-box">
                  <span>Location</span>

                  <strong>
                    <MapPin size={15} />
                    {selectedBooking.location}
                  </strong>
                </div>

                <div className="booking-detail-box">
                  <span>Amount</span>

                  <strong>
                    <IndianRupee size={15} />
                    {selectedBooking.amount.toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>

                <div className="booking-detail-box">
                  <span>
                    Payment Status
                  </span>

                  <strong>
                    {selectedBooking.paymentStatus}
                  </strong>
                </div>

                <div className="booking-detail-box">
                  <span>
                    Booking Created
                  </span>

                  <strong>
                    {selectedBooking.createdDate}
                  </strong>
                </div>

              </div>

            </div>

            {/* ACTION FOOTER */}
            <div className="booking-modal-footer">

              <button
                type="button"
                className="booking-modal-secondary"
                onClick={() =>
                  setSelectedBooking(null)
                }
              >
                Close
              </button>

              {/* CUSTOMER */}
              <button
                type="button"
                className="booking-modal-secondary"
                onClick={() =>
                  handleViewCustomer(
                    selectedBooking
                  )
                }
              >
                <User size={15} />
                Customer
              </button>

              {/* SERVICE */}
              <button
                type="button"
                className="booking-modal-secondary"
                onClick={() =>
                  handleViewService(
                    selectedBooking
                  )
                }
              >
                <Briefcase size={15} />
                Service
              </button>

              {/* PAYMENT */}
              <button
                type="button"
                className="booking-modal-secondary"
                onClick={() =>
                  handleViewPayment(
                    selectedBooking
                  )
                }
              >
                <Receipt size={15} />
                Payment
              </button>

              {/* CALL */}
              <button
                type="button"
                className="booking-modal-secondary"
                onClick={() =>
                  handleCallCustomer(
                    selectedBooking
                  )
                }
              >
                <Phone size={15} />
                Call
              </button>

              {/* CONFIRM */}
              {selectedBooking.status ===
                "Pending" && (
                <button
                  type="button"
                  className="booking-modal-primary"
                  onClick={() =>
                    handleConfirmBooking(
                      selectedBooking
                    )
                  }
                >
                  <CheckCircle2 size={15} />
                  Confirm
                </button>
              )}

              {/* COMPLETE */}
              {selectedBooking.status ===
                "Confirmed" && (
                <button
                  type="button"
                  className="booking-modal-primary"
                  onClick={() =>
                    handleCompleteBooking(
                      selectedBooking
                    )
                  }
                >
                  <CheckCircle2 size={15} />
                  Complete
                </button>
              )}

              {/* CANCEL */}
              {selectedBooking.status !==
                "Completed" &&
                selectedBooking.status !==
                  "Cancelled" && (
                  <button
                    type="button"
                    className="booking-modal-secondary"
                    onClick={() =>
                      handleCancelBooking(
                        selectedBooking
                      )
                    }
                  >
                    <Ban size={15} />
                    Cancel
                  </button>
                )}

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default AdminBookings;