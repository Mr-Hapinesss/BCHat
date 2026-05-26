const BASE = "/api";

function toBase64(file) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result.split(",")[1]);
    r.onerror = () => rej(new Error("File read failed"));
    r.readAsDataURL(file);
  });
}

function getOrCreateGuestId() {
  let id = localStorage.getItem("guestId");
  if (!id) { id = crypto.randomUUID(); localStorage.setItem("guestId", id); }
  return id;
}

export async function submitQuestion(imageFile, questionNumber, token) {
  const imageBase64 = await toBase64(imageFile);
  const headers = { "Content-Type": "application/json" };
  const body = { imageBase64, mimeType: imageFile.type, questionNumber };
  if (token) { headers["Authorization"] = `Bearer ${token}`; }
  else { body.guestId = getOrCreateGuestId(); }

  const res = await fetch(`${BASE}/ai/answer`, { method: "POST", headers, body: JSON.stringify(body) });
  const data = await res.json();
  if (!res.ok) throw Object.assign(new Error(data.error || "Request failed"), { requiresAuth: data.requiresAuth, status: res.status });
  return data;
}

export async function loginUser(email, password) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || data.error || "Login failed");
  return data;
}

export async function registerUser(name, email, password) {
  const res = await fetch(`${BASE}/auth/register`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || data.error || "Registration failed");
  return data;
}