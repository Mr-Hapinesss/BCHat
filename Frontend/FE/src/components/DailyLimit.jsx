import { dailyLimitStyle } from "./ComponentStyles"

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
      <style>{dailyLimitStyle}</style>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-box" onClick={e => e.stopPropagation()}>
          <button className="close-x" onClick={onClose}>✕</button>
          <div className="modal-icon">◎</div>
          <h2 className="modal-title">Daily limit <em>reached</em></h2>
          <p className="modal-msg">
            You've used all 5 of your image analyses for today. Your limit resets at midnight.
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