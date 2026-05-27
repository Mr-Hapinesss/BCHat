import { useState, useEffect } from "react";
import LoginPage from "./pages/LogIn";
import SignupPage from "./pages/SignUp";
import QuizPage from "./pages/QuizPage";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage.jsx";
import { AuthContext } from "./context/authContext";

export default function App() {
  const [page, setPage] = useState("landing");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [guestUsed, setGuestUsed] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const storedGuestUsed = localStorage.getItem("guestUsed");

    if (storedUser && storedUser !== "undefined") {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        // only set token if it's a valid non-"undefined" value
        if (storedToken && storedToken !== "undefined") setToken(storedToken);
        setPage("quiz");
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }

    if (storedGuestUsed === "true") setGuestUsed(true);
  }, []);

  const login = (userData, tokenData) => {

  const normalized = {
    _id:   userData?._id   || userData?.user?._id   || null,
    name:  userData?.name  || userData?.user?.name  || "",
    email: userData?.email || userData?.user?.email || "",
  };
  setUser(normalized);
  setToken(tokenData);
  localStorage.setItem("token", tokenData);
  localStorage.setItem("user", JSON.stringify(normalized));
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
    if (guestUsed) setPage("login");
    else setPage("quiz");
  };

  const markGuestUsed = () => {
    setGuestUsed(true);
    localStorage.setItem("guestUsed", "true");
  };

  const isAuthenticated = Boolean(user || token);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        guestUsed,
        markGuestUsed,
        isAuthenticated,
        navigate: setPage,
      }}
    >
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
          onProfile={() => setPage("profile")}
        />
      )}
      {page === "profile" && (
        <ProfilePage onBack={() => setPage("quiz")} />
      )}
    </AuthContext.Provider>
  );
}