const style = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600&family=DM+Mono:wght@300;400;500&display=swap');
  .modal-overlay { position:fixed; inset:0; z-index:999; background:rgba(10,14,26,0.88);
    backdrop-filter:blur(8px); display:flex; align-items:center; justify-content:center; padding:24px; }
  .modal-box { background:#0f1629; border:1px solid rgba(239,68,68,0.25); max-width:460px; width:100%;
    padding:48px 44px; text-align:center; animation:popIn 0.3s cubic-bezier(0.34,1.56,0.64,1); position:relative; }
  .modal-icon { font-size:40px; color:#f97316; margin-bottom:20px; }
  .modal-title { font-family:'Cormorant Garamond',serif; font-size:34px; font-weight:300; margin-bottom:12px; color:#e8e4d9; }
  .modal-title em { color:#f97316; font-style:italic; }
  .modal-msg { font-size:12px; color:#8a8070; line-height:1.9; margin-bottom:12px; }
  .reset-info { font-size:11px; color:rgba(201,168,76,0.7); border:1px solid rgba(201,168,76,0.15);
    padding:12px 16px; margin-bottom:32px; line-height:1.7; }
  .modal-btn-ghost { font-family:'DM Mono',monospace; font-size:11px; letter-spacing:0.18em; text-transform:uppercase;
    padding:16px; width:100%; background:transparent; color:#e8e4d9; border:1px solid rgba(232,228,217,0.2); cursor:pointer; transition:all 0.2s; }
  .modal-btn-ghost:hover { border-color:#e8e4d9; }
  .close-x { position:absolute; top:16px; right:20px; background:none; border:none; color:#8a8070;
    font-size:18px; cursor:pointer; font-family:'DM Mono',monospace; transition:color 0.2s; }
  .close-x:hover { color:#e8e4d9; }
  @keyframes popIn { from { opacity:0; transform:scale(0.9) translateY(20px); } to { opacity:1; transform:scale(1) translateY(0); } }
`;

function getResetTime() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const diff = tomorrow - now;
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  return `${h}h ${m}m`;
}

export default function DailyLimitModal({ onClose }) {
  return (
    <>
      <style>{style}</style>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-box" onClick={e => e.stopPropagation()}>
          <button className="close-x" onClick={onClose}>✕</button>
          <div className="modal-icon">◎</div>
          <h2 className="modal-title">Daily limit <em>reached</em></h2>
          <p className="modal-msg">
            You've used all 10 of your image analyses for today. Your limit resets at midnight.
          </p>
          <div className="reset-info">
            ⏱ Resets in approximately <strong>{getResetTime()}</strong>
          </div>
          <button className="modal-btn-ghost" onClick={onClose}>Got it, I'll come back</button>
        </div>
      </div>
    </>
  );
}