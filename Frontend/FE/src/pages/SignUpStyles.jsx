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