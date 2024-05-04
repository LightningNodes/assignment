import './App.css';
import React, { useState} from "react";
import CryptoContractsPage from './Components/CryptoContractsPage';
import {auth, provider} from "./firebase"
import {signInWithPopup } from "firebase/auth";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initial state is logged out
  const [user, setUser] = useState("Kota Ajay Kumar");

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider).then((result) => {
        setUser(result.user);
      });
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };
  const handleUserLogout = () => {
    setUser(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* {isLoggedIn ? (
          <CryptoContractsPage user={user} onUserLogout={handleUserLogout}/>
        ) : (
          <button onClick={handleGoogleSignIn}>Sign in with Google</button>
        )} */}
        <CryptoContractsPage user={user} onUserLogout={handleUserLogout}/>
      </header>
    </div>
  );
}

export default App;
