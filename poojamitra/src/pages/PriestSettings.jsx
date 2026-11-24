import React, { useState } from "react";
import {
  Bell,
  MessageSquare,
  Mail,
  Save,
  ShieldCheck,
  Globe,
} from "lucide-react";

import PriestLayout from "../components/PriestLayout";
import {
  getPriestData,
  updateSettings,
} from "../utils/priestStore";

export default function PriestSettings() {
  const initial = getPriestData();

  const [data, setData] = useState(initial);
  const [settings, setSettings] = useState(
    initial.settings
  );

  const update = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const save = () => {
    const updated = updateSettings(settings);
    setData(updated);

    alert("Settings saved successfully.");
  };

  return (
    <PriestLayout
      title="Settings"
      subtitle="Manage your notification and account preferences"
      profile={data.profile}
    >
      <div className="settings-grid">
        <div className="priest-card">
          <div className="priest-card-title">
            <div>
              <h2>Notification Preferences</h2>
              <p>
                Choose which notifications you want
                to receive.
              </p>
            </div>
          </div>

          <div className="settings-list">
            <SettingRow
              icon={<Bell />}
              title="Booking Notifications"
              description="Receive alerts for new and updated bookings."
              checked={settings.bookingNotifications}
              onChange={(value) =>
                update(
                  "bookingNotifications",
                  value
                )
              }
            />

            <SettingRow
              icon={<ShieldCheck />}
              title="Payment Notifications"
              description="Receive notifications when payments are processed."
              checked={settings.paymentNotifications}
              onChange={(value) =>
                update(
                  "paymentNotifications",
                  value
                )
              }
            />

            <SettingRow
              icon={<MessageSquare />}
              title="Review Notifications"
              description="Get notified when customers leave reviews."
              checked={settings.reviewNotifications}
              onChange={(value) =>
                update(
                  "reviewNotifications",
                  value
                )
              }
            />

            <SettingRow
              icon={<MessageSquare />}
              title="SMS Notifications"
              description="Receive important updates through SMS."
              checked={settings.smsNotifications}
              onChange={(value) =>
                update("smsNotifications", value)
              }
            />

            <SettingRow
              icon={<Mail />}
              title="Email Notifications"
              description="Receive account and booking updates by email."
              checked={settings.emailNotifications}
              onChange={(value) =>
                update(
                  "emailNotifications",
                  value
                )
              }
            />
          </div>
        </div>

        <div className="priest-card">
          <div className="priest-card-title">
            <div>
              <h2>Booking Preferences</h2>
              <p>
                Control how booking requests are handled.
              </p>
            </div>
          </div>

          <SettingRow
            icon={<ShieldCheck />}
            title="Auto Accept Bookings"
            description="Automatically accept eligible booking requests."
            checked={settings.autoAccept}
            onChange={(value) =>
              update("autoAccept", value)
            }
          />

          <div className="language-setting">
            <div className="setting-icon">
              <Globe size={20} />
            </div>

            <div className="setting-text">
              <strong>Preferred Language</strong>
              <span>
                Select the language used in your portal.
              </span>
            </div>

            <select
              value={settings.language}
              onChange={(e) =>
                update(
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

      <div className="settings-security priest-card">
        <ShieldCheck size={26} />

        <div>
          <h3>Account Security</h3>
          <p>
            Your account is protected using OTP-based
            authentication. Password management is not
            required for your priest account.
          </p>
        </div>
      </div>

      <div className="settings-save">
        <button
          className="primary-btn"
          onClick={save}
        >
          <Save size={17} />
          Save Settings
        </button>
      </div>
    </PriestLayout>
  );
}

function SettingRow({
  icon,
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="setting-row">
      <div className="setting-icon">{icon}</div>

      <div className="setting-text">
        <strong>{title}</strong>
        <span>{description}</span>
      </div>

      <label className="switch">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) =>
            onChange(e.target.checked)
          }
        />

        <span />
      </label>
    </div>
  );
}