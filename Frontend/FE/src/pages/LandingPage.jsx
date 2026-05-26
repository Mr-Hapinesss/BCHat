import { useState, useEffect } from "react";

export default function LandingPage() {
    const [page, setPage] = useState("landing");

  return (
    <div>
      <h1>Welcome to the Landing Page</h1>
      <button onClick={() => setPage("signup")}>Sign in</button>
      <button onClick={() => setPage("login")}>Sign up</button>
      {/* Landing page content goes here */}
    </div>
  );
}