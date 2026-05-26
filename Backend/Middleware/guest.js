/*
checkDailyLimit middleware
- Logged-in users: max MAX_IMAGES_PER_DAY images per calendar day
- Guests: max GUEST_MAX_USES total (ever), then must sign up
*/

import UsageLog from "../models/usageLog.js";

export const checkDailyLimit = async (req, res, next) => {
  const today = new Date();                                    // Start of today
  today.setHours(0, 0, 0, 0);                                 // Start of today

  if (req.user) { // Logged-in user path
    
    // Check daily limit for logged-in users
    const count = await UsageLog.countDocuments({
      userId: req.user._id,                                  // check userId for logged-in users
      timestamp: { $gte: today }                             // only count today's usage
    });

    if (count >= parseInt(process.env.MAX_IMAGES_PER_DAY || 5)) { // check against daily limit
      return res.status(429).json({ error: `Daily limit of ${process.env.MAX_IMAGES_PER_DAY} images reached.` });
    }
  } else if (req.guestId) {                                             // Check total uses for guest
    
    const count = await UsageLog.countDocuments({ guestId: req.guestId });

    if (count >= parseInt(process.env.GUEST_MAX_USES || 1)) {
      return res.status(403).json({ error: "Guest limit reached. Please sign up to continue.", requiresAuth: true });
    }
  }

  next();
};