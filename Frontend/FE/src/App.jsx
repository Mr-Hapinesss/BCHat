import { useState, useEffect } from "react";
import LoginPage from "./pages/LogIn.jsx";
import SignupPage from "./pages/SignUp.jsx";
import QuizPage from "./pages/QuizPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import { AuthContext } from "./context/authContext.jsx";

export default function App() {
  const [page, setPage] = useState("signup");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [guestUsed, setGuestUsed] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const storedGuestUsed = localStorage.getItem("guestUsed");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setPage("quiz");
    }
    if (storedGuestUsed === "true") setGuestUsed(true);
  }, []);

  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem("token", tokenData);
    localStorage.setItem("user", JSON.stringify(userData));
    setPage("quiz");
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setPage("landing");
  };

  const enterAsGuest = () => {
    if (guestUsed) {
      setPage("login");
    } else {
      setPage("quiz");
    }
  };

  const markGuestUsed = () => {
    setGuestUsed(true);
    localStorage.setItem("guestUsed", "true");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, guestUsed, markGuestUsed, isAuthenticated: !!token }}>
      {page === "landing" && (
        <LandingPage
          onLogin={() => setPage("login")}
          onSignup={() => setPage("signup")}
          onGuest={enterAsGuest}
        />
      )}
      {page === "login" && (
        <LoginPage
          onSignup={() => setPage("signup")}
          onBack={() => setPage("landing")}
          guestExpired={guestUsed}
        />
      )}
      {page === "signup" && (
        <SignupPage
          onLogin={() => setPage("login")}
          onBack={() => setPage("landing")}
        />
      )}
      {page === "quiz" && (
        <QuizPage
          onLoginRequired={() => setPage("login")}
        />
      )}
    </AuthContext.Provider>
  );
}