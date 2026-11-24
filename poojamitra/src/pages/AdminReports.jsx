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
  ChevronRight,
  IndianRupee,
  TrendingUp,
  TrendingDown,
  Download,
  Filter,
  CheckCircle2,
  Clock3,
  XCircle,
  Star,
  BarChart3,
  PieChart,
} from "lucide-react";

import "../styles/adminReports.css";

const AdminReports = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [dateRange, setDateRange] = useState("This Month");
  const [reportType, setReportType] = useState("All Reports");

  const [showFilter, setShowFilter] = useState(false);

  const [bookings] = useState([
    {
      id: "PM-BKG-1001",
      customer: "Priya Sharma",
      priest: "Ravi Kumar",
      service: "Satyanarayana Pooja",
      category: "Pooja",
      amount: 2500,
      commission: 250,
      status: "Completed",
      date: "05 Oct 2026",
    },
    {
      id: "PM-BKG-1002",
      customer: "Rahul Reddy",
      priest: "Suresh Sharma",
      service: "Griha Pravesh",
      category: "Pooja",
      amount: 5000,
      commission: 500,
      status: "Confirmed",
      date: "06 Oct 2026",
    },
    {
      id: "PM-BKG-1003",
      customer: "Ananya Rao",
      priest: "Anil Rao",
      service: "Ganapathi Pooja",
      category: "Pooja",
      amount: 1800,
      commission: 180,
      status: "Completed",
      date: "03 Oct 2026",
    },
    {
      id: "PM-BKG-1004",
      customer: "Vikram Singh",
      priest: "Mohan Das",
      service: "Wedding Pooja",
      category: "Wedding",
      amount: 8500,
      commission: 850,
      status: "Pending",
      date: "07 Oct 2026",
    },
    {
      id: "PM-BKG-1005",
      customer: "Sneha Reddy",
      priest: "Ravi Kumar",
      service: "Lakshmi Pooja",
      category: "Pooja",
      amount: 2200,
      commission: 220,
      status: "Completed",
      date: "01 Oct 2026",
    },
    {
      id: "PM-BKG-1006",
      customer: "Karthik Rao",
      priest: "Suresh Sharma",
      service: "Navagraha Pooja",
      category: "Pooja",
      amount: 3500,
      commission: 350,
      status: "Cancelled",
      date: "28 Sep 2026",
    },
  ]);

  const services = [
    {
      name: "Satyanarayana Pooja",
      category: "Pooja",
      bookings: 42,
      revenue: 105000,
      rating: 4.8,
    },
    {
      name: "Griha Pravesh",
      category: "Pooja",
      bookings: 35,
      revenue: 175000,
      rating: 4.7,
    },
    {
      name: "Ganapathi Pooja",
      category: "Pooja",
      bookings: 28,
      revenue: 50400,
      rating: 4.9,
    },
    {
      name: "Wedding Pooja",
      category: "Wedding",
      bookings: 18,
      revenue: 153000,
      rating: 4.8,
    },
    {
      name: "Lakshmi Pooja",
      category: "Pooja",
      bookings: 24,
      revenue: 52800,
      rating: 4.6,
    },
  ];

  const stats = useMemo(() => {
    const totalRevenue = bookings.reduce(
      (sum, booking) => sum + booking.amount,
      0
    );

    const commission = bookings.reduce(
      (sum, booking) => sum + booking.commission,
      0
    );

    const completed = bookings.filter(
      (booking) => booking.status === "Completed"
    ).length;

    const pending = bookings.filter(
      (booking) => booking.status === "Pending"
    ).length;

    const cancelled = bookings.filter(
      (booking) => booking.status === "Cancelled"
    ).length;

    return {
      totalRevenue,
      commission,
      completed,
      pending,
      cancelled,
    };
  }, [bookings]);

  const handleNavigation = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "status-completed";
      case "Confirmed":
        return "status-confirmed";
      case "Pending":
        return "status-pending";
      case "Cancelled":
        return "status-cancelled";
      default:
        return "";
    }
  };

  const handleDownload = () => {
    alert("Report download will be connected to the backend later.");
  };

  return (
    <div
      className={`admin-layout ${
        sidebarCollapsed ? "sidebar-collapsed" : ""
      }`}
    >
      {/* Mobile Overlay */}
      {menuOpen && (
        <div
          className="admin-overlay"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${menuOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-header">
          <div className="admin-brand">
            <span>PoojaMitra</span>
            <small>ADMIN PANEL</small>
          </div>

          <button
            className="mobile-close-btn"
            onClick={() => setMenuOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        <nav className="admin-nav">
          <button
            className="admin-nav-item"
            onClick={() => handleNavigation("/admin-dashboard")}
          >
            <LayoutDashboard size={19} />
            <span>Dashboard</span>
          </button>

          <button
            className="admin-nav-item"
            onClick={() =>
              handleNavigation("/admin-priest-applications")
            }
          >
            <UserCheck size={19} />
            <span>Priest Applications</span>
          </button>

          <button
            className="admin-nav-item"
            onClick={() =>
              handleNavigation("/admin-approved-priests")
            }
          >
            <Users size={19} />
            <span>Approved Priests</span>
          </button>

          <button
            className="admin-nav-item"
            onClick={() => handleNavigation("/admin-customers")}
          >
            <Users size={19} />
            <span>Customers</span>
          </button>

          <button
            className="admin-nav-item"
            onClick={() => handleNavigation("/admin-bookings")}
          >
            <CalendarDays size={19} />
            <span>Bookings</span>
          </button>

          <button
            className="admin-nav-item"
            onClick={() => handleNavigation("/admin-services")}
          >
            <BriefcaseBusiness size={19} />
            <span>Services</span>
          </button>

          <button
            className="admin-nav-item"
            onClick={() => handleNavigation("/admin-interviews")}
          >
            <VideoIcon />
            <span>Interviews</span>
          </button>

          <button
            className="admin-nav-item"
            onClick={() => handleNavigation("/admin-payments")}
          >
            <CreditCard size={19} />
            <span>Payments</span>
          </button>

          <button
            className="admin-nav-item active"
            onClick={() => handleNavigation("/admin-reports")}
          >
            <FileText size={19} />
            <span>Reports</span>
          </button>

          <button
            className="admin-nav-item"
            onClick={() => handleNavigation("/admin-notifications")}
          >
            <Bell size={19} />
            <span>Notifications</span>
          </button>

          <button
            className="admin-nav-item"
            onClick={() => handleNavigation("/admin-settings")}
          >
            <Settings size={19} />
            <span>Settings</span>
          </button>
        </nav>

        <div className="sidebar-bottom">
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={19} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="admin-main">
        {/* Header */}
        <header className="admin-topbar">
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={23} />
          </button>

          <div className="topbar-title">
            <h1>Reports</h1>
            <p>View and analyze PoojaMitra platform performance</p>
          </div>

          <div className="topbar-actions">
            <button
              className="topbar-icon-btn"
              onClick={() =>
                handleNavigation("/admin-notifications")
              }
              title="Notifications"
            >
              <Bell size={20} />
            </button>

            <button
              className="topbar-profile"
              onClick={() => handleNavigation("/admin-settings")}
            >
              <div className="profile-avatar">A</div>
              <div>
                <strong>Admin</strong>
                <span>Administrator</span>
              </div>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="admin-content">
          {/* Back */}
          <button
            className="back-dashboard-btn"
            onClick={() => handleNavigation("/admin-dashboard")}
          >
            ← Back to Dashboard
          </button>

          {/* Filters */}
          <section className="reports-toolbar">
            <div className="report-heading">
              <div className="heading-icon">
                <BarChart3 size={22} />
              </div>

              <div>
                <h2>Performance Reports</h2>
                <p>Monitor bookings, revenue and services</p>
              </div>
            </div>

            <div className="report-actions">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option>This Week</option>
                <option>This Month</option>
                <option>Last Month</option>
                <option>This Year</option>
              </select>

              <button
                className="filter-btn"
                onClick={() => setShowFilter(!showFilter)}
              >
                <Filter size={17} />
                Filter
              </button>

              <button
                className="download-btn"
                onClick={handleDownload}
              >
                <Download size={17} />
                Export
              </button>
            </div>
          </section>

          {showFilter && (
            <div className="filter-panel">
              <div>
                <label>Report Type</label>

                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                >
                  <option>All Reports</option>
                  <option>Booking Report</option>
                  <option>Revenue Report</option>
                  <option>Customer Report</option>
                  <option>Priest Report</option>
                  <option>Service Report</option>
                </select>
              </div>

              <div>
                <label>Date Range</label>

                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>This Year</option>
                </select>
              </div>
            </div>
          )}

          {/* Stats */}
          <section className="report-stat-grid">
            <div className="report-stat-card">
              <div className="stat-card-top">
                <div className="stat-icon revenue">
                  <IndianRupee size={21} />
                </div>

                <span className="positive-change">
                  <TrendingUp size={14} />
                  12.5%
                </span>
              </div>

              <p>Total Revenue</p>
              <h3>{formatCurrency(stats.totalRevenue)}</h3>
              <span className="stat-description">
                Compared with previous period
              </span>
            </div>

            <div className="report-stat-card">
              <div className="stat-card-top">
                <div className="stat-icon commission">
                  <CreditCard size={21} />
                </div>

                <span className="positive-change">
                  <TrendingUp size={14} />
                  8.2%
                </span>
              </div>

              <p>Platform Commission</p>
              <h3>{formatCurrency(stats.commission)}</h3>
              <span className="stat-description">
                Commission earned
              </span>
            </div>

            <div className="report-stat-card">
              <div className="stat-card-top">
                <div className="stat-icon completed">
                  <CheckCircle2 size={21} />
                </div>

                <span className="positive-change">
                  <TrendingUp size={14} />
                  15.4%
                </span>
              </div>

              <p>Completed Bookings</p>
              <h3>{stats.completed}</h3>
              <span className="stat-description">
                Successfully completed
              </span>
            </div>

            <div className="report-stat-card">
              <div className="stat-card-top">
                <div className="stat-icon pending">
                  <Clock3 size={21} />
                </div>

                <span className="negative-change">
                  <TrendingDown size={14} />
                  3.1%
                </span>
              </div>

              <p>Pending Bookings</p>
              <h3>{stats.pending}</h3>
              <span className="stat-description">
                Awaiting confirmation
              </span>
            </div>
          </section>

          {/* Charts */}
          <section className="report-chart-grid">
            <div className="report-panel">
              <div className="panel-header">
                <div>
                  <h3>Revenue Overview</h3>
                  <p>Revenue performance for {dateRange}</p>
                </div>

                <TrendingUp size={21} />
              </div>

              <div className="simple-chart">
                <div className="chart-y-labels">
                  <span>₹20K</span>
                  <span>₹15K</span>
                  <span>₹10K</span>
                  <span>₹5K</span>
                  <span>₹0</span>
                </div>

                <div className="chart-area">
                  <div className="chart-grid-lines">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  <div className="chart-bars">
                    <div className="chart-column">
                      <div
                        className="bar"
                        style={{ height: "55%" }}
                      ></div>
                      <span>Mon</span>
                    </div>

                    <div className="chart-column">
                      <div
                        className="bar"
                        style={{ height: "72%" }}
                      ></div>
                      <span>Tue</span>
                    </div>

                    <div className="chart-column">
                      <div
                        className="bar"
                        style={{ height: "48%" }}
                      ></div>
                      <span>Wed</span>
                    </div>

                    <div className="chart-column">
                      <div
                        className="bar"
                        style={{ height: "84%" }}
                      ></div>
                      <span>Thu</span>
                    </div>

                    <div className="chart-column">
                      <div
                        className="bar"
                        style={{ height: "66%" }}
                      ></div>
                      <span>Fri</span>
                    </div>

                    <div className="chart-column">
                      <div
                        className="bar"
                        style={{ height: "91%" }}
                      ></div>
                      <span>Sat</span>
                    </div>

                    <div className="chart-column">
                      <div
                        className="bar"
                        style={{ height: "76%" }}
                      ></div>
                      <span>Sun</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="report-panel">
              <div className="panel-header">
                <div>
                  <h3>Booking Status</h3>
                  <p>Current booking distribution</p>
                </div>

                <PieChart size={21} />
              </div>

              <div className="booking-status-chart">
                <div className="donut-chart">
                  <div className="donut-inner">
                    <strong>100</strong>
                    <span>Bookings</span>
                  </div>
                </div>

                <div className="status-legend">
                  <div>
                    <span className="legend-dot completed-dot"></span>
                    <p>Completed</p>
                    <strong>62%</strong>
                  </div>

                  <div>
                    <span className="legend-dot confirmed-dot"></span>
                    <p>Confirmed</p>
                    <strong>18%</strong>
                  </div>

                  <div>
                    <span className="legend-dot pending-dot"></span>
                    <p>Pending</p>
                    <strong>12%</strong>
                  </div>

                  <div>
                    <span className="legend-dot cancelled-dot"></span>
                    <p>Cancelled</p>
                    <strong>8%</strong>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Service Performance */}
          <section className="report-panel service-report-panel">
            <div className="panel-header">
              <div>
                <h3>Top Performing Services</h3>
                <p>Services generating the highest bookings and revenue</p>
              </div>

              <button
                className="view-all-btn"
                onClick={() => handleNavigation("/admin-services")}
              >
                View Services
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="service-report-table-wrapper">
              <table className="service-report-table">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Category</th>
                    <th>Bookings</th>
                    <th>Revenue</th>
                    <th>Rating</th>
                  </tr>
                </thead>

                <tbody>
                  {services.map((service, index) => (
                    <tr key={index}>
                      <td>
                        <div className="service-name-cell">
                          <div className="service-number">
                            {index + 1}
                          </div>

                          <strong>{service.name}</strong>
                        </div>
                      </td>

                      <td>
                        <span className="category-badge">
                          {service.category}
                        </span>
                      </td>

                      <td>{service.bookings}</td>

                      <td className="revenue-cell">
                        {formatCurrency(service.revenue)}
                      </td>

                      <td>
                        <span className="rating-cell">
                          <Star size={15} fill="currentColor" />
                          {service.rating}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Booking Report */}
          <section className="report-panel booking-report-panel">
            <div className="panel-header">
              <div>
                <h3>Booking Report</h3>
                <p>Recent booking activity</p>
              </div>

              <button
                className="view-all-btn"
                onClick={() => handleNavigation("/admin-bookings")}
              >
                View All Bookings
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Desktop */}
            <div className="booking-report-table-wrapper">
              <table className="booking-report-table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Customer</th>
                    <th>Priest</th>
                    <th>Service</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>
                        <strong className="booking-id">
                          {booking.id}
                        </strong>
                      </td>

                      <td>{booking.customer}</td>

                      <td>{booking.priest}</td>

                      <td>{booking.service}</td>

                      <td className="revenue-cell">
                        {formatCurrency(booking.amount)}
                      </td>

                      <td>
                        <span
                          className={`report-status ${getStatusClass(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </span>
                      </td>

                      <td>{booking.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile */}
            <div className="mobile-booking-report">
              {bookings.map((booking) => (
                <div
                  className="mobile-booking-card"
                  key={booking.id}
                >
                  <div className="mobile-booking-top">
                    <strong>{booking.id}</strong>

                    <span
                      className={`report-status ${getStatusClass(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <div className="mobile-booking-details">
                    <div>
                      <span>Customer</span>
                      <strong>{booking.customer}</strong>
                    </div>

                    <div>
                      <span>Priest</span>
                      <strong>{booking.priest}</strong>
                    </div>

                    <div>
                      <span>Service</span>
                      <strong>{booking.service}</strong>
                    </div>

                    <div>
                      <span>Amount</span>
                      <strong>{formatCurrency(booking.amount)}</strong>
                    </div>

                    <div>
                      <span>Date</span>
                      <strong>{booking.date}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Summary */}
          <section className="report-summary-grid">
            <div className="summary-card">
              <div className="summary-icon">
                <Users size={20} />
              </div>

              <div>
                <span>Total Customers</span>
                <strong>248</strong>
                <small>+18 this month</small>
              </div>
            </div>

            <div className="summary-card">
              <div className="summary-icon">
                <UserCheck size={20} />
              </div>

              <div>
                <span>Active Priests</span>
                <strong>16</strong>
                <small>2 newly approved</small>
              </div>
            </div>

            <div className="summary-card">
              <div className="summary-icon">
                <XCircle size={20} />
              </div>

              <div>
                <span>Cancelled Bookings</span>
                <strong>{stats.cancelled}</strong>
                <small>Needs attention</small>
              </div>
            </div>

            <div className="summary-card">
              <div className="summary-icon">
                <Star size={20} />
              </div>

              <div>
                <span>Average Rating</span>
                <strong>4.8</strong>
                <small>Excellent performance</small>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

/* Small reusable icon for the Interviews menu */
const VideoIcon = () => (
  <span className="video-menu-icon">
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="23 7 16 12 23 17 23 7"></polygon>
      <rect
        x="1"
        y="5"
        width="15"
        height="14"
        rx="2"
        ry="2"
      ></rect>
    </svg>
  </span>
);

export default AdminReports;