import { useState } from "react";
import { useAuth } from "../context/authContext";

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
    --success: #22c55e;
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
      radial-gradient(ellipse 60% 80% at 90% 50%, rgba(45,212,191,0.05) 0%, transparent 60%),
      radial-gradient(ellipse 80% 60% at 10% 20%, rgba(201,168,76,0.06) 0%, transparent 60%);
  }

  .grid-overlay {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
  }

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

  .perks { display: flex; flex-direction: column; gap: 24px; }

  .perk {
    display: flex; align-items: flex-start; gap: 18px;
    padding: 20px;
    border: 1px solid var(--border);
    background: rgba(10,14,26,0.5);
    transition: border-color 0.2s;
  }

  .perk:hover { border-color: rgba(201,168,76,0.4); }

  .perk-icon {
    font-size: 20px; color: var(--gold);
    flex-shrink: 0; margin-top: 2px;
  }

  .perk-title {
    font-size: 13px; font-weight: 500;
    color: var(--text); margin-bottom: 5px;
  }

  .perk-desc {
    font-size: 11px; color: var(--text-dim); line-height: 1.7;
  }

  .panel-footnote {
    font-size: 11px; color: var(--text-dim); line-height: 1.7;
    padding-top: 20px;
    border-top: 1px solid var(--border);
  }

  .auth-panel-right {
    position: relative; z-index: 1;
    flex: 0 0 auto;
    width: 100%;
    max-width: 540px;
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

  .form-header { margin-bottom: 40px; }

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

  .fields-row {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  @media (max-width: 500px) {
    .fields-row { grid-template-columns: 1fr; }
  }

  .field { margin-bottom: 18px; }

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
  .field-input:focus { border-color: var(--gold); background: rgba(15,22,41,0.95); }
  .field-input.error { border-color: var(--error); }

  .error-msg {
    font-size: 11px; color: var(--error);
    margin-top: 5px; display: block;
  }

  .password-strength {
    margin-top: 8px;
    display: flex; gap: 4px; align-items: center;
  }

  .strength-bar {
    flex: 1; height: 2px;
    background: var(--border);
    border-radius: 2px;
    overflow: hidden;
  }

  .strength-fill {
    height: 100%;
    border-radius: 2px;
    transition: width 0.3s, background 0.3s;
  }

  .strength-label {
    font-size: 9px; letter-spacing: 0.1em;
    color: var(--text-dim); white-space: nowrap;
    margin-left: 4px;
  }

  .terms {
    font-size: 10px; line-height: 1.7;
    color: var(--text-dim);
    margin-bottom: 20px;
    padding: 14px 16px;
    border: 1px solid var(--border);
    background: rgba(15,22,41,0.4);
  }

  .submit-btn {
    width: 100%;
    font-family: 'DM Mono', monospace;
    font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
    padding: 18px;
    background: var(--gold);
    color: var(--navy);
    border: none; cursor: pointer; font-weight: 500;
    transition: all 0.25s;
    position: relative; overflow: hidden;
  }

  .submit-btn:hover:not(:disabled) {
    background: var(--gold-light);
    transform: translateY(-1px);
    box-shadow: 0 6px 24px rgba(201,168,76,0.3);
  }

  .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .success-panel {
    text-align: center; padding: 40px 20px;
    animation: fadeUp 0.5s ease;
  }

  .success-icon {
    font-size: 48px; margin-bottom: 20px;
  }

  .success-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 36px; font-weight: 300;
    margin-bottom: 12px; color: var(--text);
  }

  .success-title em { color: var(--teal); }

  .success-msg {
    font-size: 12px; color: var(--text-dim);
    line-height: 1.8; margin-bottom: 32px;
  }

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

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

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
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Min 6 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setServerError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "Registration failed");
      // Auto-login after signup
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