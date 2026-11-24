import {
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  Clock3,
  MapPin,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

import "../styles/poojaDetails.css";


/*
=========================================================
POOJA DETAILS

Customer-facing prices from PoojaMitra Service Master.

Only customer price is shown.

Priest Amount and Company Commission are never shown.
=========================================================
*/


/*
=========================================================
CUSTOMER PRICE MASTER
=========================================================
*/

const SERVICE_PRICES = {

  "Ganapati Pooja": 3000,

  "Laxmi Pooja": 2800,

  "Rudra abhisekham": 5000,

  "Durga Pooja": 2500,

  "Hanuman Pooja": 2500,

  "Navagraha Pooja": 3000,

  "Venkateswara Swamy Pooja": 3000,

  "Krishnasthami": 3000,

  "Subramanya Swamy Pooja": 3000,

  "Gowri Pooja": 2000,

  "Satyanarayana Swamy Vratham": 5000,

  "Varalakshmi Vratham": 3000,

  "Sankashti Chaturthi Pooja": 3000,

  "Ekadashi Vratham": 3000,

  "Ganapathi navaratrulu": null,

  "Mangala Gowri Vratham": 3000,

  "Vinayaka Chavithi": 2500,

  "Ganapati Homam": 12000,

  "Navagraha Homam": 15000,

  "Rudra Homam": 15000,

  "Maha Mrityunjaya Homam": 15000,

  "Sudarsana Homam": 20000,

  "Lakshmi Kubera Homam": 15000,

  "Durga Homam": 10000,

  "Chandi Homam": 25000,

  "Ayushya Homam": 10000,

  "Dhanvantari Homam": 15000,

  "Vastu Homam": 10000,

  "Gruhapravesham": 15000,

  "Vivahalu (Marriage)": 25000,

  "Engagement": 8000,

  "Annaprasana": 3000,

  "Naming Ceremony": 2500,

  "Akshara Byasam": 5000,

  "Upanayanam": null,

  "Seemantham / Srimantham": 5000,

  "Punyavachanam": 3000,

  "Garbha Samskara Pooja": 4000,

  "Shashtipoorthi": 30000,

  "Kalyanotsavam": 25000,

  "Kuber Pooja": 3000,

  "karthikamasam deeparadhana": 3000,

  "Sahasranama Archana": 3000,

  "Abhishekam & Archana": null,

};


/*
=========================================================
POOJA ITEMS MASTER

Items are selected according to the individual pooja.

This keeps the items dynamic while preserving the
existing Pooja Details page.
=========================================================
*/

const POOJA_ITEMS = {

  "Ganapati Pooja": [
    "Ganesh Idol / Photo",
    "Turmeric & Kumkum",
    "Flowers & Garland",
    "Durva Grass",
    "Fruits & Naivedyam",
    "Modak / Sweets",
    "Coconut",
    "Betel Leaves & Betel Nuts",
    "Pooja Samagri"
  ],


  "Laxmi Pooja": [
    "Goddess Lakshmi Idol / Photo",
    "Turmeric & Kumkum",
    "Flowers & Garland",
    "Lotus Flowers",
    "Fruits & Naivedyam",
    "Coconut",
    "Betel Leaves & Betel Nuts",
    "Rice / Akshata",
    "Pooja Samagri"
  ],


  "Rudra abhisekham": [
    "Shiva Lingam",
    "Milk",
    "Curd",
    "Honey",
    "Ghee",
    "Sugar",
    "Water",
    "Bilva Leaves",
    "Flowers",
    "Vibhuti",
    "Fruits & Naivedyam"
  ],


  "Durga Pooja": [
    "Goddess Durga Idol / Photo",
    "Turmeric & Kumkum",
    "Flowers & Garland",
    "Red Flowers",
    "Fruits & Naivedyam",
    "Coconut",
    "Betel Leaves & Betel Nuts",
    "Lemon",
    "Pooja Samagri"
  ],


  "Hanuman Pooja": [
    "Hanuman Idol / Photo",
    "Sindoor",
    "Betel Leaves",
    "Flowers & Garland",
    "Tulasi Leaves",
    "Bananas",
    "Fruits & Naivedyam",
    "Coconut",
    "Pooja Samagri"
  ],


  "Navagraha Pooja": [
    "Navagraha Idols / Photos",
    "Nine Types of Grains",
    "Flowers",
    "Turmeric & Kumkum",
    "Oil / Ghee",
    "Fruits & Naivedyam",
    "Coconut",
    "Betel Leaves & Betel Nuts",
    "Pooja Samagri"
  ],


  "Venkateswara Swamy Pooja": [
    "Lord Venkateswara Idol / Photo",
    "Tulasi Leaves",
    "Flowers & Garland",
    "Turmeric & Kumkum",
    "Fruits & Naivedyam",
    "Coconut",
    "Betel Leaves & Betel Nuts",
    "Laddu / Sweets",
    "Pooja Samagri"
  ],


  "Krishnasthami": [
    "Lord Krishna Idol / Photo",
    "Tulasi Leaves",
    "Flowers",
    "Butter",
    "Milk",
    "Fruits",
    "Sweets / Naivedyam",
    "Coconut",
    "Pooja Samagri"
  ],


  "Subramanya Swamy Pooja": [
    "Lord Subramanya Idol / Photo",
    "Flowers & Garland",
    "Turmeric & Kumkum",
    "Betel Leaves & Betel Nuts",
    "Fruits & Naivedyam",
    "Coconut",
    "Milk",
    "Pooja Samagri"
  ],


  "Gowri Pooja": [
    "Gowri Idol / Photo",
    "Turmeric",
    "Kumkum",
    "Flowers & Garland",
    "Mango Leaves",
    "Fruits & Naivedyam",
    "Coconut",
    "Betel Leaves & Betel Nuts",
    "Pooja Samagri"
  ],


  "Satyanarayana Swamy Vratham": [
    "Lord Satyanarayana Idol / Photo",
    "Kalasha",
    "Turmeric & Kumkum",
    "Flowers & Garland",
    "Bananas & Fruits",
    "Coconut",
    "Betel Leaves & Betel Nuts",
    "Wheat / Sooji",
    "Sugar",
    "Panchamrutam Ingredients",
    "Prasadam Ingredients"
  ],


  "Varalakshmi Vratham": [
    "Varalakshmi Idol / Photo",
    "Kalasha",
    "Turmeric & Kumkum",
    "Flowers & Garland",
    "Mango Leaves",
    "Coconut",
    "Fruits & Naivedyam",
    "Betel Leaves & Betel Nuts",
    "Rice / Akshata",
    "Varalakshmi Vratham Threads"
  ],


  "Sankashti Chaturthi Pooja": [
    "Lord Ganesha Idol / Photo",
    "Durva Grass",
    "Flowers",
    "Turmeric & Kumkum",
    "Coconut",
    "Fruits",
    "Modak / Naivedyam",
    "Betel Leaves & Betel Nuts",
    "Pooja Samagri"
  ],


  "Ekadashi Vratham": [
    "Vishnu / Krishna Idol / Photo",
    "Tulasi Leaves",
    "Flowers",
    "Turmeric & Kumkum",
    "Fruits",
    "Coconut",
    "Milk",
    "Fruits / Naivedyam",
    "Pooja Samagri"
  ],


  "Ganapathi navaratrulu": [
    "Ganesh Idol",
    "Turmeric & Kumkum",
    "Flowers & Garland",
    "Durva Grass",
    "Fruits & Naivedyam",
    "Coconut",
    "Modak / Sweets",
    "Betel Leaves & Betel Nuts",
    "Daily Pooja Samagri"
  ],


  "Mangala Gowri Vratham": [
    "Gowri Idol / Photo",
    "Turmeric",
    "Kumkum",
    "Flowers & Garland",
    "Mango Leaves",
    "Coconut",
    "Fruits & Naivedyam",
    "Betel Leaves & Betel Nuts",
    "Vratham Thread",
    "Pooja Samagri"
  ],


  "Vinayaka Chavithi": [
    "Clay Ganesha Idol",
    "Durva Grass",
    "Flowers & Garland",
    "Patri Leaves",
    "Turmeric & Kumkum",
    "Fruits",
    "Modak / Undrallu",
    "Coconut",
    "Betel Leaves & Betel Nuts",
    "Pooja Samagri"
  ],


  "Ganapati Homam": [
    "Ganesh Idol",
    "Homam Kundam",
    "Havan Samagri",
    "Ghee",
    "Wood / Samidha",
    "Durva Grass",
    "Flowers",
    "Coconut",
    "Fruits & Naivedyam",
    "Turmeric & Kumkum",
    "Pooja Samagri"
  ],


  "Navagraha Homam": [
    "Navagraha Idols",
    "Homam Kundam",
    "Havan Samagri",
    "Nine Types of Grains",
    "Ghee",
    "Wood / Samidha",
    "Flowers",
    "Coconut",
    "Fruits & Naivedyam",
    "Turmeric & Kumkum"
  ],


  "Rudra Homam": [
    "Shiva Idol / Photo",
    "Homam Kundam",
    "Havan Samagri",
    "Ghee",
    "Wood / Samidha",
    "Bilva Leaves",
    "Vibhuti",
    "Flowers",
    "Coconut",
    "Fruits & Naivedyam"
  ],


  "Maha Mrityunjaya Homam": [
    "Lord Shiva Idol / Photo",
    "Homam Kundam",
    "Havan Samagri",
    "Ghee",
    "Wood / Samidha",
    "Bilva Leaves",
    "Herbal Homam Materials",
    "Flowers",
    "Coconut",
    "Fruits & Naivedyam"
  ],


  "Sudarsana Homam": [
    "Sudarsana / Vishnu Idol",
    "Homam Kundam",
    "Havan Samagri",
    "Ghee",
    "Wood / Samidha",
    "Sacred Grains",
    "Flowers",
    "Coconut",
    "Fruits & Naivedyam",
    "Turmeric & Kumkum"
  ],


  "Lakshmi Kubera Homam": [
    "Lakshmi Kubera Idol / Photo",
    "Homam Kundam",
    "Havan Samagri",
    "Ghee",
    "Wood / Samidha",
    "Lotus Flowers",
    "Rice / Akshata",
    "Coconut",
    "Fruits & Naivedyam",
    "Turmeric & Kumkum"
  ],


  "Durga Homam": [
    "Goddess Durga Idol / Photo",
    "Homam Kundam",
    "Havan Samagri",
    "Ghee",
    "Wood / Samidha",
    "Red Flowers",
    "Coconut",
    "Fruits & Naivedyam",
    "Turmeric & Kumkum"
  ],


  "Chandi Homam": [
    "Goddess Chandi / Durga Idol",
    "Homam Kundam",
    "Havan Samagri",
    "Ghee",
    "Wood / Samidha",
    "Sacred Grains",
    "Red Flowers",
    "Coconut",
    "Fruits & Naivedyam",
    "Turmeric & Kumkum",
    "Special Homam Samagri"
  ],


  "Ayushya Homam": [
    "Ayushya Devata Idol / Photo",
    "Homam Kundam",
    "Havan Samagri",
    "Ghee",
    "Wood / Samidha",
    "Herbal Materials",
    "Flowers",
    "Coconut",
    "Fruits & Naivedyam",
    "Turmeric & Kumkum"
  ],


  "Dhanvantari Homam": [
    "Lord Dhanvantari Idol / Photo",
    "Homam Kundam",
    "Havan Samagri",
    "Ghee",
    "Wood / Samidha",
    "Medicinal Herbs",
    "Flowers",
    "Coconut",
    "Fruits & Naivedyam",
    "Turmeric & Kumkum"
  ],


  "Vastu Homam": [
    "Vastu Devata Items",
    "Homam Kundam",
    "Havan Samagri",
    "Ghee",
    "Wood / Samidha",
    "Nine Types of Grains",
    "Flowers",
    "Coconut",
    "Fruits & Naivedyam",
    "Turmeric & Kumkum"
  ],


  "Gruhapravesham": [
    "Kalasha",
    "Mango Leaves",
    "Coconut",
    "Turmeric & Kumkum",
    "Flowers & Garland",
    "Rice / Akshata",
    "Homam Kundam",
    "Havan Samagri",
    "Ghee",
    "Navadhanyalu",
    "Fruits & Naivedyam",
    "Pooja Samagri"
  ],


  "Vivahalu (Marriage)": [
    "Kalasha",
    "Mango Leaves",
    "Coconut",
    "Turmeric & Kumkum",
    "Flowers & Garlands",
    "Wedding Pooja Samagri",
    "Akshata",
    "Betel Leaves & Betel Nuts",
    "Sacred Thread",
    "Havan Samagri",
    "Ghee",
    "Fruits & Naivedyam"
  ],


  "Engagement": [
    "Turmeric & Kumkum",
    "Flowers & Garlands",
    "Coconut",
    "Fruits & Sweets",
    "Betel Leaves & Betel Nuts",
    "Akshata",
    "Kalasha",
    "Engagement Pooja Samagri"
  ],


  "Annaprasana": [
    "Child's Pooja Items",
    "Turmeric & Kumkum",
    "Flowers",
    "Kalasha",
    "Coconut",
    "Rice / Akshata",
    "Fruits",
    "Sweets / Naivedyam",
    "Betel Leaves & Betel Nuts",
    "Pooja Samagri"
  ],


  "Naming Ceremony": [
    "Kalasha",
    "Turmeric & Kumkum",
    "Flowers",
    "Coconut",
    "Rice / Akshata",
    "Fruits & Sweets",
    "Betel Leaves & Betel Nuts",
    "Baby Naming Ceremony Items",
    "Pooja Samagri"
  ],


  "Akshara Byasam": [
    "Goddess Saraswati Idol / Photo",
    "Writing Slate / Board",
    "Rice",
    "Turmeric & Kumkum",
    "Flowers",
    "Coconut",
    "Fruits & Sweets",
    "Books / Writing Materials",
    "Pooja Samagri"
  ],


  "Upanayanam": [
    "Yagnopavita / Sacred Thread",
    "Homam Kundam",
    "Havan Samagri",
    "Ghee",
    "Turmeric & Kumkum",
    "Flowers",
    "Coconut",
    "Akshata",
    "Betel Leaves & Betel Nuts",
    "Pooja Samagri"
  ],


  "Seemantham / Srimantham": [
    "Kalasha",
    "Mango Leaves",
    "Turmeric & Kumkum",
    "Flowers & Garland",
    "Coconut",
    "Fruits",
    "Sweets",
    "Betel Leaves & Betel Nuts",
    "Akshata",
    "Seemantham Pooja Samagri"
  ],


  "Punyavachanam": [
    "Kalasha",
    "Mango Leaves",
    "Coconut",
    "Turmeric & Kumkum",
    "Flowers",
    "Rice / Akshata",
    "Holy Water",
    "Fruits & Naivedyam",
    "Betel Leaves & Betel Nuts",
    "Pooja Samagri"
  ],


  "Garbha Samskara Pooja": [
    "Kalasha",
    "Turmeric & Kumkum",
    "Flowers",
    "Coconut",
    "Fruits",
    "Rice / Akshata",
    "Betel Leaves & Betel Nuts",
    "Garbha Samskara Pooja Samagri"
  ],


  "Shashtipoorthi": [
    "Kalasha",
    "Mango Leaves",
    "Turmeric & Kumkum",
    "Flowers & Garlands",
    "Coconut",
    "Akshata",
    "Fruits & Sweets",
    "Betel Leaves & Betel Nuts",
    "Homam Kundam",
    "Havan Samagri",
    "Ghee",
    "Shashtipoorthi Pooja Samagri"
  ],


  "Kalyanotsavam": [
    "Deity Idols / Photos",
    "Kalasha",
    "Turmeric & Kumkum",
    "Flowers & Garlands",
    "Coconut",
    "Akshata",
    "Betel Leaves & Betel Nuts",
    "Sacred Thread",
    "Havan Samagri",
    "Ghee",
    "Fruits & Naivedyam",
    "Kalyanotsavam Pooja Samagri"
  ],


  "Kuber Pooja": [
    "Lord Kubera Idol / Photo",
    "Turmeric & Kumkum",
    "Flowers",
    "Lotus Flowers",
    "Rice / Akshata",
    "Coconut",
    "Fruits & Sweets",
    "Betel Leaves & Betel Nuts",
    "Pooja Samagri"
  ],


  "karthikamasam deeparadhana": [
    "Deepam / Lamps",
    "Oil / Ghee",
    "Cotton Wicks",
    "Flowers",
    "Turmeric & Kumkum",
    "Tulasi Leaves",
    "Coconut",
    "Fruits & Naivedyam",
    "Pooja Samagri"
  ],


  "Sahasranama Archana": [
    "Deity Idol / Photo",
    "Flowers",
    "Tulasi / Bilva Leaves",
    "Turmeric & Kumkum",
    "Akshata",
    "Coconut",
    "Fruits & Naivedyam",
    "Betel Leaves & Betel Nuts",
    "Archana Samagri"
  ],


  "Abhishekam & Archana": [
    "Deity Idol / Photo",
    "Milk",
    "Curd",
    "Honey",
    "Ghee",
    "Water",
    "Flowers",
    "Turmeric & Kumkum",
    "Coconut",
    "Fruits & Naivedyam",
    "Archana Samagri"
  ],

};


/*
=========================================================
CATEGORY DISPLAY LABEL
=========================================================
*/

const getCategoryLabel = (category) => {

  switch (category) {

    case "Vratham":
      return "VRATHAM";

    case "Homam":
      return "SACRED HOMAM";

    case "Marriage":
      return "MARRIAGE CEREMONY";

    case "Child & Children Ceremonies":
      return "CHILD & FAMILY CEREMONY";

    case "Poojas":
    default:
      return "DIVINE POOJA";

  }

};


/*
=========================================================
GET CUSTOMER PRICE
=========================================================
*/

const getCustomerPrice = (selectedPooja) => {

  if (!selectedPooja) {

    return null;

  }


  if (
    selectedPooja.price !== undefined &&
    selectedPooja.price !== null &&
    selectedPooja.price !== ""
  ) {

    return Number(selectedPooja.price);

  }


  if (
    Object.prototype.hasOwnProperty.call(
      SERVICE_PRICES,
      selectedPooja.name
    )
  ) {

    return SERVICE_PRICES[selectedPooja.name];

  }


  return null;

};


/*
=========================================================
GET POOJA ITEMS
=========================================================
*/

const getPoojaItems = (selectedPooja) => {

  if (!selectedPooja) {

    return [];

  }


  /*
   * If items are already supplied by backend/data,
   * use those first.
   */

  if (
    Array.isArray(selectedPooja.items) &&
    selectedPooja.items.length > 0
  ) {

    return selectedPooja.items;

  }


  /*
   * Otherwise use the pooja-specific item list.
   */

  if (
    Object.prototype.hasOwnProperty.call(
      POOJA_ITEMS,
      selectedPooja.name
    )
  ) {

    return POOJA_ITEMS[selectedPooja.name];

  }


  return [];

};


/*
=========================================================
FORMAT CUSTOMER PRICE
=========================================================
*/

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


/*
=========================================================
MAIN COMPONENT
=========================================================
*/

function PoojaDetails() {

  const navigate = useNavigate();

  const location = useLocation();


  const selectedPooja =
    location.state?.pooja;


  /*
   * No selected pooja.
   */

  if (!selectedPooja) {

    return (

      <main className="pooja-details-page">

        <header className="pooja-details-header">

          <button
            className="details-back"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >

            <ArrowLeft size={22} />

          </button>


          <h1>
            Pooja Details
          </h1>


          <div className="details-header-space"></div>

        </header>


        <section className="details-empty-state">

          <div className="details-empty-icon">
            ॐ
          </div>


          <h2>
            No Pooja Selected
          </h2>


          <p>
            Please select a pooja from the Pooja
            Categories page to view its details.
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


  /*
   * Exact customer price.
   */

  const customerPrice =
    getCustomerPrice(selectedPooja);


  /*
   * Exact pooja items.
   */

  const poojaItems =
    getPoojaItems(selectedPooja);


  /*
   * Image.
   */

  const poojaImage =
    selectedPooja.image ||
    (
      selectedPooja.id
        ? `/images/poojas/${selectedPooja.id}.png`
        : "/images/ganesh-pooja.png"
    );


  /*
   * Final pooja object.
   */

  const pooja = {

    id:
      selectedPooja.id,

    name:
      selectedPooja.name,

    category:
      selectedPooja.category || "Poojas",

    label:
      getCategoryLabel(
        selectedPooja.category
      ),

    description:
      selectedPooja.description ||
      "Traditional devotional service performed according to the selected pooja.",

    image:
      poojaImage,

    duration:
      selectedPooja.duration ||
      "To be confirmed",

    location:
      selectedPooja.location ||
      "At Your Home",

    price:
      customerPrice,

    items:
      poojaItems,

  };


  /*
   * Book Now.
   */

  const handleBookNow = () => {

    navigate("/booking", {

      state: {
        pooja
      }

    });

  };


  /*
   * Price availability.
   */

  const hasPrice =
    pooja.price !== null &&
    pooja.price !== undefined &&
    pooja.price !== "";


  return (

    <main className="pooja-details-page">


      {/* =========================================
          HEADER
      ========================================= */}

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


        <div className="details-header-space"></div>

      </header>



      {/* =========================================
          HERO IMAGE
      ========================================= */}

      <section className="pooja-image-section">

        <div className="pooja-image-wrapper">

          <img
            src={pooja.image}
            alt={pooja.name}
            onError={(event) => {

              event.currentTarget.style.display =
                "none";

              event.currentTarget.parentElement
                .classList.add("image-fallback");

            }}
          />

          <div className="image-overlay"></div>


          <div className="image-om">
            ॐ
          </div>

        </div>

      </section>



      {/* =========================================
          MAIN INFORMATION
      ========================================= */}

      <section className="pooja-main-info">

        <div className="pooja-title-row">

          <div>

            <p className="pooja-label">
              {pooja.label}
            </p>


            <h2>
              {pooja.name}
            </h2>

          </div>

        </div>


        <p className="pooja-description">

          {pooja.description}

        </p>



        {/* =========================================
            INFORMATION
        ========================================= */}

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



      {/* =========================================
          POOJA ITEMS
      ========================================= */}

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

        </div>


        <div className="items-card">

          {pooja.items.length > 0 ? (

            pooja.items.map(
              (item, index) => (

                <div
                  className="item-row"
                  key={`${item}-${index}`}
                >

                  <CheckCircle2
                    size={17}
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
                🪷
              </div>

              <p>
                Pooja items will be displayed
                once they are available for this service.
              </p>

            </div>

          )}

        </div>

      </section>



      {/* =========================================
          ABOUT
      ========================================= */}

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

            This traditional devotional service
            is performed with appropriate pooja
            items and rituals according to the
            selected pooja.

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

              Performed by a verified priest

            </div>


            <div>

              <span>
                ✦
              </span>

              Service at your selected location

            </div>

          </div>

        </div>

      </section>



      {/* =========================================
          PRICE
      ========================================= */}

      <section className="price-section">

        <div>

          <span>
            {hasPrice
              ? "Customer Price"
              : "Price"}
          </span>


          <strong
            className={
              !hasPrice
                ? "price-unavailable"
                : ""
            }
          >

            {formatPrice(pooja.price)}

          </strong>


          {!hasPrice && (

            <small className="price-note">

              The final customer price will be
              confirmed by PoojaMitra.

            </small>

          )}

        </div>

      </section>



      {/* =========================================
          BOOK BUTTON
      ========================================= */}

      <div className="details-bottom">

        <button
          className="book-pooja-button"
          onClick={handleBookNow}
        >

          Book Now

          <ChevronRight size={19} />

        </button>

      </div>


    </main>

  );

}


export default PoojaDetails;