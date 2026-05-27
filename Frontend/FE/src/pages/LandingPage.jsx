import { useEffect, useRef } from "react";
import { style } from "./LandingPageStyles";
import Header from "../components/Header";
import { useAuth } from "../context/authContext";

export default function LandingPage({ onLogin, onSignup, onGuest }) {

    const { navigate } = useAuth();
  return (
    <>
      <style>{style}</style>
      <div className="landing-root">
        <div className="bg-canvas" />
        <div className="grid-overlay" />
        <div className="molecule-float">⬡</div>

        {/* NAV */}
        <Header onNavigate={navigate} />

        {/* HERO */}
        <section className="hero">
          <div className="badge">
            <span className="badge-dot" />
            AI-Powered Biochemistry Analysis
          </div>
          <div className="eyebrow">Upload · Analyze · Understand</div>
          <h1 className="hero-title">
            <span className="block">Decode</span>
            <span className="block gold">Biochemistry</span>
          </h1>
          <p className="hero-sub">through vision</p>
          <p className="hero-desc">
            Upload images of biochemical structures, pathways, enzymes, or experiments.
            Our AI analyzes them through four expert lenses and returns precise,
            academic-grade answers.
          </p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={onSignup}>Create Free Account</button>
            <button className="btn-secondary" onClick={onLogin}>Sign In</button>
            <button className="btn-ghost" onClick={onGuest}>Try Once as Guest →</button>
          </div>
        </section>

        {/* FEATURES */}
        <section className="features">
          <div className="section-label">How it works</div>
          <div className="features-grid">
            {[
              { icon: "⬡", title: "Upload an Image", desc: "Submit any biochemistry image — diagrams, lab results, molecular structures, pathway charts, or microscopy images." },
              { icon: "◈", title: "Choose a Question", desc: "Select from four expert analytical lenses: structure identification, pathway analysis, enzyme mechanisms, or experimental interpretation." },
              { icon: "✦", title: "AI Analysis", desc: "Our multimodal AI model processes your image through a specialized biochemistry prompt, returning a detailed academic answer." },
              { icon: "◎", title: "Understand & Learn", desc: "Receive a clear, structured written explanation you can study, copy, or use in your academic work." },
            ].map((f, i) => (
              <div className="feature-card" key={i}>
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* QUESTIONS */}
        <section className="questions-section">
          <div className="questions-inner">
            <div className="section-label">The Four Questions</div>
            <div className="questions-grid">
              {[
                { num: "01", title: "Structure Identification", desc: "What biochemical structures or molecules are shown? Describe their function and biological significance." },
                { num: "02", title: "Metabolic Pathway", desc: "What metabolic pathway is illustrated? Explain each step shown in the image." },
                { num: "03", title: "Enzyme & Protein Analysis", desc: "Identify the enzyme(s) or proteins shown and describe their mechanism of action in detail." },
                { num: "04", title: "Experimental Interpretation", desc: "What technique or experimental result is depicted? Interpret the findings and their implications." },
              ].map((q, i) => (
                <div className="q-card" key={i}>
                  <div className="q-num">{q.num}</div>
                  <div className="q-content">
                    <div className="q-title">{q.title}</div>
                    <div className="q-desc">{q.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-logo">BioChem<em>Vision</em></div>
          <div className="footer-note">
            Guests: 1 free use &nbsp;·&nbsp; Registered: {parseInt(import.meta?.env?.VITE_MAX_IMAGES || 5)} images/day
          </div>
        </footer>
      </div>
    </>
  );
}