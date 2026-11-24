import React, { useState } from "react";
import {
  UserRound,
  MapPin,
  Languages,
  BriefcaseBusiness,
  Save,
} from "lucide-react";

import PriestLayout from "../components/PriestLayout";
import {
  getPriestData,
  updateProfile,
} from "../utils/priestStore";

export default function PriestProfile() {
  const initial = getPriestData();

  const [data, setData] = useState(initial);

  const [form, setForm] = useState({
    ...initial.profile,
    languages: initial.profile.languages.join(", "),
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveProfile = () => {
    const updated = updateProfile({
      ...form,
      experience: Number(form.experience),
      languages: form.languages
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    });

    setData(updated);

    alert("Profile updated successfully.");
  };

  return (
    <PriestLayout
      title="My Profile"
      subtitle="Manage your priest profile and professional information"
      profile={data.profile}
    >
      <div className="profile-layout">
        <div className="priest-card profile-summary-card">
          <div className="large-priest-avatar">
            {form.name.charAt(0)}
          </div>

          <h2>{form.name}</h2>

          <span>{form.priestType}</span>

          <div className="profile-rating">
            ★ {form.rating} ({form.reviews} reviews)
          </div>

          <div className="approved-profile">
            ✓ Verified & Approved
          </div>
        </div>

        <div className="priest-card">
          <div className="priest-card-title">
            <div>
              <h2>Professional Details</h2>
              <p>
                Information shown to customers.
              </p>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input
                value={form.name}
                onChange={(e) =>
                  handleChange("name", e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                value={form.phone}
                disabled
              />
              <small>
                Phone number cannot be changed here.
              </small>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                value={form.email}
                onChange={(e) =>
                  handleChange("email", e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Priest Type</label>
              <input
                value={form.priestType}
                onChange={(e) =>
                  handleChange(
                    "priestType",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="form-group">
              <label>Specialization</label>
              <input
                value={form.specialization}
                onChange={(e) =>
                  handleChange(
                    "specialization",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="form-group">
              <label>Experience</label>
              <input
                type="number"
                value={form.experience}
                onChange={(e) =>
                  handleChange(
                    "experience",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="form-group">
              <label>City</label>
              <input
                value={form.city}
                onChange={(e) =>
                  handleChange("city", e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Locality</label>
              <input
                value={form.locality}
                onChange={(e) =>
                  handleChange(
                    "locality",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="form-group">
              <label>Service Radius</label>
              <select
                value={form.serviceRadius}
                onChange={(e) =>
                  handleChange(
                    "serviceRadius",
                    e.target.value
                  )
                }
              >
                <option>5 KM</option>
                <option>10 KM</option>
                <option>15 KM</option>
                <option>20 KM</option>
                <option>30 KM</option>
              </select>
            </div>

            <div className="form-group">
              <label>Languages</label>
              <div className="input-icon">
                <Languages size={17} />
                <input
                  value={form.languages}
                  onChange={(e) =>
                    handleChange(
                      "languages",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            <div className="form-group full">
              <label>Qualification</label>
              <input
                value={form.qualification}
                onChange={(e) =>
                  handleChange(
                    "qualification",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="form-group full">
              <label>About Me</label>
              <textarea
                rows="5"
                value={form.bio}
                onChange={(e) =>
                  handleChange("bio", e.target.value)
                }
              />
            </div>
          </div>

          <div className="form-footer">
            <button
              className="primary-btn"
              onClick={saveProfile}
            >
              <Save size={17} />
              Save Profile
            </button>
          </div>
        </div>
      </div>

      <div className="profile-info-cards">
        <div>
          <UserRound size={20} />
          <strong>Verified Identity</strong>
          <span>Identity verification completed.</span>
        </div>

        <div>
          <BriefcaseBusiness size={20} />
          <strong>Professional Profile</strong>
          <span>Approved by PoojaMitra admin.</span>
        </div>

        <div>
          <MapPin size={20} />
          <strong>Service Area</strong>
          <span>
            {form.locality}, {form.city}
          </span>
        </div>
      </div>
    </PriestLayout>
  );
}