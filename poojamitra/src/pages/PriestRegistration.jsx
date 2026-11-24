import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  UserRound,
  Mail,
  Phone,
  CalendarDays,
  MapPin,
  MapPinned,
  Home,
} from "lucide-react";

import Logo from "../components/Logo";

import "../styles/priestRegistration.css";

function PriestRegistration() {
  const navigate = useNavigate();
  const location = useLocation();

  const mobile = location.state?.mobile || "";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: mobile,
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Please select your date of birth";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select your gender";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Please enter your address";
    }

    if (!formData.city.trim()) {
      newErrors.city = "Please enter your city";
    }

    if (!formData.state.trim()) {
      newErrors.state = "Please enter your state";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Please enter your pincode";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must contain 6 digits";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateForm()) return;

    navigate("/priest-professional-details", {
      state: {
        mobile: formData.mobile,
        priestData: formData,
      },
    });
  };

  return (
    <div className="priest-registration-page">
      <div className="priest-registration-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="priest-registration-header">

          <button
            className="back-button"
            onClick={() => navigate("/login")}
            type="button"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>

          {/* Controlled Priest Registration Logo */}
          <Logo className="priest-registration-logo" />

          <div className="header-spacer"></div>

        </header>

        {/* =================================================
            PROGRESS
        ================================================= */}

        <div className="registration-progress">

          <div className="progress-step active">
            <span>1</span>
            <p>Basic Details</p>
          </div>

          <div className="progress-line"></div>

          <div className="progress-step">
            <span>2</span>
            <p>Professional</p>
          </div>

          <div className="progress-line"></div>

          <div className="progress-step">
            <span>3</span>
            <p>Documents</p>
          </div>

        </div>

        {/* =================================================
            MAIN CARD
        ================================================= */}

        <main className="priest-registration-card">

          {/* TITLE */}

          <div className="registration-title">

            <div className="registration-icon">
              <UserRound size={24} />
            </div>

            <div>
              <h1>Priest Registration</h1>

              <p>
                Let's start with your basic details
              </p>
            </div>

          </div>

          {/* NOTE */}

          <div className="registration-note">

            <span>✦</span>

            <p>
              Please provide accurate information. Your details will be
              reviewed during the verification process.
            </p>

          </div>

          {/* FORM */}

          <form onSubmit={(e) => e.preventDefault()}>

            {/* FULL NAME */}

            <div className="form-group">

              <label>
                Full Name <span>*</span>
              </label>

              <div className="input-wrapper">

                <UserRound size={18} />

                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  autoComplete="name"
                />

              </div>

              {errors.fullName && (
                <small className="error-text">
                  {errors.fullName}
                </small>
              )}

            </div>

            {/* EMAIL */}

            <div className="form-group">

              <label>
                Email Address <span>*</span>
              </label>

              <div className="input-wrapper">

                <Mail size={18} />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />

              </div>

              {errors.email && (
                <small className="error-text">
                  {errors.email}
                </small>
              )}

            </div>

            {/* MOBILE */}

            <div className="form-group">

              <label>
                Mobile Number <span>*</span>
              </label>

              <div className="input-wrapper">

                <Phone size={18} />

                <input
                  type="tel"
                  name="mobile"
                  placeholder="Enter mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                  autoComplete="tel"
                />

              </div>

              <small className="field-hint">
                This number will be used for login and booking communication.
              </small>

              {errors.mobile && (
                <small className="error-text">
                  {errors.mobile}
                </small>
              )}

            </div>

            {/* DOB + GENDER */}

            <div className="form-row">

              <div className="form-group">

                <label>
                  Date of Birth <span>*</span>
                </label>

                <div className="input-wrapper">

                  <CalendarDays size={18} />

                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />

                </div>

                {errors.dateOfBirth && (
                  <small className="error-text">
                    {errors.dateOfBirth}
                  </small>
                )}

              </div>

              <div className="form-group">

                <label>
                  Gender <span>*</span>
                </label>

                <div className="input-wrapper">

                  <UserRound size={18} />

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select gender
                    </option>

                    <option value="male">
                      Male
                    </option>

                    <option value="female">
                      Female
                    </option>

                    <option value="other">
                      Other
                    </option>
                  </select>

                </div>

                {errors.gender && (
                  <small className="error-text">
                    {errors.gender}
                  </small>
                )}

              </div>

            </div>

            {/* ADDRESS */}

            <div className="form-group">

              <label>
                Address <span>*</span>
              </label>

              <div className="input-wrapper textarea-wrapper">

                <Home size={18} />

                <textarea
                  name="address"
                  placeholder="Enter your complete address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                />

              </div>

              {errors.address && (
                <small className="error-text">
                  {errors.address}
                </small>
              )}

            </div>

            {/* CITY + STATE */}

            <div className="form-row">

              <div className="form-group">

                <label>
                  City <span>*</span>
                </label>

                <div className="input-wrapper">

                  <MapPin size={18} />

                  <input
                    type="text"
                    name="city"
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={handleChange}
                    autoComplete="address-level2"
                  />

                </div>

                {errors.city && (
                  <small className="error-text">
                    {errors.city}
                  </small>
                )}

              </div>

              <div className="form-group">

                <label>
                  State <span>*</span>
                </label>

                <div className="input-wrapper">

                  <MapPinned size={18} />

                  <input
                    type="text"
                    name="state"
                    placeholder="Enter state"
                    value={formData.state}
                    onChange={handleChange}
                    autoComplete="address-level1"
                  />

                </div>

                {errors.state && (
                  <small className="error-text">
                    {errors.state}
                  </small>
                )}

              </div>

            </div>

            {/* PINCODE */}

            <div className="form-group pincode-group">

              <label>
                Pincode <span>*</span>
              </label>

              <div className="input-wrapper">

                <MapPin size={18} />

                <input
                  type="text"
                  name="pincode"
                  placeholder="Enter 6-digit pincode"
                  maxLength="6"
                  inputMode="numeric"
                  value={formData.pincode}
                  onChange={(e) => {
                    const value =
                      e.target.value.replace(/\D/g, "");

                    setFormData((prev) => ({
                      ...prev,
                      pincode: value,
                    }));

                    setErrors((prev) => ({
                      ...prev,
                      pincode: "",
                    }));
                  }}
                />

              </div>

              {errors.pincode && (
                <small className="error-text">
                  {errors.pincode}
                </small>
              )}

            </div>

            {/* ACTIONS */}

            <div className="registration-actions">

              <button
                type="button"
                className="secondary-action"
                onClick={() =>
                  navigate("/otp", {
                    state: {
                      mobile: formData.mobile,
                      role: "priest",
                    },
                  })
                }
              >
                <ArrowLeft size={18} />

                Back
              </button>

              <button
                type="button"
                className="primary-action"
                onClick={handleNext}
              >
                Continue

                <ArrowRight size={18} />
              </button>

            </div>

          </form>

          {/* FOOTER */}

          <div className="registration-footer">

            <span>🔒</span>

            Your information is securely handled and used only for
            verification and service purposes.

          </div>

        </main>

      </div>
    </div>
  );
}

export default PriestRegistration;