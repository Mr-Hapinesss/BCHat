export const dailyLimitStyle = `
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

export const guestLimitStyle = `
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

export const questionCardStyle = `
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