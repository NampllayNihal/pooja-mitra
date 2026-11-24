import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  Check,
  Video,
  Info,
} from "lucide-react";

import Logo from "../components/Logo";

import "../styles/priestInterviewAvailability.css";


function PriestInterviewAvailability() {
  const navigate = useNavigate();
  const location = useLocation();

  const mobile = location.state?.mobile || "";
  const priestData = location.state?.priestData || {};

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlots, setSelectedSlots] = useState([]);

  const [error, setError] = useState("");

  const [submitted, setSubmitted] = useState(false);


  /* =========================================
     AVAILABLE DATES
  ========================================= */

  const getNextDates = () => {
    const dates = [];

    const today = new Date();

    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);

      date.setDate(today.getDate() + i);

      dates.push(date);
    }

    return dates;
  };


  const availableDates = getNextDates();


  /* =========================================
     TIME SLOTS
  ========================================= */

  const timeSlots = [
    "10:00 AM - 10:30 AM",
    "11:00 AM - 11:30 AM",
    "12:00 PM - 12:30 PM",
    "2:00 PM - 2:30 PM",
    "3:00 PM - 3:30 PM",
    "4:00 PM - 4:30 PM",
    "5:00 PM - 5:30 PM",
    "6:00 PM - 6:30 PM",
  ];


  /* =========================================
     FORMAT DATE
  ========================================= */

  const formatDate = (date) => {
    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };


  const getDateValue = (date) => {
    const year = date.getFullYear();

    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };


  /* =========================================
     SELECT TIME
  ========================================= */

  const toggleSlot = (slot) => {
    setError("");

    setSelectedSlots((previous) => {

      if (previous.includes(slot)) {
        return previous.filter(
          (item) => item !== slot
        );
      }

      return [
        ...previous,
        slot,
      ];

    });
  };


  /* =========================================
     SUBMIT
  ========================================= */

  const handleSubmit = () => {

    if (!selectedDate) {
      setError("Please select an interview date.");
      return;
    }

    if (selectedSlots.length === 0) {
      setError(
        "Please select at least one available time slot."
      );
      return;
    }

    setError("");

    /*
      Frontend prototype only.

      Later this data will be sent to the backend.
    */

    const availabilityData = {
      mobile,
      priestData,

      interviewAvailability: {
        date: selectedDate,
        timeSlots: selectedSlots,
      },

      status:
        "INTERVIEW_AVAILABILITY_SUBMITTED",
    };

    console.log(
      "Interview Availability:",
      availabilityData
    );

    setSubmitted(true);
  };


  /* =========================================
     SUCCESS SCREEN
  ========================================= */

  if (submitted) {

    return (
      <div className="interview-availability-page">

        <div className="interview-availability-container">

          <header className="interview-header">

            <div className="interview-header-spacer"></div>

            <Logo />

            <div className="interview-header-spacer"></div>

          </header>


          <main className="interview-success-card">

            <div className="interview-success-icon">
              <Check
                size={34}
                strokeWidth={2.5}
              />
            </div>


            <div className="interview-success-heading">

              <span>
                Priest Verification
              </span>

              <h1>
                Availability Submitted
              </h1>

              <p>
                Your interview availability has been
                submitted successfully.
              </p>

            </div>


            <div className="selected-availability-box">

              <div className="availability-summary-icon">
                <CalendarDays size={20} />
              </div>

              <div>

                <span>
                  Selected Date
                </span>

                <strong>
                  {
                    availableDates
                      .find(
                        (date) =>
                          getDateValue(date) ===
                          selectedDate
                      )
                      ?.toLocaleDateString(
                        "en-IN",
                        {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )
                  }
                </strong>

              </div>

            </div>


            <div className="selected-slots-box">

              <div className="slots-summary-heading">

                <Clock3 size={18} />

                <span>
                  Available Time Slots
                </span>

              </div>


              <div className="selected-slots-list">

                {selectedSlots.map((slot) => (

                  <span
                    key={slot}
                    className="selected-slot"
                  >
                    <Check size={13} />
                    {slot}
                  </span>

                ))}

              </div>

            </div>


            <div className="success-info">

              <Info size={17} />

              <p>
                The PoojaMitra team will review your
                availability and schedule your interview.
                You will receive the interview details after
                confirmation.
              </p>

            </div>


            <button
              type="button"
              className="interview-primary-button"
              onClick={() =>
                navigate("/priest-verification")
              }
            >

              <ArrowLeft size={17} />

              Back to Verification

            </button>


            <div className="interview-footer">

              <span>🔒</span>

              <p>
                Your interview information is handled
                securely.
              </p>

            </div>

          </main>

        </div>

      </div>
    );
  }


  /* =========================================
     MAIN PAGE
  ========================================= */

  return (
    <div className="interview-availability-page">

      <div className="interview-availability-container">

        {/* HEADER */}

        <header className="interview-header">

          <button
            type="button"
            className="interview-back-button"
            onClick={() =>
              navigate("/priest-verification")
            }
          >
            <ArrowLeft size={20} />
          </button>

<Logo className="interview-page-logo" />


          <div className="interview-header-spacer"></div>

        </header>


        {/* PROGRESS */}

        <div className="interview-progress">

          <div className="interview-progress-step completed">

            <span>
              ✓
            </span>

            <p>
              Application
            </p>

          </div>


          <div className="interview-progress-line active"></div>


          <div className="interview-progress-step active">

            <span>
              2
            </span>

            <p>
              Interview Availability
            </p>

          </div>


          <div className="interview-progress-line"></div>


          <div className="interview-progress-step">

            <span>
              3
            </span>

            <p>
              Interview
            </p>

          </div>


          <div className="interview-progress-line"></div>


          <div className="interview-progress-step">

            <span>
              4
            </span>

            <p>
              Approval
            </p>

          </div>

        </div>


        {/* CARD */}

        <main className="interview-availability-card">

          {/* TITLE */}

          <div className="interview-title">

            <div className="interview-title-icon">
              <CalendarDays size={24} />
            </div>

            <div>

              <h1>
                Interview Availability
              </h1>

              <p>
                Tell us when you are available for your
                priest verification interview.
              </p>

            </div>

          </div>


          {/* INFORMATION */}

          <div className="interview-note">

            <Video size={18} />

            <p>
              The interview will normally be conducted
              online through a video call. Please select
              multiple time slots that work for you.
            </p>

          </div>


          {/* DATE */}

          <section className="interview-section">

            <div className="interview-section-heading">

              <div className="section-icon">
                <CalendarDays size={18} />
              </div>

              <div>

                <h2>
                  Select Interview Date
                </h2>

                <p>
                  Choose a date when you are available.
                </p>

              </div>

            </div>


            <div className="date-grid">

              {availableDates.map((date) => {

                const value =
                  getDateValue(date);

                const selected =
                  selectedDate === value;

                return (

                  <button
                    type="button"
                    key={value}
                    className={`date-card ${
                      selected
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedDate(value);
                      setError("");
                    }}
                  >

                    <span className="date-day">
                      {date.toLocaleDateString(
                        "en-IN",
                        {
                          weekday: "short",
                        }
                      )}
                    </span>

                    <strong>
                      {date.getDate()}
                    </strong>

                    <span className="date-month">
                      {date.toLocaleDateString(
                        "en-IN",
                        {
                          month: "short",
                        }
                      )}
                    </span>

                    {selected && (
                      <span className="date-check">
                        <Check size={12} />
                      </span>
                    )}

                  </button>

                );
              })}

            </div>

          </section>


          {/* TIME */}

          <section className="interview-section time-section">

            <div className="interview-section-heading">

              <div className="section-icon">
                <Clock3 size={18} />
              </div>

              <div>

                <h2>
                  Select Available Time Slots
                </h2>

                <p>
                  Select all the time slots that work
                  for you.
                </p>

              </div>

            </div>


            <div className="time-grid">

              {timeSlots.map((slot) => {

                const selected =
                  selectedSlots.includes(slot);

                return (

                  <button
                    type="button"
                    key={slot}
                    className={`time-card ${
                      selected
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      toggleSlot(slot)
                    }
                  >

                    <span className="time-check">

                      {selected && (
                        <Check size={13} />
                      )}

                    </span>

                    <Clock3 size={15} />

                    <span>
                      {slot}
                    </span>

                  </button>

                );

              })}

            </div>


            {selectedSlots.length > 0 && (

              <p className="selected-count">
                {selectedSlots.length} time slot
                {selectedSlots.length > 1
                  ? "s"
                  : ""} selected
              </p>

            )}

          </section>


          {/* ERROR */}

          {error && (

            <div className="interview-error">

              {error}

            </div>

          )}


          {/* ACTIONS */}

          <div className="interview-actions">

            <button
              type="button"
              className="interview-secondary-button"
              onClick={() =>
                navigate("/priest-verification")
              }
            >

              <ArrowLeft size={17} />

              Back

            </button>


            <button
              type="button"
              className="interview-primary-button"
              onClick={handleSubmit}
            >

              Submit Availability

              <ArrowRight size={17} />

            </button>

          </div>


          {/* FOOTER */}

          <div className="interview-footer">

            <span>🔒</span>

            <p>
              Your availability will only be used for
              scheduling your verification interview.
            </p>

          </div>

        </main>

      </div>

    </div>
  );
}


export default PriestInterviewAvailability;