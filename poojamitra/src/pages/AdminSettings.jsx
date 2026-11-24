import React, { useState } from "react";
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
  User,
  Lock,
  Globe,
  ShieldCheck,
  BellRing,
  IndianRupee,
  Save,
  Eye,
  EyeOff,
  CheckCircle2,
  ChevronRight,
  Phone,
  Mail,
} from "lucide-react";

import "../styles/adminSettings.css";

const AdminSettings = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    name: "Admin",
    email: "admin@poojamitra.com",
    phone: "+91 98765 43210",
    role: "Super Administrator",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    bookingNotifications: true,
    priestNotifications: true,
    paymentNotifications: true,
    systemNotifications: true,
    smsNotifications: false,
  });

  const [platform, setPlatform] = useState({
    platformName: "PoojaMitra",
    commission: "10",
    currency: "INR",
    language: "English",
  });

  const handleNavigation = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const handleProfileChange = (field, value) => {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswords((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handlePreferenceChange = (field) => {
    setPreferences((current) => ({
      ...current,
      [field]: !current[field],
    }));
  };

  const handlePlatformChange = (field, value) => {
    setPlatform((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const renderToggle = (field) => (
    <button
      type="button"
      className={`settings-toggle ${
        preferences[field] ? "active" : ""
      }`}
      onClick={() => handlePreferenceChange(field)}
      aria-label="Toggle setting"
    >
      <span></span>
    </button>
  );

  return (
    <div className="settings-layout">
      {/* Mobile Overlay */}
      {menuOpen && (
        <div
          className="settings-overlay"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`settings-sidebar ${
          menuOpen ? "settings-mobile-open" : ""
        }`}
      >
        <div className="settings-sidebar-header">
          <div className="settings-brand">
            <span>PoojaMitra</span>
            <small>ADMIN PANEL</small>
          </div>

          <button
            className="settings-mobile-close"
            onClick={() => setMenuOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        <nav className="settings-nav">
          <button
            className="settings-nav-item"
            onClick={() => handleNavigation("/admin-dashboard")}
          >
            <LayoutDashboard size={19} />
            <span>Dashboard</span>
          </button>

          <button
            className="settings-nav-item"
            onClick={() =>
              handleNavigation("/admin-priest-applications")
            }
          >
            <UserCheck size={19} />
            <span>Priest Applications</span>
          </button>

          <button
            className="settings-nav-item"
            onClick={() =>
              handleNavigation("/admin-approved-priests")
            }
          >
            <Users size={19} />
            <span>Approved Priests</span>
          </button>

          <button
            className="settings-nav-item"
            onClick={() => handleNavigation("/admin-customers")}
          >
            <Users size={19} />
            <span>Customers</span>
          </button>

          <button
            className="settings-nav-item"
            onClick={() => handleNavigation("/admin-bookings")}
          >
            <CalendarDays size={19} />
            <span>Bookings</span>
          </button>

          <button
            className="settings-nav-item"
            onClick={() => handleNavigation("/admin-services")}
          >
            <BriefcaseBusiness size={19} />
            <span>Services</span>
          </button>

          <button
            className="settings-nav-item"
            onClick={() => handleNavigation("/admin-interviews")}
          >
            <VideoIcon />
            <span>Interviews</span>
          </button>

          <button
            className="settings-nav-item"
            onClick={() => handleNavigation("/admin-payments")}
          >
            <CreditCard size={19} />
            <span>Payments</span>
          </button>

          <button
            className="settings-nav-item"
            onClick={() => handleNavigation("/admin-reports")}
          >
            <FileText size={19} />
            <span>Reports</span>
          </button>

          <button
            className="settings-nav-item"
            onClick={() =>
              handleNavigation("/admin-notifications")
            }
          >
            <Bell size={19} />
            <span>Notifications</span>
          </button>

          <button
            className="settings-nav-item active"
            onClick={() => handleNavigation("/admin-settings")}
          >
            <Settings size={19} />
            <span>Settings</span>
          </button>
        </nav>

        <div className="settings-sidebar-bottom">
          <button
            className="settings-logout-btn"
            onClick={handleLogout}
          >
            <LogOut size={19} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="settings-main">
        {/* Topbar */}
        <header className="settings-topbar">
          <button
            className="settings-menu-toggle"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={23} />
          </button>

          <div className="settings-topbar-title">
            <h1>Settings</h1>
            <p>Manage your PoojaMitra admin preferences</p>
          </div>

          <div className="settings-topbar-actions">
            <button
              className="settings-notification-btn"
              onClick={() =>
                handleNavigation("/admin-notifications")
              }
            >
              <Bell size={20} />
            </button>

            <button
              className="settings-profile-button"
              onClick={() => setActiveTab("profile")}
            >
              <div className="settings-avatar">A</div>

              <div>
                <strong>Admin</strong>
                <small>Administrator</small>
              </div>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="settings-content">
          <button
            className="settings-back-btn"
            onClick={() =>
              handleNavigation("/admin-dashboard")
            }
          >
            ← Back to Dashboard
          </button>

          {/* Heading */}
          <section className="settings-heading-card">
            <div className="settings-heading-icon">
              <Settings size={24} />
            </div>

            <div>
              <h2>Admin Settings</h2>
              <p>
                Configure your account, notifications, security and
                platform settings.
              </p>
            </div>
          </section>

          {/* Layout */}
          <div className="settings-page-layout">
            {/* Settings Menu */}
            <aside className="settings-tabs">
              <button
                className={
                  activeTab === "profile"
                    ? "settings-tab active"
                    : "settings-tab"
                }
                onClick={() => setActiveTab("profile")}
              >
                <User size={18} />
                <div>
                  <strong>Profile</strong>
                  <span>Admin account details</span>
                </div>
                <ChevronRight size={15} />
              </button>

              <button
                className={
                  activeTab === "security"
                    ? "settings-tab active"
                    : "settings-tab"
                }
                onClick={() => setActiveTab("security")}
              >
                <Lock size={18} />
                <div>
                  <strong>Security</strong>
                  <span>Password and security</span>
                </div>
                <ChevronRight size={15} />
              </button>

              <button
                className={
                  activeTab === "notifications"
                    ? "settings-tab active"
                    : "settings-tab"
                }
                onClick={() => setActiveTab("notifications")}
              >
                <BellRing size={18} />
                <div>
                  <strong>Notifications</strong>
                  <span>Notification preferences</span>
                </div>
                <ChevronRight size={15} />
              </button>

              <button
                className={
                  activeTab === "platform"
                    ? "settings-tab active"
                    : "settings-tab"
                }
                onClick={() => setActiveTab("platform")}
              >
                <Globe size={18} />
                <div>
                  <strong>Platform</strong>
                  <span>Platform configuration</span>
                </div>
                <ChevronRight size={15} />
              </button>
            </aside>

            {/* Settings Content */}
            <section className="settings-panel">
              {/* PROFILE */}
              {activeTab === "profile" && (
                <div className="settings-section">
                  <div className="settings-section-header">
                    <div>
                      <h3>Admin Profile</h3>
                      <p>
                        Update the information associated with your
                        administrator account.
                      </p>
                    </div>

                    <div className="section-header-icon">
                      <User size={19} />
                    </div>
                  </div>

                  <div className="admin-profile-preview">
                    <div className="large-admin-avatar">A</div>

                    <div>
                      <h3>{profile.name}</h3>
                      <p>{profile.role}</p>
                      <span>Administrator Account</span>
                    </div>
                  </div>

                  <div className="settings-form-grid">
                    <div className="settings-form-group">
                      <label>Full Name</label>

                      <div className="settings-input-wrapper">
                        <User size={16} />

                        <input
                          type="text"
                          value={profile.name}
                          onChange={(e) =>
                            handleProfileChange(
                              "name",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="settings-form-group">
                      <label>Email Address</label>

                      <div className="settings-input-wrapper">
                        <Mail size={16} />

                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) =>
                            handleProfileChange(
                              "email",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="settings-form-group">
                      <label>Phone Number</label>

                      <div className="settings-input-wrapper">
                        <Phone size={16} />

                        <input
                          type="text"
                          value={profile.phone}
                          onChange={(e) =>
                            handleProfileChange(
                              "phone",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="settings-form-group">
                      <label>Role</label>

                      <div className="settings-input-wrapper">
                        <ShieldCheck size={16} />

                        <input
                          type="text"
                          value={profile.role}
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  <div className="settings-info-box">
                    <ShieldCheck size={18} />

                    <div>
                      <strong>Administrator Account</strong>
                      <p>
                        Your administrator role is managed by the
                        PoojaMitra backend and cannot be changed from
                        this page.
                      </p>
                    </div>
                  </div>

                  <button
                    className="settings-save-btn"
                    onClick={handleSave}
                  >
                    <Save size={17} />
                    Save Profile
                  </button>
                </div>
              )}

              {/* SECURITY */}
              {activeTab === "security" && (
                <div className="settings-section">
                  <div className="settings-section-header">
                    <div>
                      <h3>Security Settings</h3>
                      <p>
                        Keep your administrator account secure.
                      </p>
                    </div>

                    <div className="section-header-icon">
                      <Lock size={19} />
                    </div>
                  </div>

                  <div className="security-alert">
                    <ShieldCheck size={19} />

                    <div>
                      <strong>Security Recommendation</strong>
                      <p>
                        Use a strong password that contains uppercase,
                        lowercase, numbers and special characters.
                      </p>
                    </div>
                  </div>

                  <div className="password-form">
                    <div className="settings-form-group">
                      <label>Current Password</label>

                      <div className="settings-input-wrapper">
                        <Lock size={16} />

                        <input
                          type={
                            showCurrentPassword
                              ? "text"
                              : "password"
                          }
                          value={passwords.current}
                          onChange={(e) =>
                            handlePasswordChange(
                              "current",
                              e.target.value
                            )
                          }
                          placeholder="Enter current password"
                        />

                        <button
                          type="button"
                          className="password-eye"
                          onClick={() =>
                            setShowCurrentPassword(
                              !showCurrentPassword
                            )
                          }
                        >
                          {showCurrentPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="settings-form-group">
                      <label>New Password</label>

                      <div className="settings-input-wrapper">
                        <Lock size={16} />

                        <input
                          type={
                            showNewPassword
                              ? "text"
                              : "password"
                          }
                          value={passwords.newPassword}
                          onChange={(e) =>
                            handlePasswordChange(
                              "newPassword",
                              e.target.value
                            )
                          }
                          placeholder="Enter new password"
                        />

                        <button
                          type="button"
                          className="password-eye"
                          onClick={() =>
                            setShowNewPassword(
                              !showNewPassword
                            )
                          }
                        >
                          {showNewPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="settings-form-group">
                      <label>Confirm New Password</label>

                      <div className="settings-input-wrapper">
                        <Lock size={16} />

                        <input
                          type={
                            showConfirmPassword
                              ? "text"
                              : "password"
                          }
                          value={passwords.confirm}
                          onChange={(e) =>
                            handlePasswordChange(
                              "confirm",
                              e.target.value
                            )
                          }
                          placeholder="Confirm new password"
                        />

                        <button
                          type="button"
                          className="password-eye"
                          onClick={() =>
                            setShowConfirmPassword(
                              !showConfirmPassword
                            )
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="password-requirements">
                    <h4>Password Requirements</h4>

                    <ul>
                      <li>At least 8 characters</li>
                      <li>One uppercase letter</li>
                      <li>One lowercase letter</li>
                      <li>One number</li>
                      <li>One special character</li>
                    </ul>
                  </div>

                  <button
                    className="settings-save-btn"
                    onClick={handleSave}
                  >
                    <Save size={17} />
                    Update Password
                  </button>
                </div>
              )}

              {/* NOTIFICATIONS */}
              {activeTab === "notifications" && (
                <div className="settings-section">
                  <div className="settings-section-header">
                    <div>
                      <h3>Notification Preferences</h3>
                      <p>
                        Choose which notifications the admin should
                        receive.
                      </p>
                    </div>

                    <div className="section-header-icon">
                      <BellRing size={19} />
                    </div>
                  </div>

                  <div className="preference-list">
                    <div className="preference-item">
                      <div className="preference-icon">
                        <Mail size={18} />
                      </div>

                      <div className="preference-content">
                        <strong>Email Notifications</strong>
                        <span>
                          Receive important admin notifications by
                          email.
                        </span>
                      </div>

                      {renderToggle("emailNotifications")}
                    </div>

                    <div className="preference-item">
                      <div className="preference-icon">
                        <CalendarDays size={18} />
                      </div>

                      <div className="preference-content">
                        <strong>Booking Notifications</strong>
                        <span>
                          Get alerts when bookings are created,
                          confirmed or cancelled.
                        </span>
                      </div>

                      {renderToggle("bookingNotifications")}
                    </div>

                    <div className="preference-item">
                      <div className="preference-icon">
                        <UserCheck size={18} />
                      </div>

                      <div className="preference-content">
                        <strong>Priest Notifications</strong>
                        <span>
                          Receive updates about priest applications,
                          interviews and approvals.
                        </span>
                      </div>

                      {renderToggle("priestNotifications")}
                    </div>

                    <div className="preference-item">
                      <div className="preference-icon">
                        <IndianRupee size={18} />
                      </div>

                      <div className="preference-content">
                        <strong>Payment Notifications</strong>
                        <span>
                          Get alerts for successful, failed and
                          pending payments.
                        </span>
                      </div>

                      {renderToggle("paymentNotifications")}
                    </div>

                    <div className="preference-item">
                      <div className="preference-icon">
                        <Settings size={18} />
                      </div>

                      <div className="preference-content">
                        <strong>System Notifications</strong>
                        <span>
                          Receive important system and maintenance
                          alerts.
                        </span>
                      </div>

                      {renderToggle("systemNotifications")}
                    </div>

                    <div className="preference-item">
                      <div className="preference-icon">
                        <Phone size={18} />
                      </div>

                      <div className="preference-content">
                        <strong>SMS Notifications</strong>
                        <span>
                          Receive critical alerts through SMS.
                        </span>
                      </div>

                      {renderToggle("smsNotifications")}
                    </div>
                  </div>

                  <button
                    className="settings-save-btn"
                    onClick={handleSave}
                  >
                    <Save size={17} />
                    Save Preferences
                  </button>
                </div>
              )}

              {/* PLATFORM */}
              {activeTab === "platform" && (
                <div className="settings-section">
                  <div className="settings-section-header">
                    <div>
                      <h3>Platform Settings</h3>
                      <p>
                        Configure basic PoojaMitra platform
                        preferences.
                      </p>
                    </div>

                    <div className="section-header-icon">
                      <Globe size={19} />
                    </div>
                  </div>

                  <div className="settings-form-grid">
                    <div className="settings-form-group">
                      <label>Platform Name</label>

                      <div className="settings-input-wrapper">
                        <Globe size={16} />

                        <input
                          type="text"
                          value={platform.platformName}
                          onChange={(e) =>
                            handlePlatformChange(
                              "platformName",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="settings-form-group">
                      <label>Currency</label>

                      <div className="settings-input-wrapper">
                        <IndianRupee size={16} />

                        <select
                          value={platform.currency}
                          onChange={(e) =>
                            handlePlatformChange(
                              "currency",
                              e.target.value
                            )
                          }
                        >
                          <option value="INR">
                            INR - Indian Rupee
                          </option>
                          <option value="USD">
                            USD - US Dollar
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="settings-form-group">
                      <label>Platform Commission (%)</label>

                      <div className="settings-input-wrapper">
                        <IndianRupee size={16} />

                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={platform.commission}
                          onChange={(e) =>
                            handlePlatformChange(
                              "commission",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="settings-form-group">
                      <label>Default Language</label>

                      <div className="settings-input-wrapper">
                        <Globe size={16} />

                        <select
                          value={platform.language}
                          onChange={(e) =>
                            handlePlatformChange(
                              "language",
                              e.target.value
                            )
                          }
                        >
                          <option>English</option>
                          <option>Telugu</option>
                          <option>Hindi</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="platform-info-grid">
                    <div className="platform-info-card">
                      <CheckCircle2 size={19} />

                      <div>
                        <strong>Platform Status</strong>
                        <span>Active</span>
                      </div>
                    </div>

                    <div className="platform-info-card">
                      <ShieldCheck size={19} />

                      <div>
                        <strong>Security</strong>
                        <span>Protected</span>
                      </div>
                    </div>

                    <div className="platform-info-card">
                      <Globe size={19} />

                      <div>
                        <strong>Environment</strong>
                        <span>Development</span>
                      </div>
                    </div>
                  </div>

                  <button
                    className="settings-save-btn"
                    onClick={handleSave}
                  >
                    <Save size={17} />
                    Save Platform Settings
                  </button>
                </div>
              )}
            </section>
          </div>

          {/* Saved message */}
          {saved && (
            <div className="settings-saved-message">
              <CheckCircle2 size={18} />
              Settings saved successfully.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

/* Interview icon */
const VideoIcon = () => (
  <span className="settings-video-icon">
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

export default AdminSettings;