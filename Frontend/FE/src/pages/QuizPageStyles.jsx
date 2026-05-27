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

  .quiz-root {
    font-family: 'DM Mono', monospace;
    background: var(--navy);
    color: var(--text);
    min-height: 100vh;
  }

  .quiz-bg {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background:
      radial-gradient(ellipse 80% 60% at 20% 10%, rgba(201,168,76,0.05) 0%, transparent 60%),
      radial-gradient(ellipse 60% 80% at 80% 80%, rgba(45,212,191,0.04) 0%, transparent 60%);
  }

  .grid-overlay {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  /* ── NAV ── */
  .quiz-nav {
    position: sticky; top: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 48px;
    border-bottom: 1px solid var(--border);
    background: rgba(10,14,26,0.92);
    backdrop-filter: blur(20px);
  }

  .nav-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px; font-weight: 600;
    color: var(--gold);
    flex-shrink: 0;
  }

  .nav-logo span { color: var(--text); font-weight: 300; font-style: italic; }

  /* usage bar — centre slot */
  .nav-center {
    display: flex; align-items: center; gap: 12px;
  }

  .usage-bar-wrap {
    display: flex; align-items: center; gap: 10px;
  }

  .usage-label {
    font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--text-dim);
  }

  .usage-track {
    width: 120px; height: 3px;
    background: var(--border); border-radius: 2px; overflow: hidden;
  }

  .usage-fill {
    height: 100%; background: var(--gold);
    border-radius: 2px; transition: width 0.4s;
  }

  .usage-fill.warn { background: #f97316; }
  .usage-fill.full { background: #ef4444; }

  .usage-count {
    font-size: 11px; color: var(--text-dim);
  }

  /* right slot */
  .nav-right {
    display: flex; align-items: center; gap: 10px;
    flex-shrink: 0;
  }

  /* authenticated state */
  .user-chip {
    font-size: 11px; color: var(--text-dim);
    display: flex; align-items: center; gap: 8px;
    padding: 6px 12px;
    border: 1px solid var(--border);
    background: rgba(201,168,76,0.04);
  }

  .user-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--teal);
    animation: pulse 2s infinite;
    flex-shrink: 0;
  }

  .user-name {
    max-width: 140px;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }

  /* guest state */
  .guest-chip {
    font-size: 11px; color: var(--gold);
    border: 1px dashed rgba(201,168,76,0.4);
    padding: 6px 12px;
  }

  /* nav buttons */
  .btn-nav {
    font-family: 'DM Mono', monospace;
    font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase;
    padding: 9px 18px;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text-dim);
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }

  .btn-nav:hover {
    border-color: var(--gold);
    color: var(--gold);
  }

  .btn-nav.accent {
    border-color: var(--gold);
    color: var(--gold);
    background: rgba(201,168,76,0.08);
  }

  .btn-nav.accent:hover {
    background: rgba(201,168,76,0.18);
  }

  .btn-nav.danger:hover {
    border-color: #ef4444;
    color: #ef4444;
  }

  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.3; } }

  /* ── HERO ── */
  .quiz-hero {
    position: relative; z-index: 1;
    padding: 64px 48px 40px;
    text-align: center;
  }

  .quiz-eyebrow {
    font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--teal); margin-bottom: 16px;
    display: flex; align-items: center; gap: 12px; justify-content: center;
  }

  .quiz-eyebrow::before, .quiz-eyebrow::after {
    content: ''; display: block;
    width: 30px; height: 1px;
    background: var(--teal); opacity: 0.4;
  }

  .quiz-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(36px, 5vw, 60px);
    font-weight: 300; margin-bottom: 12px;
  }

  .quiz-title em { color: var(--gold); }

  .quiz-desc {
    font-size: 12px; color: var(--text-dim);
    line-height: 1.9; max-width: 480px; margin: 0 auto;
  }

  /* ── GRID ── */
  .quiz-grid {
    position: relative; z-index: 1;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(460px, 1fr));
    gap: 2px;
    padding: 0 48px 80px;
    max-width: 1400px; margin: 0 auto;
  }

  @media (max-width: 600px) {
    .quiz-grid { grid-template-columns: 1fr; padding: 0 16px 60px; }
    .quiz-nav { padding: 14px 16px; }
    .quiz-hero { padding: 48px 16px 32px; }
    .nav-center { display: none; }
    .user-chip { display: none; }
  }
`;