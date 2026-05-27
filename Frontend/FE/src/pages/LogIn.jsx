import { useState } from "react";
import { useAuth } from "../context/authContext";
import { style } from "./LogInStyles";

export default function LoginPage({ onSignup, onBack, guestExpired }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Invalid email format";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Password must be at least 6 characters";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setServerError("");
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/sign-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || data.error || "Login failed");

      // Normalize various backend response shapes into { user, token }
      const normalize = (payload) => {
        let u = null;
        let t = null;

        if (!payload) return { user: null, token: null };

        // Check for { data: { token, user, email } } shape (your backend)
        if (payload.data && typeof payload.data.user === 'string' && payload.data.email) {
          u = { name: payload.data.user, email: payload.data.email };
          t = payload.data.token;
        }
        // Check for { data: { user: {...}, token } } shape
        else if (payload.data?.user && typeof payload.data.user === 'object') {
          u = payload.data.user;
          t = payload.data.token || payload.token;
        }
        // Check for { user: {...}, token } shape
        else if (payload.user && typeof payload.user === 'object') {
          u = payload.user;
          t = payload.token;
        }
        // Fallback: if user is present as a string or partial object, try to construct
        if (!u) {
          if (payload.data) {
            if (payload.data.name || payload.data.email) u = payload.data;
          } else if (payload.name || payload.email) {
            u = payload;
          }
        }

        // Try various token field names
        if (!t) {
          t = payload.token || payload.accessToken || payload.access_token || 
              payload.data?.accessToken || payload.data?.access_token || null;
        }

        return { user: u, token: t };
      };

      const { user: userData, token: tokenData } = normalize(data);

      if (!userData) throw new Error("Login response missing user data.");

      // allow login even if token is missing; UI treats user presence as authenticated
      login(userData, tokenData);
    } catch (err) {
      setServerError(
        err.message === "Failed to fetch"
          ? "Could not reach the server. Make sure the backend is running."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };


  const handleKey = (e) => { if (e.key === "Enter") handleSubmit(); };

  return (
    <>
      <style>{style}</style>
      <div className="auth-root">
        <div className="auth-bg" />
        <div className="grid-overlay" />

        {/* Left decorative panel */}
        <div className="auth-panel-left">
          <div className="panel-logo">BioChem<span>Vision</span></div>
          <div className="panel-quote">
            "Science is the <strong>poetry</strong> of reality — and biochemistry is its most intimate verse."
          </div>
          <div className="panel-stats">
            <div className="stat">
              <div className="stat-num">4</div>
              <div className="stat-label">Expert Questions</div>
            </div>
            <div className="stat">
              <div className="stat-num">AI</div>
              <div className="stat-label">Vision Analysis</div>
            </div>
            <div className="stat">
              <div className="stat-num">10</div>
              <div className="stat-label">Images / Day</div>
            </div>
          </div>
        </div>

        {/* Form panel */}
        <div className="auth-panel-right">
          <button className="back-btn" onClick={onBack}>← Back</button>

          <div className="form-header">
            <div className="form-eyebrow">Welcome back</div>
            <h1 className="form-title">Sign <em>in</em></h1>
            <p className="form-sub">
              Don't have an account?{" "}
              <button className="link-btn" onClick={onSignup}>Create one free →</button>
            </p>
          </div>

          {guestExpired && (
            <div className="guest-banner">
              ⚠ You've used your free guest attempt. Sign in or create an account to continue analyzing biochemistry images.
            </div>
          )}

          {serverError && <div className="server-error">{serverError}</div>}

          <div className="field">
            <label className="field-label">Email Address</label>
            <input
              className={`field-input ${errors.email ? "error" : ""}`}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={handleKey}
              autoComplete="email"
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          <div className="field">
            <label className="field-label">Password</label>
            <input
              className={`field-input${errors.password ? " err" : ""}`}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={handleKey}
              autoComplete="current-password"
            />
            {errors.password && <span className="error-msg">{errors.password}</span>}
          </div>

          <div className="forgot-row">
            <button className="forgot-btn" type="button">Forgot password?</button>
          </div>

          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <span className="loading-dots">Signing in</span> : "Sign In →"}
          </button>

          <div className="divider">or</div>

          <button
            className="guest-btn"
            onClick={onBack}
            disabled={guestExpired}
          >
            {guestExpired ? "Guest access expired — please sign in" : "Continue as Guest (1 free use)"}
          </button>
        </div>
      </div>
    </>
  );
}