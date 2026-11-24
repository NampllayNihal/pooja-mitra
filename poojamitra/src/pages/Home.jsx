import {
  Bell,
  Menu,
  Search,
  ChevronRight,
  UserRound,
  X,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/home.css";

function Home() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Close side menu after navigation
  const goTo = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  // Search is kept on Home and can be used to enter the pooja catalogue.
  const handleSearch = (event) => {
    event.preventDefault();

    const value = searchTerm.trim();

    if (value) {
      navigate("/pooja-categories", {
        state: {
          searchTerm: value,
        },
      });
    } else {
      navigate("/pooja-categories");
    }
  };

  return (
    <main className="home-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="home-header">

        {/* MENU BUTTON */}
        <button
          type="button"
          className="header-icon"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        {/* SMALL BRAND */}
        <div className="brand-name">
          <span className="brand-symbol">ॐ</span>
          <span>PoojaMitra</span>
        </div>

        {/* NOTIFICATION BUTTON */}
        <button
          type="button"
          className="header-icon"
          onClick={() => navigate("/notifications")}
          aria-label="Notifications"
        >
          <Bell size={21} />
          <span className="notification-dot"></span>
        </button>

      </header>


      {/* =====================================================
          SIDE MENU
      ===================================================== */}

      {menuOpen && (
        <>
          {/* Overlay */}
          <div
            className="menu-overlay"
            onClick={() => setMenuOpen(false)}
          />

          {/* Side Menu */}
          <aside className="side-menu">

            {/* Menu Header */}
            <div className="side-menu-header">

              <div className="brand-name">
                <span className="brand-symbol">
                  ॐ
                </span>

                <span>
                  PoojaMitra
                </span>
              </div>

              <button
                type="button"
                className="close-menu"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>

            </div>


            {/* Profile Preview */}
            <div className="menu-profile">

              <div className="profile-circle">
                <UserRound size={22} />
              </div>

              <div>
                <strong>
                  Welcome, Devotee
                </strong>

                <span>
                  Your spiritual journey
                </span>
              </div>

            </div>


            {/* =================================================
                MENU LINKS
            ================================================= */}

            <nav className="menu-links">

              {/* HOME */}
              <button
                type="button"
                className="menu-link-active"
                onClick={() => goTo("/home")}
              >
                <span className="menu-link-icon">
                  🏠
                </span>

                <span>
                  Home
                </span>
              </button>


              {/* BOOK POOJA */}
              <button
                type="button"
                onClick={() => goTo("/pooja-categories")}
              >
                <span className="menu-link-icon">
                  🪷
                </span>

                <span>
                  Book Pooja
                </span>
              </button>


              {/* ASTROLOGY */}
              <button
                type="button"
                onClick={() => goTo("/astrology-services")}
              >
                <span className="menu-link-icon">
                  🔮
                </span>

                <span>
                  Astrology Services
                </span>
              </button>


              {/* MY BOOKINGS */}
              <button
                type="button"
                onClick={() => goTo("/my-bookings")}
              >
                <span className="menu-link-icon">
                  📅
                </span>

                <span>
                  My Bookings
                </span>
              </button>


              {/* NOTIFICATIONS */}
              <button
                type="button"
                onClick={() => goTo("/notifications")}
              >
                <span className="menu-link-icon">
                  🔔
                </span>

                <span>
                  Notifications
                </span>
              </button>


              {/* PROFILE */}
              <button
                type="button"
                onClick={() => goTo("/profile")}
              >
                <span className="menu-link-icon">
                  👤
                </span>

                <span>
                  Profile
                </span>
              </button>


              {/* SETTINGS */}
              <button
                type="button"
                onClick={() => goTo("/settings")}
              >
                <span className="menu-link-icon">
                  ⚙️
                </span>

                <span>
                  Settings
                </span>
              </button>

            </nav>

          </aside>
        </>
      )}


      {/* =====================================================
          WELCOME
      ===================================================== */}

      <section className="welcome-section">

        <div>

          <p className="welcome-small">
            Namaste 🙏
          </p>

          <h1>
            Welcome to
            <br />
            <span>
              PoojaMitra
            </span>
          </h1>

          <p className="welcome-description">
            Bring divine blessings into
            <br />
            your special moments.
          </p>

        </div>


        <div className="welcome-diya">
          🪔
        </div>

      </section>


      {/* =====================================================
          SEARCH
      ===================================================== */}

      <section className="search-section">

        <form
          className="search-box"
          onSubmit={handleSearch}
        >

          <Search size={18} />

          <input
            type="text"
            placeholder="Search pooja or service"
            aria-label="Search pooja or service"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />

          {searchTerm.trim() && (
            <button
              type="button"
              className="clear-search"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}

        </form>

      </section>


      {/* =====================================================
          BOOK POOJA HERO
      ===================================================== */}

      <section className="hero-card">

        <div className="hero-content">

          <span className="hero-label">
            DIVINE SERVICES
          </span>

          <h2>
            Book Your
            <br />
            <strong>
              Pooja
            </strong>
          </h2>

          <p>
            Traditional pooja services
            <br />
            for your special occasions.
          </p>

          <button
            type="button"
            onClick={() => navigate("/pooja-categories")}
          >
            Book Now
            <ChevronRight size={16} />
          </button>

        </div>


        <div className="hero-diya">
          🪔
        </div>

      </section>


      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section className="services-section">

        <div className="section-title">

          <div>

            <small>
              EXPLORE
            </small>

            <h2>
              Our Services
            </h2>

          </div>

          <button
            type="button"
            onClick={() => navigate("/pooja-categories")}
          >
            View All
          </button>

        </div>


        <div className="services-grid">

          {/* =================================================
              BOOK POOJA
          ================================================= */}

          <button
            type="button"
            className="service-card"
            onClick={() => navigate("/pooja-categories")}
          >

            <div className="service-icon">
              🪷
            </div>

            <div>

              <h3>
                Book Pooja
              </h3>

              <p>
                Find the right pooja
                <br />
                for your occasion.
              </p>

            </div>

            <ChevronRight size={17} />

          </button>


          {/* =================================================
              ASTROLOGY
          ================================================= */}

          <button
            type="button"
            className="service-card"
            onClick={() => navigate("/astrology-services")}
          >

            <div className="service-icon">
              🔮
            </div>

            <div>

              <h3>
                Astrology
              </h3>

              <p>
                Discover your cosmic
                <br />
                guidance.
              </p>

            </div>

            <ChevronRight size={17} />

          </button>

        </div>

      </section>


      {/* =====================================================
          SIMPLE CALL TO ACTION
      ===================================================== */}

      <section className="home-info-section">

        <div className="home-info-card">

          <div className="home-info-icon">
            🙏
          </div>

          <div>
            <h3>
              Begin Your Spiritual Journey
            </h3>

            <p>
              Choose a pooja or explore astrology
              services according to your needs.
            </p>
          </div>

        </div>

      </section>


      {/* =====================================================
          BOTTOM NAVIGATION
      ===================================================== */}

      <nav className="bottom-nav">

        {/* HOME */}
        <button
          type="button"
          className="bottom-item active"
          onClick={() => navigate("/home")}
        >
          <span>
            🏠
          </span>

          Home
        </button>


        {/* ASTROLOGY */}
        <button
          type="button"
          className="bottom-item"
          onClick={() => navigate("/astrology-services")}
        >
          <span>
            🔮
          </span>

          Astrology
        </button>


        {/* BOOK POOJA */}
        <button
          type="button"
          className="bottom-book"
          onClick={() => navigate("/pooja-categories")}
          aria-label="Book Pooja"
        >
          🪷
        </button>


        {/* PROFILE */}
        <button
          type="button"
          className="bottom-item"
          onClick={() => navigate("/profile")}
        >
          <span>
            👤
          </span>

          Profile
        </button>


        {/* MENU */}
        <button
          type="button"
          className="bottom-item"
          onClick={() => setMenuOpen(true)}
        >
          <span>
            ☰
          </span>

          Menu
        </button>

      </nav>

    </main>
  );
}

export default Home;