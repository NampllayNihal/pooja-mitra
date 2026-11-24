import { useLocation, useNavigate } from "react-router-dom";

import {
  Check,
  Clock3,
  FileCheck2,
  ShieldCheck,
  CalendarDays,
  ArrowRight,
  Home,
  Phone,
} from "lucide-react";

import Logo from "../components/Logo";
import { useLanguage } from "../context/LanguageContext";

import "../styles/priestVerification.css";


function PriestVerification() {
  const navigate = useNavigate();
  const location = useLocation();

  const { t } = useLanguage();

  const mobile = location.state?.mobile || "";
  const priestData = location.state?.priestData || {};
  const applicationSubmitted =
    location.state?.applicationSubmitted || false;


  /*
    Temporary frontend application ID.

    Later this will come from the backend/database.
  */
  const applicationId =
    location.state?.applicationId ||
    `PM-${Date.now().toString().slice(-6)}`;


  const handleHome = () => {
    navigate("/login");
  };


  return (
    <div className="priest-verification-page">

      <div className="priest-verification-container">

        {/* =========================================
            HEADER
        ========================================= */}

        <header className="priest-verification-header">

          <div className="verification-header-spacer"></div>

          <Logo />

          <div className="verification-header-spacer"></div>

        </header>


        {/* =========================================
            MAIN CARD
        ========================================= */}

        <main className="priest-verification-card">

          {/* Success Icon */}

          <div className="verification-success-icon">
            <Check size={34} strokeWidth={2.5} />
          </div>


          {/* Heading */}

          <div className="verification-heading">

            <span className="verification-small-label">
              PoojaMitra Priest Application
            </span>

            <h1>
              Application Submitted
            </h1>

            <p>
              Thank you for completing your priest registration.
              Your application has been successfully submitted
              for verification.
            </p>

          </div>


          {/* =========================================
              APPLICATION ID
          ========================================= */}

          <div className="application-id-box">

            <div className="application-id-icon">
              <FileCheck2 size={20} />
            </div>

            <div className="application-id-content">

              <span>
                Application ID
              </span>

              <strong>
                {applicationId}
              </strong>

            </div>

          </div>


          {/* =========================================
              STATUS
          ========================================= */}

          <div className="verification-status-box">

            <div className="status-icon">
              <Clock3 size={22} />
            </div>

            <div className="status-content">

              <div className="status-title-row">

                <h2>
                  Verification in Progress
                </h2>

                <span className="status-badge">
                  Under Review
                </span>

              </div>

              <p>
                Our verification team will review the information
                and documents submitted by you.
              </p>

            </div>

          </div>


          {/* =========================================
              VERIFICATION TIMELINE
          ========================================= */}

          <section className="verification-section">

            <div className="verification-section-heading">

              <div className="section-heading-icon">
                <ShieldCheck size={19} />
              </div>

              <div>
                <h2>
                  Verification Process
                </h2>

                <p>
                  Your application will move through the following
                  stages.
                </p>
              </div>

            </div>


            <div className="verification-timeline">

              {/* STEP 1 */}

              <div className="timeline-item completed">

                <div className="timeline-marker">
                  <Check size={15} />
                </div>

                <div className="timeline-content">

                  <h3>
                    Application Submitted
                  </h3>

                  <p>
                    Your priest application and required documents
                    have been submitted successfully.
                  </p>

                  <span className="timeline-status">
                    Completed
                  </span>

                </div>

              </div>


              <div className="timeline-line active"></div>


              {/* STEP 2 */}

              <div className="timeline-item active">

                <div className="timeline-marker">
                  <Clock3 size={15} />
                </div>

                <div className="timeline-content">

                  <h3>
                    Admin Verification
                  </h3>

                  <p>
                    The PoojaMitra team will review your profile,
                    qualifications and submitted documents.
                  </p>

                  <span className="timeline-status">
                    In Progress
                  </span>

                </div>

              </div>


              <div className="timeline-line"></div>


              {/* STEP 3 */}

              <div className="timeline-item">

                <div className="timeline-marker">
                  <CalendarDays size={15} />
                </div>

                <div className="timeline-content">

                  <h3>
                    Interview
                  </h3>

                  <p>
                    If an interview is required, you will be asked
                    to provide your available time slots.
                  </p>

                  <span className="timeline-status">
                    Pending
                  </span>

                </div>

              </div>


              <div className="timeline-line"></div>


              {/* STEP 4 */}

              <div className="timeline-item">

                <div className="timeline-marker">
                  <ShieldCheck size={15} />
                </div>

                <div className="timeline-content">

                  <h3>
                    Final Approval
                  </h3>

                  <p>
                    After successful verification and interview,
                    your priest account can be approved.
                  </p>

                  <span className="timeline-status">
                    Pending
                  </span>

                </div>

              </div>

            </div>

          </section>


          {/* =========================================
              IMPORTANT INFORMATION
          ========================================= */}

          <section className="verification-info-section">

            <div className="verification-info-card">

              <div className="verification-info-icon">
                <Phone size={18} />
              </div>

              <div>

                <h3>
                  Keep your mobile number available
                </h3>

                <p>
                  PoojaMitra may contact you using your registered
                  mobile number for verification or interview
                  scheduling.
                </p>

                {mobile && (
                  <span className="registered-mobile">
                    Registered mobile: {mobile}
                  </span>
                )}

              </div>

            </div>

          </section>


          {/* =========================================
              WHAT HAPPENS NEXT
          ========================================= */}

          <section className="next-steps-section">

            <h2>
              What happens next?
            </h2>

            <div className="next-steps-grid">

              <div className="next-step-card">

                <div className="next-step-number">
                  01
                </div>

                <div>
                  <strong>
                    Application Review
                  </strong>

                  <p>
                    Our team reviews your submitted details
                    and documents.
                  </p>
                </div>

              </div>


              <div className="next-step-card">

                <div className="next-step-number">
                  02
                </div>

                <div>
                  <strong>
                    Interview Scheduling
                  </strong>

                  <p>
                    If required, you will provide your interview
                    availability.
                  </p>
                </div>

              </div>


              <div className="next-step-card">

                <div className="next-step-number">
                  03
                </div>

                <div>
                  <strong>
                    Approval
                  </strong>

                  <p>
                    Once approved, your priest dashboard will
                    become available.
                  </p>
                </div>

              </div>

            </div>

          </section>


          {/* =========================================
              ACTION
          ========================================= */}

          <div className="verification-actions">

           <div className="verification-action-group">

  <button
    type="button"
    className="verification-home-button"
    onClick={() =>
      navigate("/priest-interview-availability", {
        state: {
          mobile,
          priestData,
        },
      })
    }
  >
    <CalendarDays size={18} />

    Provide Interview Availability

    <ArrowRight size={17} />
  </button>

  <button
    type="button"
    className="verification-secondary-button"
    onClick={handleHome}
  >
    <Home size={17} />

    Go to Home
  </button>

</div>

          </div>


          {/* =========================================
              FOOTER
          ========================================= */}

          <div className="verification-footer">

            <ShieldCheck size={14} />

            <p>
              Your application information is handled securely
              by PoojaMitra.
            </p>

          </div>

        </main>

      </div>

    </div>
  );
}


export default PriestVerification;