import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Sparkles,
  ChevronRight,
  Clock,
  IndianRupee,
  CalendarDays,
  MapPin,
  User,
  CheckCircle2,
  Send,
  ArrowRight
} from "lucide-react";

import "../styles/astrologyServices.css";


function AstrologyServices() {

  const navigate = useNavigate();


  /* =====================================
     SERVICES
  ===================================== */

  const services = [

    {
      id: 1,
      name: "Kundali Reading",
      description:
        "Understand your birth chart, planetary positions and important life aspects.",
      duration: "30 - 45 mins",
      price: 501,
      requirements:
        "Birth date, birth time and birth place are required for the consultation."
    },

    {
      id: 2,
      name: "Marriage Compatibility",
      description:
        "Get a detailed compatibility analysis based on birth details.",
      duration: "30 mins",
      price: 751,
      requirements:
        "Birth details of both individuals are required for compatibility analysis."
    },

    {
      id: 3,
      name: "Career Astrology",
      description:
        "Astrological guidance related to career, opportunities and professional growth.",
      duration: "30 mins",
      price: 601,
      requirements:
        "Your birth date, birth time and birth place are required."
    },

    {
      id: 4,
      name: "Dosha Analysis",
      description:
        "Understand major doshas and the associated traditional remedies.",
      duration: "30 mins",
      price: 501,
      requirements:
        "Birth details are required to prepare the astrology analysis."
    },

    {
      id: 5,
      name: "Numerology",
      description:
        "Explore the traditional significance of numbers associated with your birth details.",
      duration: "20 mins",
      price: 401,
      requirements:
        "Your full name and date of birth are required for the numerology consultation."
    }

  ];


  /* =====================================
     SELECTED SERVICE
  ===================================== */

  const [selectedService, setSelectedService] =
    useState(null);


  /* =====================================
     FORM DATA
  ===================================== */

  const [formData, setFormData] = useState({

    name: "",
    birthDate: "",
    birthTime: "",
    birthPlace: "",
    notes: ""

  });


  const [submitted, setSubmitted] =
    useState(false);


  /* =====================================
     OPEN SERVICE
  ===================================== */

  const openService = (service) => {

    setSelectedService(service);

    setSubmitted(false);

    setFormData({

      name: "",
      birthDate: "",
      birthTime: "",
      birthPlace: "",
      notes: ""

    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };


  /* =====================================
     BACK TO SERVICES
  ===================================== */

  const backToServices = () => {

    setSelectedService(null);

    setSubmitted(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };


  /* =====================================
     FORM CHANGE
  ===================================== */

  const handleChange = (event) => {

    const {
      name,
      value
    } = event.target;


    setFormData((previous) => ({

      ...previous,

      [name]: value

    }));

  };


  /* =====================================
     FORMAT PRICE
  ===================================== */

  const formatPrice = (price) => {

    if (
      price === null ||
      price === undefined ||
      price === ""
    ) {

      return "Price to be confirmed";

    }


    return `₹${Number(price).toLocaleString("en-IN")}`;

  };


  /* =====================================
     SUBMIT REQUEST
  ===================================== */

  const submitRequest = (event) => {

    event.preventDefault();


    if (
      !formData.name.trim() ||
      !formData.birthDate ||
      !formData.birthPlace.trim()
    ) {

      return;

    }


    const request = {

      requestId:
        "AST" +
        Date.now()
          .toString()
          .slice(-8),

      service: selectedService,

      customer: {

        name:
          formData.name.trim(),

        birthDate:
          formData.birthDate,

        birthTime:
          formData.birthTime,

        birthPlace:
          formData.birthPlace.trim(),

        notes:
          formData.notes.trim()

      },

      status:
        "REQUEST_CREATED",

      createdAt:
        new Date().toISOString()

    };


    /*

      Temporary frontend storage.

      Later this will be replaced by
      the backend/API.

    */

    const existingRequests =
      JSON.parse(
        localStorage.getItem(
          "poojamitra_astrology_requests"
        ) || "[]"
      );


    localStorage.setItem(

      "poojamitra_astrology_requests",

      JSON.stringify([
        request,
        ...existingRequests
      ])

    );


    setSubmitted(true);

  };


  /* =====================================
     MAIN PAGE
  ===================================== */

  return (

    <main className="astrology-page">


      {/* =====================================
          HEADER
      ===================================== */}

      <header className="astrology-header">

        <button
          type="button"
          className="astrology-back"
          onClick={() => {

            if (selectedService) {

              backToServices();

            } else {

              navigate(-1);

            }

          }}
          aria-label="Go back"
        >

          <ArrowLeft size={22} />

        </button>


        <h1>

          {selectedService
            ? "Astrology Details"
            : "Astrology Services"}

        </h1>


        <div className="astrology-header-space" />

      </header>



      {/* =====================================
          CONTENT
      ===================================== */}

      <section className="astrology-content">


        {!selectedService ? (

          /* ===================================
             SERVICES VIEW
          =================================== */

          <>

            {/* INTRO */}

            <section className="astrology-intro">

              <div className="astrology-intro-icon">

                <Sparkles size={27} />

              </div>


              <div>

                <h2>
                  Explore Astrology
                </h2>

                <p>
                  Choose a service and submit
                  your details for your astrology
                  request.
                </p>

              </div>

            </section>



            {/* TITLE */}

            <div className="astrology-title-row">

              <div>

                <span className="astrology-title-label">
                  GUIDANCE & CONSULTATION
                </span>

                <h2 className="astrology-section-title">
                  Available Services
                </h2>

              </div>

            </div>



            {/* SERVICES */}

            <div className="astrology-service-list">

              {services.map((service) => (

                <button
                  type="button"
                  key={service.id}
                  className="astrology-service-card"
                  onClick={() =>
                    openService(service)
                  }
                >

                  <div className="astrology-service-icon">

                    <Sparkles size={21} />

                  </div>


                  <div className="astrology-service-info">

                    <h3>
                      {service.name}
                    </h3>


                    <p>
                      {service.description}
                    </p>


                    <div className="astrology-meta">

                      <span>

                        <Clock size={13} />

                        {service.duration}

                      </span>


                      <span>

                        <IndianRupee size={13} />

                        {formatPrice(
                          service.price
                        )}

                      </span>

                    </div>

                  </div>


                  <div className="astrology-service-arrow">

                    <ChevronRight
                      size={19}
                    />

                  </div>

                </button>

              ))}

            </div>

          </>

        ) : (

          /* ===================================
             SERVICE DETAILS VIEW
          =================================== */

          <>

            {!submitted ? (

              <>

                {/* SELECTED SERVICE */}

                <section className="astrology-selected-service">

                  <div className="astrology-selected-icon">

                    <Sparkles size={27} />

                  </div>


                  <div className="astrology-selected-info">

                    <span>
                      SELECTED SERVICE
                    </span>

                    <h2>
                      {selectedService.name}
                    </h2>

                    <p>
                      {selectedService.description}
                    </p>

                  </div>

                </section>



                {/* SERVICE INFORMATION */}

                <section className="astrology-detail-card">

                  <div className="astrology-detail-title">

                    <span className="astrology-title-label">
                      SERVICE INFORMATION
                    </span>

                    <h2>
                      Consultation Details
                    </h2>

                  </div>


                  <div className="astrology-detail-grid">


                    <div className="astrology-detail-item">

                      <div className="astrology-detail-icon">

                        <Clock size={17} />

                      </div>

                      <div>

                        <span>
                          Duration
                        </span>

                        <strong>
                          {selectedService.duration}
                        </strong>

                      </div>

                    </div>



                    <div className="astrology-detail-item">

                      <div className="astrology-detail-icon">

                        <IndianRupee size={17} />

                      </div>

                      <div>

                        <span>
                          Consultation Fee
                        </span>

                        <strong>
                          {formatPrice(
                            selectedService.price
                          )}
                        </strong>

                      </div>

                    </div>


                  </div>


                  <div className="astrology-requirement">

                    <Sparkles size={16} />

                    <p>
                      {selectedService.requirements}
                    </p>

                  </div>

                </section>



                {/* REQUEST FORM */}

                <form
                  className="astrology-request-form"
                  onSubmit={submitRequest}
                >

                  <div className="astrology-form-heading">

                    <span className="astrology-title-label">
                      YOUR DETAILS
                    </span>

                    <h2>
                      Submit Your Request
                    </h2>

                    <p>
                      Provide your details so our
                      astrology consultation can be
                      prepared.
                    </p>

                  </div>



                  {/* NAME */}

                  <div className="astrology-form-group">

                    <label htmlFor="name">
                      Full Name
                    </label>

                    <div className="astrology-input-wrapper">

                      <User size={16} />

                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                      />

                    </div>

                  </div>



                  {/* BIRTH DATE */}

                  <div className="astrology-form-group">

                    <label htmlFor="birthDate">
                      Date of Birth
                    </label>

                    <div className="astrology-input-wrapper">

                      <CalendarDays size={16} />

                      <input
                        id="birthDate"
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>



                  {/* BIRTH TIME */}

                  <div className="astrology-form-group">

                    <label htmlFor="birthTime">
                      Time of Birth
                      <span>
                        Optional
                      </span>
                    </label>

                    <div className="astrology-input-wrapper">

                      <Clock size={16} />

                      <input
                        id="birthTime"
                        type="time"
                        name="birthTime"
                        value={formData.birthTime}
                        onChange={handleChange}
                      />

                    </div>

                  </div>



                  {/* BIRTH PLACE */}

                  <div className="astrology-form-group">

                    <label htmlFor="birthPlace">
                      Place of Birth
                    </label>

                    <div className="astrology-input-wrapper">

                      <MapPin size={16} />

                      <input
                        id="birthPlace"
                        type="text"
                        name="birthPlace"
                        value={formData.birthPlace}
                        onChange={handleChange}
                        placeholder="City / Place of birth"
                        required
                      />

                    </div>

                  </div>



                  {/* NOTES */}

                  <div className="astrology-form-group">

                    <label htmlFor="notes">
                      Additional Information
                      <span>
                        Optional
                      </span>
                    </label>

                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Tell us anything you would like the astrologer to know..."
                      rows="4"
                    />

                  </div>



                  {/* SUBMIT */}

                  <button
                    type="submit"
                    className="astrology-submit-button"
                  >

                    <Send size={17} />

                    Submit Astrology Request

                    <ArrowRight size={17} />

                  </button>

                </form>


              </>

            ) : (

              /* =================================
                 SUCCESS
              ================================= */

              <section className="astrology-request-success">

                <div className="astrology-success-circle">

                  <CheckCircle2 size={42} />

                </div>


                <span className="astrology-title-label">
                  REQUEST SUBMITTED
                </span>


                <h2>
                  Astrology Request Created
                </h2>


                <p>

                  Your request for{" "}

                  <strong>
                    {selectedService.name}
                  </strong>

                  {" "}has been submitted
                  successfully.

                </p>


                <div className="astrology-success-card">

                  <div>

                    <span>
                      SERVICE
                    </span>

                    <strong>
                      {selectedService.name}
                    </strong>

                  </div>


                  <div>

                    <span>
                      CONSULTATION FEE
                    </span>

                    <strong>
                      {formatPrice(
                        selectedService.price
                      )}
                    </strong>

                  </div>

                </div>


                <p className="astrology-success-note">

                  We will keep you updated about
                  your astrology request.

                </p>


                <div className="astrology-success-actions">

                  <button
                    type="button"
                    onClick={() => {

                      setSelectedService(null);

                      setSubmitted(false);

                    }}
                    className="astrology-secondary-button"
                  >

                    Explore More Services

                  </button>


                  <button
                    type="button"
                    onClick={() =>
                      navigate("/home")
                    }
                    className="astrology-primary-button"
                  >

                    Continue to Home

                    <ArrowRight size={17} />

                  </button>

                </div>

              </section>

            )}

          </>

        )}



        {/* =====================================
            FOOTER
        ===================================== */}

        <div className="astrology-footer">

          <span>
            ✦
          </span>

          <span className="astrology-footer-om">
            ॐ
          </span>

          <span>
            ✦
          </span>

        </div>


      </section>

    </main>

  );

}


export default AstrologyServices;