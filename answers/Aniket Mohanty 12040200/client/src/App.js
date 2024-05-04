import React, { useState, useEffect } from 'react';
import { auth } from './firebase-config';
import NavBar from './navbar';
import Popup from './popup';
import HomePage from './homepage';
import './App.css';

function App() {
  const [showPopup, setShowPopup] = useState(null);
  const [user, setUser] = useState(null);  // State to store the user's information

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        // Assuming the user object has the information you need
        setUser({ name: currentUser.displayName, email: currentUser.email });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();  // Cleanup subscription
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setShowPopup(null);  // Close any open popups
      console.log("Logged out successfully!");
    } catch (error) {
      console.error("Logout Failed", error);
    }
  };

  const handleLogin = () => {
    setShowPopup('login');
  };

  const handleRegister = () => {
    setShowPopup('register');
  };

  const backgroundStyle = {
    backgroundImage: "url('/bg.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    width: '100%'
  };

  return (
    <div className="App" style={backgroundStyle}>
      <NavBar user={user} onShowLogin={handleLogin} onShowRegister={handleRegister} onLogout={handleLogout} />
      {showPopup ? (
        <Popup show={showPopup} setShow={setShowPopup} />
      ) : (
        <HomePage />
      )}
    </div>
  );
}

export default App;
