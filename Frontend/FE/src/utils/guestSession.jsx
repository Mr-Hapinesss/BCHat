const KEY = "guestId";
const USED_KEY = "guestUsed";

export function getGuestId() {
  let id = localStorage.getItem(KEY);
  if (!id) { id = crypto.randomUUID(); localStorage.setItem(KEY, id); }
  return id;
}

export function clearGuestId() {
  localStorage.removeItem(KEY);
}

export function markGuestUsed() {
  localStorage.setItem(USED_KEY, "true");
}

export function isGuestUsed() {
  return localStorage.getItem(USED_KEY) === "true";
}

export function clearGuestSession() {
  localStorage.removeItem(KEY);
  localStorage.removeItem(USED_KEY);
}