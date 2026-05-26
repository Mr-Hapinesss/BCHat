import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy: #0a0e1a;
    --navy2: #0f1629;
    --gold: #c9a84c;
    --gold-light: #e8c97a;
    --teal: #2dd4bf;
    --text: #e8e4d9;
    --text-dim: #8a8070;
    --border: rgba(201,168,76,0.2);
    --error: #ef4444;
    --input-bg: rgba(15,22,41,0.8);
  }

  .auth-root {
    font-family: 'DM Mono', monospace;
    background: var(--navy);
    color: var(--text);
    min-height: 100vh;
    display: flex;
    overflow: hidden;
    position: relative;
  }

  .auth-bg {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background:
      radial-gradient(ellipse 60% 80% at 10% 50%, rgba(201,168,76,0.06) 0%, transparent 60%),
      radial-gradient(ellipse 80% 60% at 90% 20%, rgba(45,212,191,0.04) 0%, transparent 60%);
  }

  .grid-overlay {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  /* Left panel */
  .auth-panel-left {
    position: relative; z-index: 1;
    flex: 1;
    display: none;
    flex-direction: column;
    justify-content: space-between;
    padding: 48px;
    border-right: 1px solid var(--border);
    background: rgba(15,22,41,0.4);
  }

  @media (min-width: 900px) {
    .auth-panel-left { display: flex; }
  }

  .panel-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 24px; font-weight: 600;
    color: var(--gold);
  }

  .panel-logo span { color: var(--text); font-weight: 300; font-style: italic; }

  .panel-quote {
    font-family: 'Cormorant Garamond', serif;
    font-size: 36px; font-weight: 300;
    line-height: 1.3;
    font-style: italic;
    color: var(--text-dim);
  }

  .panel-quote strong { color: var(--gold); font-weight: 400; }

  .panel-stats {
    display: flex; gap: 40px;
  }

  .stat { }
  .stat-num {
    font-size: 28px; font-weight: 300;
    color: var(--text);
    font-family: 'Cormorant Garamond', serif;
  }
  .stat-label {
    font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--text-dim); margin-top: 4px;
  }

  /* Right panel - form */
  .auth-panel-right {
    position: relative; z-index: 1;
    flex: 0 0 auto;
    width: 100%;
    max-width: 520px;
    display: flex; flex-direction: column;
    justify-content: center;
    padding: 60px 48px;
    overflow-y: auto;
  }

  @media (max-width: 899px) {
    .auth-panel-right { max-width: 100%; padding: 40px 24px; }
  }

  .back-btn {
    font-family: 'DM Mono', monospace;
    font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--text-dim);
    background: none; border: none; cursor: pointer;
    display: flex; align-items: center; gap: 8px;
    padding: 0; margin-bottom: 48px;
    transition: color 0.2s;
  }

  .back-btn:hover { color: var(--text); }

  .form-header { margin-bottom: 44px; }

  .form-eyebrow {
    font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--teal); margin-bottom: 16px;
  }

  .form-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 48px; font-weight: 300;
    line-height: 1; margin-bottom: 12px;
  }

  .form-title em { color: var(--gold); }

  .form-sub {
    font-size: 12px; color: var(--text-dim); line-height: 1.7;
  }

  .form-sub .link-btn {
    background: none; border: none; cursor: pointer;
    color: var(--gold); font-family: inherit;
    font-size: inherit; text-decoration: underline;
    text-underline-offset: 3px;
  }

  /* Guest banner */
  .guest-banner {
    background: rgba(239,68,68,0.08);
    border: 1px solid rgba(239,68,68,0.25);
    padding: 14px 18px;
    margin-bottom: 28px;
    font-size: 11px;
    line-height: 1.7;
    color: #fca5a5;
  }

  .field { margin-bottom: 20px; }

  .field-label {
    font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--text-dim); margin-bottom: 8px; display: block;
  }

  .field-input {
    width: 100%;
    background: var(--input-bg);
    border: 1px solid rgba(201,168,76,0.15);
    color: var(--text);
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    padding: 14px 16px;
    outline: none;
    transition: border-color 0.2s;
    -webkit-appearance: none;
  }

  .field-input::placeholder { color: rgba(138,128,112,0.5); }

  .field-input:focus {
    border-color: var(--gold);
    background: rgba(15,22,41,0.95);
  }

  .field-input.error { border-color: var(--error); }

  .error-msg {
    font-size: 11px; color: var(--error);
    margin-top: 6px; display: block;
  }

  .forgot-row {
    display: flex; justify-content: flex-end;
    margin-top: -12px; margin-bottom: 20px;
  }

  .forgot-btn {
    font-size: 10px; letter-spacing: 0.1em;
    color: var(--text-dim); background: none; border: none;
    cursor: pointer; transition: color 0.2s;
  }

  .forgot-btn:hover { color: var(--gold); }

  .submit-btn {
    width: 100%;
    font-family: 'DM Mono', monospace;
    font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
    padding: 18px;
    background: var(--gold);
    color: var(--navy);
    border: none; cursor: pointer; font-weight: 500;
    transition: all 0.25s;
    margin-top: 8px;
    position: relative; overflow: hidden;
  }

  .submit-btn:hover:not(:disabled) {
    background: var(--gold-light);
    transform: translateY(-1px);
    box-shadow: 0 6px 24px rgba(201,168,76,0.3);
  }

  .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .divider {
    display: flex; align-items: center; gap: 16px;
    margin: 28px 0; color: var(--text-dim); font-size: 11px;
  }

  .divider::before, .divider::after {
    content: ''; flex: 1; height: 1px;
    background: var(--border);
  }

  .guest-btn {
    width: 100%;
    font-family: 'DM Mono', monospace;
    font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;
    padding: 16px;
    background: transparent;
    color: var(--text-dim);
    border: 1px dashed rgba(138,128,112,0.3);
    cursor: pointer; transition: all 0.2s;
  }

  .guest-btn:hover { color: var(--text); border-color: rgba(138,128,112,0.6); }
  .guest-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  .server-error {
    background: rgba(239,68,68,0.08);
    border: 1px solid rgba(239,68,68,0.25);
    color: #fca5a5;
    font-size: 11px; padding: 12px 16px;
    margin-bottom: 20px; line-height: 1.6;
  }

  .loading-dots::after {
    content: '...';
    animation: dots 1.2s infinite;
  }

  @keyframes dots {
    0%, 20% { content: '.'; }
    40% { content: '..'; }
    60%, 100% { content: '...'; }
  }
`;

export default function LoginPage({ onSignup, onBack, guestExpired }) {
  // const { login } = useAuth();
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
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "Login failed");
      login(data.user, data.token);
    } catch (err) {
      setServerError(err.message);
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
              className={`field-input ${errors.password ? "error" : ""}`}
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
            <button className="forgot-btn">Forgot password?</button>
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