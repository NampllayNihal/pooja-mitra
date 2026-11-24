import { useState } from "react";

import {
  ArrowLeft,
  UserRound,
  BriefcaseBusiness,
  Languages,
  MapPin,
  FileText,
  CalendarDays,
  CheckCircle2,
  XCircle,
  Clock3,
  AlertCircle,
  Eye,
  Download,
  Phone,
  Mail,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  Users,
} from "lucide-react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import "../styles/adminPriestApplicationDetails.css";

function AdminPriestApplicationDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const applicationFromList =
    location.state?.application;

  // =========================================
  // ACTION FORM STATES
  // =========================================

  const [showRejectBox, setShowRejectBox] =
    useState(false);

  const [showAdditionalBox, setShowAdditionalBox] =
    useState(false);

  const [showScheduleBox, setShowScheduleBox] =
    useState(false);

  const [message, setMessage] = useState("");

  // =========================================
  // APPLICATION STATUS
  // =========================================

  const [applicationStatus, setApplicationStatus] =
    useState(
      applicationFromList?.status ||
        "Under Review"
    );

  const [actionMessage, setActionMessage] =
    useState("");

  // =========================================
  // INTERVIEW STATE
  // =========================================

  const [interviewStatus, setInterviewStatus] =
    useState(
      applicationFromList?.interview ||
        applicationFromList?.interviewStatus ||
        "Not Scheduled"
    );

  const [interviewDate, setInterviewDate] =
    useState(
      applicationFromList?.interviewDate || ""
    );

  const [interviewTime, setInterviewTime] =
    useState(
      applicationFromList?.interviewTime || ""
    );

  const [interviewResult, setInterviewResult] =
    useState(
      applicationFromList?.interviewResult || ""
    );

  // =========================================
  // APPLICATION DATA
  // =========================================

  const application = {
    id:
      applicationFromList?.id ||
      "PM-PRI-1001",

    name:
      applicationFromList?.name ||
      "Ravi Kumar",

    phone:
      applicationFromList?.phone ||
      "+91 9876543210",

    email:
      applicationFromList?.email ||
      "ravikumar@example.com",

    status: applicationStatus,

    priestType:
      applicationFromList?.priestType ||
      "Vedic Priest",

    qualification:
      applicationFromList?.qualification ||
      "Vedic Studies / Sanskrit",

    experience:
      applicationFromList?.experience ||
      "8 Years",

    specialization:
      applicationFromList?.specialization ||
      "Vedic Pooja",

    description:
      applicationFromList?.description ||
      "Experienced priest specializing in traditional Hindu poojas, homams, and Vedic rituals. Experienced in conducting ceremonies for families and temples.",

    languages:
      applicationFromList?.languages || [
        "Telugu",
        "Hindi",
        "English",
        "Sanskrit",
      ],

    serviceTypes:
      applicationFromList?.serviceTypes || [
        "Vedic Pooja",
        "Homam",
        "Griha Pravesh",
        "Satyanarayana Pooja",
      ],

    state:
      applicationFromList?.state ||
      "Telangana",

    city:
      applicationFromList?.city ||
      "Hyderabad",

    locality:
      applicationFromList?.locality ||
      "Kukatpally",

    serviceRadius:
      applicationFromList?.serviceRadius ||
      "25 KM",

    homeVisit:
      applicationFromList?.homeVisit ?? true,

    templeService:
      applicationFromList?.templeService ?? true,

    availableDays:
      applicationFromList?.availableDays || [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],

    availableTime:
      applicationFromList?.availableTime ||
      "7:00 AM - 8:00 PM",

    submittedDate:
      applicationFromList?.submitted ||
      applicationFromList?.submittedDate ||
      "04 Oct 2026",

    interviewStatus,

    interviewDate:
      interviewDate ||
      applicationFromList?.interviewDate ||
      "Not Scheduled",

    interviewTime:
      interviewTime ||
      applicationFromList?.interviewTime ||
      "Not Scheduled",

    interviewResult:
      interviewResult ||
      applicationFromList?.interviewResult ||
      "",
  };

  // =========================================
  // DOCUMENTS
  // =========================================

  const documents = [
    {
      name: "Government ID",
      file: "government-id.pdf",
      status: "Submitted",
    },
    {
      name: "Vedic / Religious Certificate",
      file: "vedic-certificate.pdf",
      status: "Submitted",
    },
    {
      name: "Address Proof",
      file: "address-proof.pdf",
      status: "Submitted",
    },
    {
      name: "Profile Photo",
      file: "profile-photo.jpg",
      status: "Submitted",
    },
  ];

  // =========================================
  // STATUS HELPERS
  // =========================================

  const isApproved =
    applicationStatus === "Approved";

  const isRejected =
    applicationStatus === "Rejected";

  const isInterviewScheduled =
    applicationStatus ===
    "Interview Scheduled";

  const isAdditionalInfoRequired =
    applicationStatus ===
    "Additional Information Required";

  const isInterviewFailed =
    applicationStatus ===
    "Interview Failed";

  const interviewPassed =
    interviewResult === "Passed";

  const interviewFailed =
    interviewResult === "Failed";

  const interviewNeedsInfo =
    interviewResult ===
    "Additional Information";

  // Final approval should only happen after a passed interview.
  const canApprove =
    interviewPassed &&
    !isApproved &&
    !isRejected;

  // =========================================
  // CLOSE ACTION FORMS
  // =========================================

  const closeActionForms = () => {
    setShowRejectBox(false);
    setShowAdditionalBox(false);
    setShowScheduleBox(false);
    setMessage("");
  };

  // =========================================
  // APPROVE APPLICATION
  // =========================================

  const handleApprove = () => {
    if (isApproved) {
      return;
    }

    if (isRejected) {
      return;
    }

    if (!interviewPassed) {
      setActionMessage(
        "The priest can be approved only after successfully passing the interview."
      );
      return;
    }

    const confirmed = window.confirm(
      `Approve ${application.name} as a PoojaMitra priest?`
    );

    if (!confirmed) {
      return;
    }

    /*
      TEMPORARY FRONTEND SIMULATION.

      Later connect:

      PATCH
      /api/admin/priest-applications/{id}/approve/
    */

    setApplicationStatus("Approved");

    setActionMessage(
      "Application approved successfully. The priest can now access the Priest Dashboard."
    );

    closeActionForms();
  };

  // =========================================
  // REJECT APPLICATION
  // =========================================

  const handleReject = () => {
    if (!message.trim()) {
      alert(
        "Please enter a rejection reason."
      );
      return;
    }

    /*
      Later connect:

      PATCH
      /api/admin/priest-applications/{id}/reject/
    */

    setApplicationStatus("Rejected");

    setActionMessage(
      "Application rejected successfully."
    );

    closeActionForms();
  };

  // =========================================
  // ADDITIONAL INFORMATION
  // =========================================

  const handleAdditionalInformation = () => {
    if (!message.trim()) {
      alert(
        "Please enter the information required."
      );
      return;
    }

    /*
      Later connect:

      PATCH
      /api/admin/priest-applications/{id}/additional-information/
    */

    setApplicationStatus(
      "Additional Information Required"
    );

    setInterviewResult(
      "Additional Information"
    );

    setActionMessage(
      "Request for additional information sent to the priest."
    );

    closeActionForms();
  };

  // =========================================
  // SCHEDULE INTERVIEW
  // =========================================

  const handleScheduleInterview = () => {
    if (!message.trim()) {
      alert(
        "Please enter interview date and time."
      );
      return;
    }

    /*
      Temporary frontend simulation.

      Later connect:

      POST
      /api/admin/interviews/
    */

    setInterviewStatus(
      "Interview Scheduled"
    );

    setApplicationStatus(
      "Interview Scheduled"
    );

    setInterviewResult("");

    setInterviewDate(message);

    setInterviewTime("");

    setActionMessage(
      "Interview scheduled successfully."
    );

    closeActionForms();
  };

  // =========================================
  // DOCUMENT ACTIONS
  // =========================================

  const handleViewDocument = (file) => {
    alert(`Opening ${file}`);
  };

  const handleDownloadDocument = (file) => {
    alert(`Downloading ${file}`);
  };

  // =========================================
  // NAVIGATION
  // =========================================

  const handleNavigation = (path) => {
    navigate(path);
  };

  const goToInterviews = () => {
    navigate("/admin-interviews");
  };

  const goToInterviewDetails = () => {
    navigate(
      "/admin-interview-details",
      {
        state: {
          interview: {
            id:
              applicationFromList?.interviewId ||
              `INT-${application.id.replace(
                "PM-PRI-",
                ""
              )}`,

            applicationId:
              application.id,

            priestName:
              application.name,

            phone:
              application.phone,

            email:
              application.email,

            specialization:
              application.specialization,

            date:
              interviewDate,

            time:
              interviewTime,

            mode: "Video Interview",

            status:
              interviewStatus ===
              "Interview Scheduled"
                ? "Scheduled"
                : interviewStatus ===
                  "Completed"
                ? "Completed"
                : interviewStatus,

            result:
              interviewResult,

            location:
              application.city,

            experience:
              application.experience,

            priestType:
              application.priestType,
          },
        },
      }
    );
  };

  const goToApplicationList = () => {
    navigate(
      "/admin-priest-applications"
    );
  };

  const goToApprovedPriests = () => {
    navigate(
      "/admin-approved-priests"
    );
  };

  const goToCustomers = () => {
    navigate("/admin-customers");
  };

  const goToBookings = () => {
    navigate("/admin-bookings");
  };

  const goToServices = () => {
    navigate("/admin-services");
  };

  const goToPayments = () => {
    navigate("/admin-payments");
  };

  const goToReports = () => {
    navigate("/admin-reports");
  };

  const goToNotifications = () => {
    navigate("/admin-notifications");
  };

  const goToSettings = () => {
    navigate("/admin-settings");
  };

  const goToDashboard = () => {
    navigate("/admin-dashboard");
  };

  const handleLogout = () => {
    navigate("/login");
  };

  // =========================================
  // RENDER
  // =========================================

  return (
    <div className="admin-details-page">

      {/* =========================================
          SIDEBAR
      ========================================= */}

      <aside className="admin-details-sidebar">

        {/* BRAND */}

        <div className="admin-details-brand">
          <h2>PoojaMitra</h2>
          <span>Admin Panel</span>
        </div>

        {/* NAVIGATION */}

        <nav className="admin-details-navigation">

          <button
            type="button"
            className="admin-details-nav-item"
            onClick={goToDashboard}
          >
            <BriefcaseBusiness size={19} />
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            className="admin-details-nav-item active"
            onClick={goToApplicationList}
          >
            <UserRound size={19} />
            <span>Priest Applications</span>
          </button>

          <button
            type="button"
            className="admin-details-nav-item"
            onClick={goToApprovedPriests}
          >
            <UserRound size={19} />
            <span>Approved Priests</span>
          </button>

          <button
            type="button"
            className="admin-details-nav-item"
            onClick={goToCustomers}
          >
            <Users size={19} />
            <span>Customers</span>
          </button>

          <button
            type="button"
            className="admin-details-nav-item"
            onClick={goToBookings}
          >
            <CalendarDays size={19} />
            <span>Bookings</span>
          </button>

          <button
            type="button"
            className="admin-details-nav-item"
            onClick={goToServices}
          >
            <FileText size={19} />
            <span>Services</span>
          </button>

          <button
            type="button"
            className="admin-details-nav-item"
            onClick={goToInterviews}
          >
            <Clock3 size={19} />
            <span>Interviews</span>
          </button>

          <button
            type="button"
            className="admin-details-nav-item"
            onClick={goToPayments}
          >
            <CreditCard size={19} />
            <span>Payments</span>
          </button>

          <button
            type="button"
            className="admin-details-nav-item"
            onClick={goToReports}
          >
            <FileText size={19} />
            <span>Reports</span>
          </button>

          <button
            type="button"
            className="admin-details-nav-item"
            onClick={goToNotifications}
          >
            <Bell size={19} />
            <span>Notifications</span>
          </button>

          <button
            type="button"
            className="admin-details-nav-item"
            onClick={goToSettings}
          >
            <Settings size={19} />
            <span>Settings</span>
          </button>

        </nav>

        {/* LOGOUT */}

        <button
          type="button"
          className="admin-details-logout"
          onClick={handleLogout}
        >
          <LogOut size={19} />
          <span>Logout</span>
        </button>

      </aside>

      {/* =========================================
          MAIN
      ========================================= */}

      <main className="admin-details-main">

        {/* HEADER */}

        <header className="admin-details-header">

          <div className="admin-details-header-left">

            <button
              type="button"
              className="admin-details-back"
              onClick={goToApplicationList}
              aria-label="Back to applications"
            >
              <ArrowLeft size={20} />
            </button>

            <div>
              <h1>Priest Application</h1>

              <p>
                Review complete priest
                registration details
              </p>
            </div>

          </div>

          <div className="application-reference">
            {application.id}
          </div>

        </header>

        {/* =========================================
            ACTION MESSAGE
        ========================================= */}

        {actionMessage && (
          <div
            className={`admin-action-message ${
              applicationStatus === "Approved"
                ? "success"
                : applicationStatus === "Rejected" ||
                  applicationStatus ===
                    "Interview Failed"
                ? "danger"
                : "info"
            }`}
          >

            {applicationStatus ===
              "Approved" && (
              <CheckCircle2 size={19} />
            )}

            {(applicationStatus ===
              "Rejected" ||
              applicationStatus ===
                "Interview Failed") && (
              <XCircle size={19} />
            )}

            {applicationStatus !==
              "Approved" &&
              applicationStatus !==
                "Rejected" &&
              applicationStatus !==
                "Interview Failed" && (
                <AlertCircle size={19} />
              )}

            <span>{actionMessage}</span>

          </div>
        )}

        {/* =========================================
            APPLICATION STATUS
        ========================================= */}

        <section
          className={`verification-banner status-${applicationStatus
            .toLowerCase()
            .replaceAll(" ", "-")}`}
        >

          <div className="verification-banner-left">

            <div className="verification-icon">

              {applicationStatus ===
              "Approved" ? (
                <CheckCircle2 size={23} />
              ) : applicationStatus ===
                "Rejected" ||
                applicationStatus ===
                  "Interview Failed" ? (
                <XCircle size={23} />
              ) : (
                <AlertCircle size={23} />
              )}

            </div>

            <div>
              <strong>
                Application Status
              </strong>

              <span>
                {applicationStatus}
              </span>
            </div>

          </div>

          <span className="review-status">

            {applicationStatus ===
            "Approved"
              ? "Approved Priest"
              : applicationStatus ===
                "Rejected"
              ? "Application Rejected"
              : applicationStatus ===
                "Interview Failed"
              ? "Interview Failed"
              : applicationStatus ===
                "Additional Information Required"
              ? "Waiting for Priest"
              : applicationStatus ===
                "Interview Scheduled"
              ? "Interview Scheduled"
              : "Under Admin Review"}

          </span>

        </section>

        {/* =========================================
            BASIC DETAILS
        ========================================= */}

        <section className="admin-details-section">

          <div className="section-heading">

            <div className="section-icon">
              <UserRound size={19} />
            </div>

            <div>
              <h2>Basic Details</h2>

              <p>
                Personal information provided
                by the priest
              </p>
            </div>

          </div>

          <div className="details-grid">

            <div className="detail-item">
              <label>Full Name</label>
              <strong>
                {application.name}
              </strong>
            </div>

            <div className="detail-item">
              <label>Phone Number</label>

              <strong className="contact-value">
                <Phone size={15} />
                {application.phone}
              </strong>
            </div>

            <div className="detail-item">
              <label>Email Address</label>

              <strong className="contact-value">
                <Mail size={15} />
                {application.email}
              </strong>
            </div>

            <div className="detail-item">
              <label>
                Application Submitted
              </label>

              <strong>
                {application.submittedDate}
              </strong>
            </div>

          </div>

        </section>

        {/* =========================================
            PROFESSIONAL DETAILS
        ========================================= */}

        <section className="admin-details-section">

          <div className="section-heading">

            <div className="section-icon">
              <BriefcaseBusiness size={19} />
            </div>

            <div>
              <h2>
                Professional Details
              </h2>

              <p>
                Priest qualification and
                experience
              </p>
            </div>

          </div>

          <div className="details-grid">

            <div className="detail-item">
              <label>Priest Type</label>

              <strong>
                {application.priestType}
              </strong>
            </div>

            <div className="detail-item">
              <label>Qualification</label>

              <strong>
                {application.qualification}
              </strong>
            </div>

            <div className="detail-item">
              <label>Experience</label>

              <strong>
                {application.experience}
              </strong>
            </div>

            <div className="detail-item">
              <label>
                Primary Specialization
              </label>

              <strong>
                {application.specialization}
              </strong>
            </div>

          </div>

          <div className="description-box">

            <label>
              Professional Description
            </label>

            <p>
              {application.description}
            </p>

          </div>

        </section>

        {/* =========================================
            LANGUAGES
        ========================================= */}

        <section className="admin-details-section">

          <div className="section-heading">

            <div className="section-icon">
              <Languages size={19} />
            </div>

            <div>
              <h2>
                Languages & Specializations
              </h2>

              <p>
                Services and languages
                selected by the priest
              </p>
            </div>

          </div>

          <div className="tag-section">

            <label>Languages</label>

            <div className="tags">

              {application.languages.map(
                (language) => (
                  <span
                    className="detail-tag"
                    key={language}
                  >
                    {language}
                  </span>
                )
              )}

            </div>

          </div>

          <div className="tag-section">

            <label>
              Services / Specializations
            </label>

            <div className="tags">

              {application.serviceTypes.map(
                (service) => (
                  <span
                    className="detail-tag"
                    key={service}
                  >
                    {service}
                  </span>
                )
              )}

            </div>

          </div>

        </section>

        {/* =========================================
            SERVICE LOCATION
        ========================================= */}

        <section className="admin-details-section">

          <div className="section-heading">

            <div className="section-icon">
              <MapPin size={19} />
            </div>

            <div>
              <h2>
                Service Location
              </h2>

              <p>
                Areas where the priest
                provides services
              </p>
            </div>

          </div>

          <div className="details-grid">

            <div className="detail-item">
              <label>State</label>

              <strong>
                {application.state}
              </strong>
            </div>

            <div className="detail-item">
              <label>City</label>

              <strong>
                {application.city}
              </strong>
            </div>

            <div className="detail-item">
              <label>Locality</label>

              <strong>
                {application.locality}
              </strong>
            </div>

            <div className="detail-item">
              <label>Service Radius</label>

              <strong>
                {application.serviceRadius}
              </strong>
            </div>

          </div>

          <div className="service-options">

            <div className="service-option">

              {application.homeVisit ? (
                <CheckCircle2 size={17} />
              ) : (
                <XCircle size={17} />
              )}

              Home Visit

            </div>

            <div className="service-option">

              {application.templeService ? (
                <CheckCircle2 size={17} />
              ) : (
                <XCircle size={17} />
              )}

              Temple Service

            </div>

          </div>

          <div className="availability-box">

            <div>

              <label>
                Available Days
              </label>

              <div className="tags">

                {application.availableDays.map(
                  (day) => (
                    <span
                      className="detail-tag"
                      key={day}
                    >
                      {day}
                    </span>
                  )
                )}

              </div>

            </div>

            <div>

              <label>
                Available Time
              </label>

              <strong>
                {application.availableTime}
              </strong>

            </div>

          </div>

        </section>

        {/* =========================================
            DOCUMENTS
        ========================================= */}

        <section className="admin-details-section">

          <div className="section-heading">

            <div className="section-icon">
              <FileText size={19} />
            </div>

            <div>
              <h2>
                Submitted Documents
              </h2>

              <p>
                Documents uploaded during
                registration
              </p>
            </div>

          </div>

          <div className="documents-list">

            {documents.map((document) => (

              <div
                className="document-row"
                key={document.name}
              >

                <div className="document-info">

                  <div className="document-icon">
                    <FileText size={19} />
                  </div>

                  <div>
                    <strong>
                      {document.name}
                    </strong>

                    <span>
                      {document.file}
                    </span>
                  </div>

                </div>

                <div className="document-actions">

                  <span className="document-status">
                    <CheckCircle2 size={14} />
                    {document.status}
                  </span>

                  <button
                    type="button"
                    className="document-view"
                    onClick={() =>
                      handleViewDocument(
                        document.file
                      )
                    }
                  >
                    <Eye size={16} />
                    View
                  </button>

                  <button
                    type="button"
                    className="document-download"
                    onClick={() =>
                      handleDownloadDocument(
                        document.file
                      )
                    }
                  >
                    <Download size={16} />
                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>

        {/* =========================================
            INTERVIEW DETAILS
        ========================================= */}

        <section className="admin-details-section">

          <div className="section-heading">

            <div className="section-icon">
              <CalendarDays size={19} />
            </div>

            <div>
              <h2>
                Interview Details
              </h2>

              <p>
                Priest interview scheduling
                information
              </p>
            </div>

          </div>

          <div className="interview-details-card">

            <div>
              <label>
                Interview Status
              </label>

              <span className="interview-status">
                {application.interviewStatus}
              </span>
            </div>

            <div>
              <label>
                Interview Date
              </label>

              <strong>
                {application.interviewDate}
              </strong>
            </div>

            <div>
              <label>
                Interview Time
              </label>

              <strong>
                {application.interviewTime}
              </strong>
            </div>

          </div>

          {/* Interview Result */}

          {application.interviewResult && (
            <div className="admin-interview-result-box">

              <div>

                <label>
                  Interview Result
                </label>

                <strong>
                  {application.interviewResult}
                </strong>

              </div>

              <div className="interview-result-note">

                {interviewFailed
                  ? "Interview was unsuccessful."
                  : interviewNeedsInfo
                  ? "Additional information is required from the priest."
                  : interviewPassed
                  ? "Priest passed the interview and can proceed to final admin approval."
                  : "Interview result recorded."}

              </div>

            </div>
          )}

          {/* Interview Management */}

          {application.interviewStatus ===
            "Interview Scheduled" && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                marginTop: "16px",
                flexWrap: "wrap",
              }}
            >
              <button
                type="button"
                className="action-schedule"
                onClick={goToInterviewDetails}
              >
                <Clock3 size={17} />
                Manage Interview
              </button>

              <button
                type="button"
                className="action-schedule"
                onClick={goToInterviews}
              >
                <CalendarDays size={17} />
                Interview Management
              </button>
            </div>
          )}

          {/* Failed Interview */}

          {isInterviewFailed && (
            <div
              style={{
                marginTop: "16px",
                padding: "14px 16px",
                borderRadius: "10px",
                border: "1px solid #f0caca",
                background: "#fff5f5",
                color: "#8b1e1e",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              This priest failed the interview.
              The application cannot be approved.
            </div>
          )}

          {/* Additional Information */}

          {isAdditionalInfoRequired && (
            <div
              style={{
                marginTop: "16px",
                padding: "14px 16px",
                borderRadius: "10px",
                border: "1px solid #f0dca8",
                background: "#fffaf0",
                color: "#8a5a00",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              Waiting for the priest to provide
              the requested information.
            </div>
          )}

        </section>

        {/* =========================================
            ADMIN ACTIONS
        ========================================= */}

        <section className="admin-action-section">

          <div className="admin-action-header">

            <div>
              <h2>Admin Actions</h2>

              <p>
                Choose the appropriate action
                after reviewing this
                application.
              </p>
            </div>

          </div>

          <div className="admin-action-buttons">

            {/* APPROVE */}

            <button
              type="button"
              className="action-approve"
              onClick={handleApprove}
              disabled={
                isApproved ||
                isRejected ||
                isInterviewFailed ||
                isAdditionalInfoRequired
              }
              title={
                !interviewPassed
                  ? "Interview must be passed before approval"
                  : ""
              }
            >
              <CheckCircle2 size={18} />

              {isApproved
                ? "Application Approved"
                : "Approve Application"}
            </button>

            {/* SCHEDULE INTERVIEW */}

            <button
              type="button"
              className="action-schedule"
              onClick={() => {
                setShowScheduleBox(true);
                setShowRejectBox(false);
                setShowAdditionalBox(false);
                setActionMessage("");
              }}
              disabled={
                isApproved ||
                isRejected
              }
            >
              <CalendarDays size={18} />
              Schedule Interview
            </button>

            {/* ADDITIONAL INFORMATION */}

            <button
              type="button"
              className="action-additional"
              onClick={() => {
                setShowAdditionalBox(true);
                setShowRejectBox(false);
                setShowScheduleBox(false);
                setActionMessage("");
              }}
              disabled={
                isApproved ||
                isRejected
              }
            >
              <AlertCircle size={18} />
              Request Additional Information
            </button>

            {/* REJECT */}

            <button
              type="button"
              className="action-reject"
              onClick={() => {
                setShowRejectBox(true);
                setShowAdditionalBox(false);
                setShowScheduleBox(false);
                setActionMessage("");
              }}
              disabled={
                isApproved ||
                isRejected
              }
            >
              <XCircle size={18} />
              Reject Application
            </button>

          </div>

          {/* =========================================
              SCHEDULE INTERVIEW FORM
          ========================================= */}

          {showScheduleBox && (
            <div className="action-form schedule-form">

              <h3>
                Schedule Interview
              </h3>

              <p>
                Enter the interview date,
                time and meeting information.
              </p>

              <textarea
                placeholder="Example: 10 October 2026, 11:00 AM - Jitsi / Google Meet"
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
              />

              <div className="action-form-buttons">

                <button
                  type="button"
                  className="cancel-action"
                  onClick={() => {
                    setShowScheduleBox(false);
                    setMessage("");
                  }}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="confirm-schedule"
                  onClick={
                    handleScheduleInterview
                  }
                >
                  Schedule Interview
                </button>

              </div>

            </div>
          )}

          {/* =========================================
              ADDITIONAL INFORMATION FORM
          ========================================= */}

          {showAdditionalBox && (
            <div className="action-form additional-form">

              <h3>
                Request Additional Information
              </h3>

              <p>
                Tell the priest what
                information or documents
                are required.
              </p>

              <textarea
                placeholder="Example: Please upload a clearer address proof."
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
              />

              <div className="action-form-buttons">

                <button
                  type="button"
                  className="cancel-action"
                  onClick={() => {
                    setShowAdditionalBox(false);
                    setMessage("");
                  }}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="confirm-additional"
                  onClick={
                    handleAdditionalInformation
                  }
                >
                  Send Request
                </button>

              </div>

            </div>
          )}

          {/* =========================================
              REJECT FORM
          ========================================= */}

          {showRejectBox && (
            <div className="action-form reject-form">

              <h3>
                Reject Application
              </h3>

              <p>
                Please provide the reason
                for rejecting this priest
                application.
              </p>

              <textarea
                placeholder="Enter rejection reason..."
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
              />

              <div className="action-form-buttons">

                <button
                  type="button"
                  className="cancel-action"
                  onClick={() => {
                    setShowRejectBox(false);
                    setMessage("");
                  }}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="confirm-reject"
                  onClick={handleReject}
                >
                  Reject Application
                </button>

              </div>

            </div>
          )}

        </section>

        {/* =========================================
            POST-ACTION NAVIGATION
        ========================================= */}

        {/* APPROVED */}

        {isApproved && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              marginTop: "16px",
              marginBottom: "30px",
              flexWrap: "wrap",
            }}
          >

            <button
              type="button"
              className="action-schedule"
              onClick={goToApprovedPriests}
            >
              <UserRound size={17} />
              View Approved Priests
            </button>

            <button
              type="button"
              className="action-approve"
              onClick={goToDashboard}
            >
              <BriefcaseBusiness size={17} />
              Admin Dashboard
            </button>

          </div>
        )}

        {/* INTERVIEW SCHEDULED */}

        {isInterviewScheduled && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              marginTop: "16px",
              marginBottom: "30px",
              flexWrap: "wrap",
            }}
          >

            <button
              type="button"
              className="action-schedule"
              onClick={goToInterviewDetails}
            >
              <Clock3 size={17} />
              Manage Interview
            </button>

            <button
              type="button"
              className="action-schedule"
              onClick={goToInterviews}
            >
              <CalendarDays size={17} />
              Open Interview Management
            </button>

          </div>
        )}

        {/* INTERVIEW PASSED */}

        {interviewPassed &&
          !isApproved && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                marginTop: "16px",
                marginBottom: "30px",
                flexWrap: "wrap",
              }}
            >

              <button
                type="button"
                className="action-approve"
                onClick={handleApprove}
              >
                <CheckCircle2 size={17} />
                Final Approve Priest
              </button>

              <button
                type="button"
                className="action-schedule"
                onClick={goToInterviews}
              >
                <CalendarDays size={17} />
                View Interview
              </button>

            </div>
          )}

        {/* ADDITIONAL INFORMATION REQUIRED */}

        {isAdditionalInfoRequired && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              marginTop: "16px",
              marginBottom: "30px",
              flexWrap: "wrap",
            }}
          >

            <button
              type="button"
              className="action-additional"
              onClick={() => {
                setShowAdditionalBox(true);
                setShowRejectBox(false);
                setShowScheduleBox(false);
              }}
            >
              <AlertCircle size={17} />
              Update Information Request
            </button>

          </div>
        )}

        {/* INTERVIEW FAILED */}

        {isInterviewFailed && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              marginTop: "16px",
              marginBottom: "30px",
              flexWrap: "wrap",
            }}
          >

            <button
              type="button"
              className="action-reject"
              onClick={() => {
                setShowRejectBox(true);
                setShowAdditionalBox(false);
                setShowScheduleBox(false);
              }}
            >
              <XCircle size={17} />
              Reject Application
            </button>

            <button
              type="button"
              className="action-schedule"
              onClick={goToInterviews}
            >
              <CalendarDays size={17} />
              View Interview Result
            </button>

          </div>
        )}

      </main>

    </div>
  );
}

export default AdminPriestApplicationDetails;