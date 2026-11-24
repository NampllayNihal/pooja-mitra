import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  CalendarDays,
  ClipboardList,
  Clock3,
  IndianRupee,
  Star,
  UserRound,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  CheckCircle2,
  ChevronRight,
  MapPin,
  Phone,
  CalendarCheck,
  Wallet,
  TrendingUp,
  Users,
  BriefcaseBusiness,
} from "lucide-react";

import "../styles/priestDashboard.css";

function PriestDashboard() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  // =========================================
  // DEMO PRIEST DATA
  // =========================================

  const priest = {
    id: "PM-PRI-1001",
    name: "Ravi Kumar",
    type: "Vedic Priest",
    specialization: "Vedic Pooja",
    location: "Kukatpally, Hyderabad",
    phone: "+91 9876543210",
    rating: 4.8,
    reviews: 126,
    experience: "8 Years",
    status: "Approved",
  };

  // =========================================
  // DASHBOARD STATS
  // =========================================

  const stats = [
    {
      title: "Today's Bookings",
      value: "3",
      subtitle: "1 pending request",
      icon: CalendarCheck,
      path: "/priest-bookings",
    },
    {
      title: "Upcoming Bookings",
      value: "8",
      subtitle: "Next 7 days",
      icon: CalendarDays,
      path: "/priest-bookings",
    },
    {
      title: "Completed",
      value: "84",
      subtitle: "Total services",
      icon: CheckCircle2,
      path: "/priest-bookings",
    },
    {
      title: "Total Earnings",
      value: "₹1,84,500",
      subtitle: "This month",
      icon: IndianRupee,
      path: "/priest-earnings",
    },
  ];

  // =========================================
  // TODAY'S BOOKINGS
  // =========================================

  const todayBookings = [
    {
      id: "PM-BKG-1001",
      customer: "Priya Reddy",
      service: "Satyanarayana Swamy Pooja",
      time: "10:00 AM",
      location: "Kukatpally, Hyderabad",
      amount: "₹2,500",
      status: "Confirmed",
    },
    {
      id: "PM-BKG-1007",
      customer: "Rahul Sharma",
      service: "Griha Pravesh Pooja",
      time: "2:00 PM",
      location: "Madhapur, Hyderabad",
      amount: "₹4,500",
      status: "Pending",
    },
    {
      id: "PM-BKG-1010",
      customer: "Lakshmi Devi",
      service: "Lakshmi Pooja",
      time: "6:30 PM",
      location: "Secunderabad, Hyderabad",
      amount: "₹1,800",
      status: "Confirmed",
    },
  ];

  // =========================================
  // UPCOMING BOOKINGS
  // =========================================

  const upcomingBookings = [
    {
      date: "08 Oct",
      service: "Satyanarayana Swamy Pooja",
      customer: "Priya Reddy",
      time: "10:00 AM",
    },
    {
      date: "10 Oct",
      service: "Griha Pravesh Pooja",
      customer: "Rahul Sharma",
      time: "8:00 AM",
    },
    {
      date: "12 Oct",
      service: "Ganesh Pooja",
      customer: "Arjun Kumar",
      time: "11:00 AM",
    },
  ];

  // =========================================
  // NAVIGATION
  // =========================================

  const handleNavigation = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    setMenuOpen(false);
    navigate("/login");
  };

  // =========================================
  // QUICK ACTIONS
  // =========================================

  const quickActions = [
    {
      title: "Manage Bookings",
      description: "View and manage customer bookings",
      icon: ClipboardList,
      path: "/priest-bookings",
    },
    {
      title: "My Calendar",
      description: "Manage your availability",
      icon: CalendarDays,
      path: "/priest-calendar",
    },
    {
      title: "My Services",
      description: "Manage your pooja services",
      icon: BriefcaseBusiness,
      path: "/priest-services",
    },
    {
      title: "Earnings",
      description: "View earnings and payouts",
      icon: Wallet,
      path: "/priest-earnings",
    },
  ];

  return (
    <div className="priest-dashboard-page">

      {/* =========================================
          MOBILE OVERLAY
      ========================================= */}

      {menuOpen && (
        <div
          className="priest-dashboard-overlay"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* =========================================
          SIDEBAR
      ========================================= */}

      <aside
        className={`priest-dashboard-sidebar ${
          menuOpen ? "open" : ""
        }`}
      >

        {/* BRAND */}

        <div className="priest-dashboard-brand">
          <div>
            <h2>PoojaMitra</h2>
            <span>Priest Portal</span>
          </div>

          <button
            type="button"
            className="priest-mobile-close"
            onClick={() => setMenuOpen(false)}
          >
            <X size={21} />
          </button>
        </div>

        {/* PROFILE */}

        <div className="priest-sidebar-profile">

          <div className="priest-profile-avatar">
            RK
          </div>

          <div>
            <strong>{priest.name}</strong>
            <span>{priest.type}</span>
          </div>

          <CheckCircle2
            size={17}
            className="priest-approved-icon"
          />

        </div>

        {/* NAVIGATION */}

        <nav className="priest-dashboard-navigation">

          <button
            type="button"
            className="priest-nav-item active"
            onClick={() =>
              handleNavigation("/priest-dashboard")
            }
          >
            <LayoutDashboard size={19} />
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            className="priest-nav-item"
            onClick={() =>
              handleNavigation("/priest-bookings")
            }
          >
            <ClipboardList size={19} />
            <span>Bookings</span>

            <span className="priest-nav-badge">
              3
            </span>
          </button>

          <button
            type="button"
            className="priest-nav-item"
            onClick={() =>
              handleNavigation("/priest-calendar")
            }
          >
            <CalendarDays size={19} />
            <span>Calendar</span>
          </button>

          <button
            type="button"
            className="priest-nav-item"
            onClick={() =>
              handleNavigation("/priest-services")
            }
          >
            <BriefcaseBusiness size={19} />
            <span>My Services</span>
          </button>

          <button
            type="button"
            className="priest-nav-item"
            onClick={() =>
              handleNavigation("/priest-earnings")
            }
          >
            <Wallet size={19} />
            <span>Earnings</span>
          </button>

          <button
            type="button"
            className="priest-nav-item"
            onClick={() =>
              handleNavigation("/priest-reviews")
            }
          >
            <Star size={19} />
            <span>Reviews</span>
          </button>

          <button
            type="button"
            className="priest-nav-item"
            onClick={() =>
              handleNavigation("/priest-profile")
            }
          >
            <UserRound size={19} />
            <span>My Profile</span>
          </button>

          <button
            type="button"
            className="priest-nav-item"
            onClick={() =>
              handleNavigation("/priest-notifications")
            }
          >
            <Bell size={19} />
            <span>Notifications</span>

            <span className="priest-nav-badge">
              2
            </span>
          </button>

          <button
            type="button"
            className="priest-nav-item"
            onClick={() =>
              handleNavigation("/priest-settings")
            }
          >
            <Settings size={19} />
            <span>Settings</span>
          </button>

        </nav>

        {/* LOGOUT */}

        <button
          type="button"
          className="priest-dashboard-logout"
          onClick={handleLogout}
        >
          <LogOut size={19} />
          <span>Logout</span>
        </button>

      </aside>

      {/* =========================================
          MAIN
      ========================================= */}

      <main className="priest-dashboard-main">

        {/* HEADER */}

        <header className="priest-dashboard-header">

          <div className="priest-header-left">

            <button
              type="button"
              className="priest-mobile-menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={22} />
            </button>

            <div>
              <h1>Priest Dashboard</h1>

              <p>
                Welcome back, {priest.name}
              </p>
            </div>

          </div>

          <div className="priest-header-actions">

            <button
              type="button"
              className="priest-notification-button"
              onClick={() =>
                handleNavigation(
                  "/priest-notifications"
                )
              }
            >
              <Bell size={20} />

              <span className="priest-notification-dot">
                2
              </span>
            </button>

            <button
              type="button"
              className="priest-header-profile"
              onClick={() =>
                handleNavigation(
                  "/priest-profile"
                )
              }
            >

              <div className="priest-header-avatar">
                RK
              </div>

              <div>
                <strong>
                  {priest.name}
                </strong>

                <span>
                  Approved Priest
                </span>
              </div>

            </button>

          </div>

        </header>

        {/* =========================================
            APPROVAL BANNER
        ========================================= */}

        <section className="priest-approved-banner">

          <div className="priest-approved-banner-icon">
            <CheckCircle2 size={24} />
          </div>

          <div className="priest-approved-banner-content">

            <strong>
              Your Priest Account is Approved
            </strong>

            <p>
              You are verified and can now
              accept customer bookings through
              PoojaMitra.
            </p>

          </div>

          <span className="priest-approved-badge">
            Approved
          </span>

        </section>

        {/* =========================================
            PROFILE SUMMARY
        ========================================= */}

        <section className="priest-welcome-card">

          <div className="priest-welcome-left">

            <div className="priest-large-avatar">
              RK
            </div>

            <div>

              <div className="priest-name-row">

                <h2>
                  {priest.name}
                </h2>

                <CheckCircle2
                  size={18}
                  className="priest-verified-check"
                />

              </div>

              <p>
                {priest.specialization}
              </p>

              <div className="priest-profile-meta">

                <span>
                  <MapPin size={14} />
                  {priest.location}
                </span>

                <span>
                  <Phone size={14} />
                  {priest.phone}
                </span>

                <span>
                  <Clock3 size={14} />
                  {priest.experience}
                </span>

              </div>

            </div>

          </div>

          <button
            type="button"
            className="priest-profile-button"
            onClick={() =>
              handleNavigation(
                "/priest-profile"
              )
            }
          >
            View Profile
            <ChevronRight size={17} />
          </button>

        </section>

        {/* =========================================
            STAT CARDS
        ========================================= */}

        <section className="priest-stat-grid">

          {stats.map((stat) => {

            const Icon = stat.icon;

            return (
              <button
                type="button"
                className="priest-stat-card"
                key={stat.title}
                onClick={() =>
                  handleNavigation(stat.path)
                }
              >

                <div className="priest-stat-top">

                  <div className="priest-stat-icon">
                    <Icon size={20} />
                  </div>

                  <ChevronRight
                    size={17}
                    className="priest-stat-arrow"
                  />

                </div>

                <div className="priest-stat-value">
                  {stat.value}
                </div>

                <div className="priest-stat-title">
                  {stat.title}
                </div>

                <div className="priest-stat-subtitle">
                  {stat.subtitle}
                </div>

              </button>
            );
          })}

        </section>

        {/* =========================================
            MAIN CONTENT GRID
        ========================================= */}

        <section className="priest-dashboard-content-grid">

          {/* TODAY'S BOOKINGS */}

          <div className="priest-dashboard-card priest-today-card">

            <div className="priest-card-header">

              <div>
                <h2>Today's Bookings</h2>

                <p>
                  Your services scheduled for today
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  handleNavigation(
                    "/priest-bookings"
                  )
                }
              >
                View All
                <ChevronRight size={16} />
              </button>

            </div>

            <div className="priest-booking-list">

              {todayBookings.map((booking) => (

                <div
                  className="priest-booking-item"
                  key={booking.id}
                >

                  <div className="priest-booking-time">
                    <Clock3 size={15} />
                    <strong>
                      {booking.time}
                    </strong>
                  </div>

                  <div className="priest-booking-details">

                    <strong>
                      {booking.service}
                    </strong>

                    <span>
                      <Users size={14} />
                      {booking.customer}
                    </span>

                    <span>
                      <MapPin size={14} />
                      {booking.location}
                    </span>

                  </div>

                  <div className="priest-booking-right">

                    <strong>
                      {booking.amount}
                    </strong>

                    <span
                      className={`priest-booking-status ${
                        booking.status
                          .toLowerCase()
                          .replace(" ", "-")
                      }`}
                    >
                      {booking.status}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* EARNINGS SUMMARY */}

          <div className="priest-dashboard-card priest-earnings-card">

            <div className="priest-card-header">

              <div>
                <h2>Earnings</h2>

                <p>
                  Current month overview
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  handleNavigation(
                    "/priest-earnings"
                  )
                }
              >
                Details
                <ChevronRight size={16} />
              </button>

            </div>

            <div className="priest-earnings-total">

              <span>Total Earnings</span>

              <strong>
                ₹1,84,500
              </strong>

              <div className="priest-earnings-growth">
                <TrendingUp size={15} />
                +18.5% from last month
              </div>

            </div>

            <div className="priest-earnings-breakdown">

              <div>
                <span>
                  Completed Services
                </span>

                <strong>
                  ₹1,62,000
                </strong>
              </div>

              <div>
                <span>
                  Pending Payout
                </span>

                <strong>
                  ₹22,500
                </strong>
              </div>

            </div>

            <div className="priest-earnings-progress">

              <div className="priest-progress-label">

                <span>
                  Monthly Target
                </span>

                <strong>
                  82%
                </strong>

              </div>

              <div className="priest-progress-track">
                <div
                  className="priest-progress-fill"
                  style={{
                    width: "82%",
                  }}
                />
              </div>

              <span className="priest-progress-note">
                ₹40,500 more to reach ₹2,25,000
              </span>

            </div>

          </div>

        </section>

        {/* =========================================
            UPCOMING + QUICK ACTIONS
        ========================================= */}

        <section className="priest-dashboard-lower-grid">

          {/* UPCOMING */}

          <div className="priest-dashboard-card">

            <div className="priest-card-header">

              <div>
                <h2>Upcoming Bookings</h2>

                <p>
                  Your next scheduled services
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  handleNavigation(
                    "/priest-calendar"
                  )
                }
              >
                Calendar
                <ChevronRight size={16} />
              </button>

            </div>

            <div className="priest-upcoming-list">

              {upcomingBookings.map(
                (booking) => (

                  <button
                    type="button"
                    className="priest-upcoming-item"
                    key={`${booking.date}-${booking.customer}`}
                    onClick={() =>
                      handleNavigation(
                        "/priest-bookings"
                      )
                    }
                  >

                    <div className="priest-upcoming-date">
                      <strong>
                        {booking.date.split(" ")[0]}
                      </strong>

                      <span>
                        {booking.date.split(" ")[1]}
                      </span>
                    </div>

                    <div className="priest-upcoming-details">

                      <strong>
                        {booking.service}
                      </strong>

                      <span>
                        {booking.customer}
                      </span>

                    </div>

                    <div className="priest-upcoming-time">
                      <Clock3 size={14} />
                      {booking.time}
                    </div>

                    <ChevronRight size={17} />

                  </button>

                )
              )}

            </div>

          </div>

          {/* QUICK ACTIONS */}

          <div className="priest-dashboard-card">

            <div className="priest-card-header">

              <div>
                <h2>Quick Actions</h2>

                <p>
                  Manage your priest account
                </p>
              </div>

            </div>

            <div className="priest-quick-actions">

              {quickActions.map((action) => {

                const Icon = action.icon;

                return (
                  <button
                    type="button"
                    className="priest-quick-action"
                    key={action.title}
                    onClick={() =>
                      handleNavigation(
                        action.path
                      )
                    }
                  >

                    <div className="priest-quick-icon">
                      <Icon size={19} />
                    </div>

                    <div>
                      <strong>
                        {action.title}
                      </strong>

                      <span>
                        {action.description}
                      </span>
                    </div>

                    <ChevronRight
                      size={17}
                    />

                  </button>
                );
              })}

            </div>

          </div>

        </section>

        {/* =========================================
            RATING CARD
        ========================================= */}

        <section className="priest-rating-card">

          <div className="priest-rating-left">

            <div className="priest-rating-icon">
              <Star size={22} />
            </div>

            <div>

              <h3>
                Your Customer Rating
              </h3>

              <p>
                Keep providing excellent service
                to maintain your rating.
              </p>

            </div>

          </div>

          <div className="priest-rating-score">

            <strong>
              {priest.rating}
            </strong>

            <div>

              <div className="priest-stars">
                <Star size={15} fill="currentColor" />
                <Star size={15} fill="currentColor" />
                <Star size={15} fill="currentColor" />
                <Star size={15} fill="currentColor" />
                <Star size={15} fill="currentColor" />
              </div>

              <span>
                {priest.reviews} reviews
              </span>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              handleNavigation(
                "/priest-reviews"
              )
            }
          >
            View Reviews
            <ChevronRight size={16} />
          </button>

        </section>

      </main>

    </div>
  );
}

export default PriestDashboard;