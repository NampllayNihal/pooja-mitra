import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, UserRound } from "lucide-react";

import Logo from "../components/Logo";

import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("customer");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    setMobile("");
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleMobileChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");

    if (value.length <= 10) {
      setMobile(value);
      setError("");
    }
  };

  const sendOTP = () => {
    if (mobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!/^[6-9]/.test(mobile)) {
      setError("Please enter a valid Indian mobile number.");
      return;
    }

    setError("");

    navigate("/otp", {
      state: {
        mobile: `+91 ${mobile}`,
        role,
      },
    });
  };

  const signInAsAdmin = (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");

    // Temporary frontend navigation.
    // Real admin authentication will be connected to FastAPI later.
    navigate("/admin-dashboard");
  };

  const continueAsGuest = () => {
    navigate("/home");
  };

  const goToRegistration = () => {
    if (role === "priest") {
      navigate("/priest-registration");
    } else if (role === "customer") {
      navigate("/customer-registration");
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-decoration auth-decoration-top">
        ॐ
      </div>

      <div className="auth-decoration auth-decoration-bottom">
        🪔
      </div>

      <section className="auth-card">

        {/* =====================================================
            LOGO
        ===================================================== */}

        <div className="login-logo-container">
          <Logo className="auth-logo" />
        </div>

        {/* =====================================================
            BRAND HEADING
        ===================================================== */}

        <div className="auth-heading">
          <p className="welcome-small">
            Welcome to
          </p>

          <h1>
            PoojaMitra
          </h1>

          <div className="heading-divider">
            <span>✦</span>
            <span>ॐ</span>
            <span>✦</span>
          </div>

          <p className="welcome-description">
            Your spiritual partner for
            <br />
            pooja and divine services.
          </p>
        </div>

        {/* =====================================================
            ROLE SELECTION
        ===================================================== */}

        <div className="role-tabs">
          <button
            type="button"
            className={`role-tab ${
              role === "customer" ? "active" : ""
            }`}
            onClick={() => handleRoleChange("customer")}
          >
            Customer
          </button>

          <button
            type="button"
            className={`role-tab ${
              role === "priest" ? "active" : ""
            }`}
            onClick={() => handleRoleChange("priest")}
          >
            Priest
          </button>

          <button
            type="button"
            className={`role-tab ${
              role === "admin" ? "active" : ""
            }`}
            onClick={() => handleRoleChange("admin")}
          >
            Admin
          </button>
        </div>

        {/* =====================================================
            LOGIN HEADING
        ===================================================== */}

        <div className="login-type-heading">
          <h2>
            {role === "customer"
              ? "Sign in for customers"
              : role === "priest"
                ? "Sign in for priests"
                : "Sign in for admins"}
          </h2>

          <p>
            {role === "customer"
              ? "Book poojas and traditional spiritual services."
              : role === "priest"
                ? "Manage your services and priest bookings."
                : "Sign in with your administrator credentials."}
          </p>
        </div>

        {/* =====================================================
            ADMIN LOGIN
        ===================================================== */}

        {role === "admin" ? (
          <form
            className="form-section admin-login-form"
            onSubmit={signInAsAdmin}
            noValidate
          >
            <label htmlFor="admin-email">
              Email Address
            </label>

            <div className="admin-input-wrapper">
              <input
                id="admin-email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                autoComplete="username"
                aria-invalid={Boolean(error)}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                }}
              />
            </div>

            <label htmlFor="admin-password">
              Password
            </label>

            <div className="admin-input-wrapper">
              <input
                id="admin-password"
                type="password"
                placeholder="Enter your password"
                value={password}
                autoComplete="current-password"
                aria-invalid={Boolean(error)}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError("");
                }}
              />
            </div>

            {error && (
              <p className="input-error" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="primary-button"
            >
              <span>Sign In</span>
              <ArrowRight size={18} />
            </button>
          </form>
        ) : (
          <>
            {/* =====================================================
                MOBILE
            ===================================================== */}

            <div className="form-section">
              <label htmlFor="mobile">
                Mobile Number
              </label>

              <div
                className={`mobile-input-wrapper ${
                  error ? "input-invalid" : ""
                }`}
              >
                <span className="country-code">
                  +91
                </span>

                <span className="country-divider"></span>

                <input
                  id="mobile"
                  type="tel"
                  inputMode="numeric"
                  placeholder="Enter mobile number"
                  value={mobile}
                  onChange={handleMobileChange}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      sendOTP();
                    }
                  }}
                />

                {mobile.length === 10 && (
                  <span className="valid-icon">
                    ✓
                  </span>
                )}
              </div>

              {error && (
                <p className="input-error">
                  {error}
                </p>
              )}

              <p className="otp-note">
                We'll send a 4-digit OTP to verify your number.
              </p>
            </div>

            {/* =====================================================
                SEND OTP
            ===================================================== */}

            <button
              type="button"
              className="primary-button"
              onClick={sendOTP}
            >
              <span className="button-flower">
                🪷
              </span>

              <span>
                Send OTP
              </span>

              <ArrowRight size={18} />
            </button>

            {/* =====================================================
                CUSTOMER / PRIEST OPTIONS
            ===================================================== */}

            {role === "customer" ? (
              <>
                <div className="or-divider">
                  <span>or</span>
                </div>

                <button
                  type="button"
                  className="guest-button"
                  onClick={continueAsGuest}
                >
                  <UserRound size={18} />

                  <span>
                    Continue as Guest
                  </span>
                </button>

                <p className="register-text">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="register-link"
                    onClick={goToRegistration}
                  >
                    Create an account
                  </button>
                </p>
              </>
            ) : (
              <p className="register-text priest-register-text">
                New to PoojaMitra?{" "}
                <button
                  type="button"
                  className="register-link"
                  onClick={goToRegistration}
                >
                  Register as Priest
                </button>
              </p>
            )}
          </>
        )}

        {/* =====================================================
            TERMS
        ===================================================== */}

        <div className="terms-container">
          <p>
            By continuing, you agree to our
          </p>

          <div className="terms-links">
            <button type="button">
              Terms &amp; Conditions
            </button>

            <span>•</span>

            <button type="button">
              Privacy Policy
            </button>
          </div>
        </div>

      </section>
    </main>
  );
}

export default Login;
