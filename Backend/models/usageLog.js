// Schema fields:
// - userId: ObjectId (null for guests)
// - guestId: String (null for logged-in users)
// - questionNumber: Number (1–4)
// - timestamp: Date

import mongoose from "mongoose";

const UsageLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  guestId: { type: String, default: null },
  questionNumber: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("UsageLog", UsageLogSchema);