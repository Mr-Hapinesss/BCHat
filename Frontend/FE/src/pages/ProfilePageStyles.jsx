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

  .profile-root {
    font-family: 'DM Mono', monospace;
    background: var(--navy);
    color: var(--text);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .profile-bg {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background:
      radial-gradient(ellipse 70% 60% at 15% 20%, rgba(201,168,76,0.06) 0%, transparent 60%),
      radial-gradient(ellipse 50% 70% at 85% 80%, rgba(45,212,191,0.04) 0%, transparent 60%);
  }

  .grid-overlay {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  /* NAV */
  .profile-nav {
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
  }

  .nav-logo span { color: var(--text); font-weight: 300; font-style: italic; }

  .nav-right { display: flex; gap: 10px; }

  .btn-nav {
    font-family: 'DM Mono', monospace;
    font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase;
    padding: 9px 18px;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text-dim);
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-nav:hover { border-color: var(--gold); color: var(--gold); }

  .btn-nav.danger:hover { border-color: #ef4444; color: #ef4444; }

  /* MAIN CONTENT */
  .profile-body {
    position: relative; z-index: 1;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 80px 24px;
  }

  .profile-card {
    width: 100%;
    max-width: 560px;
    border: 1px solid var(--border);
    background: var(--navy2);
    padding: 56px 52px;
    animation: fadeUp 0.5s ease both;
  }

  /* heading row */
  .card-eyebrow {
    font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--teal);
    margin-bottom: 18px;
    display: flex; align-items: center; gap: 10px;
  }

  .card-eyebrow::after {
    content: ''; flex: 1; height: 1px;
    background: rgba(45,212,191,0.2);
  }

  .card-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 42px; font-weight: 300;
    line-height: 1; margin-bottom: 40px;
  }

  .card-title em { color: var(--gold); }

  /* the letter / message block */
  .profile-letter {
    border-left: 2px solid var(--border);
    padding-left: 24px;
    margin-bottom: 40px;
    display: flex; flex-direction: column; gap: 20px;
  }

  .letter-greeting {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px; font-weight: 400; font-style: italic;
    color: var(--text-dim);
  }

  .letter-line {
    font-size: 13px;
    line-height: 2;
    color: var(--text);
  }

  .letter-line .label {
    font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--text-dim);
    display: block;
    margin-bottom: 4px;
  }

  .letter-line .value {
    color: var(--text);
    font-size: 15px;
  }

  .letter-line .value.gold { color: var(--gold); }

  .letter-sign {
    font-family: 'Cormorant Garamond', serif;
    font-size: 16px; font-style: italic;
    color: var(--text-dim);
    margin-top: 4px;
  }

  /* divider */
  .card-divider {
    height: 1px;
    background: var(--border);
    margin-bottom: 32px;
  }

  /* meta info row */
  .card-meta {
    display: flex; gap: 32px; flex-wrap: wrap;
    margin-bottom: 36px;
  }

  .meta-item { }

  .meta-label {
    font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase;
    color: var(--text-dim); margin-bottom: 5px;
  }

  .meta-value {
    font-size: 12px; color: var(--text);
  }

  .meta-badge {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 11px; color: var(--teal);
    border: 1px solid rgba(45,212,191,0.2);
    padding: 3px 10px;
  }

  .badge-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: var(--teal);
    animation: pulse 2s infinite;
  }

  /* back button */
  .btn-back {
    width: 100%;
    font-family: 'DM Mono', monospace;
    font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
    padding: 16px;
    background: transparent;
    color: var(--text-dim);
    border: 1px solid var(--border);
    cursor: pointer; transition: all 0.2s;
  }

  .btn-back:hover { border-color: var(--gold); color: var(--gold); }

  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
  @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }

  @media (max-width: 600px) {
    .profile-nav { padding: 14px 16px; }
    .profile-card { padding: 36px 24px; }
  }
`;