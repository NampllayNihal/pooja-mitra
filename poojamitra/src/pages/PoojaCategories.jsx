/* =====================================================
   POOJA CATEGORIES PAGE
===================================================== */

import { useMemo, useState } from "react";

import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Search,
  X
} from "lucide-react";

import {
  useLocation,
  useNavigate
} from "react-router-dom";

import "../styles/poojaCategories.css";


/* =====================================================
   SERVICE MASTER

   IMPORTANT:
   Customer sees only:
   - Service name
   - Customer price

   Customer does NOT see:
   - Priest amount
   - Company commission
===================================================== */

const serviceMaster = [

  /* ===================================================
     POOJAS
  =================================================== */

  {
    id: "ganapati-pooja",
    category: "Poojas",
    name: "Ganapati Pooja",
    description:
      "Traditional Ganapati Pooja for blessings, prosperity and removal of obstacles.",
    mainDisplay: true,
    price: 3000
  },

  {
    id: "laxmi-pooja",
    category: "Poojas",
    name: "Laxmi Pooja",
    description:
      "Traditional worship of Goddess Laxmi for prosperity and well-being.",
    mainDisplay: true,
    price: 2800
  },

  {
    id: "rudra-abisekham",
    category: "Poojas",
    name: "Rudra abhisekham",
    description:
      "Traditional Abhishekam dedicated to Lord Shiva.",
    mainDisplay: true,
    price: 5000
  },

  {
    id: "durga-pooja",
    category: "Poojas",
    name: "Durga Pooja",
    description:
      "Devotional worship of Goddess Durga.",
    mainDisplay: false,
    price: 2500
  },

  {
    id: "hanuman-pooja",
    category: "Poojas",
    name: "Hanuman Pooja",
    description:
      "Devotional worship of Lord Hanuman for strength and protection.",
    mainDisplay: true,
    price: 2500
  },

  {
    id: "navagraha-pooja",
    category: "Poojas",
    name: "Navagraha Pooja",
    description:
      "Traditional worship of the nine planetary deities.",
    mainDisplay: true,
    price: 3000
  },

  {
    id: "venkateswara-swamy-pooja",
    category: "Poojas",
    name: "Venkateswara Swamy Pooja",
    description:
      "Devotional worship of Lord Venkateswara.",
    mainDisplay: true,
    price: 3000
  },

  {
    id: "krishnasthami",
    category: "Poojas",
    name: "Krishnasthami",
    description:
      "Traditional devotional ceremony associated with Lord Krishna.",
    mainDisplay: false,
    price: 3000
  },

  {
    id: "subramanya-swamy-pooja",
    category: "Poojas",
    name: "Subramanya Swamy Pooja",
    description:
      "Traditional worship of Lord Subramanya.",
    mainDisplay: true,
    price: 3000
  },

  {
    id: "gowri-pooja",
    category: "Poojas",
    name: "Gowri Pooja",
    description:
      "Traditional worship of Goddess Gowri.",
    mainDisplay: false,
    price: 2000
  },

  {
    id: "gruhapravesham",
    category: "Poojas",
    name: "Gruhapravesham",
    description:
      "Traditional house-entry ceremony and blessings.",
    mainDisplay: true,
    price: 15000
  },

  {
    id: "punyavachanam",
    category: "Poojas",
    name: "Punyavachanam",
    description:
      "Traditional purification and blessing ceremony.",
    mainDisplay: true,
    price: 3000
  },

  {
    id: "shashtipoorthi",
    category: "Poojas",
    name: "Shashtipoorthi",
    description:
      "Traditional ceremony marking the completion of sixty years.",
    mainDisplay: true,
    price: 30000
  },

  {
    id: "kalyanotsavam",
    category: "Poojas",
    name: "Kalyanotsavam",
    description:
      "Traditional ceremonial celebration and associated rituals.",
    mainDisplay: true,
    price: 25000
  },

  {
    id: "kuber-pooja",
    category: "Poojas",
    name: "Kuber Pooja",
    description:
      "Traditional worship dedicated to Lord Kubera.",
    mainDisplay: false,
    price: 3000
  },

  {
    id: "karthikamasam-deeparadhana",
    category: "Poojas",
    name: "karthikamasam deeparadhana",
    description:
      "Traditional devotional Deepa Aradhana during Karthika Masam.",
    mainDisplay: true,
    price: 3000
  },

  {
    id: "sahasranama-archana",
    category: "Poojas",
    name: "Sahasranama Archana",
    description:
      "Traditional devotional archana using sacred names.",
    mainDisplay: false,
    price: 3000
  },

  {
    id: "abhishekam-archana",
    category: "Poojas",
    name: "Abhishekam & Archana",
    description:
      "Traditional Abhishekam and Archana service.",
    mainDisplay: false,
    price: null
  },


  /* ===================================================
     VRATHAM
  =================================================== */

  {
    id: "satyanarayana-swamy-vratham",
    category: "Vratham",
    name: "Satyanarayana Swamy Vratham",
    description:
      "Traditional Satyanarayana Swamy Vratham for blessings and well-being.",
    mainDisplay: true,
    price: 5000
  },

  {
    id: "varalakshmi-vratham",
    category: "Vratham",
    name: "Varalakshmi Vratham",
    description:
      "Traditional worship of Goddess Varalakshmi.",
    mainDisplay: true,
    price: 3000
  },

  {
    id: "sankashti-chaturthi-pooja",
    category: "Vratham",
    name: "Sankashti Chaturthi Pooja",
    description:
      "Traditional Ganapati worship performed during Sankashti Chaturthi.",
    mainDisplay: false,
    price: 3000
  },

  {
    id: "ekadashi-vratham",
    category: "Vratham",
    name: "Ekadashi Vratham",
    description:
      "Traditional Ekadashi devotional observance.",
    mainDisplay: false,
    price: 3000
  },

  {
    id: "ganapathi-navaratrulu",
    category: "Vratham",
    name: "Ganapathi navaratrulu",
    description:
      "Traditional devotional observance dedicated to Lord Ganapati.",
    mainDisplay: false,
    price: null
  },

  {
    id: "mangala-gowri-vratham",
    category: "Vratham",
    name: "Mangala Gowri Vratham",
    description:
      "Traditional Mangala Gowri Vratham.",
    mainDisplay: false,
    price: 3000
  },

  {
    id: "vinayaka-chavithi",
    category: "Vratham",
    name: "Vinayaka Chavithi",
    description:
      "Traditional worship and celebration dedicated to Lord Vinayaka.",
    mainDisplay: false,
    price: 2500
  },


  /* ===================================================
     HOMAM
  =================================================== */

  {
    id: "ganapati-homam",
    category: "Homam",
    name: "Ganapati Homam",
    description:
      "Traditional Ganapati Homam for blessings and removal of obstacles.",
    mainDisplay: true,
    price: 12000
  },

  {
    id: "navagraha-homam",
    category: "Homam",
    name: "Navagraha Homam",
    description:
      "Traditional homam dedicated to the nine planetary deities.",
    mainDisplay: true,
    price: 15000
  },

  {
    id: "rudra-homam",
    category: "Homam",
    name: "Rudra Homam",
    description:
      "Traditional homam dedicated to Lord Shiva.",
    mainDisplay: true,
    price: 15000
  },

  {
    id: "maha-mrityunjaya-homam",
    category: "Homam",
    name: "Maha Mrityunjaya Homam",
    description:
      "Traditional Maha Mrityunjaya Homam.",
    mainDisplay: true,
    price: 15000
  },

  {
    id: "sudarsana-homam",
    category: "Homam",
    name: "Sudarsana Homam",
    description:
      "Traditional Sudarsana Homam for protection and spiritual well-being.",
    mainDisplay: true,
    price: 20000
  },

  {
    id: "lakshmi-kubera-homam",
    category: "Homam",
    name: "Lakshmi Kubera Homam",
    description:
      "Traditional homam dedicated to Goddess Lakshmi and Lord Kubera.",
    mainDisplay: true,
    price: 15000
  },

  {
    id: "durga-homam",
    category: "Homam",
    name: "Durga Homam",
    description:
      "Traditional homam dedicated to Goddess Durga.",
    mainDisplay: false,
    price: 10000
  },

  {
    id: "chandi-homam",
    category: "Homam",
    name: "Chandi Homam",
    description:
      "Traditional Chandi Homam for blessings and protection.",
    mainDisplay: true,
    price: 25000
  },

  {
    id: "ayushya-homam",
    category: "Homam",
    name: "Ayushya Homam",
    description:
      "Traditional ritual performed for health and longevity.",
    mainDisplay: true,
    price: 10000
  },

  {
    id: "dhanvantari-homam",
    category: "Homam",
    name: "Dhanvantari Homam",
    description:
      "Traditional homam dedicated to Lord Dhanvantari.",
    mainDisplay: true,
    price: 15000
  },

  {
    id: "vastu-homam",
    category: "Homam",
    name: "Vastu Homam",
    description:
      "Traditional Vastu Homam for positive energy and well-being.",
    mainDisplay: true,
    price: 10000
  },


  /* ===================================================
     MARRIAGE
  =================================================== */

  {
    id: "vivahalu-marriage",
    category: "Marriage",
    name: "Vivahalu (Marriage)",
    description:
      "Traditional marriage ceremony performed according to the required rituals.",
    mainDisplay: true,
    price: 25000
  },

  {
    id: "engagement",
    category: "Marriage",
    name: "Engagement",
    description:
      "Traditional engagement ceremony and associated rituals.",
    mainDisplay: true,
    price: 8000
  },


  /* ===================================================
     CHILD & CHILDREN CEREMONIES
  =================================================== */

  {
    id: "annaprasana",
    category: "Child & Children Ceremonies",
    name: "Annaprasana",
    description:
      "Traditional first-food ceremony for a child.",
    mainDisplay: true,
    price: 3000
  },

  {
    id: "naming-ceremony",
    category: "Child & Children Ceremonies",
    name: "Naming Ceremony",
    description:
      "Traditional ceremony performed for giving a name to a child.",
    mainDisplay: true,
    price: 2500
  },

  {
    id: "akshara-byasam",
    category: "Child & Children Ceremonies",
    name: "Akshara Byasam",
    description:
      "Traditional ceremony marking the beginning of a child's education.",
    mainDisplay: true,
    price: 5000
  },

  {
    id: "upanayanam",
    category: "Child & Children Ceremonies",
    name: "Upanayanam",
    description:
      "Traditional sacred-thread ceremony.",
    mainDisplay: false,
    price: null
  },

  {
    id: "seemantham-srimantham",
    category: "Child & Children Ceremonies",
    name: "Seemantham / Srimantham",
    description:
      "Traditional ceremony associated with pregnancy and family blessings.",
    mainDisplay: false,
    price: 5000
  },

  {
    id: "garbha-samskara-pooja",
    category: "Child & Children Ceremonies",
    name: "Garbha Samskara Pooja",
    description:
      "Traditional devotional ceremony associated with pregnancy and well-being.",
    mainDisplay: false,
    price: 4000
  }

];


/* =====================================================
   CATEGORY CONFIGURATION
===================================================== */

const categoryConfig = [

  {
    id: "poojas",
    name: "Poojas",
    icon: "🪷",
    category: "Poojas",
    description:
      "Traditional poojas and devotional ceremonies."
  },

  {
    id: "vratham",
    name: "Vratham",
    icon: "🕉️",
    category: "Vratham",
    description:
      "Traditional vrathams and devotional observances."
  },

  {
    id: "homam",
    name: "Homam",
    icon: "🔥",
    category: "Homam",
    description:
      "Traditional homams and sacred fire rituals."
  },

  {
    id: "marriage",
    name: "Marriage",
    icon: "💍",
    category: "Marriage",
    description:
      "Marriage and engagement ceremonies."
  },

  {
    id: "children",
    name: "Child & Children Ceremonies",
    icon: "👶",
    category: "Child & Children Ceremonies",
    description:
      "Traditional ceremonies for children and family milestones."
  }

];


/* =====================================================
   PRICE FORMAT
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
   COMPONENT
===================================================== */

function PoojaCategories() {

  const navigate = useNavigate();

  const location = useLocation();


  const initialSearch =
    location.state?.searchTerm || "";


  const [openCategory, setOpenCategory] =
    useState(null);


  /*
    Keep View All state separately for
    each category.
  */

  const [expandedCategories, setExpandedCategories] =
    useState({});


  const [searchTerm, setSearchTerm] =
    useState(initialSearch);


  /* ===================================================
     BUILD CATEGORIES
  =================================================== */

  const categories = useMemo(() => {

    return categoryConfig.map((category) => {

      const services =
        serviceMaster.filter(
          (service) =>
            service.category === category.category
        );


      const mainServices =
        services.filter(
          (service) =>
            service.mainDisplay
        );


      const additionalServices =
        services.filter(
          (service) =>
            !service.mainDisplay
        );


      return {

        ...category,

        services,

        mainServices,

        additionalServices

      };

    });

  }, []);


  /* ===================================================
     SEARCH
  =================================================== */

  const normalizedSearch =
    searchTerm
      .trim()
      .toLowerCase();


  const filteredCategories =

    categories

      .map((category) => {

        if (!normalizedSearch) {

          return category;

        }


        const matchingServices =
          category.services.filter(
            (service) =>

              service.name
                .toLowerCase()
                .includes(normalizedSearch)

          );


        return {

          ...category,

          services: matchingServices,

          mainServices: matchingServices,

          additionalServices: []

        };

      })

      .filter(
        (category) =>
          category.services.length > 0
      );


  /* ===================================================
     CATEGORY TOGGLE
  =================================================== */

  const toggleCategory = (id) => {

    setOpenCategory(
      openCategory === id
        ? null
        : id
    );

  };


  /* ===================================================
     VIEW ALL TOGGLE
  =================================================== */

  const toggleViewAll = (
    event,
    categoryId
  ) => {

    event.stopPropagation();


    setExpandedCategories(
      (current) => ({

        ...current,

        [categoryId]:
          !current[categoryId]

      })
    );


    setOpenCategory(categoryId);

  };


  /* ===================================================
     OPEN POOJA DETAILS
  =================================================== */

  const openPooja = (pooja) => {

    navigate(
      "/pooja-details",
      {
        state: {
          pooja
        }
      }
    );

  };


  /* ===================================================
     BACK
  =================================================== */

  const handleBack = () => {

    navigate("/home");

  };


  /* ===================================================
     CLEAR SEARCH
  =================================================== */

  const clearSearch = () => {

    setSearchTerm("");

  };


  /* ===================================================
     RENDER
  =================================================== */

  return (

    <main className="categories-page">


      {/* =================================================
          HEADER
      ================================================= */}

      <header className="categories-header">

        <button
          className="categories-back"
          onClick={handleBack}
          aria-label="Go back"
        >

          <ArrowLeft size={22} />

        </button>


        <h1>
          Pooja Categories
        </h1>


        <div className="header-spacer" />

      </header>


      {/* =================================================
          INTRO
      ================================================= */}

      <section className="categories-intro">

        <div className="intro-symbol">
          🪷
        </div>


        <div>

          <h2>
            Choose a Category
          </h2>


          <p>
            Select a category to explore
            available poojas and ceremonies.
          </p>

        </div>

      </section>


      {/* =================================================
          SEARCH
      ================================================= */}

      <section className="categories-search">

        <Search size={18} />


        <input
          type="text"
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(
              event.target.value
            )
          }
          placeholder="Search pooja or ceremony..."
          aria-label="Search pooja"
        />


        {searchTerm && (

          <button
            className="search-clear"
            onClick={clearSearch}
            aria-label="Clear search"
          >

            <X size={16} />

          </button>

        )}

      </section>


      {/* =================================================
          SEARCH RESULT INFO
      ================================================= */}

      {normalizedSearch && (

        <div className="search-result-info">

          {filteredCategories.length > 0 ? (

            <span>

              Showing results for{" "}

              <strong>
                "{searchTerm}"
              </strong>

            </span>

          ) : (

            <span>

              No pooja found for{" "}

              <strong>
                "{searchTerm}"
              </strong>

            </span>

          )}

        </div>

      )}


      {/* =================================================
          CATEGORY LIST
      ================================================= */}

      <section className="categories-list">


        {filteredCategories.map(
          (category) => {

            const isOpen =
              openCategory === category.id;


            const isExpanded =
              expandedCategories[
                category.id
              ];


            let visibleServices;


            if (normalizedSearch) {

              visibleServices =
                category.services;

            } else if (isExpanded) {

              visibleServices =
                category.services;

            } else {

              visibleServices =
                category.mainServices;

            }


            return (

              <div
                className={`category-wrapper ${
                  isOpen
                    ? "category-open"
                    : ""
                }`}
                key={category.id}
              >


                {/* =====================================
                    CATEGORY HEADER
                ===================================== */}

                <button
                  className="category-button"
                  onClick={() =>
                    toggleCategory(
                      category.id
                    )
                  }
                  aria-expanded={isOpen}
                >

                  <div className="category-left">


                    <div className="category-icon">

                      {category.icon}

                    </div>


                    <div>

                      <span>
                        {category.name}
                      </span>


                      <small>

                        {category.services.length}{" "}
                        services

                      </small>

                    </div>

                  </div>


                  <ChevronDown
                    size={20}
                    className={`category-chevron ${
                      isOpen
                        ? "rotate"
                        : ""
                    }`}
                  />

                </button>


                {/* =====================================
                    SERVICES
                ===================================== */}

                <div
                  className={`pooja-options ${
                    isOpen
                      ? "show"
                      : ""
                  }`}
                >


                  {visibleServices.length > 0 ? (

                    visibleServices.map(
                      (pooja) => (

                        <button
                          key={pooja.id}
                          className="pooja-option"
                          onClick={() =>
                            openPooja(
                              pooja
                            )
                          }
                        >


                          <div className="pooja-option-content">

                            <strong>
                              {pooja.name}
                            </strong>


                            <p>
                              {pooja.description}
                            </p>

                          </div>


                          <div className="pooja-option-right">


                            {formatPrice(
                              pooja.price
                            ) && (

                              <span className="pooja-price">

                                {
                                  formatPrice(
                                    pooja.price
                                  )
                                }

                              </span>

                            )}


                            <ChevronRight
                              size={17}
                            />

                          </div>

                        </button>

                      )
                    )

                  ) : (

                    <div className="empty-category">

                      No services available.

                    </div>

                  )}


                  {/* ===================================
                      VIEW ALL
                  =================================== */}

                  {!normalizedSearch &&
                    category.additionalServices
                      .length > 0 && (

                      <button
                        className="view-all-button"
                        onClick={(event) =>
                          toggleViewAll(
                            event,
                            category.id
                          )
                        }
                      >

                        {isExpanded

                          ? "Show Main Services"

                          : `View All ${category.name}`

                        }

                      </button>

                    )}

                </div>

              </div>

            );

          }

        )}


        {/* =================================================
            NO SEARCH RESULTS
        ================================================= */}

        {filteredCategories.length === 0 && (

          <div className="no-results">

            <div className="no-results-icon">
              🔎
            </div>


            <h3>
              No Pooja Found
            </h3>


            <p>
              Try searching with another
              pooja or ceremony name.
            </p>


            <button
              onClick={clearSearch}
            >

              Clear Search

            </button>

          </div>

        )}

      </section>


      {/* =================================================
          FOOTER
      ================================================= */}

      <div className="categories-footer">

        <span>
          ✦
        </span>


        <span className="footer-om">
          ॐ
        </span>


        <span>
          ✦
        </span>

      </div>


    </main>

  );

}


export default PoojaCategories;