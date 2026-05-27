import { useState, useRef } from "react";
import { questionCardStyle } from "./ComponentStyles"

const QUESTIONS = {
  1: { label: "Structure Identification", icon: "⬡", desc: "Identify biochemical structures or molecules shown in the image." },
  2: { label: "Metabolic Pathway", icon: "◈", desc: "Explain the metabolic pathway illustrated, step by step." },
  3: { label: "Enzyme & Protein Analysis", icon: "✦", desc: "Identify enzymes or proteins and describe their mechanism." },
  4: { label: "Experimental Interpretation", icon: "◎", desc: "Interpret the experimental technique or result depicted." },
};


function toBase64(file) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result.split(",")[1]);
    r.onerror = () => rej(new Error("Read failed"));
    r.readAsDataURL(file);
  });
}

export default function QuestionCard({
  questionNumber, token, isAuthenticated, guestUsed,
  dailyUsed, maxDaily, onAnswered, onGuestLimit, onDailyLimit
}) {
  const q = QUESTIONS[questionNumber];
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [drag, setDrag] = useState(false);
  const inputRef = useRef();

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) { setError("Please upload an image file."); return; }
    if (file.size > 5 * 1024 * 1024) { setError("Image must be under 5MB."); return; }
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setAnswer(""); setError("");
  };

  const handleDrop = (e) => {
    e.preventDefault(); setDrag(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const clear = () => { setImage(null); setPreview(null); setAnswer(""); setError(""); };

  const submit = async () => {
    if (!image) { setError("Please upload an image first."); return; }
    if (!isAuthenticated && guestUsed) { onGuestLimit(); return; }
    if (isAuthenticated && dailyUsed >= maxDaily) { onDailyLimit(); return; }

    setLoading(true); setError(""); setAnswer("");
    try {
      const imageBase64 = await toBase64(image);
      const guestId = localStorage.getItem("guestId") || (() => {
        const id = crypto.randomUUID();
        localStorage.setItem("guestId", id);
        return id;
      })();

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/ai/answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          imageBase64,
          mimeType: image.type,
          questionNumber,
          ...(!token ? { guestId } : {}),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.requiresAuth) { onGuestLimit(); return; }
        if (res.status === 429) { onDailyLimit(); return; }
        throw new Error(data.error || "Analysis failed");
      }

      setAnswer(data.answer);
      onAnswered();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{questionCardStyle}</style>
      <div className="qcard">
        <div className="qcard-header">
          <div className="qcard-icon">{q.icon}</div>
          <div>
            <div className="qcard-num">Question {questionNumber} of 4</div>
            <div className="qcard-title">{q.label}</div>
            <div className="qcard-desc">{q.desc}</div>
          </div>
        </div>

        <div
          className={`upload-zone ${drag ? "drag" : ""} ${preview ? "has-image" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={handleDrop}
          onClick={() => !preview && inputRef.current?.click()}
        >
          <input
            ref={inputRef} type="file" accept="image/*"
            className="upload-input"
            style={{ display: preview ? "none" : "block" }}
            onChange={e => handleFile(e.target.files[0])}
          />
          {preview ? (
            <>
              <img src={preview} alt="Preview" className="preview-img" />
              <div className="preview-footer">
                <span className="preview-name">{image?.name}</span>
                <button className="preview-clear" onClick={(e) => { e.stopPropagation(); clear(); }}>✕ Remove</button>
              </div>
            </>
          ) : (
            <div className="upload-placeholder">
              <div className="upload-icon">⬆</div>
              <div className="upload-text">
                <strong>Click or drag an image here</strong>
                JPG, PNG, WEBP · Max 5MB
              </div>
            </div>
          )}
        </div>

        {error && <div className="error-box">{error}</div>}

        <button
          className={`submit-btn ${loading ? "loading" : ""}`}
          onClick={submit}
          disabled={loading || !image}
        >
          {loading ? <><span className="spinner" />Analyzing image...</> : `Analyze with AI →`}
        </button>

        {answer && (
          <div className="answer-box">
            <div className="answer-label">AI Analysis</div>
            <div className="answer-text">{answer}</div>
          </div>
        )}
      </div>
    </>
  );
}