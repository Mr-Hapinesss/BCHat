import { useState, useRef } from "react";

const QUESTIONS = {
  1: { label: "Structure Identification", icon: "⬡", desc: "Identify biochemical structures or molecules shown in the image." },
  2: { label: "Metabolic Pathway", icon: "◈", desc: "Explain the metabolic pathway illustrated, step by step." },
  3: { label: "Enzyme & Protein Analysis", icon: "✦", desc: "Identify enzymes or proteins and describe their mechanism." },
  4: { label: "Experimental Interpretation", icon: "◎", desc: "Interpret the experimental technique or result depicted." },
};

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600&family=DM+Mono:wght@300;400;500&display=swap');
  .qcard { background: #0f1629; border: 1px solid rgba(201,168,76,0.15); padding: 36px; position: relative;
    transition: border-color 0.25s; display: flex; flex-direction: column; gap: 24px; }
  .qcard:hover { border-color: rgba(201,168,76,0.35); }
  .qcard-header { display: flex; align-items: flex-start; gap: 16px; }
  .qcard-icon { font-size: 22px; color: #c9a84c; flex-shrink: 0; margin-top: 4px; }
  .qcard-num { font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: #8a8070; margin-bottom: 6px; }
  .qcard-title { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 600; color: #e8e4d9; margin-bottom: 6px; }
  .qcard-desc { font-size: 11px; color: #8a8070; line-height: 1.8; }
  .upload-zone { border: 1px dashed rgba(201,168,76,0.25); padding: 28px 20px; text-align: center;
    cursor: pointer; transition: all 0.25s; background: rgba(10,14,26,0.5); position: relative; }
  .upload-zone:hover, .upload-zone.drag { border-color: #c9a84c; background: rgba(201,168,76,0.05); }
  .upload-zone.has-image { border-style: solid; border-color: rgba(201,168,76,0.4); padding: 0; overflow: hidden; }
  .upload-input { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%; }
  .upload-placeholder { pointer-events: none; }
  .upload-icon { font-size: 28px; color: rgba(201,168,76,0.4); margin-bottom: 10px; }
  .upload-text { font-size: 11px; color: #8a8070; line-height: 1.7; }
  .upload-text strong { color: #c9a84c; display: block; margin-bottom: 4px; }
  .preview-img { width: 100%; max-height: 240px; object-fit: contain; display: block; background: #0a0e1a; }
  .preview-footer { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px;
    border-top: 1px solid rgba(201,168,76,0.15); }
  .preview-name { font-size: 10px; color: #8a8070; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 200px; }
  .preview-clear { font-size: 10px; color: #ef4444; background: none; border: none; cursor: pointer;
    font-family: 'DM Mono', monospace; letter-spacing: 0.1em; text-transform: uppercase; }
  .preview-clear:hover { text-decoration: underline; }
  .submit-btn { width: 100%; font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.18em;
    text-transform: uppercase; padding: 16px; background: #c9a84c; color: #0a0e1a; border: none;
    cursor: pointer; font-weight: 500; transition: all 0.25s; }
  .submit-btn:hover:not(:disabled) { background: #e8c97a; transform: translateY(-1px); box-shadow: 0 6px 24px rgba(201,168,76,0.25); }
  .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  .submit-btn.loading { background: rgba(201,168,76,0.3); color: #c9a84c; }
  .answer-box { border: 1px solid rgba(45,212,191,0.2); background: rgba(45,212,191,0.04); padding: 24px;
    animation: fadeIn 0.4s ease; }
  .answer-label { font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: #2dd4bf;
    margin-bottom: 14px; display: flex; align-items: center; gap: 10px; }
  .answer-label::after { content: ''; flex:1; height:1px; background: rgba(45,212,191,0.2); }
  .answer-text { font-size: 12px; line-height: 2; color: #e8e4d9; white-space: pre-wrap; }
  .error-box { border:1px solid rgba(239,68,68,0.25); background:rgba(239,68,68,0.06);
    padding:14px 18px; font-size:11px; color:#fca5a5; line-height:1.7; }
  .spinner { display: inline-block; width: 14px; height: 14px; border: 2px solid rgba(201,168,76,0.3);
    border-top-color: #c9a84c; border-radius: 50%; animation: spin 0.8s linear infinite; margin-right: 8px; vertical-align: middle; }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
`;

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

      const res = await fetch("/api/ai/answer", {
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
      <style>{style}</style>
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