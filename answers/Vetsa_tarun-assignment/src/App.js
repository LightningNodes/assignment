import React, { useState } from "react";
import "./App.css";
import Home from "./Home";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);

  // Firebase authentication listener
  auth.onAuthStateChanged((user) => {
    setUser(user);
  });

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div className="App">
      <div className="container">
        {user ? (
          <div className="user-container">
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
            <Home handleLogout={handleLogout} />
          </div>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
}

// LoginForm component
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError(""); // Reset error message
    if (isNewUser) {
      // Firebase authentication logic for signing up with email and password
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorMessage = error.message;
          setError(errorMessage); // Set error message
          console.error(errorMessage);
        });
    } else {
      // Firebase authentication logic for signing in with email and password
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorMessage = error.message;
          setError(errorMessage); // Set error message
          console.error(errorMessage);
        });
    }
  };

  return (
    <div className="login-form">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>{isNewUser ? "Sign Up" : "Login"}</button>
      <button onClick={() => setIsNewUser(!isNewUser)}>
        {isNewUser ? "Already have an account? Login" : "Create an account"}
      </button>
      {error && <div className="error-popup">{error}</div>} {/* Popup for displaying errors */}
    </div>
  );
}

export default App;
