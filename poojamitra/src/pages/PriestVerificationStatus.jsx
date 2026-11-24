import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  CheckCircle2,
  Clock3,
  FileCheck2,
  ShieldCheck,
  ArrowLeft,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

import Logo from "../components/Logo";

import "../styles/priestVerificationStatus.css";


function PriestVerificationStatus() {
  const navigate = useNavigate();

  const [status] = useState("under_review");


  const goBack = () => {
    navigate("/priest-interview-scheduled");
  };


  const refreshStatus = () => {
    // Backend status checking will be connected later.
    window.location.reload();
  };


  return (
    <main className="priest-verification-status-page">

      <div className="priest-verification-status-container">

        {/* =========================================
            HEADER
        ========================================= */}

        <header className="verification-status-header">

          <button
            type="button"
            className="verification-back-button"
            onClick={goBack}
          >
            <ArrowLeft size={20} />
          </button>


          <Logo className="verification-status-logo" />


          <div className="verification-header-spacer"></div>

        </header>


        {/* =========================================
            PROGRESS
        ========================================= */}

        <div className="verification-progress">

          <div className="verification-progress-step completed">

            <span>
              ✓
            </span>

            <p>
              Application
            </p>

          </div>


          <div className="verification-progress-line completed-line"></div>


          <div className="verification-progress-step completed">

            <span>
              ✓
            </span>

            <p>
              Interview
            </p>

          </div>


          <div className="verification-progress-line active-line"></div>


          <div className="verification-progress-step active">

            <span>
              3
            </span>

            <p>
              Verification
            </p>

          </div>


          <div className="verification-progress-line"></div>


          <div className="verification-progress-step">

            <span>
              4
            </span>

            <p>
              Approval
            </p>

          </div>

        </div>


        {/* =========================================
            MAIN CARD
        ========================================= */}

        <section className="verification-status-card">

          {/* =========================================
              STATUS ICON
          ========================================= */}

          <div className="verification-main-icon">

            <Clock3 size={38} />

          </div>


          {/* =========================================
              HEADING
          ========================================= */}

          <span className="verification-status-label">
            VERIFICATION STATUS
          </span>


          <h1>
            Application Under Review
          </h1>


          <p className="verification-description">
            Thank you for completing your PoojaMitra
            priest verification interview. Our verification
            team is now reviewing your application and
            submitted documents.
          </p>


          {/* =========================================
              STATUS BADGE
          ========================================= */}

          <div className="verification-status-badge">

            <span className="verification-status-dot"></span>

            Under Review

          </div>


          {/* =========================================
              TIMELINE
          ========================================= */}

          <div className="verification-timeline">

            {/* Application */}

            <div className="verification-timeline-item completed">

              <div className="timeline-icon">

                <CheckCircle2 size={18} />

              </div>


              <div className="timeline-content">

                <h3>
                  Application Submitted
                </h3>

                <p>
                  Your priest registration and documents
                  have been successfully submitted.
                </p>

              </div>

            </div>


            {/* Interview */}

            <div className="verification-timeline-item completed">

              <div className="timeline-icon">

                <CheckCircle2 size={18} />

              </div>


              <div className="timeline-content">

                <h3>
                  Interview Completed
                </h3>

                <p>
                  Your priest verification interview has
                  been completed successfully.
                </p>

              </div>

            </div>


            {/* Current */}

            <div className="verification-timeline-item current">

              <div className="timeline-icon">

                <Clock3 size={18} />

              </div>


              <div className="timeline-content">

                <h3>
                  Admin Verification
                </h3>

                <p>
                  The PoojaMitra team is reviewing your
                  application and verification details.
                </p>

                <span className="current-status">
                  Currently in progress
                </span>

              </div>

            </div>


            {/* Approval */}

            <div className="verification-timeline-item">

              <div className="timeline-icon">

                <ShieldCheck size={18} />

              </div>


              <div className="timeline-content">

                <h3>
                  Final Approval
                </h3>

                <p>
                  Once approved, you will receive access
                  to your Priest Dashboard.
                </p>

              </div>

            </div>

          </div>


          {/* =========================================
              INFORMATION CARDS
          ========================================= */}

          <div className="verification-information-grid">

            <div className="verification-information-card">

              <div className="verification-information-icon">

                <FileCheck2 size={19} />

              </div>


              <div>

                <h3>
                  Documents
                </h3>

                <p>
                  Your submitted documents are being
                  reviewed by the verification team.
                </p>

              </div>

            </div>


            <div className="verification-information-card">

              <div className="verification-information-icon">

                <ShieldCheck size={19} />

              </div>


              <div>

                <h3>
                  Secure Verification
                </h3>

                <p>
                  Your verification information is handled
                  securely by PoojaMitra.
                </p>

              </div>

            </div>

          </div>


          {/* =========================================
              IMPORTANT NOTE
          ========================================= */}

          <div className="verification-note">

            <AlertCircle size={18} />

            <p>
              Please wait for the verification result.
              If additional information is required,
              PoojaMitra will notify you through the
              registered mobile number and application.
            </p>

          </div>


          {/* =========================================
              ACTIONS
          ========================================= */}

          <div className="verification-actions">

            <button
              type="button"
              className="verification-secondary-button"
              onClick={goBack}
            >
              <ArrowLeft size={17} />
              Interview Details
            </button>


            <button
              type="button"
              className="verification-primary-button"
              onClick={refreshStatus}
            >
              <RefreshCw size={17} />
              Check Status
            </button>

          </div>


          {/* =========================================
              FOOTER
          ========================================= */}

          <div className="verification-footer">

            <ShieldCheck size={14} />

            <p>
              Your priest application is securely processed
              by PoojaMitra.
            </p>

          </div>

        </section>

      </div>

    </main>
  );
}


export default PriestVerificationStatus;