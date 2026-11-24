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
  Eye,
  X,
  Menu,
  ArrowLeft,
  IndianRupee,
  CheckCircle2,
  Clock3,
  XCircle,
  RotateCcw,
  Receipt,
  CalendarCheck,
} from "lucide-react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import "../styles/adminPayments.css";

function AdminPayments() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [methodFilter, setMethodFilter] =
    useState("All");

  const serviceFromNavigation =
    location.state?.service || null;

  const [selectedPayment, setSelectedPayment] =
    useState(null);

  const [showDetailsModal, setShowDetailsModal] =
    useState(false);

  const [payments] = useState([
    {
      id: "PM-PAY-1001",
      bookingId: "PM-BKG-1001",
      customer: "Priya Reddy",
      customerPhone: "9876543210",
      priest: "Sri Ramesh Sharma",
      service: "Satyanarayana Swamy Pooja",
      date: "08 Oct 2026",
      amount: 2500,
      commission: 250,
      priestPayout: 2250,
      method: "UPI",
      status: "Successful",
      transactionId: "TXN784512369",
      paidAt: "05 Oct 2026, 10:32 AM",
    },

    {
      id: "PM-PAY-1002",
      bookingId: "PM-BKG-1002",
      customer: "Rahul Sharma",
      customerPhone: "9123456780",
      priest: "Sri Venkatesh Rao",
      service: "Griha Pravesh Pooja",
      date: "10 Oct 2026",
      amount: 4500,
      commission: 450,
      priestPayout: 4050,
      method: "Card",
      status: "Successful",
      transactionId: "TXN784512370",
      paidAt: "05 Oct 2026, 11:15 AM",
    },

    {
      id: "PM-PAY-1003",
      bookingId: "PM-BKG-1003",
      customer: "Lakshmi Devi",
      customerPhone: "9988776655",
      priest: "Sri Anand Kumar",
      service: "Lakshmi Pooja",
      date: "05 Oct 2026",
      amount: 1800,
      commission: 180,
      priestPayout: 1620,
      method: "UPI",
      status: "Successful",
      transactionId: "TXN784512371",
      paidAt: "04 Oct 2026, 06:42 PM",
    },

    {
      id: "PM-PAY-1004",
      bookingId: "PM-BKG-1004",
      customer: "Arjun Kumar",
      customerPhone: "9012345678",
      priest: "Sri Suresh Acharya",
      service: "Ganesh Pooja",
      date: "12 Oct 2026",
      amount: 1500,
      commission: 150,
      priestPayout: 1350,
      method: "UPI",
      status: "Pending",
      transactionId: "TXN784512372",
      paidAt: "05 Oct 2026, 12:05 PM",
    },

    {
      id: "PM-PAY-1005",
      bookingId: "PM-BKG-1005",
      customer: "Sneha Rao",
      customerPhone: "9345678901",
      priest: "Sri Krishna Murthy",
      service: "Durga Pooja",
      date: "03 Oct 2026",
      amount: 2200,
      commission: 220,
      priestPayout: 1980,
      method: "Net Banking",
      status: "Successful",
      transactionId: "TXN784512373",
      paidAt: "02 Oct 2026, 03:18 PM",
    },

    {
      id: "PM-PAY-1006",
      bookingId: "PM-BKG-1006",
      customer: "Anjali Reddy",
      customerPhone: "8899776655",
      priest: "Sri Hari Prasad",
      service: "Navagraha Pooja",
      date: "15 Oct 2026",
      amount: 3200,
      commission: 320,
      priestPayout: 2880,
      method: "Card",
      status: "Refunded",
      transactionId: "TXN784512374",
      paidAt: "04 Oct 2026, 01:27 PM",
    },

    {
      id: "PM-PAY-1007",
      bookingId: "PM-BKG-1007",
      customer: "Vikram Rao",
      customerPhone: "9876123450",
      priest: "Sri Srinivas Acharya",
      service: "Vastu Pooja",
      date: "18 Oct 2026",
      amount: 2800,
      commission: 280,
      priestPayout: 2520,
      method: "UPI",
      status: "Failed",
      transactionId: "TXN784512375",
      paidAt: "05 Oct 2026, 12:42 PM",
    },
  ]);

  /*
   * SERVICE FILTER
   *
   * When AdminServices sends:
   *
   * navigate("/admin-payments", {
   *   state: {
   *     service: {
   *       id: service.id,
   *       name: service.name
   *     }
   *   }
   * })
   *
   * this page automatically filters the payments.
   */
  const serviceFilteredPayments = useMemo(() => {
    if (!serviceFromNavigation?.name) {
      return payments;
    }

    return payments.filter(
      (payment) =>
        payment.service ===
        serviceFromNavigation.name
    );
  }, [
    payments,
    serviceFromNavigation,
  ]);

  const filteredPayments = useMemo(() => {
    const searchValue =
      search.toLowerCase().trim();

    return serviceFilteredPayments.filter(
      (payment) => {
        const matchesSearch =
          payment.id
            .toLowerCase()
            .includes(searchValue) ||
          payment.bookingId
            .toLowerCase()
            .includes(searchValue) ||
          payment.customer
            .toLowerCase()
            .includes(searchValue) ||
          payment.customerPhone
            .toLowerCase()
            .includes(searchValue) ||
          payment.priest
            .toLowerCase()
            .includes(searchValue) ||
          payment.service
            .toLowerCase()
            .includes(searchValue) ||
          payment.transactionId
            .toLowerCase()
            .includes(searchValue);

        const matchesStatus =
          statusFilter === "All" ||
          payment.status === statusFilter;

        const matchesMethod =
          methodFilter === "All" ||
          payment.method === methodFilter;

        return (
          matchesSearch &&
          matchesStatus &&
          matchesMethod
        );
      }
    );
  }, [
    serviceFilteredPayments,
    search,
    statusFilter,
    methodFilter,
  ]);

  /*
   * IMPORTANT:
   * Statistics now respect the selected
   * service filter as well.
   */
  const successfulPayments =
    serviceFilteredPayments.filter(
      (payment) =>
        payment.status === "Successful"
    );

  const pendingPayments =
    serviceFilteredPayments.filter(
      (payment) =>
        payment.status === "Pending"
    );

  const failedPayments =
    serviceFilteredPayments.filter(
      (payment) =>
        payment.status === "Failed"
    );

  const refundedPayments =
    serviceFilteredPayments.filter(
      (payment) =>
        payment.status === "Refunded"
    );

  const totalRevenue =
    successfulPayments.reduce(
      (sum, payment) =>
        sum + payment.amount,
      0
    );

  const totalCommission =
    successfulPayments.reduce(
      (sum, payment) =>
        sum + payment.commission,
      0
    );

  const handleNavigation = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  const handleViewPayment = (payment) => {
    setSelectedPayment(payment);
    setShowDetailsModal(true);
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setMethodFilter("All");
  };

  const clearServiceFilter = () => {
    navigate("/admin-payments", {
      replace: true,
      state: {},
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Successful":
        return "successful";

      case "Pending":
        return "pending";

      case "Failed":
        return "failed";

      case "Refunded":
        return "refunded";

      default:
        return "";
    }
  };

  const handleViewBooking = (payment) => {
    setShowDetailsModal(false);

    navigate("/admin-bookings", {
      state: {
        booking: {
          id: payment.bookingId,
          customer: payment.customer,
          service: payment.service,
        },
      },
    });
  };

  const handleViewService = (payment) => {
    setShowDetailsModal(false);

    navigate("/admin-services", {
      state: {
        service: {
          name: payment.service,
        },
      },
    });
  };

  return (
    <div className="admin-payments-page">

      {/* MOBILE HEADER */}
      <div className="admin-payment-mobile-header">

        <button
          type="button"
          className="admin-payment-menu-button"
          onClick={() =>
            setMobileMenuOpen(true)
          }
          aria-label="Open admin menu"
        >
          <Menu size={22} />
        </button>

        <div className="admin-payment-mobile-brand">
          PoojaMitra
        </div>

        <div className="admin-payment-mobile-spacer" />

      </div>

      {/* OVERLAY */}
      {mobileMenuOpen && (
        <button
          type="button"
          className="admin-payment-sidebar-overlay"
          onClick={() =>
            setMobileMenuOpen(false)
          }
          aria-label="Close admin menu"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`admin-payment-sidebar ${
          mobileMenuOpen
            ? "admin-payment-sidebar-open"
            : ""
        }`}
      >

        <div className="admin-payment-sidebar-header">

          <div className="admin-payment-brand">
            PoojaMitra
          </div>

          <button
            type="button"
            className="admin-payment-mobile-close"
            onClick={() =>
              setMobileMenuOpen(false)
            }
            aria-label="Close menu"
          >
            <X size={20} />
          </button>

        </div>

        <nav className="admin-payment-sidebar-nav">

          <button
            type="button"
            className="admin-payment-nav-item"
            onClick={() =>
              handleNavigation(
                "/admin-dashboard"
              )
            }
          >
            <LayoutDashboard size={19} />
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            className="admin-payment-nav-item"
            onClick={() =>
              handleNavigation(
                "/admin-priest-applications"
              )
            }
          >
            <UserCheck size={19} />
            <span>
              Priest Applications
            </span>
          </button>

          <button
            type="button"
            className="admin-payment-nav-item"
            onClick={() =>
              handleNavigation(
                "/admin-approved-priests"
              )
            }
          >
            <Users size={19} />
            <span>
              Approved Priests
            </span>
          </button>

          <button
            type="button"
            className="admin-payment-nav-item"
            onClick={() =>
              handleNavigation(
                "/admin-customers"
              )
            }
          >
            <UserRound size={19} />
            <span>Customers</span>
          </button>

          <button
            type="button"
            className="admin-payment-nav-item"
            onClick={() =>
              handleNavigation(
                "/admin-bookings"
              )
            }
          >
            <CalendarDays size={19} />
            <span>Bookings</span>
          </button>

          <button
            type="button"
            className="admin-payment-nav-item"
            onClick={() =>
              handleNavigation(
                "/admin-services"
              )
            }
          >
            <BriefcaseBusiness size={19} />
            <span>Services</span>
          </button>

          <button
            type="button"
            className="admin-payment-nav-item"
            onClick={() =>
              handleNavigation(
                "/admin-interviews"
              )
            }
          >
            <Video size={19} />
            <span>Interviews</span>
          </button>

          <button
            type="button"
            className="admin-payment-nav-item active"
          >
            <CreditCard size={19} />
            <span>Payments</span>
          </button>

          <button
            type="button"
            className="admin-payment-nav-item"
            onClick={() =>
              handleNavigation(
                "/admin-reports"
              )
            }
          >
            <FileText size={19} />
            <span>Reports</span>
          </button>

          <button
            type="button"
            className="admin-payment-nav-item"
            onClick={() =>
              handleNavigation(
                "/admin-notifications"
              )
            }
          >
            <Bell size={19} />
            <span>Notifications</span>
          </button>

          <button
            type="button"
            className="admin-payment-nav-item"
            onClick={() =>
              handleNavigation(
                "/admin-settings"
              )
            }
          >
            <Settings size={19} />
            <span>Settings</span>
          </button>

        </nav>

        <button
          type="button"
          className="admin-payment-logout"
          onClick={() =>
            handleNavigation("/login")
          }
        >
          <LogOut size={19} />
          <span>Logout</span>
        </button>

      </aside>

      {/* MAIN */}
      <main className="admin-payment-main">

        <div className="admin-payment-topbar">

          <button
            type="button"
            className="admin-payment-back-button"
            onClick={() =>
              navigate("/admin-dashboard")
            }
            aria-label="Back to dashboard"
          >
            <ArrowLeft size={22} />
          </button>

        </div>

        <div className="admin-payment-heading">

          <div>

            <h1>Payments</h1>

            <p>
              Manage PoojaMitra payment
              transactions and payouts.
            </p>

          </div>

        </div>

        {/* SERVICE CONTEXT */}
        {serviceFromNavigation?.name && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent:
                "space-between",
              gap: "12px",
              flexWrap: "wrap",
              padding: "13px 16px",
              marginBottom: "18px",
              borderRadius: "10px",
              border:
                "1px solid rgba(123, 30, 30, 0.15)",
              background: "#fff8f2",
            }}
          >

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "9px",
              }}
            >

              <BriefcaseBusiness
                size={18}
              />

              <div>
                <span
                  style={{
                    display: "block",
                    fontSize: "11px",
                    fontWeight: 600,
                    opacity: 0.65,
                  }}
                >
                  Viewing payments for service
                </span>

                <strong
                  style={{
                    fontSize: "14px",
                  }}
                >
                  {serviceFromNavigation.name}
                </strong>
              </div>

            </div>

            <button
              type="button"
              onClick={clearServiceFilter}
              style={{
                border: "none",
                background:
                  "transparent",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "12px",
                textDecoration:
                  "underline",
              }}
            >
              View All Payments
            </button>

          </div>
        )}

        {/* STATS */}
        <section className="admin-payment-stats">

          <div className="admin-payment-stat-card">

            <div className="admin-payment-stat-icon">
              <IndianRupee size={21} />
            </div>

            <div>
              <span>
                Total Revenue
              </span>

              <strong>
                ₹
                {totalRevenue.toLocaleString(
                  "en-IN"
                )}
              </strong>
            </div>

          </div>

          <div className="admin-payment-stat-card">

            <div className="admin-payment-stat-icon">
              <CheckCircle2 size={21} />
            </div>

            <div>
              <span>Successful</span>

              <strong>
                {successfulPayments.length}
              </strong>
            </div>

          </div>

          <div className="admin-payment-stat-card">

            <div className="admin-payment-stat-icon">
              <Clock3 size={21} />
            </div>

            <div>
              <span>Pending</span>

              <strong>
                {pendingPayments.length}
              </strong>
            </div>

          </div>

          <div className="admin-payment-stat-card">

            <div className="admin-payment-stat-icon">
              <XCircle size={21} />
            </div>

            <div>
              <span>Failed</span>

              <strong>
                {failedPayments.length}
              </strong>
            </div>

          </div>

          <div className="admin-payment-stat-card">

            <div className="admin-payment-stat-icon">
              <RotateCcw size={21} />
            </div>

            <div>
              <span>Refunded</span>

              <strong>
                {refundedPayments.length}
              </strong>
            </div>

          </div>

          <div className="admin-payment-stat-card">

            <div className="admin-payment-stat-icon">
              <Receipt size={21} />
            </div>

            <div>
              <span>Commission</span>

              <strong>
                ₹
                {totalCommission.toLocaleString(
                  "en-IN"
                )}
              </strong>
            </div>

          </div>

        </section>

        {/* FILTERS */}
        <section className="admin-payment-toolbar">

          <div className="admin-payment-search">

            <Search size={19} />

            <input
              type="text"
              placeholder="Search payment, booking, customer, phone or transaction..."
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
            />

          </div>

          <div className="admin-payment-filters">

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

              <option value="Successful">
                Successful
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Failed">
                Failed
              </option>

              <option value="Refunded">
                Refunded
              </option>
            </select>

            <select
              value={methodFilter}
              onChange={(event) =>
                setMethodFilter(
                  event.target.value
                )
              }
            >
              <option value="All">
                All Methods
              </option>

              <option value="UPI">
                UPI
              </option>

              <option value="Card">
                Card
              </option>

              <option value="Net Banking">
                Net Banking
              </option>
            </select>

            {(search ||
              statusFilter !== "All" ||
              methodFilter !== "All") && (
              <button
                type="button"
                className="admin-payment-reset"
                onClick={resetFilters}
              >
                Reset
              </button>
            )}

          </div>

        </section>

        {/* PAYMENT DIRECTORY */}
        <section className="admin-payment-table-wrapper">

          <div className="admin-payment-section-header">

            <div>

              <h2>
                Payment Transactions
              </h2>

              <p>
                Showing{" "}
                {filteredPayments.length}{" "}
                of{" "}
                {
                  serviceFilteredPayments.length
                }{" "}
                transactions
              </p>

            </div>

          </div>

          {filteredPayments.length ===
          0 ? (
            <div className="admin-payment-empty">

              <CreditCard size={42} />

              <h3>
                No payments found
              </h3>

              <p>
                Try changing your search
                or filters.
              </p>

            </div>
          ) : (
            <div className="admin-payment-table-scroll">

              <table className="admin-payment-table">

                <thead>

                  <tr>
                    <th>Payment</th>
                    <th>Booking</th>
                    <th>Customer</th>
                    <th>Service</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Status</th>
                    <th>Paid At</th>
                    <th>Action</th>
                  </tr>

                </thead>

                <tbody>

                  {filteredPayments.map(
                    (payment) => (
                      <tr
                        key={payment.id}
                      >

                        <td>

                          <div className="admin-payment-id">

                            <div className="admin-payment-id-icon">
                              <CreditCard
                                size={17}
                              />
                            </div>

                            <div>
                              <strong>
                                {payment.id}
                              </strong>

                              <span>
                                {
                                  payment.transactionId
                                }
                              </span>
                            </div>

                          </div>

                        </td>

                        <td>

                          <span className="admin-payment-booking-id">
                            {
                              payment.bookingId
                            }
                          </span>

                        </td>

                        <td>

                          <strong className="admin-payment-customer">
                            {
                              payment.customer
                            }
                          </strong>

                        </td>

                        <td>

                          <div className="admin-payment-service">
                            {
                              payment.service
                            }
                          </div>

                        </td>

                        <td>

                          <strong className="admin-payment-amount">
                            ₹
                            {payment.amount.toLocaleString(
                              "en-IN"
                            )}
                          </strong>

                        </td>

                        <td>
                          {payment.method}
                        </td>

                        <td>

                          <span
                            className={`admin-payment-status ${getStatusClass(
                              payment.status
                            )}`}
                          >

                            {payment.status ===
                              "Successful" && (
                              <CheckCircle2
                                size={13}
                              />
                            )}

                            {payment.status ===
                              "Pending" && (
                              <Clock3
                                size={13}
                              />
                            )}

                            {payment.status ===
                              "Failed" && (
                              <XCircle
                                size={13}
                              />
                            )}

                            {payment.status ===
                              "Refunded" && (
                              <RotateCcw
                                size={13}
                              />
                            )}

                            {payment.status}

                          </span>

                        </td>

                        <td>

                          <span className="admin-payment-date">
                            {payment.paidAt}
                          </span>

                        </td>

                        <td>

                          <button
                            type="button"
                            className="admin-payment-view-button"
                            onClick={() =>
                              handleViewPayment(
                                payment
                              )
                            }
                          >
                            <Eye size={16} />
                            View
                          </button>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>
          )}

        </section>

        {/* MOBILE CARDS */}
        <section className="admin-payment-mobile-list">

          {filteredPayments.map(
            (payment) => (
              <div
                className="admin-payment-card"
                key={payment.id}
              >

                <div className="admin-payment-card-top">

                  <div className="admin-payment-id">

                    <div className="admin-payment-id-icon">
                      <CreditCard
                        size={17}
                      />
                    </div>

                    <div>

                      <strong>
                        {payment.id}
                      </strong>

                      <span>
                        {payment.bookingId}
                      </span>

                    </div>

                  </div>

                  <span
                    className={`admin-payment-status ${getStatusClass(
                      payment.status
                    )}`}
                  >
                    {payment.status}
                  </span>

                </div>

                <div className="admin-payment-card-details">

                  <div>
                    <span>
                      Customer
                    </span>

                    <strong>
                      {payment.customer}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Service
                    </span>

                    <strong>
                      {payment.service}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Amount
                    </span>

                    <strong>
                      ₹
                      {payment.amount.toLocaleString(
                        "en-IN"
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Payment Method
                    </span>

                    <strong>
                      {payment.method}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Commission
                    </span>

                    <strong>
                      ₹
                      {payment.commission.toLocaleString(
                        "en-IN"
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Priest Payout
                    </span>

                    <strong>
                      ₹
                      {payment.priestPayout.toLocaleString(
                        "en-IN"
                      )}
                    </strong>
                  </div>

                </div>

                <button
                  type="button"
                  className="admin-payment-mobile-view"
                  onClick={() =>
                    handleViewPayment(
                      payment
                    )
                  }
                >
                  <Eye size={16} />
                  View Payment Details
                </button>

              </div>
            )
          )}

        </section>

      </main>

      {/* PAYMENT DETAILS MODAL */}
      {showDetailsModal &&
        selectedPayment && (
          <div
            className="admin-payment-modal-overlay"
            onClick={() =>
              setShowDetailsModal(false)
            }
          >

            <div
              className="admin-payment-modal"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <div className="admin-payment-modal-header">

                <div>

                  <h2>
                    Payment Details
                  </h2>

                  <p>
                    {selectedPayment.id}
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowDetailsModal(
                      false
                    )
                  }
                >
                  <X size={20} />
                </button>

              </div>

              <div className="admin-payment-modal-status">

                <div className="admin-payment-large-icon">
                  <CreditCard
                    size={25}
                  />
                </div>

                <div>

                  <span>
                    Payment Amount
                  </span>

                  <strong>
                    ₹
                    {selectedPayment.amount.toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                </div>

                <span
                  className={`admin-payment-status ${getStatusClass(
                    selectedPayment.status
                  )}`}
                >
                  {selectedPayment.status}
                </span>

              </div>

              <div className="admin-payment-detail-grid">

                <div>
                  <span>
                    Payment ID
                  </span>

                  <strong>
                    {selectedPayment.id}
                  </strong>
                </div>

                <div>
                  <span>
                    Transaction ID
                  </span>

                  <strong>
                    {
                      selectedPayment.transactionId
                    }
                  </strong>
                </div>

                <div>
                  <span>
                    Booking ID
                  </span>

                  <strong>
                    {
                      selectedPayment.bookingId
                    }
                  </strong>
                </div>

                <div>
                  <span>
                    Payment Method
                  </span>

                  <strong>
                    {selectedPayment.method}
                  </strong>
                </div>

                <div>
                  <span>
                    Customer
                  </span>

                  <strong>
                    {
                      selectedPayment.customer
                    }
                  </strong>
                </div>

                <div>
                  <span>
                    Customer Phone
                  </span>

                  <strong>
                    {
                      selectedPayment.customerPhone
                    }
                  </strong>
                </div>

                <div>
                  <span>
                    Priest
                  </span>

                  <strong>
                    {selectedPayment.priest}
                  </strong>
                </div>

                <div>
                  <span>
                    Service
                  </span>

                  <strong>
                    {selectedPayment.service}
                  </strong>
                </div>

                <div>
                  <span>
                    Service Date
                  </span>

                  <strong>
                    {selectedPayment.date}
                  </strong>
                </div>

                <div>
                  <span>
                    Paid At
                  </span>

                  <strong>
                    {selectedPayment.paidAt}
                  </strong>
                </div>

              </div>

              {/* AMOUNT BREAKDOWN */}
              <div className="admin-payment-breakdown">

                <h3>
                  Amount Breakdown
                </h3>

                <div className="admin-payment-breakdown-row">

                  <span>
                    Customer Payment
                  </span>

                  <strong>
                    ₹
                    {selectedPayment.amount.toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                </div>

                <div className="admin-payment-breakdown-row">

                  <span>
                    Platform Commission
                  </span>

                  <strong>
                    ₹
                    {selectedPayment.commission.toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                </div>

                <div className="admin-payment-breakdown-row final">

                  <span>
                    Priest Payout
                  </span>

                  <strong>
                    ₹
                    {selectedPayment.priestPayout.toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                </div>

              </div>

              {/* RELATED RECORDS */}
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  flexWrap: "wrap",
                  marginTop: "18px",
                }}
              >

                <button
                  type="button"
                  className="admin-payment-secondary-button"
                  onClick={() =>
                    handleViewBooking(
                      selectedPayment
                    )
                  }
                >
                  <CalendarCheck
                    size={16}
                  />
                  View Booking
                </button>

                <button
                  type="button"
                  className="admin-payment-secondary-button"
                  onClick={() =>
                    handleViewService(
                      selectedPayment
                    )
                  }
                >
                  <BriefcaseBusiness
                    size={16}
                  />
                  View Service
                </button>

              </div>

              <div className="admin-payment-modal-footer">

                <button
                  type="button"
                  className="admin-payment-secondary-button"
                  onClick={() =>
                    setShowDetailsModal(
                      false
                    )
                  }
                >
                  Close
                </button>

                {selectedPayment.status ===
                  "Refunded" && (
                  <button
                    type="button"
                    className="admin-payment-primary-button"
                    onClick={() =>
                      alert(
                        "Refund transaction details will be connected to the payment gateway later."
                      )
                    }
                  >
                    <RotateCcw
                      size={17}
                    />
                    Refund Details
                  </button>
                )}

              </div>

            </div>

          </div>
        )}

    </div>
  );
}

export default AdminPayments;