import { useState } from "react";
import { useAuth } from "../context/authContext";
import { style } from "./SignUpStyles";

function getPasswordStrength(pw) {
  if (!pw) return { score: 0, label: "", color: "transparent" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["transparent", "#ef4444", "#f97316", "#eab308", "#22c55e"];
  return { score, label: labels[score], color: colors[score] };
}

export default function SignupPage({ onLogin, onBack }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const strength = getPasswordStrength(form.password);

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.firstName.trim())               e.firstName = "Required";
    if (!form.lastName.trim())                e.lastName  = "Required";
    if (!form.email)                          e.email     = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email   = "Invalid email";
    if (!form.password)                       e.password  = "Password is required";
    else if (form.password.length < 6)        e.password  = "Min 6 characters";
    if (form.password.length >= 6 && form.password !== form.confirm)
      e.confirm = "Passwords do not match";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setServerError("");
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName.trim()} ${form.lastName.trim()}`,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "Registration failed");

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

      if (!userData) throw new Error("Signup response missing user data.");

      // Auto-login after signup
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

        {/* Left panel */}
        <div className="auth-panel-left">
          <div className="panel-logo">BioChem<span>Vision</span></div>
          <div className="perks">
            {[
              { icon: "◈", title: "10 Image Analyses Per Day", desc: "Upload up to 10 biochemistry images daily and receive detailed AI-powered academic answers." },
              { icon: "⬡", title: "Four Expert Question Types", desc: "Structures, metabolic pathways, enzyme mechanisms, and experimental interpretation." },
              { icon: "✦", title: "Gemini Vision AI", desc: "Powered by Google's multimodal AI — specifically calibrated for scientific imagery." },
              { icon: "◎", title: "Instant Written Answers", desc: "No waiting — receive structured, academic-quality explanations in seconds." },
            ].map((p, i) => (
              <div className="perk" key={i}>
                <div className="perk-icon">{p.icon}</div>
                <div>
                  <div className="perk-title">{p.title}</div>
                  <div className="perk-desc">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="panel-footnote">
            Free to use · No credit card required · Academic use encouraged
          </div>
        </div>

        {/* Form panel */}
        <div className="auth-panel-right">
          <button className="back-btn" onClick={onBack}>← Back</button>

          {success ? (
            <div className="success-panel">
              <div className="success-icon">✦</div>
              <h2 className="success-title">Welcome to <em>BioChem</em></h2>
              <p className="success-msg">
                Your account has been created successfully.<br />
                You're being redirected to the analysis platform.
              </p>
            </div>
          ) : (
            <>
              <div className="form-header">
                <div className="form-eyebrow">Get started free</div>
                <h1 className="form-title">Create <em>account</em></h1>
                <p className="form-sub">
                  Already registered?{" "}
                  <button className="link-btn" onClick={onLogin}>Sign in →</button>
                </p>
              </div>

              {serverError && <div className="server-error">{serverError}</div>}

              <div className="fields-row">
                <div className="field">
                  <label className="field-label">First Name</label>
                  <input
                    className={`field-input ${errors.firstName ? "error" : ""}`}
                    type="text" placeholder="Jane"
                    value={form.firstName} onChange={set("firstName")} onKeyDown={handleKey}
                  />
                  {errors.firstName && <span className="error-msg">{errors.firstName}</span>}
                </div>
                <div className="field">
                  <label className="field-label">Last Name</label>
                  <input
                    className={`field-input ${errors.lastName ? "error" : ""}`}
                    type="text" placeholder="Smith"
                    value={form.lastName} onChange={set("lastName")} onKeyDown={handleKey}
                  />
                  {errors.lastName && <span className="error-msg">{errors.lastName}</span>}
                </div>
              </div>

              <div className="field">
                <label className="field-label">Email Address</label>
                <input
                  className={`field-input ${errors.email ? "error" : ""}`}
                  type="email" placeholder="you@example.com"
                  value={form.email} onChange={set("email")} onKeyDown={handleKey}
                  autoComplete="email"
                />
                {errors.email && <span className="error-msg">{errors.email}</span>}
              </div>

              <div className="field">
                <label className="field-label">Password</label>
                <input
                  className={`field-input ${errors.password ? "error" : ""}`}
                  type="password" placeholder="Min. 6 characters"
                  value={form.password} onChange={set("password")} onKeyDown={handleKey}
                  autoComplete="new-password"
                />
                {form.password && (
                  <div className="password-strength">
                    {[1,2,3,4].map(i => (
                      <div className="strength-bar" key={i}>
                        <div
                          className="strength-fill"
                          style={{
                            width: strength.score >= i ? "100%" : "0%",
                            background: strength.color,
                          }}
                        />
                      </div>
                    ))}
                    <span className="strength-label">{strength.label}</span>
                  </div>
                )}
                {errors.password && <span className="error-msg">{errors.password}</span>}
              </div>

              <div className="field">
                <label className="field-label">Confirm Password</label>
                <input
                  className={`field-input ${errors.confirm ? "error" : ""}`}
                  type="password" placeholder="Repeat password"
                  value={form.confirm} onChange={set("confirm")} onKeyDown={handleKey}
                  autoComplete="new-password"
                />
                {errors.confirm && <span className="error-msg">{errors.confirm}</span>}
              </div>

              <div className="terms">
                By creating an account you agree to our Terms of Service and Privacy Policy.
                Your data is used only to track daily usage limits.
              </div>

              <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
                {loading ? <span className="loading-dots">Creating account</span> : "Create Account →"}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}