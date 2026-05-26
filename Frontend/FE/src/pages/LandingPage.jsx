import { useEffect, useRef } from "react";

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
  }

  .landing-root {
    font-family: 'DM Mono', monospace;
    background: var(--navy);
    color: var(--text);
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
  }

  .bg-canvas {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background:
      radial-gradient(ellipse 80% 60% at 20% 10%, rgba(201,168,76,0.07) 0%, transparent 60%),
      radial-gradient(ellipse 60% 80% at 80% 80%, rgba(45,212,191,0.05) 0%, transparent 60%),
      radial-gradient(ellipse 100% 100% at 50% 50%, rgba(15,22,41,0.9) 0%, var(--navy) 100%);
  }

  .grid-overlay {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 48px;
    border-bottom: 1px solid var(--border);
    background: rgba(10,14,26,0.8);
    backdrop-filter: blur(20px);
  }

  .nav-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px; font-weight: 600;
    color: var(--gold);
    letter-spacing: 0.05em;
    display: flex; align-items: center; gap: 10px;
  }

  .nav-logo span { color: var(--text); font-weight: 300; font-style: italic; }

  .nav-links { display: flex; gap: 12px; }

  .btn-nav {
    font-family: 'DM Mono', monospace;
    font-size: 11px; letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 10px 22px;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text-dim);
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-nav:hover { border-color: var(--gold); color: var(--gold); }

  .btn-nav.primary {
    border-color: var(--gold);
    color: var(--gold);
    background: rgba(201,168,76,0.08);
  }

  .btn-nav.primary:hover { background: rgba(201,168,76,0.18); }

  .hero {
    position: relative; z-index: 1;
    min-height: 100vh;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 120px 48px 80px;
    text-align: center;
  }

  .eyebrow {
    font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--teal);
    margin-bottom: 28px;
    display: flex; align-items: center; gap: 14px;
  }

  .eyebrow::before, .eyebrow::after {
    content: '';
    display: block; width: 40px; height: 1px;
    background: var(--teal); opacity: 0.5;
  }

  .hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(52px, 8vw, 110px);
    font-weight: 300;
    line-height: 0.95;
    letter-spacing: -0.02em;
    margin-bottom: 16px;
    animation: fadeUp 0.9s ease both;
  }

  .hero-title .gold { color: var(--gold); font-style: italic; }
  .hero-title .block { display: block; }

  .hero-sub {
    font-size: clamp(38px, 5vw, 72px);
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300; font-style: italic;
    color: var(--text-dim);
    margin-bottom: 32px;
    animation: fadeUp 0.9s 0.1s ease both;
  }

  .hero-desc {
    max-width: 520px;
    font-size: 13px;
    line-height: 1.9;
    color: var(--text-dim);
    margin-bottom: 56px;
    animation: fadeUp 0.9s 0.2s ease both;
  }

  .hero-cta {
    display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;
    animation: fadeUp 0.9s 0.3s ease both;
  }

  .btn-primary {
    font-family: 'DM Mono', monospace;
    font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;
    padding: 18px 44px;
    background: var(--gold);
    color: var(--navy);
    border: none; cursor: pointer;
    font-weight: 500;
    transition: all 0.25s;
    position: relative; overflow: hidden;
  }

  .btn-primary::after {
    content: '';
    position: absolute; inset: 0;
    background: rgba(255,255,255,0.15);
    transform: translateX(-100%);
    transition: transform 0.3s;
  }

  .btn-primary:hover::after { transform: translateX(0); }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(201,168,76,0.35); }

  .btn-secondary {
    font-family: 'DM Mono', monospace;
    font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;
    padding: 18px 44px;
    background: transparent;
    color: var(--text);
    border: 1px solid rgba(232,228,217,0.2);
    cursor: pointer;
    transition: all 0.25s;
  }

  .btn-secondary:hover {
    border-color: var(--text);
    transform: translateY(-2px);
  }

  .btn-ghost {
    font-family: 'DM Mono', monospace;
    font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
    padding: 18px 30px;
    background: transparent;
    color: var(--text-dim);
    border: 1px dashed rgba(138,128,112,0.3);
    cursor: pointer;
    transition: all 0.25s;
  }

  .btn-ghost:hover { color: var(--text); border-color: rgba(138,128,112,0.6); }

  .features {
    position: relative; z-index: 1;
    padding: 100px 48px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-label {
    font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 60px;
    display: flex; align-items: center; gap: 14px;
  }

  .section-label::after {
    content: '';
    flex: 1; height: 1px;
    background: linear-gradient(to right, var(--border), transparent);
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
  }

  .feature-card {
    background: var(--navy);
    padding: 44px 36px;
    position: relative;
    transition: background 0.3s;
  }

  .feature-card:hover { background: var(--navy2); }

  .feature-icon {
    width: 44px; height: 44px;
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 28px;
    font-size: 18px;
    color: var(--gold);
  }

  .feature-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px; font-weight: 600;
    margin-bottom: 14px; color: var(--text);
  }

  .feature-desc {
    font-size: 12px; line-height: 1.9;
    color: var(--text-dim);
  }

  .questions-section {
    position: relative; z-index: 1;
    padding: 100px 48px;
    background: var(--navy2);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .questions-inner {
    max-width: 1200px; margin: 0 auto;
  }

  .questions-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2px;
  }

  @media (max-width: 700px) {
    .questions-grid { grid-template-columns: 1fr; }
    .nav { padding: 16px 20px; }
    .hero { padding: 100px 20px 60px; }
    .features { padding: 60px 20px; }
    .questions-section { padding: 60px 20px; }
    .footer { padding: 40px 20px; }
  }

  .q-card {
    background: var(--navy);
    padding: 36px 32px;
    display: flex; gap: 20px;
    align-items: flex-start;
    border: 1px solid var(--border);
    transition: border-color 0.2s;
  }

  .q-card:hover { border-color: rgba(201,168,76,0.4); }

  .q-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 48px; font-weight: 300;
    color: var(--border);
    line-height: 1;
    flex-shrink: 0;
    transition: color 0.2s;
    width: 48px;
  }

  .q-card:hover .q-num { color: var(--gold); }

  .q-content .q-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 19px; font-weight: 600;
    margin-bottom: 8px; color: var(--text);
  }

  .q-content .q-desc {
    font-size: 11px; line-height: 1.8;
    color: var(--text-dim);
  }

  .footer {
    position: relative; z-index: 1;
    padding: 60px 48px;
    display: flex; align-items: center; justify-content: space-between;
    border-top: 1px solid var(--border);
    flex-wrap: wrap; gap: 16px;
  }

  .footer-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px; color: var(--text-dim);
  }

  .footer-note {
    font-size: 11px; color: var(--text-dim);
  }

  .molecule-float {
    position: fixed;
    right: -80px; top: 50%;
    transform: translateY(-50%);
    font-size: 300px;
    opacity: 0.03;
    pointer-events: none;
    z-index: 0;
    user-select: none;
    animation: floatSlow 8s ease-in-out infinite;
  }

  @keyframes floatSlow {
    0%, 100% { transform: translateY(-50%) rotate(0deg); }
    50% { transform: translateY(-52%) rotate(6deg); }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .badge {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase;
    padding: 7px 14px;
    border: 1px solid rgba(45,212,191,0.25);
    color: var(--teal);
    margin-bottom: 40px;
    animation: fadeUp 0.9s ease both;
  }

  .badge-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--teal);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
`;

export default function LandingPage({ onLogin, onSignup, onGuest }) {
  return (
    <>
      <style>{style}</style>
      <div className="landing-root">
        <div className="bg-canvas" />
        <div className="grid-overlay" />
        <div className="molecule-float">⬡</div>

        {/* NAV */}
        <nav className="nav">
          <div className="nav-logo">
            BioChem<span>Vision</span>
          </div>
          <div className="nav-links">
            <button className="btn-nav" onClick={onGuest}>Try as Guest</button>
            <button className="btn-nav" onClick={onLogin}>Sign In</button>
            <button className="btn-nav primary" onClick={onSignup}>Get Started</button>
          </div>
        </nav>

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
            Guests: 1 free use &nbsp;·&nbsp; Registered: {parseInt(import.meta?.env?.VITE_MAX_IMAGES || 10)} images/day
          </div>
        </footer>
      </div>
    </>
  );
}