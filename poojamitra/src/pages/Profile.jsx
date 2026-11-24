import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Pencil,
  Save,
} from "lucide-react";

import "../styles/profile.css";

function Profile() {
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Nihal",
    phone: "+91 98765 43210",
    email: "nihal@example.com",
    address: "Hyderabad, Telangana",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = () => {
    setEditing(false);

    localStorage.setItem(
      "poojamitra_profile",
      JSON.stringify(profile)
    );
  };

  return (
    <div className="profile-page">

      {/* Header */}
      <header className="profile-header">

        <button
          className="profile-back"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={22} />
        </button>

        <h1>My Profile</h1>

        <button
          className="profile-edit-button"
          onClick={() =>
            editing ? saveProfile() : setEditing(true)
          }
        >
          {editing ? (
            <Save size={20} />
          ) : (
            <Pencil size={20} />
          )}
        </button>

      </header>

      <main className="profile-content">

        {/* Profile photo */}
        <section className="profile-photo-section">

          <div className="profile-avatar">
            {profile.name.charAt(0).toUpperCase()}
          </div>

          <h2>{profile.name}</h2>

          <p>Devotee / Customer</p>

        </section>

        {/* Details */}
        <section className="profile-card">

          <div className="profile-field">

            <div className="profile-field-icon">
              <User size={19} />
            </div>

            <div className="profile-field-content">
              <label>Full Name</label>

              {editing ? (
                <input
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                />
              ) : (
                <strong>{profile.name}</strong>
              )}
            </div>

          </div>

          <div className="profile-field">

            <div className="profile-field-icon">
              <Phone size={19} />
            </div>

            <div className="profile-field-content">
              <label>Mobile Number</label>

              <strong>{profile.phone}</strong>
            </div>

          </div>

          <div className="profile-field">

            <div className="profile-field-icon">
              <Mail size={19} />
            </div>

            <div className="profile-field-content">
              <label>Email</label>

              {editing ? (
                <input
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                />
              ) : (
                <strong>{profile.email}</strong>
              )}
            </div>

          </div>

          <div className="profile-field">

            <div className="profile-field-icon">
              <MapPin size={19} />
            </div>

            <div className="profile-field-content">
              <label>Address</label>

              {editing ? (
                <textarea
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  rows="2"
                />
              ) : (
                <strong>{profile.address}</strong>
              )}
            </div>

          </div>

        </section>

        {editing && (
          <button
            className="profile-save-button"
            onClick={saveProfile}
          >
            <Save size={18} />
            Save Changes
          </button>
        )}

      </main>
    </div>
  );
}

export default Profile;