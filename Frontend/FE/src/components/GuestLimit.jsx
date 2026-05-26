const style = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600&family=DM+Mono:wght@300;400;500&display=swap');
  .modal-overlay { position:fixed; inset:0; z-index:999; background:rgba(10,14,26,0.88);
    backdrop-filter:blur(8px); display:flex; align-items:center; justify-content:center; padding:24px; }
  .modal-box { background:#0f1629; border:1px solid rgba(201,168,76,0.3); max-width:480px; width:100%;
    padding:48px 44px; text-align:center; animation:popIn 0.3s cubic-bezier(0.34,1.56,0.64,1); position:relative; }
  .modal-icon { font-size:40px; color:#c9a84c; margin-bottom:20px; }
  .modal-title { font-family:'Cormorant Garamond',serif; font-size:36px; font-weight:300; margin-bottom:12px; color:#e8e4d9; }
  .modal-title em { color:#c9a84c; }
  .modal-msg { font-size:12px; color:#8a8070; line-height:1.9; margin-bottom:36px; }
  .modal-btns { display:flex; flex-direction:column; gap:12px; }
  .modal-btn-primary { font-family:'DM Mono',monospace; font-size:11px; letter-spacing:0.18em; text-transform:uppercase;
    padding:16px; background:#c9a84c; color:#0a0e1a; border:none; cursor:pointer; font-weight:500; transition:all 0.2s; }
  .modal-btn-primary:hover { background:#e8c97a; transform:translateY(-1px); }
  .modal-btn-ghost { font-family:'DM Mono',monospace; font-size:10px; letter-spacing:0.15em; text-transform:uppercase;
    padding:13px; background:transparent; color:#8a8070; border:1px dashed rgba(138,128,112,0.3); cursor:pointer; transition:all 0.2s; }
  .modal-btn-ghost:hover { color:#e8e4d9; border-color:rgba(138,128,112,0.6); }
  .close-x { position:absolute; top:16px; right:20px; background:none; border:none; color:#8a8070;
    font-size:18px; cursor:pointer; font-family:'DM Mono',monospace; transition:color 0.2s; }
  .close-x:hover { color:#e8e4d9; }
  @keyframes popIn { from { opacity:0; transform:scale(0.9) translateY(20px); } to { opacity:1; transform:scale(1) translateY(0); } }
`;

export default function GuestLimitModal({ onLogin, onClose }) {
  return (
    <>
      <style>{style}</style>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-box" onClick={e => e.stopPropagation()}>
          <button className="close-x" onClick={onClose}>✕</button>
          <div className="modal-icon">◈</div>
          <h2 className="modal-title">Guest limit <em>reached</em></h2>
          <p className="modal-msg">
            You've used your one free guest analysis. Create a free account to unlock
            up to 10 image analyses per day and access all four question types without restriction.
          </p>
          <div className="modal-btns">
            <button className="modal-btn-primary" onClick={onLogin}>Create Free Account →</button>
            <button className="modal-btn-ghost" onClick={onLogin}>Sign In Instead</button>
          </div>
        </div>
      </div>
    </>
  );
}