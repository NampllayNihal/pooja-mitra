import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  GraduationCap,
  Clock3,
  BookOpen,
  UserRound,
} from "lucide-react";

import Logo from "../components/Logo";

import "../styles/priestProfessionalDetails.css";

function PriestProfessionalDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const previousData = location.state?.priestData || {};
  const mobile = location.state?.mobile || previousData.mobile || "";

  const [formData, setFormData] = useState({
    ...previousData,
    priestType: "",
    qualification: "",
    experience: "",
    specialization: "",
    description: "",
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

    if (!formData.priestType) {
      newErrors.priestType = "Please select your priest type";
    }

    if (!formData.qualification.trim()) {
      newErrors.qualification = "Please enter your qualification";
    }

    if (!formData.experience) {
      newErrors.experience = "Please select your experience";
    }

    if (!formData.specialization.trim()) {
      newErrors.specialization =
        "Please enter your primary specialization";
    }

    if (!formData.description.trim()) {
      newErrors.description =
        "Please provide a short professional description";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateForm()) return;

    navigate("/priest-languages", {
      state: {
        mobile,
        priestData: formData,
      },
    });
  };

  const handleBack = () => {
    navigate("/priest-registration", {
      state: {
        mobile,
        priestData: previousData,
      },
    });
  };

  return (
    <div className="priest-professional-page">
      <div className="priest-professional-container">

        {/* =========================================
            HEADER
        ========================================= */}

        <header className="priest-professional-header">

          <button
            className="professional-back-button"
            onClick={handleBack}
            type="button"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>

          {/* FIXED LOGO SIZE */}
          <Logo className="professional-page-logo" />

          <div className="professional-header-spacer"></div>

        </header>

        {/* =========================================
            PROGRESS
        ========================================= */}

        <div className="professional-progress">

          <div className="professional-progress-step completed">
            <span>✓</span>
            <p>Basic Details</p>
          </div>

          <div className="professional-progress-line active"></div>

          <div className="professional-progress-step active">
            <span>2</span>
            <p>Professional</p>
          </div>

          <div className="professional-progress-line"></div>

          <div className="professional-progress-step">
            <span>3</span>
            <p>Documents</p>
          </div>

        </div>

        {/* =========================================
            MAIN CARD
        ========================================= */}

        <main className="priest-professional-card">

          {/* TITLE */}

          <div className="professional-title">

            <div className="professional-icon">
              <BriefcaseBusiness size={24} />
            </div>

            <div>
              <h1>Professional Details</h1>
              <p>Tell us about your experience and expertise</p>
            </div>

          </div>

          {/* NOTE */}

          <div className="professional-note">

            <span>✦</span>

            <p>
              These details help us understand your experience and
              match you with suitable pooja services.
            </p>

          </div>

          {/* FORM */}

          <form onSubmit={(e) => e.preventDefault()}>

            {/* PRIEST TYPE */}

            <div className="professional-form-group">

              <label>
                Priest Type <span>*</span>
              </label>

              <div className="professional-input-wrapper">

                <UserRound size={18} />

                <select
                  name="priestType"
                  value={formData.priestType}
                  onChange={handleChange}
                >
                  <option value="">
                    Select priest type
                  </option>

                  <option value="vedic">
                    Vedic Priest
                  </option>

                  <option value="purohit">
                    Purohit
                  </option>

                  <option value="archaka">
                    Archaka
                  </option>

                  <option value="pandit">
                    Pandit
                  </option>

                  <option value="acharya">
                    Acharya
                  </option>

                  <option value="other">
                    Other
                  </option>

                </select>

              </div>

              {errors.priestType && (
                <small className="professional-error">
                  {errors.priestType}
                </small>
              )}

            </div>

            {/* QUALIFICATION */}

            <div className="professional-form-group">

              <label>
                Religious / Vedic Qualification <span>*</span>
              </label>

              <div className="professional-input-wrapper">

                <GraduationCap size={18} />

                <input
                  type="text"
                  name="qualification"
                  placeholder="Example: Veda, Agama, Sanskrit, etc."
                  value={formData.qualification}
                  onChange={handleChange}
                />

              </div>

              {errors.qualification && (
                <small className="professional-error">
                  {errors.qualification}
                </small>
              )}

            </div>

            {/* EXPERIENCE */}

            <div className="professional-form-group">

              <label>
                Years of Experience <span>*</span>
              </label>

              <div className="professional-input-wrapper">

                <Clock3 size={18} />

                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                >
                  <option value="">
                    Select experience
                  </option>

                  <option value="0-2">
                    0 - 2 years
                  </option>

                  <option value="3-5">
                    3 - 5 years
                  </option>

                  <option value="6-10">
                    6 - 10 years
                  </option>

                  <option value="11-15">
                    11 - 15 years
                  </option>

                  <option value="16-20">
                    16 - 20 years
                  </option>

                  <option value="20+">
                    More than 20 years
                  </option>

                </select>

              </div>

              {errors.experience && (
                <small className="professional-error">
                  {errors.experience}
                </small>
              )}

            </div>

            {/* SPECIALIZATION */}

            <div className="professional-form-group">

              <label>
                Primary Specialization <span>*</span>
              </label>

              <div className="professional-input-wrapper">

                <BookOpen size={18} />

                <input
                  type="text"
                  name="specialization"
                  placeholder="Example: Ganapati Pooja, Marriage Rituals"
                  value={formData.specialization}
                  onChange={handleChange}
                />

              </div>

              <small className="professional-hint">
                You can add more specializations in the next step.
              </small>

              {errors.specialization && (
                <small className="professional-error">
                  {errors.specialization}
                </small>
              )}

            </div>

            {/* DESCRIPTION */}

            <div className="professional-form-group">

              <label>
                Professional Description <span>*</span>
              </label>

              <div className="professional-textarea-wrapper">

                <textarea
                  name="description"
                  placeholder="Briefly describe your experience, traditions you follow, and the type of ceremonies you perform..."
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  maxLength="500"
                />

              </div>

              <div className="description-counter">
                {formData.description.length}/500
              </div>

              {errors.description && (
                <small className="professional-error">
                  {errors.description}
                </small>
              )}

            </div>

            {/* ACTIONS */}

            <div className="professional-actions">

              <button
                type="button"
                className="professional-secondary-button"
                onClick={handleBack}
              >
                <ArrowLeft size={18} />
                Back
              </button>

              <button
                type="button"
                className="professional-primary-button"
                onClick={handleNext}
              >
                Continue
                <ArrowRight size={18} />
              </button>

            </div>

          </form>

          {/* FOOTER */}

          <div className="professional-footer">

            <span>🔒</span>

            <p>
              Your professional information will be reviewed as part
              of the priest verification process.
            </p>

          </div>

        </main>

      </div>
    </div>
  );
}

export default PriestProfessionalDetails;