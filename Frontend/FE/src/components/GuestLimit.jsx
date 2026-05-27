import { guestLimitStyle } from "./ComponentStyles"

export default function GuestLimitModal({ onLogin, onClose }) {
  return (
    <>
      <style>{guestLimitStyle}</style>
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