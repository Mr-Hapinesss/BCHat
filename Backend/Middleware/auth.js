// authOrGuest middleware
// - If Authorization header with valid JWT → attaches req.user
// - If no token → treats as guest, attaches req.guestId from body/cookie
// - If neither → blocks request

import jwt from "jsonwebtoken";

export const authOrGuest = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      return next();
    } catch {
      return res.status(401).json({ error: "Invalid token." });
    }
  }

  // Guest path: expect a guestId in the body or cookie
  const guestId = req.body.guestId || req.cookies?.guestId;
  if (guestId) {
    req.guestId = guestId;
    return next();
  }

  return res.status(401).json({ error: "Authentication required." });
};