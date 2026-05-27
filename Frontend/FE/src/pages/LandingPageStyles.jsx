export const style = `
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