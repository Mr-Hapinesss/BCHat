import { useAuth } from "../context/authContext";
import { style } from "./HeaderStyles";
import { useState } from "react";

export default function Header({ onNavigate, dailyUsed = 0, maxDaily = 5 }) {
  const { user, logout, isAuthenticated } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  const pct       = (dailyUsed / maxDaily) * 100;
  const fillClass = pct >= 100 ? "full" : pct >= 70 ? "warn" : "";

  const go = page => () => onNavigate(page);

  return (
    <>
      <style>{style}</style>
      <header className="header-root">

        {/* Logo — always goes to landing or quiz depending on auth */}
        <button
          className="header-logo"
          onClick={go(isAuthenticated ? "quiz" : "landing")}
        >
          BioChem<span>Vision</span>
        </button>

        {/* Centre slot — daily usage bar, only when logged in */}
        {isAuthenticated && (
          <div className="header-center">
            <span className="usage-label">Daily</span>
            <div className="usage-track">
              <div
                className={`usage-fill ${fillClass}`}
                style={{ width: `${Math.min(pct, 100)}%` }}
              />
            </div>
            <span className="usage-count">{dailyUsed}&nbsp;/&nbsp;{maxDaily}</span>
          </div>
        )}

        {/* Right slot — strictly conditional, no overlap possible */}
        <div className="header-right">
          {isAuthenticated ? (
            // LOGGED IN: name chip + My Profile + Sign Out
            <>
              <div className="user-chip">
                <span className="user-dot" />
                <span className="user-name">
                  Hello! {user?.name.split(" ")[0] || "User"}
                </span>
              </div>
              <button className="btn-h accent" onClick={go("profile")}>
                My Profile
              </button>
              <button className="btn-h danger" onClick={() => setShowLogoutModal(true)}>
                Sign Out
              </button>
            </>
          ) : (
            // ── GUEST / LOGGED OUT: guest chip + Sign In + Sign Up ──
            <>
              <button className="btn-h" onClick={go("login")}>
                Sign In
              </button>
              <button className="btn-h solid" onClick={go("signup")}>
                Sign Up Free
              </button>
            </>
          )}
        </div>

      </header>
      
      {showLogoutModal && (
        <div className="logout-overlay" onClick={() => setShowLogoutModal(false)}>
          <div className="logout-modal" onClick={e => e.stopPropagation()}>
            <div className="logout-modal-icon">◎</div>
            <h2 className="logout-modal-title">Sign <em>out?</em></h2>
            <p className="logout-modal-msg">
              Are you sure you want to sign out? Your daily usage progress will reset on your next session.
            </p>
            <div className="logout-modal-btns">
              <button
                className="btn-h solid"
                onClick={() => {
                  setShowLogoutModal(false);
                  logout();
                  onNavigate("landing");
                }}
              >
                Yes, Sign Out
              </button>
              <button
                className="btn-h"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}