import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { CircularProgress } from "@mui/material";
import logoImage from "./bg.png";
import LoggedInUsers from "../LoggedInUsers/LoggedInUsers";
import { useAuth } from "../Context/AuthContext";

function Home() {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    // Simulate loading state for demonstration
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulated loading delay
  }, []);

  if (!currentUser) {
    return (
      <div className={styles.container}>
        <div className={styles.navbar}>
          <div className={styles.logo}>
            <img
              src={logoImage}
              style={{ width: "90px", height: "50px" }}
              alt="Logo"
            />
          </div>
          <div className={styles.navLinks}>
            <Link to="/login" className={`${styles.link} ${styles.neonEffect}`}>
              Login
            </Link>
            <Link
              to="/signup"
              className={`${styles.link} ${styles.neonEffect}`}
            >
              Signup
            </Link>
          </div>
        </div>
        <h1 className={styles.heading}>
          Trade Crypto Perpetual Futures in INR
        </h1>
        <p className={styles.subheading}>
          India's First Native Crypto Derivatives Platform with Lightning-Fast
          Settlement in Rupees
        </p>
        <p className={`${styles.message} ${styles.neonEffect}`}>
          Please login to view real-time updates.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <img
            src={logoImage}
            style={{ width: "90px", height: "50px" }}
            alt="Logo"
          />
        </div>
        <div className={styles.navLinks}>
          <Link to="/logout" className={`${styles.link} ${styles.neonEffect}`}>
            Logout
          </Link>
        </div>
      </div>
      <h1 className={styles.heading}>Trade Crypto Perpetual Futures in INR</h1>
      {isLoading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <CircularProgress />
          <p>Loading data...</p>
        </div>
      ) : (
        <LoggedInUsers />
      )}
    </div>
  );
}

export default Home;
