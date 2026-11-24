/* =====================================================
   POOJA DETAILS PAGE
===================================================== */

import {
  ArrowLeft,
  ChevronRight,
  Clock3,
  MapPin,
  ShoppingBag
} from "lucide-react";

import {
  useLocation,
  useNavigate
} from "react-router-dom";

import "../styles/poojaDetails.css";


/* =====================================================
   FORMAT PRICE
===================================================== */

const formatPrice = (price) => {

  if (
    price === null ||
    price === undefined ||
    price === ""
  ) {
    return null;
  }

  return `₹${Number(price).toLocaleString("en-IN")}`;

};


/* =====================================================
   CATEGORY LABELS
===================================================== */

const categoryLabels = {

  Poojas:
    "DIVINE POOJA",

  Vratham:
    "VRATHAM",

  Homam:
    "SACRED HOMAM",

  Marriage:
    "MARRIAGE CEREMONY",

  "Child & Children Ceremonies":
    "CHILD & FAMILY CEREMONY"

};


/* =====================================================
   DEFAULT SERVICE INFORMATION
===================================================== */

const getServiceImage = (pooja) => {

  /*
   * Later we will replace these paths with
   * the exact images you upload.
   */

  if (!pooja?.id) {

    return "/images/poojas/default-pooja.png";

  }

  return `/images/poojas/${pooja.id}.png`;

};


/* =====================================================
   COMPONENT
===================================================== */

function PoojaDetails() {

  const navigate = useNavigate();

  const location = useLocation();


  /* ===================================================
     SELECTED POOJA FROM CATEGORY PAGE
  =================================================== */

  const selectedPooja =
    location.state?.pooja;


  /*
   * If the user directly opens the details page
   * without selecting a service first.
   */

  if (!selectedPooja) {

    return (

      <main className="pooja-details-page">

        <header className="pooja-details-header">

          <button
            className="details-back"
            onClick={() => navigate("/pooja-categories")}
            aria-label="Go back"
          >

            <ArrowLeft size={22} />

          </button>


          <h1>
            Pooja Details
          </h1>


          <div className="details-header-space" />

        </header>


        <section className="details-empty-state">

          <div className="details-empty-icon">
            🪷
          </div>


          <h2>
            No Pooja Selected
          </h2>


          <p>
            Please select a pooja from the
            Pooja Categories page.
          </p>


          <button
            onClick={() =>
              navigate("/pooja-categories")
            }
          >

            Browse Pooja Categories

          </button>

        </section>

      </main>

    );

  }


  /* ===================================================
     DYNAMIC POOJA DATA
  =================================================== */

  const pooja = {

    id:
      selectedPooja.id,

    name:
      selectedPooja.name,

    category:
      selectedPooja.category ||
      "Poojas",

    description:
      selectedPooja.description ||
      "Traditional devotional service performed according to the selected pooja requirements.",

    price:
      selectedPooja.price,

    image:
      selectedPooja.image ||
      getServiceImage(selectedPooja),

    /*
     * These values are intentionally not invented.
     * We will connect them from the proper service
     * master/backend later.
     */

    duration:
      selectedPooja.duration ||
      "To be confirmed",

    location:
      selectedPooja.location ||
      "At Your Home",

    items:
      selectedPooja.items ||
      []

  };


  const categoryLabel =
    categoryLabels[pooja.category] ||
    "DEVOTIONAL SERVICE";


  /* ===================================================
     IMAGE FALLBACK
  =================================================== */

  const handleImageError = (event) => {

    /*
     * Prevent the error handler from running repeatedly.
     */

    event.currentTarget.style.display =
      "none";

    event.currentTarget.parentElement
      .classList.add(
        "image-fallback"
      );

  };


  /* ===================================================
     BOOK NOW
  =================================================== */

  const handleBookNow = () => {

    navigate(
      "/booking",
      {
        state: {
          pooja
        }
      }
    );

  };


  /* ===================================================
     VIEW ALL ITEMS
  =================================================== */

  const handleViewItems = () => {

    navigate(
      "/pooja-items",
      {
        state: {
          pooja
        }
      }
    );

  };


  /* ===================================================
     RENDER
  =================================================== */

  return (

    <main className="pooja-details-page">


      {/* =================================================
          HEADER
      ================================================= */}

      <header className="pooja-details-header">

        <button
          className="details-back"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >

          <ArrowLeft size={22} />

        </button>


        <h1>
          {pooja.name}
        </h1>


        <div className="details-header-space" />

      </header>


      {/* =================================================
          HERO IMAGE
      ================================================= */}

      <section className="pooja-image-section">

        <div className="pooja-image-wrapper">

          <img
            src={pooja.image}
            alt={pooja.name}
            onError={handleImageError}
          />


          <div className="image-overlay" />


          <div className="image-om">
            ॐ
          </div>

        </div>

      </section>


      {/* =================================================
          MAIN INFORMATION
      ================================================= */}

      <section className="pooja-main-info">


        <div className="pooja-title-row">

          <div>

            <p className="pooja-label">
              {categoryLabel}
            </p>


            <h2>
              {pooja.name}
            </h2>

          </div>

        </div>


        <p className="pooja-description">

          {pooja.description}

        </p>


        {/* ===============================================
            INFO
        =============================================== */}

        <div className="pooja-info-row">


          <div className="info-item">

            <Clock3 size={18} />

            <div>

              <span>
                Duration
              </span>


              <strong>
                {pooja.duration}
              </strong>

            </div>

          </div>


          <div className="info-item">

            <MapPin size={18} />

            <div>

              <span>
                Location
              </span>


              <strong>
                {pooja.location}
              </strong>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          POOJA ITEMS
      ================================================= */}

      <section className="items-section">


        <div className="details-section-title">

          <div>

            <small>
              INCLUDED
            </small>


            <h3>
              Pooja Items
            </h3>

          </div>


          <button
            onClick={handleViewItems}
          >

            View All

            <ChevronRight
              size={14}
            />

          </button>

        </div>


        <div className="items-card">


          {pooja.items.length > 0 ? (

            pooja.items.map(
              (item) => (

                <div
                  className="item-row"
                  key={item}
                >

                  <ShoppingBag
                    size={16}
                    className="item-check"
                  />


                  <span>
                    {item}
                  </span>

                </div>

              )
            )

          ) : (

            <div className="items-empty">

              <div className="items-empty-icon">
                🪔
              </div>


              <p>
                Pooja items for this service
                will be displayed here.
              </p>

            </div>

          )}

        </div>

      </section>


      {/* =================================================
          ABOUT
      ================================================= */}

      <section className="about-section">


        <div className="details-section-title">

          <div>

            <small>
              ABOUT
            </small>


            <h3>
              About {pooja.name}
            </h3>

          </div>

        </div>


        <div className="about-card">


          <p>
            {pooja.description}
          </p>


          <p>

            This service is available through
            PoojaMitra and can be booked with
            an approved priest according to
            the selected service and booking
            requirements.

          </p>


          <div className="benefit-list">


            <div>

              <span>
                ✦
              </span>

              Traditional devotional service

            </div>


            <div>

              <span>
                ✦
              </span>

              Professional priest service

            </div>


            <div>

              <span>
                ✦
              </span>

              Convenient home booking

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          PRICE
      ================================================= */}

      <section className="price-section">


        <div>

          <span>
            Customer Price
          </span>


          {formatPrice(
            pooja.price
          ) ? (

            <strong>
              {formatPrice(
                pooja.price
              )}
            </strong>

          ) : (

            <strong className="price-unavailable">
              Price to be confirmed
            </strong>

          )}

        </div>


        <div className="price-note">

          Final booking amount will be
          shown during booking.

        </div>

      </section>


      {/* =================================================
          BOOK BUTTON
      ================================================= */}

      <div className="details-bottom">

        <button
          className="book-pooja-button"
          onClick={handleBookNow}
        >

          Book Now

          <ChevronRight
            size={19}
          />

        </button>

      </div>


    </main>

  );

}


export default PoojaDetails;