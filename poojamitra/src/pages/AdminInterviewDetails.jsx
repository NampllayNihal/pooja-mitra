import { useState } from "react";
import {
  ArrowLeft,
  UserRound,
  Phone,
  CalendarDays,
  Clock3,
  Video,
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ExternalLink,
  Save,
  MapPin,
  BriefcaseBusiness,
  RotateCcw,
  LayoutDashboard,
  Users,
  CalendarCheck,
  CreditCard,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/adminInterviewDetails.css";

function AdminInterviewDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const interviewFromList =
    location.state?.interview || null;

  const [interview, setInterview] = useState({
    id:
      interviewFromList?.id ||
      "INT-1001",

    applicationId:
      interviewFromList?.applicationId ||
      "PM-PRI-1002",

    priestName:
      interviewFromList?.priestName ||
      "Suresh Sharma",

    phone:
      interviewFromList?.phone ||
      "+91 9123456780",

    email:
      interviewFromList?.email ||
      "sureshsharma@example.com",

    specialization:
      interviewFromList?.specialization ||
      "Marriage Ceremonies",

    date:
      interviewFromList?.date ||
      "06 Oct 2026",

    time:
      interviewFromList?.time ||
      "11:00 AM",

    mode:
      interviewFromList?.mode ||
      "Video Interview",

    status:
      interviewFromList?.status ||
      "Scheduled",

    result:
      interviewFromList?.result ||
      "",

    meetingLink:
      interviewFromList?.meetingLink ||
      "https://meet.jit.si/PoojaMitraPriestInterview",

    location:
      interviewFromList?.location ||
      "Hyderabad, Telangana",

    experience:
      interviewFromList?.experience ||
      "8 Years",

    priestType:
      interviewFromList?.priestType ||
      "Vedic Priest",

    notes:
      interviewFromList?.notes ||
      "",
  });

  const [selectedResult, setSelectedResult] =
    useState(interview.result || "");

  const [notes, setNotes] = useState(
    interview.notes || ""
  );

  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] =
    useState(false);

  const [savedResult, setSavedResult] =
    useState(interview.result || "");

  const [showReschedule, setShowReschedule] =
    useState(false);

  const [rescheduleDate, setRescheduleDate] =
    useState("");

  const [rescheduleTime, setRescheduleTime] =
    useState("");

  const [rescheduleMessage, setRescheduleMessage] =
    useState("");

  const [showAdditionalInfo, setShowAdditionalInfo] =
    useState(false);

  const [
    additionalInfoMessage,
    setAdditionalInfoMessage,
  ] = useState("");

  const [showRejectConfirm, setShowRejectConfirm] =
    useState(false);

  const [actionMessage, setActionMessage] =
    useState("");

  /*
   * An interview is considered fully completed only
   * when the result is Passed or Failed.
   *
   * "Additional Information" remains an active
   * verification state.
   */
  const isCompleted =
    interview.status === "Completed" &&
    (interview.result === "Passed" ||
      interview.result === "Failed");

  const clearMessages = () => {
    setActionMessage("");
    setSaved(false);
    setRescheduleMessage("");
  };

  /*
   * COMPLETE INTERVIEW
   */
  const handleSaveResult = () => {
    if (!selectedResult) {
      alert("Please select an interview result.");
      return;
    }

    if (!notes.trim()) {
      alert("Please enter interview notes.");
      return;
    }

    if (selectedResult === "Additional Information") {
      alert(
        "Use 'Request Additional Information' to record this result."
      );
      return;
    }

    setIsSaving(true);
    clearMessages();

    setTimeout(() => {
      setInterview((previous) => ({
        ...previous,
        status: "Completed",
        result: selectedResult,
        notes: notes.trim(),
      }));

      setSavedResult(selectedResult);
      setSaved(true);
      setIsSaving(false);

      setActionMessage(
        `Interview completed successfully with result: ${selectedResult}`
      );
    }, 500);
  };

  /*
   * JOIN VIDEO INTERVIEW
   */
  const handleJoinInterview = () => {
    if (!interview.meetingLink) {
      alert("Interview meeting link is not available.");
      return;
    }

    window.open(
      interview.meetingLink,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /*
   * VIEW PRIEST APPLICATION
   */
  const handleViewApplication = () => {
    navigate(
      "/admin-priest-application-details",
      {
        state: {
          application: {
            id: interview.applicationId,
            name: interview.priestName,
            phone: interview.phone,
            specialization:
              interview.specialization,

            status:
              interview.result === "Passed"
                ? "Under Review"
                : interview.result ===
                    "Additional Information"
                  ? "Additional Information Required"
                  : interview.result === "Failed"
                    ? "Interview Failed"
                    : "Interview Scheduled",
          },
        },
      }
    );
  };

  /*
   * VIEW INTERVIEW LIST
   */
  const handleBackToInterviews = () => {
    navigate("/admin-interviews");
  };

  /*
   * RESCHEDULE INTERVIEW
   */
  const handleReschedule = () => {
    if (!rescheduleDate || !rescheduleTime) {
      alert("Please select both date and time.");
      return;
    }

    setInterview((previous) => ({
      ...previous,
      date: rescheduleDate,
      time: rescheduleTime,
      status: "Scheduled",
      result: "",
      notes: "",
    }));

    setSelectedResult("");
    setSavedResult("");
    setSaved(false);

    setRescheduleMessage(
      "Interview rescheduled successfully."
    );

    setShowReschedule(false);

    setTimeout(() => {
      setRescheduleMessage("");
    }, 4000);
  };

  /*
   * REQUEST ADDITIONAL INFORMATION
   *
   * Important:
   * This does NOT mark the interview as Completed.
   * It remains in an information-required state.
   */
  const handleRequestAdditionalInformation = () => {
    if (!additionalInfoMessage.trim()) {
      alert(
        "Please enter the information required from the priest."
      );
      return;
    }

    setInterview((previous) => ({
      ...previous,
      status: "Additional Information Required",
      result: "Additional Information",
      notes: additionalInfoMessage.trim(),
    }));

    setSelectedResult("Additional Information");
    setSavedResult("Additional Information");
    setNotes(additionalInfoMessage.trim());

    setShowAdditionalInfo(false);

    setActionMessage(
      "Additional information request recorded successfully."
    );

    setTimeout(() => {
      setActionMessage("");
    }, 4000);
  };

  /*
   * MARK INTERVIEW AS FAILED
   */
  const handleRejectInterview = () => {
    setInterview((previous) => ({
      ...previous,
      status: "Completed",
      result: "Failed",
      notes:
        notes.trim() ||
        "Interview was unsuccessful.",
    }));

    setSelectedResult("Failed");
    setSavedResult("Failed");

    setShowRejectConfirm(false);

    setActionMessage(
      "Interview marked as failed. The application can now be reviewed for rejection."
    );

    setTimeout(() => {
      setActionMessage("");
    }, 4000);
  };

  /*
   * ADMIN SIDEBAR NAVIGATION
   */
  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="admin-interview-details-page">

      {/* SIDEBAR */}
      <aside className="admin-interview-details-sidebar">

        <div className="admin-interview-details-brand">
          <h2>PoojaMitra</h2>
          <span>Admin Panel</span>
        </div>

        <nav className="admin-interview-details-navigation">

          <button
            type="button"
            className="admin-interview-details-nav-item"
            onClick={() =>
              handleNavigation("/admin-dashboard")
            }
          >
            <LayoutDashboard size={19} />
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            className="admin-interview-details-nav-item"
            onClick={() =>
              handleNavigation(
                "/admin-priest-applications"
              )
            }
          >
            <UserRound size={19} />
            <span>Priest Applications</span>
          </button>

          <button
            type="button"
            className="admin-interview-details-nav-item"
            onClick={() =>
              handleNavigation(
                "/admin-approved-priests"
              )
            }
          >
            <Users size={19} />
            <span>Approved Priests</span>
          </button>

          <button
            type="button"
            className="admin-interview-details-nav-item"
            onClick={() =>
              handleNavigation(
                "/admin-customers"
              )
            }
          >
            <UserRound size={19} />
            <span>Customers</span>
          </button>

          <button
            type="button"
            className="admin-interview-details-nav-item"
            onClick={() =>
              handleNavigation(
                "/admin-bookings"
              )
            }
          >
            <CalendarCheck size={19} />
            <span>Bookings</span>
          </button>

          <button
            type="button"
            className="admin-interview-details-nav-item"
            onClick={() =>
              handleNavigation(
                "/admin-services"
              )
            }
          >
            <BriefcaseBusiness size={19} />
            <span>Services</span>
          </button>

          <button
            type="button"
            className="admin-interview-details-nav-item active"
          >
            <Video size={19} />
            <span>Interviews</span>
          </button>

          <button
            type="button"
            className="admin-interview-details-nav-item"
            onClick={() =>
              handleNavigation(
                "/admin-payments"
              )
            }
          >
            <CreditCard size={19} />
            <span>Payments</span>
          </button>

          <button
            type="button"
            className="admin-interview-details-nav-item"
            onClick={() =>
              handleNavigation(
                "/admin-reports"
              )
            }
          >
            <FileText size={19} />
            <span>Reports</span>
          </button>

          <button
            type="button"
            className="admin-interview-details-nav-item"
            onClick={() =>
              handleNavigation(
                "/admin-notifications"
              )
            }
          >
            <Bell size={19} />
            <span>Notifications</span>
          </button>

          <button
            type="button"
            className="admin-interview-details-nav-item"
            onClick={() =>
              handleNavigation(
                "/admin-settings"
              )
            }
          >
            <Settings size={19} />
            <span>Settings</span>
          </button>

        </nav>

        <button
          type="button"
          className="admin-interview-details-logout"
          onClick={handleLogout}
        >
          <LogOut size={19} />
          <span>Logout</span>
        </button>

      </aside>

      {/* MAIN */}
      <main className="admin-interview-details-main">

        {/* HEADER */}
        <header className="admin-interview-details-header">

          <div className="admin-interview-details-header-left">

            <button
              type="button"
              className="admin-interview-details-back"
              onClick={handleBackToInterviews}
              aria-label="Back to interviews"
            >
              <ArrowLeft size={20} />
            </button>

            <div>
              <h1>Interview Details</h1>

              <p>
                Review and record priest interview
                results
              </p>
            </div>

          </div>

          <div className="interview-reference">
            {interview.id}
          </div>

        </header>

        {/* ACTION MESSAGE */}
        {actionMessage && (
          <div className="saved-message">
            <CheckCircle2 size={17} />
            {actionMessage}
          </div>
        )}

        {rescheduleMessage && (
          <div className="saved-message">
            <CheckCircle2 size={17} />
            {rescheduleMessage}
          </div>
        )}

        {/* INTERVIEW STATUS */}
        <section className="interview-status-banner">

          <div className="interview-status-left">

            <div className="interview-status-icon">
              <Video size={22} />
            </div>

            <div>
              <strong>Interview Status</strong>

              <span>
                {interview.status}
              </span>
            </div>

          </div>

          {interview.status ===
            "Scheduled" ? (
            <span className="scheduled-label">
              <Clock3 size={14} />
              Scheduled
            </span>
          ) : interview.status ===
              "Additional Information Required" ? (
            <span className="scheduled-label">
              <AlertCircle size={14} />
              Information Required
            </span>
          ) : (
            <span className="completed-label">
              <CheckCircle2 size={14} />
              Completed
            </span>
          )}

        </section>

        {/* PRIEST INFORMATION */}
        <section className="admin-interview-section">

          <div className="admin-interview-section-heading">

            <div className="admin-interview-section-icon">
              <UserRound size={19} />
            </div>

            <div>
              <h2>Priest Information</h2>

              <p>
                Priest details related to this
                interview
              </p>
            </div>

          </div>

          <div className="priest-profile-card">

            <div className="large-priest-avatar">
              {interview.priestName
                .split(" ")
                .map((word) => word[0])
                .join("")
                .substring(0, 2)}
            </div>

            <div className="priest-profile-main">

              <h3>
                {interview.priestName}
              </h3>

              <span className="priest-type">
                {interview.priestType}
              </span>

              <div className="priest-contact">

                <span>
                  <Phone size={14} />
                  {interview.phone}
                </span>

                <span>
                  {interview.email}
                </span>

              </div>

            </div>

            <div className="priest-profile-actions">

              <button
                type="button"
                onClick={handleViewApplication}
              >
                <FileText size={15} />
                View Application
              </button>

            </div>

          </div>

        </section>

        {/* INTERVIEW INFORMATION */}
        <section className="admin-interview-section">

          <div className="admin-interview-section-heading">

            <div className="admin-interview-section-icon">
              <CalendarDays size={19} />
            </div>

            <div>
              <h2>Interview Information</h2>

              <p>
                Scheduled interview details
              </p>
            </div>

          </div>

          <div className="interview-information-grid">

            <div className="interview-information-item">
              <label>Interview ID</label>
              <strong>{interview.id}</strong>
            </div>

            <div className="interview-information-item">
              <label>Application ID</label>
              <strong>
                {interview.applicationId}
              </strong>
            </div>

            <div className="interview-information-item">
              <label>Date</label>

              <strong className="with-icon">
                <CalendarDays size={15} />
                {interview.date}
              </strong>
            </div>

            <div className="interview-information-item">
              <label>Time</label>

              <strong className="with-icon">
                <Clock3 size={15} />
                {interview.time}
              </strong>
            </div>

            <div className="interview-information-item">
              <label>Interview Mode</label>

              <strong className="with-icon">
                <Video size={15} />
                {interview.mode}
              </strong>
            </div>

            <div className="interview-information-item">
              <label>Priest Location</label>

              <strong className="with-icon">
                <MapPin size={15} />
                {interview.location}
              </strong>
            </div>

          </div>

          <div className="meeting-box">

            <div>
              <span>Interview Meeting</span>

              <strong>
                Video meeting room is ready
              </strong>
            </div>

            <button
              type="button"
              onClick={handleJoinInterview}
              className="join-interview-button"
            >
              <Video size={17} />
              Join Interview
              <ExternalLink size={14} />
            </button>

          </div>

        </section>

        {/* PROFESSIONAL INFORMATION */}
        <section className="admin-interview-section">

          <div className="admin-interview-section-heading">

            <div className="admin-interview-section-icon">
              <BriefcaseBusiness size={19} />
            </div>

            <div>
              <h2>Professional Information</h2>

              <p>
                Information useful during the
                interview
              </p>
            </div>

          </div>

          <div className="professional-info-grid">

            <div>
              <label>Specialization</label>

              <strong>
                {interview.specialization}
              </strong>
            </div>

            <div>
              <label>Experience</label>

              <strong>
                {interview.experience}
              </strong>
            </div>

          </div>

        </section>

        {/* INTERVIEW ACTIONS */}
        {!isCompleted && (
          <section className="admin-interview-section">

            <div className="admin-interview-section-heading">

              <div className="admin-interview-section-icon">
                <Clock3 size={19} />
              </div>

              <div>
                <h2>Interview Actions</h2>

                <p>
                  Manage the scheduled interview
                </p>
              </div>

            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginTop: "18px",
              }}
            >

              <button
                type="button"
                className="join-interview-button"
                onClick={handleJoinInterview}
              >
                <Video size={17} />
                Join Interview
              </button>

              <button
                type="button"
                className="join-interview-button"
                onClick={() =>
                  setShowReschedule(true)
                }
              >
                <RotateCcw size={17} />
                Reschedule
              </button>

              <button
                type="button"
                className="join-interview-button"
                onClick={() =>
                  setShowAdditionalInfo(true)
                }
              >
                <AlertCircle size={17} />
                Request Additional Information
              </button>

            </div>

          </section>
        )}

        {/* INTERVIEW RESULT */}
        <section className="admin-interview-section result-section">

          <div className="admin-interview-section-heading">

            <div className="admin-interview-section-icon">
              <CheckCircle2 size={19} />
            </div>

            <div>
              <h2>Interview Result</h2>

              <p>
                Record the final result after
                completing the interview
              </p>
            </div>

          </div>

          <div className="result-options">

            {/* PASSED */}
            <button
              type="button"
              className={`result-option passed ${
                selectedResult === "Passed"
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                setSelectedResult("Passed")
              }
              disabled={isCompleted}
            >
              <div className="result-option-icon">
                <CheckCircle2 size={22} />
              </div>

              <div>
                <strong>Passed</strong>

                <span>
                  Priest successfully passed
                  the interview
                </span>
              </div>
            </button>

            {/* ADDITIONAL INFORMATION */}
            <button
              type="button"
              className={`result-option additional ${
                selectedResult ===
                "Additional Information"
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                setShowAdditionalInfo(true)
              }
              disabled={isCompleted}
            >
              <div className="result-option-icon">
                <AlertCircle size={22} />
              </div>

              <div>
                <strong>
                  Additional Information
                  Required
                </strong>

                <span>
                  More documents or information
                  are needed
                </span>
              </div>
            </button>

            {/* FAILED */}
            <button
              type="button"
              className={`result-option failed ${
                selectedResult === "Failed"
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                setSelectedResult("Failed")
              }
              disabled={isCompleted}
            >
              <div className="result-option-icon">
                <XCircle size={22} />
              </div>

              <div>
                <strong>Failed</strong>

                <span>
                  Priest did not pass the
                  interview
                </span>
              </div>
            </button>

          </div>

          <div className="interview-notes">

            <label>
              Interview Notes
            </label>

            <textarea
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
              disabled={isCompleted}
              placeholder="Enter important observations, verification notes, qualification details, communication skills, or other interview remarks..."
            />

          </div>

          {selectedResult && (
            <div className="selected-result-preview">
              <strong>
                Selected Result:
              </strong>{" "}
              {selectedResult}
            </div>
          )}

          {!isCompleted && (
            <div className="save-result-area">

              <button
                type="button"
                className="save-result-button"
                onClick={handleSaveResult}
                disabled={isSaving}
              >
                <Save size={17} />

                {isSaving
                  ? "Saving..."
                  : "Complete Interview & Save Result"}
              </button>

            </div>
          )}

          {saved && (
            <div className="saved-message">
              <CheckCircle2 size={17} />
              Interview result saved
              successfully.
            </div>
          )}

          {/* PASSED NEXT STEP */}
          {savedResult === "Passed" && (
            <div className="result-next-step passed-next">

              <CheckCircle2 size={17} />

              <div>
                <strong>
                  Next Step: Admin Approval
                </strong>

                <p>
                  The priest has passed the
                  interview. The application can
                  now proceed to final admin
                  verification and approval.
                </p>

                <button
                  type="button"
                  onClick={handleViewApplication}
                >
                  Review Application
                </button>

              </div>

            </div>
          )}

          {/* ADDITIONAL INFORMATION NEXT STEP */}
          {savedResult ===
            "Additional Information" && (
            <div className="result-next-step additional-next">

              <AlertCircle size={17} />

              <div>
                <strong>
                  Next Step: Additional
                  Information
                </strong>

                <p>
                  The priest needs to provide
                  additional documents or
                  information before the
                  application can proceed.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setShowAdditionalInfo(true)
                  }
                >
                  View Information Request
                </button>

              </div>

            </div>
          )}

          {/* FAILED NEXT STEP */}
          {savedResult === "Failed" && (
            <div className="result-next-step failed-next">

              <XCircle size={17} />

              <div>
                <strong>
                  Next Step: Application Review
                </strong>

                <p>
                  The interview was unsuccessful.
                  Admin can review the application
                  and decide whether to reject it.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setShowRejectConfirm(true)
                  }
                >
                  Review Rejection
                </button>

              </div>

            </div>
          )}

        </section>

        {/* RESCHEDULE MODAL */}
        {showReschedule && (
          <div
            className="admin-interview-modal-overlay"
            onClick={() =>
              setShowReschedule(false)
            }
          >
            <div
              className="admin-interview-modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <div className="admin-interview-modal-header">

                <div>
                  <h3>
                    Reschedule Interview
                  </h3>

                  <p>
                    Select a new interview date
                    and time.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowReschedule(false)
                  }
                >
                  <XCircle size={20} />
                </button>

              </div>

              <div className="admin-interview-modal-body">

                <label>
                  New Date

                  <input
                    type="date"
                    value={rescheduleDate}
                    onChange={(e) =>
                      setRescheduleDate(
                        e.target.value
                      )
                    }
                  />
                </label>

                <label>
                  New Time

                  <input
                    type="time"
                    value={rescheduleTime}
                    onChange={(e) =>
                      setRescheduleTime(
                        e.target.value
                      )
                    }
                  />
                </label>

              </div>

              <div className="admin-interview-modal-actions">

                <button
                  type="button"
                  onClick={() =>
                    setShowReschedule(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleReschedule}
                >
                  <RotateCcw size={15} />
                  Reschedule Interview
                </button>

              </div>

            </div>
          </div>
        )}

        {/* ADDITIONAL INFORMATION MODAL */}
        {showAdditionalInfo && (
          <div
            className="admin-interview-modal-overlay"
            onClick={() =>
              setShowAdditionalInfo(false)
            }
          >
            <div
              className="admin-interview-modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <div className="admin-interview-modal-header">

                <div>
                  <h3>
                    Request Additional
                    Information
                  </h3>

                  <p>
                    Specify what the priest needs
                    to provide.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowAdditionalInfo(false)
                  }
                >
                  <XCircle size={20} />
                </button>

              </div>

              <div className="admin-interview-modal-body">

                <label>
                  Required Information

                  <textarea
                    value={
                      additionalInfoMessage
                    }
                    onChange={(e) =>
                      setAdditionalInfoMessage(
                        e.target.value
                      )
                    }
                    placeholder="Example: Please provide additional qualification documents or experience proof."
                  />
                </label>

              </div>

              <div className="admin-interview-modal-actions">

                <button
                  type="button"
                  onClick={() =>
                    setShowAdditionalInfo(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={
                    handleRequestAdditionalInformation
                  }
                >
                  <AlertCircle size={15} />
                  Send Request
                </button>

              </div>

            </div>
          </div>
        )}

        {/* FAILURE CONFIRMATION */}
        {showRejectConfirm && (
          <div
            className="admin-interview-modal-overlay"
            onClick={() =>
              setShowRejectConfirm(false)
            }
          >
            <div
              className="admin-interview-modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <div className="admin-interview-modal-header">

                <div>
                  <h3>
                    Confirm Interview Failure
                  </h3>

                  <p>
                    This will mark the interview
                    as failed.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowRejectConfirm(false)
                  }
                >
                  <XCircle size={20} />
                </button>

              </div>

              <div className="admin-interview-modal-body">

                <div className="selected-result-preview">
                  <AlertCircle size={17} />

                  The interview will be marked as
                  <strong> Failed </strong>
                  and the application can then be
                  reviewed for rejection.
                </div>

              </div>

              <div className="admin-interview-modal-actions">

                <button
                  type="button"
                  onClick={() =>
                    setShowRejectConfirm(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={
                    handleRejectInterview
                  }
                >
                  <XCircle size={15} />
                  Mark as Failed
                </button>

              </div>

            </div>
          </div>
        )}

        {/* NEXT STEP INFORMATION */}
        <section className="next-step-box">

          <AlertCircle size={19} />

          <div>
            <strong>
              What happens after the interview?
            </strong>

            <p>
              If the priest passes, the
              application can proceed to admin
              approval. If additional information
              is required, the priest will be
              asked to provide it. If the priest
              fails, the application can be
              rejected.
            </p>
          </div>

        </section>

      </main>
    </div>
  );
}

export default AdminInterviewDetails;