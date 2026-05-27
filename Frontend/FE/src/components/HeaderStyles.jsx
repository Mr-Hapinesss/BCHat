export const style = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&display=swap');

  .header-root {
    position: sticky; top: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 48px; gap: 16px;
    border-bottom: 1px solid rgba(201,168,76,0.2);
    background: rgba(10,14,26,0.92);
    backdrop-filter: blur(20px);
    font-family: 'DM Mono', monospace;
  }

  .header-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px; font-weight: 600;
    color: #c9a84c; flex-shrink: 0;
    cursor: pointer;
    background: none; border: none;
  }

  .header-logo span {
    color: #e8e4d9; font-weight: 300; font-style: italic;
  }

  .header-center {
    display: flex; align-items: center; gap: 10px;
  }

  .usage-label {
    font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase;
    color: #8a8070;
  }

  .usage-track {
    width: 120px; height: 3px;
    background: rgba(201,168,76,0.2); border-radius: 2px; overflow: hidden;
  }

  .usage-fill {
    height: 100%; background: #c9a84c;
    border-radius: 2px; transition: width 0.4s;
  }

  .usage-fill.warn { background: #f97316; }
  .usage-fill.full { background: #ef4444; }

  .usage-count { font-size: 11px; color: #8a8070; }

  .header-right {
    display: flex; align-items: center; gap: 10px; flex-shrink: 0;
  }

  .user-chip {
    font-size: 11px; color: #8a8070;
    display: flex; align-items: center; gap: 8px;
    padding: 6px 12px;
    border: 1px solid rgba(201,168,76,0.2);
    background: rgba(201,168,76,0.04);
  }

  .user-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: #2dd4bf; animation: hpulse 2s infinite; flex-shrink: 0;
  }

  .user-name {
    max-width: 140px;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }

  .guest-chip {
    font-size: 11px; color: #c9a84c;
    border: 1px dashed rgba(201,168,76,0.4); padding: 6px 12px;
  }

  .btn-h {
    font-family: 'DM Mono', monospace;
    font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase;
    padding: 9px 18px; border: 1px solid rgba(201,168,76,0.2);
    background: transparent; color: #8a8070;
    cursor: pointer; transition: all 0.2s; white-space: nowrap;
  }

  .btn-h:hover { border-color: #c9a84c; color: #c9a84c; }

  .btn-h.accent {
    border-color: #c9a84c; color: #c9a84c;
    background: rgba(201,168,76,0.08);
  }

  .btn-h.accent:hover { background: rgba(201,168,76,0.18); }

  .btn-h.solid {
    border-color: #c9a84c; background: #c9a84c;
    color: #0a0e1a; font-weight: 500;
  }

  .btn-h.solid:hover { background: #e8c97a; border-color: #e8c97a; }

  .btn-h.danger { border-color: rgba(239,68,68,0.3); color: #8a8070; }
  .btn-h.danger:hover { border-color: #ef4444; color: #ef4444; }

  @keyframes hpulse { 0%,100%{opacity:1;} 50%{opacity:0.3;} }

  @media (max-width: 768px) {
    .header-root { padding: 14px 16px; }
    .header-center { display: none; }
    .user-chip { display: none; }
  }

  .logout-overlay {
    position: fixed; inset: 0; z-index: 999;
    background: rgba(10,14,26,0.85);
    backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
  }

  .logout-modal {
    background: #0f1629;
    border: 1px solid rgba(201,168,76,0.3);
    max-width: 420px; width: 100%;
    padding: 48px 40px;
    text-align: center;
    animation: modalPop 0.25s cubic-bezier(0.34,1.56,0.64,1);
  }

  .logout-modal-icon {
    font-size: 36px; color: #c9a84c;
    margin-bottom: 18px;
  }

  .logout-modal-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 36px; font-weight: 300;
    color: #e8e4d9; margin-bottom: 12px; line-height: 1;
  }

  .logout-modal-title em { color: #c9a84c; }

  .logout-modal-msg {
    font-size: 11px; color: #8a8070;
    line-height: 1.9; margin-bottom: 32px;
  }

  .logout-modal-btns {
    display: flex; flex-direction: column; gap: 10px;
  }

  @keyframes modalPop {
    from { opacity: 0; transform: scale(0.92) translateY(16px); }
    to   { opacity: 1; transform: scale(1)    translateY(0); }
  }
`;