import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Clock4,
  PackageOpen,
  IndianRupee
} from "lucide-react";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "../styles/myBookings.css";


function MyBookings() {

  const navigate = useNavigate();
  const location = useLocation();


  const [activeTab, setActiveTab] =
    useState("upcoming");


  const [bookings, setBookings] =
    useState(() => {

      try {

        const saved =
          localStorage.getItem(
            "poojamitra_bookings"
          );

        return saved
          ? JSON.parse(saved)
          : [];

      } catch (error) {

        console.error(
          "Unable to load bookings:",
          error
        );

        return [];

      }

    });


  /* =====================================
     RECEIVE NEW BOOKING
  ===================================== */

  useEffect(() => {

    const newBooking =
      location.state?.newBooking;

    if (!newBooking) {
      return;
    }


    setBookings((previous) => {

      const alreadyExists =
        previous.some(
          (item) =>
            item.bookingId ===
            newBooking.bookingId
        );


      if (alreadyExists) {

        return previous;

      }


      const updated = [
        newBooking,
        ...previous
      ];


      localStorage.setItem(
        "poojamitra_bookings",
        JSON.stringify(updated)
      );


      return updated;

    });


    /*
     * Clear router state after receiving
     * the booking so refresh does not
     * create the same booking again.
     */

    navigate(
      "/my-bookings",
      {
        replace: true,
        state: {}
      }
    );

  }, [location.state, navigate]);


  /* =====================================
     FORMAT DATE
  ===================================== */

  const formatDate = (dateString) => {

    if (!dateString) {

      return "Date not selected";

    }


    const date =
      new Date(
        dateString + "T00:00:00"
      );


    if (Number.isNaN(date.getTime())) {

      return "Date not selected";

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
     STATUS HELPERS
  ===================================== */

  const isPastStatus = (status) => {

    return [
      "COMPLETED",
      "completed",
      "CANCELLED",
      "cancelled",
      "CANCELLED_BY_CUSTOMER",
      "CANCELLED_BY_PRIEST",
      "CANCELLED_BY_ADMIN",
      "REJECTED",
      "rejected",
      "REFUNDED"
    ].includes(status);

  };


  const isUpcomingStatus = (status) => {

    return !isPastStatus(status);

  };


  /* =====================================
     FILTER BOOKINGS
  ===================================== */

  const upcomingBookings =
    bookings.filter(
      (booking) =>
        isUpcomingStatus(
          booking.status
        )
    );


  const pastBookings =
    bookings.filter(
      (booking) =>
        isPastStatus(
          booking.status
        )
    );


  const displayedBookings =
    activeTab === "upcoming"
      ? upcomingBookings
      : pastBookings;


  /* =====================================
     BOOKING DETAILS
  ===================================== */

  const openBooking = (booking) => {

    navigate(
      "/booking-details",
      {
        state: {
          booking
        }
      }
    );

  };


  /* =====================================
     BOOK POoja
  ===================================== */

  const bookPooja = () => {

    navigate(
      "/pooja-categories"
    );

  };


  return (

    <main className="my-bookings-page">


      {/* =================================
          HEADER
      ================================= */}

      <header className="bookings-header">

        <button
          className="bookings-back"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >

          <ArrowLeft size={22} />

        </button>


        <h1>
          My Bookings
        </h1>


        <div
          className="bookings-header-space"
        />

      </header>



      {/* =================================
          INTRO
      ================================= */}

      <section className="bookings-intro">

        <div className="bookings-intro-icon">

          <CalendarDays size={24} />

        </div>

        <div>

          <h2>
            Your Pooja Bookings
          </h2>

          <p>
            View and manage your upcoming
            and previous bookings.
          </p>

        </div>

      </section>



      {/* =================================
          TABS
      ================================= */}

      <section className="booking-tabs">

        <button
          type="button"
          className={
            activeTab === "upcoming"
              ? "booking-tab active"
              : "booking-tab"
          }
          onClick={() =>
            setActiveTab("upcoming")
          }
        >

          Upcoming

          <span>
            {upcomingBookings.length}
          </span>

        </button>


        <button
          type="button"
          className={
            activeTab === "past"
              ? "booking-tab active"
              : "booking-tab"
          }
          onClick={() =>
            setActiveTab("past")
          }
        >

          Past

          <span>
            {pastBookings.length}
          </span>

        </button>

      </section>



      {/* =================================
          BOOKING LIST
      ================================= */}

      <section className="bookings-list">

        {displayedBookings.length === 0 ? (

          <div className="empty-bookings">

            <div className="empty-bookings-icon">

              <PackageOpen size={29} />

            </div>


            <h2>
              No {activeTab} bookings
            </h2>


            <p>

              {activeTab === "upcoming"
                ? "Your upcoming pooja bookings will appear here."
                : "Your completed or cancelled bookings will appear here."
              }

            </p>


            {activeTab === "upcoming" && (

              <button
                type="button"
                onClick={bookPooja}
              >

                Book a Pooja

                <ChevronRight size={16} />

              </button>

            )}

          </div>

        ) : (

          displayedBookings.map(
            (booking) => (

              <BookingCard
                key={
                  booking.bookingId ||
                  `${booking.date}-${booking.time}-${booking.pooja?.name}`
                }
                booking={booking}
                onClick={() =>
                  openBooking(booking)
                }
                formatDate={formatDate}
              />

            )
          )

        )}

      </section>



      {/* =================================
          FOOTER
      ================================= */}

      <div className="bookings-footer">

        <span>
          ✦
        </span>

        <span>
          ॐ
        </span>

        <span>
          ✦
        </span>

      </div>


    </main>

  );

}


/* =========================================
   BOOKING CARD
========================================= */

function BookingCard({
  booking,
  onClick,
  formatDate
}) {

  const price =
    booking.customerPrice ??
    booking.pooja?.price;


  const hasPrice =
    price !== null &&
    price !== undefined &&
    price !== "" &&
    !Number.isNaN(
      Number(price)
    );


  const formattedPrice =
    hasPrice
      ? `₹${Number(price).toLocaleString("en-IN")}`
      : "Price to be confirmed";


  return (

    <button
      type="button"
      className="booking-card"
      onClick={onClick}
    >


      {/* =================================
          TOP
      ================================= */}

      <div className="booking-card-top">

        <div className="booking-card-icon">

          {booking.pooja?.image ? (

            <img
              src={booking.pooja.image}
              alt={
                booking.pooja?.name ||
                "Pooja"
              }
            />

          ) : (

            <span>
              🪷
            </span>

          )}

        </div>


        <div className="booking-card-title">

          <span>
            {booking.pooja?.category ||
              "POOJA BOOKING"}
          </span>

          <h2>
            {booking.pooja?.name ||
              "Pooja Service"}
          </h2>

        </div>


        <ChevronRight
          size={18}
          className="booking-card-arrow"
        />

      </div>



      {/* =================================
          DETAILS
      ================================= */}

      <div className="booking-card-details">

        <div>

          <CalendarDays size={15} />

          <span>
            {formatDate(
              booking.date
            )}
          </span>

        </div>


        <div>

          <Clock3 size={15} />

          <span>
            {booking.time ||
              "Time not selected"}
          </span>

        </div>


        <div>

          <MapPin size={15} />

          <span>
            {booking.location === "home"
              ? "Home"
              : "Temple / Other"}
          </span>

        </div>

      </div>



      {/* =================================
          ADDRESS
      ================================= */}

      {booking.address && (

        <div className="booking-card-address">

          <MapPin size={13} />

          <span>
            {booking.address}
          </span>

        </div>

      )}



      {/* =================================
          PRICE
      ================================= */}

      <div className="booking-card-price">

        <div className="booking-price-label">

          <IndianRupee size={13} />

          <span>
            Total Amount
          </span>

        </div>

        <strong
          className={
            !hasPrice
              ? "price-unavailable"
              : ""
          }
        >
          {formattedPrice}
        </strong>

      </div>



      {/* =================================
          BOTTOM
      ================================= */}

      <div className="booking-card-bottom">

        <div>

          <small>
            BOOKING ID
          </small>

          <strong>
            {booking.bookingId ||
              "Pending"}
          </strong>

        </div>


        <BookingStatus
          status={
            booking.status ||
            "BOOKING_CREATED"
          }
        />

      </div>

    </button>

  );

}


/* =========================================
   STATUS
========================================= */

function BookingStatus({
  status
}) {

  const normalizedStatus =
    String(status || "")
      .toUpperCase();


  /* BOOKING CREATED */

  if (
    normalizedStatus ===
    "BOOKING_CREATED"
  ) {

    return (

      <div className="booking-status created">

        <Clock4 size={14} />

        Booking Created

      </div>

    );

  }


  /* PENDING */

  if (
    normalizedStatus ===
    "PENDING"
  ) {

    return (

      <div className="booking-status pending">

        <Clock4 size={14} />

        Pending

      </div>

    );

  }


  /* PRIEST ACCEPTED */

  if (
    normalizedStatus ===
    "PRIEST_ACCEPTED"
  ) {

    return (

      <div className="booking-status accepted">

        <CheckCircle2 size={14} />

        Priest Accepted

      </div>

    );

  }


  /* CONFIRMED */

  if (
    normalizedStatus ===
    "CONFIRMED"
  ) {

    return (

      <div className="booking-status confirmed">

        <CheckCircle2 size={14} />

        Confirmed

      </div>

    );

  }


  /* SERVICE IN PROGRESS */

  if (
    normalizedStatus ===
    "SERVICE_IN_PROGRESS"
  ) {

    return (

      <div className="booking-status progress">

        <Clock4 size={14} />

        In Progress

      </div>

    );

  }


  /* COMPLETED */

  if (
    normalizedStatus ===
      "COMPLETED"
  ) {

    return (

      <div className="booking-status completed">

        <CheckCircle2 size={14} />

        Completed

      </div>

    );

  }


  /* CANCELLED */

  if (
    normalizedStatus.includes(
      "CANCELLED"
    )
  ) {

    return (

      <div className="booking-status cancelled">

        <XCircle size={14} />

        Cancelled

      </div>

    );

  }


  /* REJECTED */

  if (
    normalizedStatus ===
    "REJECTED"
  ) {

    return (

      <div className="booking-status rejected">

        <XCircle size={14} />

        Rejected

      </div>

    );

  }


  /* DEFAULT */

  return (

    <div className="booking-status confirmed">

      <CheckCircle2 size={14} />

      Confirmed

    </div>

  );

}


export default MyBookings;