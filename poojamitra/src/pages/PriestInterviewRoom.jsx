import React from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Video,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  ShieldCheck,
  Info,
  ExternalLink,
} from "lucide-react";

import Logo from "../components/Logo";

import "../styles/priestInterviewRoom.css";


function PriestInterviewRoom() {
  const navigate = useNavigate();

  const [micOn, setMicOn] = React.useState(true);
  const [cameraOn, setCameraOn] = React.useState(true);

  /* =========================================
     TEMPORARY DEMO MEETING LINK

     Later this will come from the backend
     after Admin schedules the interview.
  ========================================= */

  const meetingLink =
    "https://meet.jit.si/PoojaMitraPriestInterview";


  /* =========================================
     OPEN VIDEO INTERVIEW
  ========================================= */

  const joinExternalMeeting = () => {
    window.open(
      meetingLink,
      "_blank",
      "noopener,noreferrer"
    );
  };


  /* =========================================
     LEAVE INTERVIEW
  ========================================= */

  const leaveInterview = () => {
    navigate("/priest-interview-scheduled");
  };


  /* =========================================
     COMPLETE INTERVIEW

     Temporary frontend flow.
     Later Admin/interview backend will
     update the actual interview status.
  ========================================= */

  const completeInterview = () => {
    navigate("/priest-verification-status");
  };


  return (
    <main className="priest-interview-room-page">

      <div className="priest-interview-room-container">

        {/* =========================================
            HEADER
        ========================================= */}

        <header className="interview-room-header">

          {/* BACK BUTTON */}

          <button
            type="button"
            className="interview-room-back"
            onClick={leaveInterview}
            aria-label="Back to interview details"
          >
            <ArrowLeft size={20} />
          </button>


          {/* LOGO */}

          <Logo className="interview-room-logo" />


          {/* SECURE BADGE */}

          <div className="interview-room-header-right">

            <div className="secure-badge">

              <ShieldCheck size={15} />

              <span>
                Secure Interview
              </span>

            </div>

          </div>

        </header>


        {/* =========================================
            MAIN INTERVIEW CARD
        ========================================= */}

        <section className="interview-room-card">

          {/* =========================================
              TOP INFORMATION
          ========================================= */}

          <div className="interview-room-top">

            <div>

              <span className="interview-room-label">
                PRIEST VERIFICATION
              </span>

              <h1>
                PoojaMitra Interview
              </h1>

              <p>
                Your verification interview is in progress.
              </p>

            </div>


            {/* STATUS */}

            <div className="interview-status">

              <span className="status-dot"></span>

              <span>
                Interview Room
              </span>

            </div>

          </div>


          {/* =========================================
              VIDEO AREA
          ========================================= */}

          <div className="video-container">

            {/* VIDEO PLACEHOLDER */}

            <div className="video-placeholder">

              <div className="video-placeholder-icon">

                <Video size={34} />

              </div>


              <h2>
                Ready to Join?
              </h2>


              <p>
                Your secure video interview will open in
                the meeting window.
              </p>


              {/* OPEN INTERVIEW */}

              <button
                type="button"
                className="open-meeting-button"
                onClick={joinExternalMeeting}
              >

                <Video size={18} />

                <span>
                  Open Interview
                </span>

                <ExternalLink size={16} />

              </button>

            </div>


            {/* =========================================
                VIDEO CONTROLS
            ========================================= */}

            <div className="video-controls">

              {/* MICROPHONE */}

              <button
                type="button"
                className={`video-control ${
                  micOn ? "" : "disabled"
                }`}
                onClick={() =>
                  setMicOn((previous) => !previous)
                }
                aria-label={
                  micOn
                    ? "Turn microphone off"
                    : "Turn microphone on"
                }
              >

                {micOn ? (
                  <Mic size={19} />
                ) : (
                  <MicOff size={19} />
                )}

              </button>


              {/* CAMERA */}

              <button
                type="button"
                className={`video-control ${
                  cameraOn ? "" : "disabled"
                }`}
                onClick={() =>
                  setCameraOn((previous) => !previous)
                }
                aria-label={
                  cameraOn
                    ? "Turn camera off"
                    : "Turn camera on"
                }
              >

                {cameraOn ? (
                  <Video size={19} />
                ) : (
                  <VideoOff size={19} />
                )}

              </button>


              {/* LEAVE */}

              <button
                type="button"
                className="video-control leave-control"
                onClick={leaveInterview}
                aria-label="Leave interview"
              >

                <PhoneOff size={19} />

              </button>

            </div>

          </div>


          {/* =========================================
              INFORMATION CARDS
          ========================================= */}

          <div className="interview-room-info">

            {/* DURING INTERVIEW */}

            <div className="room-info-card">

              <div className="room-info-icon">

                <Info size={18} />

              </div>


              <div>

                <h3>
                  During the interview
                </h3>


                <p>
                  The PoojaMitra verification team may ask
                  about your experience, qualifications,
                  traditions followed and the pooja services
                  you provide.
                </p>

              </div>

            </div>


            {/* VERIFICATION */}

            <div className="room-info-card">

              <div className="room-info-icon">

                <ShieldCheck size={18} />

              </div>


              <div>

                <h3>
                  Verification
                </h3>


                <p>
                  Please keep your submitted documents
                  available in case the verification team
                  needs additional information.
                </p>

              </div>

            </div>

          </div>


          {/* =========================================
              INTERVIEW ACTIONS
          ========================================= */}

          <div className="interview-room-actions">

            {/* BACK */}

            <button
              type="button"
              className="room-secondary-button"
              onClick={leaveInterview}
            >

              <ArrowLeft size={17} />

              <span>
                Back to Interview Details
              </span>

            </button>


            {/* COMPLETE INTERVIEW */}

            <button
              type="button"
              className="complete-interview-button"
              onClick={completeInterview}
            >

              <ShieldCheck size={17} />

              <span>
                Complete Interview
              </span>

            </button>


            {/* OPEN VIDEO */}

            <button
              type="button"
              className="room-primary-button"
              onClick={joinExternalMeeting}
            >

              <Video size={17} />

              <span>
                Open Video Interview
              </span>

            </button>

          </div>


          {/* =========================================
              SECURITY FOOTER
          ========================================= */}

          <div className="interview-room-footer">

            <ShieldCheck size={14} />

            <p>
              PoojaMitra keeps your verification information
              secure.
            </p>

          </div>

        </section>

      </div>

    </main>
  );
}


export default PriestInterviewRoom;