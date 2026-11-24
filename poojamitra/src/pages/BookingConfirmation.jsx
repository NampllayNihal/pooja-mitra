import {
  Check,
  CalendarDays,
  Clock3,
  MapPin,
  ArrowRight,
  Home,
  AlertCircle
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

import "../styles/bookingConfirmation.css";


function BookingConfirmation() {

  const navigate = useNavigate();
  const location = useLocation();

  const booking = location.state?.booking;


  /* =====================================
     NO BOOKING DATA
  ===================================== */

  if (!booking) {

    return (
      <main className="confirmation-page">

        <section className="confirmation-empty-state">

          <div className="confirmation-empty-icon">
            <AlertCircle size={42} />
          </div>

          <h1>
            Booking Details Not Found
          </h1>

          <p>
            We could not find the booking information.
            Please select a pooja and continue with the booking.
          </p>

          <button
            className="confirmation-empty-button"
            onClick={() => navigate("/pooja-categories")}
          >
            Browse Poojas
            <ArrowRight size={18} />
          </button>

        </section>

      </main>
    );
  }


  /* =====================================
     BOOKING DATA
  ===================================== */

  const pooja = booking.pooja || {};

  const hasPrice =
    booking.customerPrice !== null &&
    booking.customerPrice !== undefined &&
    booking.customerPrice !== "" &&
    !Number.isNaN(Number(booking.customerPrice));


  const formatPrice = (price) => {

    if (
      price === null ||
      price === undefined ||
      price === "" ||
      Number.isNaN(Number(price))
    ) {
      return "Price to be confirmed";
    }

    return `₹${Number(price).toLocaleString("en-IN")}`;
  };


  /* =====================================
     FORMAT DATE
  ===================================== */

  const formatDate = (dateString) => {

    if (!dateString) {
      return "Not selected";
    }

    const date = new Date(
      dateString + "T00:00:00"
    );

    if (Number.isNaN(date.getTime())) {
      return "Not selected";
    }

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    );
  };


  /* =====================================
     CATEGORY
  ===================================== */

  const getCategoryLabel = (category) => {

    switch (category) {

      case "Poojas":
        return "Divine Pooja";

      case "Vratham":
        return "Vratham";

      case "Homam":
        return "Sacred Homam";

      case "Marriage":
        return "Marriage Ceremony";

      case "Child & Children Ceremonies":
        return "Child & Family Ceremony";

      default:
        return category || "Pooja Service";
    }
  };


  /* =====================================
     LOCATION
  ===================================== */

  const locationText =
    booking.location === "home"
      ? "Home"
      : "Temple / Other";


  /* =====================================
     BOOKING ID
  ===================================== */

  const bookingId =
    booking.bookingId ||
    (
      "PM" +
      Date.now()
        .toString()
        .slice(-8)
    );


  /* =====================================
     VIEW BOOKINGS
  ===================================== */

  const viewBookings = () => {

    navigate(
      "/my-bookings",
      {
        state: {
          newBooking: {
            ...booking,
            bookingId
          }
        }
      }
    );

  };


  /* =====================================
     HOME
  ===================================== */

  const goHome = () => {

    navigate("/home");

  };


  return (

    <main className="confirmation-page">


      {/* =====================================
          SUCCESS SECTION
      ===================================== */}

      <section className="confirmation-success">

        <div className="success-circle">

          <div className="success-check">

            <Check size={42} />

          </div>

        </div>


        <div className="success-spark spark-one">
          ✦
        </div>

        <div className="success-spark spark-two">
          ✦
        </div>

        <div className="success-spark spark-three">
          ✦
        </div>


        <h1>
          Booking Confirmed!
        </h1>


        <p>

          Your {pooja.name || "Pooja Service"}
          <br />

          booking has been created successfully.

        </p>

      </section>



      {/* =====================================
          BOOKING ID
      ===================================== */}

      <section className="booking-id-card">

        <span>
          BOOKING ID
        </span>

        <strong>
          {bookingId}
        </strong>

      </section>



      {/* =====================================
          BOOKING DETAILS
      ===================================== */}

      <section className="confirmation-details">


        {/* POOJA */}

        <div className="confirmation-detail-row">

          <div className="detail-icon">
            🪷
          </div>

          <div className="detail-content">

            <span>
              Pooja Name
            </span>

            <strong>
              {pooja.name || "Pooja Service"}
            </strong>

          </div>

        </div>



        {/* CATEGORY */}

        <div className="confirmation-detail-row">

          <div className="detail-icon">
            ✦
          </div>

          <div className="detail-content">

            <span>
              Category
            </span>

            <strong>
              {getCategoryLabel(pooja.category)}
            </strong>

          </div>

        </div>



        {/* DATE */}

        <div className="confirmation-detail-row">

          <div className="detail-icon">

            <CalendarDays size={19} />

          </div>

          <div className="detail-content">

            <span>
              Date
            </span>

            <strong>
              {formatDate(booking.date)}
            </strong>

          </div>

        </div>



        {/* TIME */}

        <div className="confirmation-detail-row">

          <div className="detail-icon">

            <Clock3 size={19} />

          </div>

          <div className="detail-content">

            <span>
              Time
            </span>

            <strong>
              {booking.time || "Not selected"}
            </strong>

          </div>

        </div>



        {/* LOCATION */}

        <div className="confirmation-detail-row">

          <div className="detail-icon">

            <MapPin size={19} />

          </div>

          <div className="detail-content">

            <span>
              Location
            </span>

            <strong>
              {locationText}
            </strong>

            {booking.address && (

              <small>
                {booking.address}
              </small>

            )}

          </div>

        </div>



        {/* DURATION */}

        {pooja.duration && (

          <div className="confirmation-detail-row">

            <div className="detail-icon">
              ⏱
            </div>

            <div className="detail-content">

              <span>
                Duration
              </span>

              <strong>
                {pooja.duration}
              </strong>

            </div>

          </div>

        )}



        <div className="confirmation-divider"></div>



        {/* TOTAL */}

        <div className="total-row">

          <div>

            <span>
              Total Amount
            </span>

          </div>

          <strong
            className={
              !hasPrice
                ? "confirmation-price-unavailable"
                : ""
            }
          >
            {formatPrice(
              booking.customerPrice ??
              pooja.price
            )}
          </strong>

        </div>

      </section>



      {/* =====================================
          NOTES
      ===================================== */}

      {booking.notes && (

        <section className="confirmation-message">

          <div className="message-icon">
            🙏
          </div>

          <div>

            <strong>
              Special Instructions
            </strong>

            <p>
              {booking.notes}
            </p>

          </div>

        </section>

      )}



      {/* =====================================
          IMPORTANT MESSAGE
      ===================================== */}

      <section className="confirmation-message">

        <div className="message-icon">
          🙏
        </div>

        <div>

          <strong>
            Thank you for choosing PoojaMitra
          </strong>

          <p>
            We will keep you updated about
            your booking.
          </p>

        </div>

      </section>



      {/* =====================================
          ACTIONS
      ===================================== */}

      <section className="confirmation-actions">


        <button
          className="view-bookings-button"
          onClick={viewBookings}
        >

          <span>
            View My Bookings
          </span>

          <ArrowRight size={18} />

        </button>



        <button
          className="continue-home-button"
          onClick={goHome}
        >

          <Home size={17} />

          Continue to Home

        </button>


      </section>



      {/* =====================================
          DECORATION
      ===================================== */}

      <div className="confirmation-footer">

        <span>
          ✦
        </span>

        <span className="footer-lotus">
          🪷
        </span>

        <span>
          ✦
        </span>

      </div>


    </main>

  );

}


export default BookingConfirmation;