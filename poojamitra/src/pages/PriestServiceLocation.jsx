import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Home,
  Navigation,
  CalendarDays,
  Clock3,
  Check,
} from "lucide-react";

import Logo from "../components/Logo";
import { useLanguage } from "../context/LanguageContext";

import "../styles/priestServiceLocation.css";

function PriestServiceLocation() {
  const navigate = useNavigate();
  const location = useLocation();

  const { t } = useLanguage();

  const previousData = location.state?.priestData || {};
  const mobile = location.state?.mobile || previousData.mobile || "";

  const [formData, setFormData] = useState({
    ...previousData,

    state: previousData.serviceState || "",
    city: previousData.serviceCity || "",
    locality: previousData.locality || "",
    radius: previousData.radius || "",
    homeVisit: previousData.homeVisit ?? true,
    templeService: previousData.templeService ?? false,
    selectedDays: previousData.selectedDays || [],
    preferredTime: previousData.preferredTime || "",
  });

  const [errors, setErrors] = useState({});

  const days = [
    { id: "monday", label: "Monday" },
    { id: "tuesday", label: "Tuesday" },
    { id: "wednesday", label: "Wednesday" },
    { id: "thursday", label: "Thursday" },
    { id: "friday", label: "Friday" },
    { id: "saturday", label: "Saturday" },
    { id: "sunday", label: "Sunday" },
  ];

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

  const toggleDay = (day) => {
    setFormData((prev) => {
      const exists = prev.selectedDays.includes(day);

      return {
        ...prev,
        selectedDays: exists
          ? prev.selectedDays.filter((item) => item !== day)
          : [...prev.selectedDays, day],
      };
    });

    setErrors((prev) => ({
      ...prev,
      selectedDays: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.state.trim()) {
      newErrors.state = "Please enter your state";
    }

    if (!formData.city.trim()) {
      newErrors.city = "Please enter your city";
    }

    if (!formData.locality.trim()) {
      newErrors.locality = "Please enter your locality";
    }

    if (!formData.radius) {
      newErrors.radius = "Please select your service radius";
    }

    if (
      !formData.homeVisit &&
      !formData.templeService
    ) {
      newErrors.serviceType =
        "Please select at least one service type";
    }

    if (formData.selectedDays.length === 0) {
      newErrors.selectedDays =
        "Please select at least one available day";
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime =
        "Please select your preferred service time";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;

    const updatedData = {
      ...previousData,

      serviceState: formData.state,
      serviceCity: formData.city,
      locality: formData.locality,
      radius: formData.radius,
      homeVisit: formData.homeVisit,
      templeService: formData.templeService,
      selectedDays: formData.selectedDays,
      preferredTime: formData.preferredTime,
    };

    navigate("/priest-documents", {
      state: {
        mobile,
        priestData: updatedData,
      },
    });
  };

  const handleBack = () => {
    navigate("/priest-languages", {
      state: {
        mobile,
        priestData: previousData,
      },
    });
  };

  return (
    <div className="priest-service-location-page">

      <div className="priest-service-location-container">

        {/* Header */}
        <header className="service-location-header">

          <button
            type="button"
            className="service-location-back"
            onClick={handleBack}
          >
            <ArrowLeft size={20} />
          </button>

          <Logo className="service-location-logo" />

          <div className="service-location-header-spacer"></div>

        </header>

       {/* Progress */}
<div className="service-location-progress">

  {/* STEP 1 */}
  <div className="service-progress-step completed">
    <span>✓</span>
    <p>{t("priest.basicDetails")}</p>
  </div>

  <div className="service-progress-line active"></div>

  {/* STEP 2 */}
  <div className="service-progress-step completed">
    <span>✓</span>
    <p>{t("priest.professional")}</p>
  </div>

  <div className="service-progress-line active"></div>

  {/* STEP 3 */}
  <div className="service-progress-step completed">
    <span>✓</span>
    <p>{t("priest.languages")}</p>
  </div>

  <div className="service-progress-line active"></div>

  {/* STEP 4 */}
  <div className="service-progress-step active">
    <span>4</span>
    <p>{t("priest.location")}</p>
  </div>

  <div className="service-progress-line"></div>

  {/* STEP 5 */}
  <div className="service-progress-step">
    <span>5</span>
    <p>{t("priest.documents")}</p>
  </div>

</div>
        {/* Main Card */}
        <main className="service-location-card">

          {/* Title */}
          <div className="service-location-title">

            <div className="service-location-icon">
              <MapPin size={24} />
            </div>

            <div>
              <h1>
                {t("priest.location")}
              </h1>

              <p>
                Tell us where you provide your priest services
              </p>
            </div>

          </div>

          {/* Location Section */}
          <section className="location-section">

            <div className="location-section-heading">

              <div className="location-heading-icon">
                <Navigation size={18} />
              </div>

              <div>
                <h2>Service Area</h2>
                <p>
                  Customers will see you based on your service
                  location.
                </p>
              </div>

            </div>

            {/* State / City */}
            <div className="location-form-row">

              <div className="location-form-group">

                <label>
                  State <span>*</span>
                </label>

                <div className="location-input">

                  <MapPin size={18} />

                  <input
                    type="text"
                    name="state"
                    placeholder="Example: Telangana"
                    value={formData.state}
                    onChange={handleChange}
                  />

                </div>

                {errors.state && (
                  <small className="location-error">
                    {errors.state}
                  </small>
                )}

              </div>

              <div className="location-form-group">

                <label>
                  City <span>*</span>
                </label>

                <div className="location-input">

                  <Navigation size={18} />

                  <input
                    type="text"
                    name="city"
                    placeholder="Example: Hyderabad"
                    value={formData.city}
                    onChange={handleChange}
                  />

                </div>

                {errors.city && (
                  <small className="location-error">
                    {errors.city}
                  </small>
                )}

              </div>

            </div>

            {/* Locality */}
            <div className="location-form-group">

              <label>
                Locality / Area <span>*</span>
              </label>

              <div className="location-input">

                <MapPin size={18} />

                <input
                  type="text"
                  name="locality"
                  placeholder="Example: Kukatpally, Madhapur, Ameerpet"
                  value={formData.locality}
                  onChange={handleChange}
                />

              </div>

              {errors.locality && (
                <small className="location-error">
                  {errors.locality}
                </small>
              )}

            </div>

            {/* Radius */}
            <div className="location-form-group">

              <label>
                Maximum Service Distance <span>*</span>
              </label>

              <div className="location-input">

                <Navigation size={18} />

                <select
                  name="radius"
                  value={formData.radius}
                  onChange={handleChange}
                >
                  <option value="">
                    Select service radius
                  </option>

                  <option value="5">
                    Up to 5 km
                  </option>

                  <option value="10">
                    Up to 10 km
                  </option>

                  <option value="15">
                    Up to 15 km
                  </option>

                  <option value="25">
                    Up to 25 km
                  </option>

                  <option value="50">
                    Up to 50 km
                  </option>

                  <option value="100">
                    Up to 100 km
                  </option>
                </select>

              </div>

              {errors.radius && (
                <small className="location-error">
                  {errors.radius}
                </small>
              )}

            </div>

          </section>

          {/* Service Type */}
          <section className="location-section service-type-section">

            <div className="location-section-heading">

              <div className="location-heading-icon">
                <Home size={18} />
              </div>

              <div>
                <h2>Service Type</h2>

                <p>
                  Select where you are comfortable providing
                  services.
                </p>
              </div>

            </div>

            <div className="service-type-grid">

              <button
                type="button"
                className={`service-type-card ${
                  formData.homeVisit ? "selected" : ""
                }`}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    homeVisit: !prev.homeVisit,
                  }))
                }
              >

                <div className="service-type-check">
                  {formData.homeVisit && (
                    <Check size={16} />
                  )}
                </div>

                <Home size={21} />

                <div>
                  <strong>Home Visit</strong>
                  <span>
                    Perform pooja at customer's location
                  </span>
                </div>

              </button>

              <button
                type="button"
                className={`service-type-card ${
                  formData.templeService ? "selected" : ""
                }`}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    templeService: !prev.templeService,
                  }))
                }
              >

                <div className="service-type-check">
                  {formData.templeService && (
                    <Check size={16} />
                  )}
                </div>

                <Navigation size={21} />

                <div>
                  <strong>Temple / Venue</strong>
                  <span>
                    Perform services at an agreed venue
                  </span>
                </div>

              </button>

            </div>

            {errors.serviceType && (
              <p className="location-error">
                {errors.serviceType}
              </p>
            )}

          </section>

          {/* Availability */}
          <section className="location-section availability-section">

            <div className="location-section-heading">

              <div className="location-heading-icon">
                <CalendarDays size={18} />
              </div>

              <div>
                <h2>Availability</h2>

                <p>
                  Select the days you normally accept bookings.
                </p>
              </div>

            </div>

            <div className="days-grid">

              {days.map((day) => {
                const selected =
                  formData.selectedDays.includes(day.id);

                return (
                  <button
                    type="button"
                    key={day.id}
                    className={`day-card ${
                      selected ? "selected" : ""
                    }`}
                    onClick={() => toggleDay(day.id)}
                  >

                    <span className="day-check">
                      {selected && <Check size={14} />}
                    </span>

                    <span>{day.label}</span>

                  </button>
                );
              })}

            </div>

            {errors.selectedDays && (
              <p className="location-error">
                {errors.selectedDays}
              </p>
            )}

            {/* Preferred Time */}
            <div className="location-form-group preferred-time">

              <label>
                Preferred Service Time <span>*</span>
              </label>

              <div className="location-input">

                <Clock3 size={18} />

                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                >

                  <option value="">
                    Select preferred time
                  </option>

                  <option value="morning">
                    Morning — 6 AM to 12 PM
                  </option>

                  <option value="afternoon">
                    Afternoon — 12 PM to 4 PM
                  </option>

                  <option value="evening">
                    Evening — 4 PM to 8 PM
                  </option>

                  <option value="flexible">
                    Flexible
                  </option>

                </select>

              </div>

              {errors.preferredTime && (
                <small className="location-error">
                  {errors.preferredTime}
                </small>
              )}

            </div>

          </section>

          {/* Actions */}
          <div className="service-location-actions">

            <button
              type="button"
              className="service-location-secondary"
              onClick={handleBack}
            >
              <ArrowLeft size={18} />
              {t("common.back")}
            </button>

            <button
              type="button"
              className="service-location-primary"
              onClick={handleNext}
            >
              {t("common.continue")}
              <ArrowRight size={18} />
            </button>

          </div>

          {/* Footer */}
          <div className="service-location-footer">
            <span>✦</span>

            <p>
              Your service area helps us show you relevant
              customer booking requests.
            </p>
          </div>

        </main>

      </div>
    </div>
  );
}

export default PriestServiceLocation;