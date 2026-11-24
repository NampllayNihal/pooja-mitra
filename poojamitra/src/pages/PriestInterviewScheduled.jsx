import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  Video,
  MapPin,
  CheckCircle2,
  Info,
  ExternalLink,
  Phone,
} from "lucide-react";

import Logo from "../components/Logo";

import "../styles/priestInterviewScheduled.css";


function PriestInterviewScheduled() {
  const navigate = useNavigate();

  /* =========================================
     DEMO INTERVIEW DATA
     Later this will come from backend/admin
  ========================================= */

  const interview = {
    date: "Tuesday, 13 October 2026",
    time: "11:00 AM - 11:30 AM",
    mode: "Online Video Interview",
    meetingLink: "https://meet.jit.si/PoojaMitraPriestInterview",
  };


  const handleJoinInterview = () => {
    window.open(
      interview.meetingLink,
      "_blank",
      "noopener,noreferrer"
    );
  };


  return (
    <main className="interview-scheduled-page">

      <div className="interview-scheduled-container">

        {/* =========================================
            HEADER
        ========================================= */}

        <header className="scheduled-header">

          <button
            type="button"
            className="scheduled-back-button"
            onClick={() =>
              navigate("/priest-interview-availability")
            }
          >
            <ArrowLeft size={20} />
          </button>


          <Logo className="scheduled-page-logo" />


          <div className="scheduled-header-spacer"></div>

        </header>


        {/* =========================================
            PROGRESS
        ========================================= */}

        <div className="scheduled-progress">

          <div className="scheduled-progress-step completed">

            <span>
              ✓
            </span>

            <p>
              Application
            </p>

          </div>


          <div className="scheduled-progress-line completed"></div>


          <div className="scheduled-progress-step completed">

            <span>
              ✓
            </span>

            <p>
              Availability
            </p>

          </div>


          <div className="scheduled-progress-line active"></div>


          <div className="scheduled-progress-step active">

            <span>
              3
            </span>

            <p>
              Interview
            </p>

          </div>


          <div className="scheduled-progress-line"></div>


          <div className="scheduled-progress-step">

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

        <section className="scheduled-card">

          {/* SUCCESS ICON */}

          <div className="scheduled-success-icon">

            <CheckCircle2
              size={38}
              strokeWidth={2}
            />

          </div>


          {/* TITLE */}

          <div className="scheduled-title">

            <span>
              INTERVIEW CONFIRMED
            </span>

            <h1>
              Your Interview is Scheduled
            </h1>

            <p>
              Your priest verification interview has been
              scheduled by the PoojaMitra team.
            </p>

          </div>


          {/* =========================================
              INTERVIEW DETAILS
          ========================================= */}

          <div className="scheduled-details">

            {/* DATE */}

            <div className="scheduled-detail-item">

              <div className="scheduled-detail-icon">
                <CalendarDays size={21} />
              </div>

              <div>

                <span>
                  Interview Date
                </span>

                <strong>
                  {interview.date}
                </strong>

              </div>

            </div>


            {/* TIME */}

            <div className="scheduled-detail-item">

              <div className="scheduled-detail-icon">
                <Clock3 size={21} />
              </div>

              <div>

                <span>
                  Interview Time
                </span>

                <strong>
                  {interview.time}
                </strong>

              </div>

            </div>


            {/* MODE */}

            <div className="scheduled-detail-item">

              <div className="scheduled-detail-icon">
                <Video size={21} />
              </div>

              <div>

                <span>
                  Interview Mode
                </span>

                <strong>
                  {interview.mode}
                </strong>

              </div>

            </div>

          </div>


          {/* =========================================
              JOIN BUTTON
          ========================================= */}

          <button
            type="button"
            className="join-interview-button"
            onClick={handleJoinInterview}
          >

            <Video size={19} />

            Join Interview

            <ExternalLink size={16} />

          </button>


          <p className="join-note">
            The interview link will be active around the
            scheduled interview time.
          </p>


          {/* =========================================
              INSTRUCTIONS
          ========================================= */}

          <div className="interview-instructions">

            <div className="instructions-heading">

              <div className="instructions-icon">
                <Info size={18} />
              </div>

              <div>

                <h2>
                  Interview Instructions
                </h2>

                <p>
                  Please keep these points in mind.
                </p>

              </div>

            </div>


            <ul>

              <li>
                Please join the interview a few minutes
                before the scheduled time.
              </li>

              <li>
                Keep your original identification documents
                available if requested.
              </li>

              <li>
                Make sure you have a stable internet
                connection.
              </li>

              <li>
                Please join from a quiet and well-lit place.
              </li>

              <li>
                Be prepared to explain your experience,
                traditions and areas of specialization.
              </li>

            </ul>

          </div>


          {/* =========================================
              SUPPORT
          ========================================= */}

          <div className="scheduled-support">

            <Phone size={17} />

            <p>
              Need help with your interview?
            </p>

            <button
              type="button"
              onClick={() => {
                alert(
                  "PoojaMitra support will be available soon."
                );
              }}
            >
              Contact Support
            </button>

          </div>


          {/* =========================================
              BOTTOM ACTION
          ========================================= */}

          <div className="scheduled-actions">

            <button
              type="button"
              className="scheduled-secondary-button"
              onClick={() =>
                navigate("/priest-verification")
              }
            >

              <ArrowLeft size={17} />

              Verification Status

            </button>


            <button
              type="button"
              className="scheduled-primary-button"
              onClick={handleJoinInterview}
            >

              Join Interview

              <ArrowRight size={17} />

            </button>

          </div>


          {/* =========================================
              FOOTER
          ========================================= */}

          <div className="scheduled-footer">

            <span>
              🔒
            </span>

            <p>
              Your interview information is securely
              handled by PoojaMitra.
            </p>

          </div>

        </section>

      </div>

    </main>
  );
}


export default PriestInterviewScheduled;