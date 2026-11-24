import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Bell,
  Globe,
  Shield,
  FileText,
  LogOut,
  ChevronRight,
} from "lucide-react";

import "../styles/settings.css";
import LanguageSelector from "../components/LanguageSelector";

function Settings() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("poojamitra_profile");
    localStorage.removeItem("poojamitra_bookings");

    navigate("/login", { replace: true });
  };

  return (
    <div className="settings-page">

      {/* Header */}
      <header className="settings-header">

        <button
          className="settings-back"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={22} />
        </button>

        <h1>Settings</h1>

        <div className="settings-header-space"></div>

      </header>

      <main className="settings-content">

        {/* Preferences */}
        <section className="settings-section">

          <h2>Preferences</h2>

          <div className="settings-card">

            {/* Notifications */}
            <div className="setting-row">

              <div className="setting-icon">
                <Bell size={19} />
              </div>

              <div className="setting-info">
                <strong>Notifications</strong>
                <span>
                  Receive booking and service updates
                </span>
              </div>

              <label className="switch">

                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) =>
                    setNotifications(e.target.checked)
                  }
                />

                <span className="slider"></span>

              </label>

            </div>

            {/* Language */}
            <button className="setting-row setting-button">

              <div className="setting-icon">
                <Globe size={19} />
              </div>

              <div className="setting-info">
                <strong>Language</strong>
                <span>English</span>
              </div>

              <ChevronRight size={18} />

            </button>

          </div>

        </section>

        {/* Privacy */}
        <section className="settings-section">

          <h2>Privacy & Legal</h2>

          <div className="settings-card">

            <button className="setting-row setting-button">

              <div className="setting-icon">
                <Shield size={19} />
              </div>

              <div className="setting-info">
                <strong>Privacy</strong>
                <span>
                  Manage privacy information
                </span>
              </div>

              <ChevronRight size={18} />

            </button>

            <button className="setting-row setting-button">

              <div className="setting-icon">
                <FileText size={19} />
              </div>

              <div className="setting-info">
                <strong>Terms & Conditions</strong>
                <span>
                  Read PoojaMitra terms
                </span>
              </div>

              <ChevronRight size={18} />

            </button>

          </div>

        </section>

        {/* Logout */}
        <section className="settings-section">

          <div className="settings-card">

            <button
              className="logout-row"
              onClick={handleLogout}
            >

              <div className="logout-icon">
                <LogOut size={19} />
              </div>

              <div>
                <strong>Logout</strong>
                <span>
                  Sign out from PoojaMitra
                </span>
              </div>

            </button>

          </div>

        </section>
        <div className="settings-language-row">
  <div>
    <h3>Language</h3>
    <p>Choose your preferred language</p>
  </div>

  <LanguageSelector />
</div>

        <p className="settings-version">
          PoojaMitra
          <br />
          Version 1.0.0
        </p>

      </main>

    </div>
    
  );
}

export default Settings;