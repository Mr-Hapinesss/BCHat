import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function getPasswordStrength(pw) {
  if (!pw) return { score: 0, label: "", color: "transparent" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = [
    "transparent",
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
  ];
  return { score, label: labels[score], color: colors[score] };
}

export default function SignupPage({ onLogin, onBack }) {
  // const { login } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const strength = getPasswordStrength(form.password);

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

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
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    setServerError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || data.error || "Registration failed");
      
      setSuccess(true);
      login(data.user, data.token);
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="font-mono bg-[#0a0e1a] text-[#e8e4d9] min-height-screen flex overflow-hidden relative min-h-screen">
      {/* Background Gradients */}
      <div 
        className="fixed inset-0 pointer-events-none z-0" 
        style={{
          backgroundImage: `
            radial-gradient(ellipse 60% 80% at 90% 50%, rgba(45,212,191,0.05) 0%, transparent 60%),
            radial-gradient(ellipse 80% 60% at 10% 20%, rgba(201,168,76,0.06) 0%, transparent 60%)
          `
        }}
      />

      {/* Grid Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-0" 
        style={{
          backgroundImage: `
            linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Left panel */}
      <div className="relative z-10 flex-1 hidden md:flex flex-col justify-between p-12 border-r border-[rgba(201,168,76,0.2)] bg-[#0f1629]/40">
        <div className="font-serif text-2xl font-semibold text-[#c9a84c]">
          BioChem<span className="text-[#e8e4d9] font-light italic">Vision</span>
        </div>
        
        <div className="flex flex-col gap-6">
          {[
            { icon: "◈", title: "10 Image Analyses Per Day", desc: "Upload up to 10 biochemistry images daily and receive detailed AI-powered academic answers." },
            { icon: "⬡", title: "Four Expert Question Types", desc: "Structures, metabolic pathways, enzyme mechanisms, and experimental interpretation." },
            { icon: "✦", title: "Gemini Vision AI", desc: "Powered by Google's multimodal AI — specifically calibrated for scientific imagery." },
            { icon: "◎", title: "Instant Written Answers", desc: "No waiting — receive structured, academic-quality explanations in seconds." },
          ].map((p, i) => (
            <div className="flex items-start gap-[18px] p-5 border border-[rgba(201,168,76,0.2)] bg-[#0a0e1a]/50 transition-colors duration-200 hover:border-[rgba(201,168,76,0.4)]" key={i}>
              <div className="text-xl text-[#c9a84c] shrink-0 mt-[2px]">{p.icon}</div>
              <div>
                <div className="text-[13px] font-medium text-[#e8e4d9] mb-1">{p.title}</div>
                <div className="text-[11px] text-[#8a8070] stroke-none leading-[1.7]">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-[11px] text-[#8a8070] leading-[1.7] pt-5 border-t border-[rgba(201,168,76,0.2)]">
          Free to use · No credit card required · Academic use encouraged
        </div>
      </div>

      {/* Form panel */}
      <div className="relative z-10 flex-[0_0_auto] w-full max-w-full md:max-w-[540px] flex flex-col justify-center px-6 py-10 md:p-12 lg:px-[60px] overflow-y-auto">
        <button className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#8a8070] bg-none border-none cursor-pointer flex items-center gap-2 p-0 mb-12 transition-colors duration-200 hover:text-[#e8e4d9]" onClick={onBack}>
          ← Back
        </button>

        {success ? (
          <div className="text-center py-10 px-5 animate-[fadeUp_0.5s_ease]">
            <div className="text-[48px] mb-5">✦</div>
            <h2 className="font-serif text-[36px] font-light mb-3 text-[#e8e4d9]">
              Welcome to <em className="text-[#2dd4bf] not-italic">BioChem</em>
            </h2>
            <p className="text-[12px] text-[#8a8070] leading-[1.8] mb-8">
              Your account has been created successfully.<br />
              You're being redirected to the analysis platform.
            </p>
          </div>
        ) : (
          <>
            <div className="form-header mb-10">
              <div className="text-[10px] tracking-[0.3em] uppercase text-[#2dd4bf] mb-4">Get started free</div>
              <h1 className="font-serif text-[48px] font-light leading-none mb-3">
                Create <em className="text-[#c9a84c] not-italic">account</em>
              </h1>
              <p className="text-[12px] text-[#8a8070] leading-[1.7]">
                Already registered?{" "}
                <button className="bg-transparent border-none cursor-pointer text-[#c9a84c] font-inherit text-inherit underline underline-offset-[3px]" onClick={onLogin}>
                  Sign in →
                </button>
              </p>
            </div>

            {serverError && (
              <div className="bg-red-500/10 border border-red-500/25 text-red-300 text-[11px] p-[12px_16px] mb-5确 leading-[1.6]">
                {serverError}
              </div>
            )}

            <div className="grid grid-columns-1 sm:grid-cols-2 gap-4">
              <div className="mb-[18px]">
                <label className="text-[10px] tracking-[0.2em] uppercase text-[#8a8070] mb-2 block">First Name</label>
                <input
                  className={`w-full bg-[#0f1629]/80 border text-[13px] p-[14px_16px] outline-none transition-colors duration-200 font-mono placeholder-[rgba(138,128,112,0.5)] focus:bg-[#0f1629]/95 ${
                    errors.firstName ? "border-red-500" : "border-[rgba(201,168,76,0.15)] focus:border-[#c9a84c]"
                  }`}
                  type="text"
                  placeholder="Jane"
                  value={form.firstName}
                  onChange={set("firstName")}
                  onKeyDown={handleKey}
                />
                {errors.firstName && <span className="text-[11px] text-red-500 mt-1 block">{errors.firstName}</span>}
              </div>
              <div className="mb-[18px]">
                <label className="text-[10px] tracking-[0.2em] uppercase text-[#8a8070] mb-2 block">Last Name</label>
                <input
                  className={`w-full bg-[#0f1629]/80 border text-[13px] p-[14px_16px] outline-none transition-colors duration-200 font-mono placeholder-[rgba(138,128,112,0.5)] focus:bg-[#0f1629]/95 ${
                    errors.lastName ? "border-red-500" : "border-[rgba(201,168,76,0.15)] focus:border-[#c9a84c]"
                  }`}
                  type="text"
                  placeholder="Smith"
                  value={form.lastName}
                  onChange={set("lastName")}
                  onKeyDown={handleKey}
                />
                {errors.lastName && <span className="text-[11px] text-red-500 mt-1 block">{errors.lastName}</span>}
              </div>
            </div>

            <div className="mb-[18px]">
              <label className="text-[10px] tracking-[0.2em] uppercase text-[#8a8070] mb-2 block">Email Address</label>
              <input
                className={`w-full bg-[#0f1629]/80 border text-[13px] p-[14px_16px] outline-none transition-colors duration-200 font-mono placeholder-[rgba(138,128,112,0.5)] focus:bg-[#0f1629]/95 ${
                  errors.email ? "border-red-500" : "border-[rgba(201,168,76,0.15)] focus:border-[#c9a84c]"
                }`}
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={set("email")}
                onKeyDown={handleKey}
                autoComplete="email"
              />
              {errors.email && <span className="text-[11px] text-red-500 mt-1 block">{errors.email}</span>}
            </div>

            <div className="mb-[18px]">
              <label className="text-[10px] tracking-[0.2em] uppercase text-[#8a8070] mb-2 block">Password</label>
              <input
                className={`w-full bg-[#0f1629]/80 border text-[13px] p-[14px_16px] outline-none transition-colors duration-200 font-mono placeholder-[rgba(138,128,112,0.5)] focus:bg-[#0f1629]/95 ${
                  errors.password ? "border-red-500" : "border-[rgba(201,168,76,0.15)] focus:border-[#c9a84c]"
                }`}
                type="password"
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={set("password")}
                onKeyDown={handleKey}
                autoComplete="new-password"
              />
              {form.password && (
                <div className="mt-2 flex gap-1 items-center">
                  {[1, 2, 3, 4].map((i) => (
                    <div className="flex-1 h-[2px] bg-[rgba(201,168,76,0.2)] rounded-[2px] overflow-hidden" key={i}>
                      <div
                        className={`h-full rounded-[2px] transition-all duration-300 ${strength.color}`}
                        style={{ width: strength.score >= i ? "100%" : "0%" }}
                      />
                    </div>
                  ))}
                  <span className="text-[9px] tracking-[0.1em] text-[#8a8070] whitespace-nowrap ml-1">
                    {strength.label}
                  </span>
                </div>
              )}
              {errors.password && <span className="text-[11px] text-red-500 mt-1 block">{errors.password}</span>}
            </div>

            <div className="mb-[18px]">
              <label className="text-[10px] tracking-[0.2em] uppercase text-[#8a8070] mb-2 block">Confirm Password</label>
              <input
                className={`w-full bg-[#0f1629]/80 border text-[13px] p-[14px_16px] outline-none transition-colors duration-200 font-mono placeholder-[rgba(138,128,112,0.5)] focus:bg-[#0f1629]/95 ${
                  errors.confirm ? "border-red-500" : "border-[rgba(201,168,76,0.15)] focus:border-[#c9a84c]"
                }`}
                type="password"
                placeholder="Repeat password"
                value={form.confirm}
                onChange={set("confirm")}
                onKeyDown={handleKey}
                autoComplete="new-password"
              />
              {errors.confirm && <span className="text-[11px] text-red-500 mt-1 block">{errors.confirm}</span>}
            </div>

            <div className="text-[10px] leading-[1.7] text-[#8a8070] mb-5 p-[14px_16px] border border-[rgba(201,168,76,0.2)] bg-[#0f1629]/40">
              By creating an account you agree to our Terms of Service and Privacy Policy.
              Your data is used only to track daily usage limits.
            </div>

            <button
              className="w-full font-mono text-[11px] tracking-[0.2em] uppercase p-[18px] bg-[#c9a84c] text-[#0a0e1a] border-none font-medium transition-all duration-250 relative overflow-hidden enabled:hover:bg-[#e8c97a] enabled:hover:-translate-y-[1px] enabled:hover:shadow-[0_6px_24px_rgba(201,168,76,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <span>
                  Creating account
                  <span className="after:content-['...'] after:animate-[dots_1.2s_infinite]" />
                </span>
              ) : (
                "Create Account →"
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}