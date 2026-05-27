import { useAuth } from "../context/authContext";
import { style } from "./ProfilePageStyles";
import Header from "../components/Header";

function getInitials(name) {
  if (!name) return "?";
  return name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
}

function getMemberSince() {
  // If your backend returns createdAt you can use it; otherwise show current month/year
  const d = new Date();
  return d.toLocaleString("default", { month: "long", year: "numeric" });
}

export default function ProfilePage({ onBack }) {
  const { user, navigate } = useAuth();
  // Normalize possible user shapes: user, user.user, user.data, etc.
  const resolvedUser = user?.user ?? user?.data ?? user ?? null;

  const name =
    resolvedUser?.name ||
    resolvedUser?.fullName ||
    [resolvedUser?.firstName, resolvedUser?.lastName].filter(Boolean).join(" ") ||
    "Unknown User";

  const email = resolvedUser?.email || resolvedUser?.emailAddress || "No email on record";

  return (
    <>
      <style>{style}</style>
      <div className="profile-root">
        <div className="profile-bg" />
        <div className="grid-overlay" />

        <Header onNavigate={navigate} />

        {/* BODY */}
        <div className="profile-body">
          <div className="profile-card">

            <div className="card-eyebrow">Account Profile</div>

            <h1 className="card-title">Your <em>details</em></h1>

            {/* Letter-style display */}
            <div className="profile-letter">
              <div className="letter-greeting">Hello, {name.split(" ")[0]}.</div>

              <div className="letter-line">
                <span className="label">Full Name</span>
                <span className="value gold">{name}</span>
              </div>

              <div className="letter-line">
                <span className="label">Email Address</span>
                <span className="value">{email}</span>
              </div>

              <div className="letter-sign">
                — Your BioChem Vision account
              </div>
            </div>

            <div className="card-divider" />

            {/* Meta row */}
            <div className="card-meta">
              <div className="meta-item">
                <div className="meta-label">Member Since</div>
                <div className="meta-value">{user?.createdAt ? new Date(user.createdAt).toLocaleString("default", { month: "long", year: "numeric" }) : getMemberSince()}</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Account Status</div>
                <div className="meta-badge"><span className="badge-dot" />Active</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Daily Limit</div>
                <div className="meta-value">5 images / day</div>
              </div>
            </div>

            <button className="btn-back" onClick={onBack}>
              ← Return to Analysis Platform
            </button>

          </div>
        </div>
      </div>
    </>
  );
}