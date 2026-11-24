import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  Home,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "../styles/booking.css";


/* =====================================================
   BOOKING PAGE

   Customer booking flow:

   Pooja Details
        ↓
   Select Date
        ↓
   Select Time
        ↓
   Select Location
        ↓
   Enter Address
        ↓
   Additional Notes
        ↓
   Booking Summary
        ↓
   Booking Confirmation
===================================================== */


/* =====================================================
   FORMAT CUSTOMER PRICE
===================================================== */

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


/* =====================================================
   CATEGORY LABEL
===================================================== */

const getCategoryLabel = (category) => {

  switch (category) {

    case "Vratham":
      return "Vratham";

    case "Homam":
      return "Sacred Homam";

    case "Marriage":
      return "Marriage Ceremony";

    case "Child & Children Ceremonies":
      return "Child & Family Ceremony";

    case "Poojas":
    default:
      return "Divine Pooja";

  }

};


/* =====================================================
   MAIN COMPONENT
===================================================== */

function Booking() {

  const navigate = useNavigate();

  const location = useLocation();


  /* =====================================================
     SELECTED POOJA

     This comes from PoojaDetails.jsx.
  ===================================================== */

  const selectedPooja =
    location.state?.pooja;


  /* =====================================================
     NO POOJA SELECTED
  ===================================================== */

  if (!selectedPooja) {

    return (

      <main className="booking-page">

        <header className="booking-header">

          <button
            className="booking-back"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >

            <ArrowLeft size={22} />

          </button>


          <h1>
            Book Pooja
          </h1>


          <div className="booking-header-space"></div>

        </header>


        <section className="booking-empty-state">

          <div className="booking-empty-icon">
            ॐ
          </div>


          <h2>
            No Pooja Selected
          </h2>


          <p>
            Please select a pooja before continuing
            with the booking.
          </p>


          <button
            onClick={() =>
              navigate("/pooja-categories")
            }
          >

            View Pooja Categories

          </button>

        </section>

      </main>

    );

  }


  /* =====================================================
     POOJA DATA
  ===================================================== */

  const pooja = {

    name:
      selectedPooja.name ||
      "Pooja Service",

    category:
      selectedPooja.category ||
      "Poojas",

    price:
      selectedPooja.price !== undefined
        ? selectedPooja.price
        : null,

    duration:
      selectedPooja.duration ||
      "To be confirmed",

    location:
      selectedPooja.location ||
      "At Your Home",

    image:
      selectedPooja.image ||
      (
        selectedPooja.id
          ? `/images/poojas/${selectedPooja.id}.png`
          : ""
      ),

    description:
      selectedPooja.description ||
      "Traditional devotional service performed according to the selected pooja.",

  };


  const hasPrice =
    pooja.price !== null &&
    pooja.price !== undefined &&
    pooja.price !== "";


  /* =====================================================
     FORM STATE
  ===================================================== */

  const [date, setDate] =
    useState("");

  const [time, setTime] =
    useState("");

  const [bookingLocation, setBookingLocation] =
    useState("home");

  const [address, setAddress] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const [showTimeList, setShowTimeList] =
    useState(false);


  /* =====================================================
     TIME OPTIONS
  ===================================================== */

  const timeOptions = [

    "07:00 AM",

    "08:00 AM",

    "09:00 AM",

    "10:00 AM",

    "11:00 AM",

    "04:00 PM",

    "05:00 PM",

    "06:00 PM",

    "07:00 PM",

  ];


  /* =====================================================
     TODAY

     Prevent past dates.
  ===================================================== */

  const today = new Date();


  const todayString =
    `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(
      today.getDate()
    ).padStart(2, "0")}`;


  /* =====================================================
     VALIDATION + CONTINUE
  ===================================================== */

  const handleContinue = () => {

    if (!date) {

      alert("Please select a date.");

      return;

    }


    if (!time) {

      alert("Please select a time.");

      return;

    }


    /*
     * Address is required for both
     * Home and Temple / Other.
     */

    if (!address.trim()) {

      alert(
        bookingLocation === "home"
          ? "Please enter your home address."
          : "Please enter the pooja location."
      );

      return;

    }


    const bookingData = {

      pooja: pooja,

      date: date,

      time: time,

      location: bookingLocation,

      address: address.trim(),

      notes: notes.trim(),

      customerPrice:
        hasPrice
          ? Number(pooja.price)
          : null,

      status:
        "BOOKING_CREATED",

    };


    navigate(
      "/booking-confirmation",
      {
        state: {
          booking: bookingData,
        },
      }
    );

  };


  /* =====================================================
     RETURN
  ===================================================== */

  return (

    <main className="booking-page">


      {/* =====================================
          HEADER
      ===================================== */}

      <header className="booking-header">

        <button
          className="booking-back"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >

          <ArrowLeft size={22} />

        </button>


        <h1>
          Book Pooja
        </h1>


        <div className="booking-header-space"></div>

      </header>



      {/* =====================================
          POOJA SUMMARY
      ===================================== */}

      <section className="booking-pooja-card">


        <div className="booking-pooja-icon">

          {pooja.image ? (

            <img
              src={pooja.image}
              alt={pooja.name}
              onError={(event) => {

                event.currentTarget.style.display =
                  "none";

                event.currentTarget.parentElement
                  .classList.add(
                    "booking-icon-fallback"
                  );

              }}
            />

          ) : (

            <span>
              🪷
            </span>

          )}

        </div>


        <div className="booking-pooja-info">

          <span>
            SELECTED POOJA
          </span>


          <h2>
            {pooja.name}
          </h2>


          <p>
            {getCategoryLabel(pooja.category)}
          </p>

        </div>


        <div className="booking-price">

          <span>
            Customer Price
          </span>


          <strong
            className={
              !hasPrice
                ? "booking-price-unavailable"
                : ""
            }
          >

            {formatPrice(pooja.price)}

          </strong>

        </div>


      </section>



      {/* =====================================
          DATE
      ===================================== */}

      <section className="booking-section">

        <div className="booking-section-title">

          <div>

            <small>
              STEP 1
            </small>

            <h2>
              Select Date
            </h2>

          </div>

        </div>


        <label className="field-label">

          Pooja Date

        </label>


        <div className="input-wrapper">

          <CalendarDays size={18} />


          <input
            type="date"
            value={date}
            min={todayString}
            onChange={(event) =>
              setDate(event.target.value)
            }
          />

        </div>

      </section>



      {/* =====================================
          TIME
      ===================================== */}

      <section className="booking-section">

        <div className="booking-section-title">

          <div>

            <small>
              STEP 2
            </small>

            <h2>
              Select Time
            </h2>

          </div>

        </div>


        <label className="field-label">

          Preferred Time

        </label>


        <button
          type="button"
          className="select-wrapper"
          onClick={() =>
            setShowTimeList(!showTimeList)
          }
        >

          <div>

            <Clock3 size={18} />

            <span>

              {time ||
                "Choose a time"}

            </span>

          </div>


          <ChevronDown
            size={18}
            className={
              showTimeList
                ? "select-arrow rotate"
                : "select-arrow"
            }
          />

        </button>


        {showTimeList && (

          <div className="time-options">

            {timeOptions.map((option) => (

              <button
                type="button"
                key={option}
                className={
                  time === option
                    ? "time-option selected"
                    : "time-option"
                }
                onClick={() => {

                  setTime(option);

                  setShowTimeList(false);

                }}
              >

                <span>
                  {option}
                </span>


                {time === option && (

                  <CheckCircle2
                    size={17}
                  />

                )}

              </button>

            ))}

          </div>

        )}

      </section>



      {/* =====================================
          LOCATION
      ===================================== */}

      <section className="booking-section">

        <div className="booking-section-title">

          <div>

            <small>
              STEP 3
            </small>

            <h2>
              Pooja Location
            </h2>

          </div>

        </div>


        <div className="location-options">


          {/* HOME */}

          <button
            type="button"
            className={
              bookingLocation === "home"
                ? "location-card active"
                : "location-card"
            }
            onClick={() =>
              setBookingLocation("home")
            }
          >

            <div className="location-icon">

              <Home size={19} />

            </div>


            <div>

              <strong>
                At My Home
              </strong>

              <span>
                Priest visits your home
              </span>

            </div>


            <div className="radio-circle">

              {bookingLocation === "home" && (

                <span></span>

              )}

            </div>

          </button>



          {/* TEMPLE / OTHER */}

          <button
            type="button"
            className={
              bookingLocation === "temple"
                ? "location-card active"
                : "location-card"
            }
            onClick={() =>
              setBookingLocation("temple")
            }
          >

            <div className="location-icon">

              🛕

            </div>


            <div>

              <strong>
                Temple / Other
              </strong>

              <span>
                Select a different location
              </span>

            </div>


            <div className="radio-circle">

              {bookingLocation === "temple" && (

                <span></span>

              )}

            </div>

          </button>


        </div>



        {/* ADDRESS */}

        <div className="address-field">

          <label className="field-label">

            {bookingLocation === "home"
              ? "Home Address"
              : "Pooja Location Address"}

          </label>


          <div className="textarea-wrapper">

            <MapPin size={18} />


            <textarea
              value={address}
              onChange={(event) =>
                setAddress(event.target.value)
              }
              placeholder={
                bookingLocation === "home"
                  ? "Enter your complete home address"
                  : "Enter the complete pooja location address"
              }
              rows="3"
            />

          </div>

        </div>


      </section>



      {/* =====================================
          NOTES
      ===================================== */}

      <section className="booking-section">

        <div className="booking-section-title">

          <div>

            <small>
              OPTIONAL
            </small>

            <h2>
              Additional Notes
            </h2>

          </div>

        </div>


        <textarea
          className="notes-input"
          value={notes}
          onChange={(event) =>
            setNotes(event.target.value)
          }
          placeholder="Any special requirements or instructions?"
          rows="4"
        />

      </section>



      {/* =====================================
          BOOKING SUMMARY
      ===================================== */}

      <section className="summary-card">

        <div className="summary-title">

          Booking Summary

        </div>


        <div className="summary-row">

          <span>
            {pooja.name}
          </span>


          <strong
            className={
              !hasPrice
                ? "summary-price-unavailable"
                : ""
            }
          >

            {formatPrice(pooja.price)}

          </strong>

        </div>


        <div className="summary-row">

          <span>
            Service
          </span>

          <span>
            {getCategoryLabel(
              pooja.category
            )}
          </span>

        </div>


        <div className="summary-row">

          <span>
            Duration
          </span>

          <span>
            {pooja.duration}
          </span>

        </div>


        {date && (

          <div className="summary-row">

            <span>
              Date
            </span>

            <span>
              {date}
            </span>

          </div>

        )}


        {time && (

          <div className="summary-row">

            <span>
              Time
            </span>

            <span>
              {time}
            </span>

          </div>

        )}


        <div className="summary-divider"></div>


        <div className="summary-total">

          <span>
            Total Amount
          </span>


          <strong
            className={
              !hasPrice
                ? "summary-price-unavailable"
                : ""
            }
          >

            {formatPrice(pooja.price)}

          </strong>

        </div>


      </section>



      {/* =====================================
          CONFIRM BUTTON
      ===================================== */}

      <div className="booking-bottom">

        <button
          type="button"
          className="confirm-booking-button"
          onClick={handleContinue}
        >

          Continue to Confirmation

          <ChevronDown
            size={18}
            className="confirm-arrow"
          />

        </button>

      </div>


    </main>

  );

}


export default Booking;