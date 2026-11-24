import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  ClipboardList,
  BriefcaseBusiness,
  Wallet,
  Star,
  UserRound,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

import "../styles/priestPortal.css";

const menuItems = [
  {
    label: "Dashboard",
    path: "/priest-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Bookings",
    path: "/priest-bookings",
    icon: ClipboardList,
  },
  {
    label: "Calendar",
    path: "/priest-calendar",
    icon: CalendarDays,
  },
  {
    label: "My Services",
    path: "/priest-services",
    icon: BriefcaseBusiness,
  },
  {
    label: "Earnings",
    path: "/priest-earnings",
    icon: Wallet,
  },
  {
    label: "Reviews",
    path: "/priest-reviews",
    icon: Star,
  },
  {
    label: "My Profile",
    path: "/priest-profile",
    icon: UserRound,
  },
  {
    label: "Notifications",
    path: "/priest-notifications",
    icon: Bell,
  },
  {
    label: "Settings",
    path: "/priest-settings",
    icon: Settings,
  },
];

export default function PriestLayout({
  title,
  subtitle,
  children,
  profile,
}) {
  const navigate = useNavigate();

  const priest = profile || {
    name: "Ravi Kumar",
    priestType: "Vedic Priest",
    rating: 4.8,
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="priest-app">
      <aside className="priest-sidebar">
        <div className="priest-brand">
          <div className="priest-brand-text">PoojaMitra</div>
          <span>Priest Portal</span>
        </div>

        <div className="priest-side-profile">
          <div className="priest-avatar">
            {priest.name?.charAt(0)?.toUpperCase() || "P"}
          </div>

          <div>
            <h4>{priest.name}</h4>
            <p>{priest.priestType}</p>
          </div>
        </div>

        <nav className="priest-navigation">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `priest-nav-link ${isActive ? "active" : ""}`
                }
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <button className="priest-logout" onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      <main className="priest-main">
        <header className="priest-page-header">
          <div>
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </div>

          <div className="priest-header-user">
            <div className="priest-header-avatar">
              {priest.name?.charAt(0)?.toUpperCase() || "P"}
            </div>

            <div>
              <strong>{priest.name}</strong>
              <span>
                ★ {priest.rating || "4.8"}
              </span>
            </div>
          </div>
        </header>

        <section className="priest-page-content">{children}</section>
      </main>
    </div>
  );
}