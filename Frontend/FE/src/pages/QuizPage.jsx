import { useState } from "react";
import { useAuth } from "../context/authContext";
import QuestionCard from "../components/QuestionCard";
import GuestLimitModal from "../components/GuestLimit";
import DailyLimitModal from "../components/DailyLimit";
import { style } from "./QuizPageStyles";
import Header from "../components/Header";

const MAX_DAILY = 5;

export default function QuizPage({ onLoginRequired, onProfile }) {
  const { token, guestUsed, markGuestUsed, isAuthenticated, navigate } = useAuth();
  const [dailyUsed, setDailyUsed] = useState(0);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [showDailyModal, setShowDailyModal] = useState(false);

  const pct = (dailyUsed / MAX_DAILY) * 100;
  const fillClass = pct >= 100 ? "full" : pct >= 70 ? "warn" : "";

  const handleAnswered = () => {
    if (!isAuthenticated) markGuestUsed();
    setDailyUsed(d => d + 1);
  };

  return (
    <>
      <style>{style}</style>
      <div className="quiz-root">
        <div className="quiz-bg" />
        <div className="grid-overlay" />

        <Header onNavigate={navigate} dailyUsed={dailyUsed} maxDaily={MAX_DAILY} />

        {/* ── HERO ── */}
        <div className="quiz-hero">
          <div className="quiz-eyebrow">AI Analysis Platform</div>
          <h1 className="quiz-title">Biochemistry <em>Vision</em></h1>
          <p className="quiz-desc">
            Upload an image to any question below. Our AI will analyze it and
            return a detailed written answer.
            {!isAuthenticated && " You have 1 free guest analysis."}
          </p>
        </div>

        {/* ── QUESTION CARDS ── */}
        <div className="quiz-grid">
          {[1, 2, 3, 4].map(num => (
            <QuestionCard
              key={num}
              questionNumber={num}
              token={token}
              isAuthenticated={isAuthenticated}
              guestUsed={guestUsed}
              dailyUsed={dailyUsed}
              maxDaily={MAX_DAILY}
              onAnswered={handleAnswered}
              onGuestLimit={() => setShowGuestModal(true)}
              onDailyLimit={() => setShowDailyModal(true)}
            />
          ))}
        </div>

        {showGuestModal && (
          <GuestLimitModal
            onLogin={onLoginRequired}
            onClose={() => setShowGuestModal(false)}
          />
        )}
        {showDailyModal && (
          <DailyLimitModal onClose={() => setShowDailyModal(false)} />
        )}
      </div>
    </>
  );
}