
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Logo from "../components/Logo";
import "../styles/auth.css";

const WIDGET_ID = import.meta.env.VITE_MSG91_WIDGET_ID;
const WIDGET_TOKEN = import.meta.env.VITE_MSG91_TOKEN_AUTH;

const API_URL = (
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"
).replace(/\/+$/, "");

const SDK_URL = "https://verify.msg91.com/otp-provider.js";

function loadMSG91Script() {
  return new Promise((resolve, reject) => {
    if (typeof window.initSendOTP === "function") {
      resolve();
      return;
    }

    let script = document.querySelector(
      'script[data-poojamitra-msg91="true"]'
    );

    if (script?.dataset.loaded === "true") {
      script.remove();
      script = null;
    }

    if (!script) {
      script = document.createElement("script");
      script.src = SDK_URL;
      script.async = true;
      script.dataset.poojamitraMsg91 = "true";
      document.body.appendChild(script);
    }

    let settled = false;

    const cleanup = () => {
      script.removeEventListener("load", onLoad);
      script.removeEventListener("error", onError);
      window.clearTimeout(timeout);
    };

    const finish = (callback) => {
      if (settled) return;
      settled = true;
      cleanup();
      callback();
    };

    const onLoad = () => {
      script.dataset.loaded = "true";

      if (typeof window.initSendOTP === "function") {
        finish(resolve);
      } else {
        finish(() =>
          reject(new Error("MSG91 SDK loaded, but its API is unavailable."))
        );
      }
    };

    const onError = () =>
      finish(() => reject(new Error("Unable to load the MSG91 SDK.")));

    const timeout = window.setTimeout(
      () => finish(() => reject(new Error("MSG91 SDK loading timed out."))),
      15000
    );

    script.addEventListener("load", onLoad);
    script.addEventListener("error", onError);
  });
}

function getRequestId(data) {
  const candidates = [
    data?.reqId,
    data?.requestId,
    data?.request_id,
    data?.["request-id"],
    data?.data?.reqId,
    data?.data?.requestId,
    data?.data?.request_id,
    data?.data?.["request-id"],
    data?.response?.reqId,
    data?.response?.requestId,
  ];

  return candidates.find(
    (value) => typeof value === "string" && value.length > 0
  ) || null;
}

function getAccessToken(data) {
  return (
    data?.["access-token"] ||
    data?.accessToken ||
    data?.access_token ||
    data?.token ||
    data?.data?.["access-token"] ||
    data?.data?.accessToken ||
    data?.data?.access_token ||
    data?.response?.["access-token"] ||
    data?.response?.accessToken ||
    null
  );
}

function isProviderError(data) {
  return (
    String(data?.type || "").toLowerCase() === "error" ||
    String(data?.status || "").toLowerCase() === "error" ||
    data?.hasError === true
  );
}

function getFailureMessage(reason, fallback) {
  const message = String(reason?.message || "");

  if (String(reason?.code) === "408" && /IPBlocked/i.test(message)) {
    return "MSG91 has temporarily blocked requests from this network. Please try later.";
  }

  if (/captcha/i.test(message)) {
    return "CAPTCHA verification failed. Refresh the page, complete CAPTCHA, and try again.";
  }

  return message || fallback;
}

export default function OTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const mobile = location.state?.mobile || "";
  const role = String(location.state?.role || "customer").toLowerCase();
  const isPriest = role === "priest";
  const identifier = mobile.replace(/\D/g, "");

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [sdkReady, setSdkReady] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const inputs = useRef([]);
  const requestId = useRef(null);
  const accessToken = useRef(null);
  const mountedRef = useRef(false);
  const busyRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    mountedRef.current = true;

    setSdkReady(false);
    setOtpSent(false);
    setOtp(["", "", "", ""]);
    setError("");
    setMessage("");
    requestId.current = null;
    accessToken.current = null;

    if (!mobile || !/^91[6-9]\d{9}$/.test(identifier)) {
      setError(
        "Please return to login and enter a valid Indian mobile number."
      );

      return () => {
        cancelled = true;
        mountedRef.current = false;
      };
    }

    if (!WIDGET_ID || !WIDGET_TOKEN) {
      setError("MSG91 configuration is missing. Check your frontend .env file.");

      return () => {
        cancelled = true;
        mountedRef.current = false;
      };
    }

    async function initializeMSG91() {
      try {
        await loadMSG91Script();
        if (cancelled) return;

        window.initSendOTP({
          widgetId: WIDGET_ID,
          tokenAuth: WIDGET_TOKEN,
          identifier,
          exposeMethods: true,
          captchaRenderId: "msg91-captcha",

          success: (data) => {
            if (cancelled) return;

            const token = getAccessToken(data);
            if (token) accessToken.current = token;
          },

          failure: (reason) => {
            console.error("MSG91 widget error:", reason);

            if (!cancelled) {
              setError(
                getFailureMessage(
                  reason,
                  "MSG91 verification failed. Please try again."
                )
              );
            }
          },
        });

        const startedAt = Date.now();

        while (
          !cancelled &&
          Date.now() - startedAt < 5000 &&
          (typeof window.sendOtp !== "function" ||
            typeof window.verifyOtp !== "function")
        ) {
          await new Promise((resolve) => window.setTimeout(resolve, 100));
        }

        if (cancelled) return;

        if (
          typeof window.sendOtp !== "function" ||
          typeof window.verifyOtp !== "function"
        ) {
          throw new Error(
            "MSG91 OTP methods are unavailable. Check your widget configuration."
          );
        }

        setSdkReady(true);
        setError("");
      } catch (err) {
        console.error("MSG91 initialization error:", err);

        if (!cancelled) {
          setError(err.message || "Unable to initialize MSG91.");
        }
      }
    }

    initializeMSG91();

    return () => {
      cancelled = true;
      mountedRef.current = false;
    };
  }, [identifier, mobile]);

  useEffect(() => {
    if (timer <= 0) return undefined;

    const interval = window.setInterval(() => {
      setTimer((previous) => Math.max(0, previous - 1));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [timer]);

  const finishRequest = useCallback(() => {
    busyRef.current = false;

    if (mountedRef.current) {
      setLoading(false);
    }
  }, []);

  const handleChange = (index, value) => {
    const digits = value.replace(/\D/g, "");

    if (digits.length > 1) {
      const pastedDigits = digits.slice(0, 4).split("");

      setOtp((previous) => {
        const next = [...previous];

        pastedDigits.forEach((digit, offset) => {
          if (offset < 4) next[offset] = digit;
        });

        return next;
      });

      inputs.current[Math.min(pastedDigits.length - 1, 3)]?.focus();
      setError("");
      return;
    }

    setOtp((previous) => {
      const next = [...previous];
      next[index] = digits.slice(0, 1);
      return next;
    });

    setError("");

    if (digits && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (
      event.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowLeft" && index > 0) {
      inputs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowRight" && index < 3) {
      inputs.current[index + 1]?.focus();
    }

    if (event.key === "Enter" && otp.join("").length === 4) {
      verifyOTP();
    }
  };

  const sendOTP = useCallback(() => {
    setError("");
    setMessage("");

    if (!sdkReady || typeof window.sendOtp !== "function") {
      setError("MSG91 is not ready yet. Please wait.");
      return;
    }

    if (busyRef.current) return;

    busyRef.current = true;
    setLoading(true);

    let completed = false;

    const finish = () => {
      if (completed) return;
      completed = true;
      window.clearTimeout(timeout);
      finishRequest();
    };

    const timeout = window.setTimeout(() => {
      finish();

      if (mountedRef.current) {
        setError("MSG91 did not respond. Please try again.");
      }
    }, 20000);

    try {
      window.sendOtp(
        identifier,
        (data) => {
          finish();

          if (!mountedRef.current) return;

          console.log("MSG91 send OTP response:", data);

          if (isProviderError(data)) {
            setError(
              getFailureMessage(data, "MSG91 could not send the OTP.")
            );
            return;
          }

          const id = getRequestId(data);
          const token = getAccessToken(data);

          if (id) requestId.current = id;
          if (token) accessToken.current = token;

          /*
           * Enable the boxes after the provider returns a non-error
           * callback. Verification still requires a real request ID.
           */
          setOtpSent(true);
          setOtp(["", "", "", ""]);
          setTimer(30);

          if (id) {
            setMessage("OTP requested. Enter the code sent to your phone.");
          } else {
            setMessage(
              "Enter the OTP you received. If verification cannot start, check the MSG91 response in the browser console."
            );

            console.warn(
              "MSG91 response did not contain a recognized request ID. Check its response format.",
              data
            );
          }

          window.setTimeout(() => inputs.current[0]?.focus(), 100);
        },
        (reason) => {
          finish();

          if (!mountedRef.current) return;

          console.error("MSG91 send OTP failed:", reason);

          setError(
            getFailureMessage(reason, "Unable to send OTP. Please try again.")
          );
        }
      );
    } catch (err) {
      finish();
      console.error("MSG91 send OTP exception:", err);
      setError("Unable to request OTP. Please try again.");
    }
  }, [identifier, sdkReady, finishRequest]);

  const verifyApplicationToken = useCallback(
    async (token) => {
      if (!token) {
        setError("MSG91 did not return an access token.");
        return;
      }

      setLoading(true);
      setError("");
      setMessage("Verifying your phone securely...");

      try {
        const response = await fetch(
          `${API_URL}/api/auth/msg91/verify-token`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ access_token: token }),
          }
        );

        const result = await response.json().catch(() => ({}));

        if (!response.ok || result.verified !== true) {
          throw new Error(
            result.detail ||
              "Phone verification succeeded, but application login is not ready."
          );
        }

        if (!result.user || !result.access_token) {
          throw new Error(
            "Phone verified, but the backend did not return an application session."
          );
        }

        const verifiedRole = String(result.user.role || "").toLowerCase();

        if (verifiedRole && verifiedRole !== role) {
          throw new Error(
            `This account belongs to the ${verifiedRole} portal. Please use the correct portal.`
          );
        }

        sessionStorage.setItem(
          "poojamitra_access_token",
          result.access_token
        );
        sessionStorage.setItem(
          "poojamitra_role",
          verifiedRole || role
        );

        setMessage("Verification successful. Opening your portal...");

        if (verifiedRole === "priest" || (!verifiedRole && isPriest)) {
          navigate("/priest-registration", {
            replace: true,
            state: { mobile },
          });
        } else {
          navigate("/home", { replace: true });
        }
      } catch (err) {
        console.error("Application authentication error:", err);
        setMessage("");
        setError(err.message || "Unable to complete authentication.");
      } finally {
        setLoading(false);
        busyRef.current = false;
      }
    },
    [isPriest, mobile, navigate, role]
  );

  const verifyOTP = useCallback(() => {
    setError("");
    setMessage("");

    const enteredOTP = otp.join("");

    if (!/^\d{4}$/.test(enteredOTP)) {
      setError("Please enter all 4 digits of your OTP.");
      inputs.current[0]?.focus();
      return;
    }

    if (!requestId.current) {
      setError(
        "MSG91 has not provided an OTP request ID. Please request a new OTP. If this repeats, check the MSG91 send response in the browser console."
      );
      console.error(
        "Cannot verify OTP because requestId is missing.",
        { identifier }
      );
      return;
    }

    if (typeof window.verifyOtp !== "function") {
      setError("MSG91 verification is unavailable. Please refresh the page.");
      return;
    }

    if (busyRef.current) return;

    busyRef.current = true;
    setLoading(true);

    let completed = false;

    const finish = () => {
      if (completed) return;
      completed = true;
      window.clearTimeout(timeout);
      finishRequest();
    };

    const timeout = window.setTimeout(() => {
      finish();

      if (mountedRef.current) {
        setError("OTP verification timed out. Please try again.");
      }
    }, 20000);

    try {
      window.verifyOtp(
        enteredOTP,
        (data) => {
          finish();

          if (!mountedRef.current) return;

          console.log("MSG91 verify OTP response:", data);

          if (isProviderError(data)) {
            setError("Incorrect or expired OTP. Please try again.");
            return;
          }

          const token = getAccessToken(data) || accessToken.current;

          if (!token) {
            console.error("MSG91 verification returned no access token:", data);
            setError("MSG91 did not return an access token.");
            return;
          }

          accessToken.current = token;
          verifyApplicationToken(token);
        },
        (reason) => {
          finish();

          if (!mountedRef.current) return;

          console.error("MSG91 OTP verification failed:", reason);

          setError(
            getFailureMessage(reason, "OTP verification failed.")
          );
        },
        requestId.current
      );
    } catch (err) {
      finish();
      console.error("MSG91 verification exception:", err);
      setError("Unable to verify OTP. Please try again.");
    }
  }, [otp, identifier, finishRequest, verifyApplicationToken]);

  const resendOTP = useCallback(() => {
    setError("");
    setMessage("");

    if (timer > 0 || loading) return;

    if (!requestId.current || typeof window.retryOtp !== "function") {
      setError(
        "Cannot resend using the current request. Please return to login and request a new OTP."
      );
      return;
    }

    if (busyRef.current) return;

    busyRef.current = true;
    setLoading(true);

    let completed = false;

    const finish = () => {
      if (completed) return;
      completed = true;
      window.clearTimeout(timeout);
      finishRequest();
    };

    const timeout = window.setTimeout(() => {
      finish();

      if (mountedRef.current) {
        setError("MSG91 did not respond to the resend request.");
      }
    }, 20000);

    try {
      window.retryOtp(
        null,
        (data) => {
          finish();

          if (!mountedRef.current) return;

          console.log("MSG91 resend response:", data);

          if (isProviderError(data)) {
            setError("MSG91 could not resend the OTP.");
            return;
          }

          const id = getRequestId(data);
          const token = getAccessToken(data);

          if (id) requestId.current = id;
          if (token) accessToken.current = token;

          setOtp(["", "", "", ""]);
          setTimer(30);
          setMessage("A new OTP has been requested.");

          window.setTimeout(() => inputs.current[0]?.focus(), 100);
        },
        (reason) => {
          finish();

          if (!mountedRef.current) return;

          console.error("MSG91 resend failed:", reason);

          setError(
            getFailureMessage(reason, "Unable to resend OTP.")
          );
        },
        requestId.current
      );
    } catch (err) {
      finish();
      console.error("MSG91 resend exception:", err);
      setError("Unable to resend OTP. Please try again.");
    }
  }, [timer, loading, finishRequest]);

  return (
    <main className="auth-page">
      <section className="auth-card otp-card">
        <button
          type="button"
          className="back-button"
          onClick={() => navigate("/login")}
          aria-label="Go back to login"
          disabled={loading}
        >
          <ArrowLeft size={22} />
        </button>

        <div className="login-logo-container">
          <Logo className="auth-logo" />
        </div>

        <div className="otp-heading">
          <h1>Verify OTP</h1>
          <p>Enter the 4-digit code sent to</p>
          <strong>{mobile || "No mobile number provided"}</strong>

          <span className="otp-role-label">
            {isPriest
              ? "Priest portal verification"
              : "Customer portal verification"}
          </span>
        </div>

        <div
          id="msg91-captcha"
          className="msg91-captcha-container"
        />

        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(element) => {
                inputs.current[index] = element;
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              maxLength={4}
              value={digit}
              aria-label={`OTP digit ${index + 1}`}
              onChange={(event) =>
                handleChange(index, event.target.value)
              }
              onKeyDown={(event) => handleKeyDown(index, event)}
              onFocus={(event) => event.target.select()}
              disabled={!otpSent || loading}
              required
            />
          ))}
        </div>

        {error && (
          <p className="input-error" role="alert">
            {error}
          </p>
        )}

        {message && <p role="status">{message}</p>}

        <div className="resend-text">
          {timer > 0 ? (
            <span>
              Resend OTP in{" "}
              <strong>00:{String(timer).padStart(2, "0")}</strong>
            </span>
          ) : (
            <button
              type="button"
              onClick={resendOTP}
              disabled={loading || !otpSent || !requestId.current || !sdkReady}
            >
              Resend OTP
            </button>
          )}
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={otpSent ? verifyOTP : sendOTP}
          disabled={loading || !sdkReady}
        >
          <span>🪷</span>
          <span>
            {loading
              ? "Please wait..."
              : !sdkReady
                ? "Loading OTP..."
                : otpSent
                  ? "Verify OTP"
                  : "Send OTP"}
          </span>
          <span>🪷</span>
        </button>
      </section>
    </main>
  );
}
