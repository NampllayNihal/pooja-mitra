import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Languages,
  Check,
  BookOpen,
} from "lucide-react";

import Logo from "../components/Logo";
import { useLanguage } from "../context/LanguageContext";

import "../styles/priestLanguages.css";

function PriestLanguages() {
  const navigate = useNavigate();
  const location = useLocation();

  const { t } = useLanguage();

  const previousData = location.state?.priestData || {};
  const mobile = location.state?.mobile || previousData.mobile || "";

  const [selectedLanguages, setSelectedLanguages] = useState(
    previousData.languages || []
  );

  const [selectedSpecializations, setSelectedSpecializations] =
    useState(previousData.specializations || []);

  const [errors, setErrors] = useState({});

  /* =========================================
     LANGUAGES
  ========================================= */

  const languages = [
    {
      id: "english",
      label: t("languages.english"),
    },
    {
      id: "telugu",
      label: t("languages.telugu"),
    },
    {
      id: "hindi",
      label: t("languages.hindi"),
    },
    {
      id: "sanskrit",
      label: t("languages.sanskrit"),
    },
    {
      id: "tamil",
      label: t("languages.tamil"),
    },
    {
      id: "kannada",
      label: t("languages.kannada"),
    },
    {
      id: "malayalam",
      label: t("languages.malayalam"),
    },
    {
      id: "marathi",
      label: t("languages.marathi"),
    },
  ];

  /* =========================================
     SPECIALIZATIONS
  ========================================= */

  const specializations = [
    {
      id: "ganapati",
      label: "Ganapati Pooja",
    },
    {
      id: "satyanarayana",
      label: "Satyanarayana Pooja",
    },
    {
      id: "gruhapravesham",
      label: "Gruhapravesham",
    },
    {
      id: "marriage",
      label: "Marriage Ceremonies",
    },
    {
      id: "naming",
      label: "Naming Ceremony",
    },
    {
      id: "upanayanam",
      label: "Upanayanam",
    },
    {
      id: "homam",
      label: "Homam / Havan",
    },
    {
      id: "vastu",
      label: "Vastu Pooja",
    },
    {
      id: "lakshmi",
      label: "Lakshmi Pooja",
    },
    {
      id: "shiva",
      label: "Shiva Pooja",
    },
    {
      id: "durga",
      label: "Durga Pooja",
    },
    {
      id: "other",
      label: t("languages.other"),
    },
  ];

  /* =========================================
     LANGUAGE SELECTION
  ========================================= */

  const toggleLanguage = (id) => {
    setSelectedLanguages((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }

      return [...prev, id];
    });

    setErrors((prev) => ({
      ...prev,
      languages: "",
    }));
  };

  /* =========================================
     SPECIALIZATION SELECTION
  ========================================= */

  const toggleSpecialization = (id) => {
    setSelectedSpecializations((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }

      return [...prev, id];
    });

    setErrors((prev) => ({
      ...prev,
      specializations: "",
    }));
  };

  /* =========================================
     VALIDATION
  ========================================= */

  const validate = () => {
    const newErrors = {};

    if (selectedLanguages.length === 0) {
      newErrors.languages =
        "Please select at least one language";
    }

    if (selectedSpecializations.length === 0) {
      newErrors.specializations =
        "Please select at least one specialization";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =========================================
     NEXT
  ========================================= */

  const handleNext = () => {
    if (!validate()) return;

    const updatedData = {
      ...previousData,
      languages: selectedLanguages,
      specializations: selectedSpecializations,
    };

    navigate("/priest-service-location", {
      state: {
        mobile,
        priestData: updatedData,
      },
    });
  };

  /* =========================================
     BACK
  ========================================= */

  const handleBack = () => {
    navigate("/priest-professional-details", {
      state: {
        mobile,
        priestData: previousData,
      },
    });
  };

  return (
    <div className="priest-languages-page">
      <div className="priest-languages-container">

        {/* =========================================
            HEADER
        ========================================= */}

        <header className="priest-languages-header">

          <button
            type="button"
            className="languages-back-button"
            onClick={handleBack}
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>

          {/* FIXED LOGO */}
          <Logo className="languages-page-logo" />

          <div className="languages-header-spacer"></div>

        </header>

        {/* Progress */}
<div className="languages-progress">

  {/* STEP 1 */}
  <div className="languages-progress-step completed">
    <span>✓</span>
    <p>{t("priest.basicDetails")}</p>
  </div>

  <div className="languages-progress-line active"></div>

  {/* STEP 2 */}
  <div className="languages-progress-step completed">
    <span>✓</span>
    <p>{t("priest.professional")}</p>
  </div>

  <div className="languages-progress-line active"></div>

  {/* STEP 3 */}
  <div className="languages-progress-step active">
    <span>3</span>
    <p>{t("priest.languages")}</p>
  </div>

  <div className="languages-progress-line"></div>

  {/* STEP 4 */}
  <div className="languages-progress-step">
    <span>4</span>
    <p>{t("priest.location")}</p>
  </div>

  <div className="languages-progress-line"></div>

  {/* STEP 5 */}
  <div className="languages-progress-step">
    <span>5</span>
    <p>{t("priest.documents")}</p>
  </div>

</div>

        {/* =========================================
            MAIN CARD
        ========================================= */}

        <main className="priest-languages-card">

          {/* TITLE */}

          <div className="languages-title">

            <div className="languages-icon">
              <Languages size={24} />
            </div>

            <div>
              <h1>{t("languages.title")}</h1>

              <p>
                {t("languages.subtitle")}
              </p>
            </div>

          </div>

          {/* =========================================
              LANGUAGES SECTION
          ========================================= */}

          <section className="selection-section">

            <div className="section-heading">

              <div className="section-heading-icon">
                <Languages size={18} />
              </div>

              <div>
                <h2>
                  {t("languages.spokenLanguages")}
                </h2>

                <p>
                  Select all languages you can communicate
                  with customers in.
                </p>
              </div>

            </div>

            <div className="selection-grid">

              {languages.map((language) => {
                const selected =
                  selectedLanguages.includes(language.id);

                return (
                  <button
                    type="button"
                    key={language.id}
                    className={`selection-card ${
                      selected ? "selected" : ""
                    }`}
                    onClick={() =>
                      toggleLanguage(language.id)
                    }
                  >
                    <span className="selection-check">
                      {selected && <Check size={15} />}
                    </span>

                    <span className="selection-name">
                      {language.label}
                    </span>
                  </button>
                );
              })}

            </div>

            {errors.languages && (
              <p className="selection-error">
                {errors.languages}
              </p>
            )}

            {selectedLanguages.length > 0 && (
              <div className="selected-count">
                {selectedLanguages.length} language
                {selectedLanguages.length > 1 ? "s" : ""} selected
              </div>
            )}

          </section>

          {/* =========================================
              SPECIALIZATION SECTION
          ========================================= */}

          <section className="selection-section specialization-section">

            <div className="section-heading">

              <div className="section-heading-icon">
                <BookOpen size={18} />
              </div>

              <div>
                <h2>
                  {t("languages.specializations")}
                </h2>

                <p>
                  Select the ceremonies and poojas you are
                  experienced in.
                </p>
              </div>

            </div>

            <div className="specialization-grid">

              {specializations.map((specialization) => {
                const selected =
                  selectedSpecializations.includes(
                    specialization.id
                  );

                return (
                  <button
                    type="button"
                    key={specialization.id}
                    className={`specialization-card ${
                      selected ? "selected" : ""
                    }`}
                    onClick={() =>
                      toggleSpecialization(
                        specialization.id
                      )
                    }
                  >
                    <span className="specialization-check">
                      {selected && <Check size={15} />}
                    </span>

                    <span>
                      {specialization.label}
                    </span>
                  </button>
                );
              })}

            </div>

            {errors.specializations && (
              <p className="selection-error">
                {errors.specializations}
              </p>
            )}

            {selectedSpecializations.length > 0 && (
              <div className="selected-count">
                {selectedSpecializations.length} specialization
                {selectedSpecializations.length > 1
                  ? "s"
                  : ""}{" "}
                selected
              </div>
            )}

          </section>

          {/* =========================================
              ACTIONS
          ========================================= */}

          <div className="languages-actions">

            <button
              type="button"
              className="languages-secondary-button"
              onClick={handleBack}
            >
              <ArrowLeft size={18} />
              {t("common.back")}
            </button>

            <button
              type="button"
              className="languages-primary-button"
              onClick={handleNext}
            >
              {t("common.continue")}
              <ArrowRight size={18} />
            </button>

          </div>

          {/* =========================================
              FOOTER
          ========================================= */}

          <div className="languages-footer">

            <span>✦</span>

            <p>
              You can update your languages and
              specializations later from your priest profile.
            </p>

          </div>

        </main>

      </div>
    </div>
  );
}

export default PriestLanguages;