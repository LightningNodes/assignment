// pages/login.tsx
import React from 'react';
import styles from '../styles/Login.module.css';
import { auth, googleProvider, githubProvider, facebookProvider, microsoftProvider } from '../utils/firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { AuthProvider } from 'firebase/auth';
import { useRouter } from 'next/router';


// function Login() {
//   const handleAuth = (provider) => {
//     signInWithPopup(auth, provider).catch((error) => {
//       console.error('Authentication error:', error);
//     });
//   };

function Login() {
  const router = useRouter();

  const handleAuth = (provider: AuthProvider) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // Assuming '/dashboard' is the route where your dashboard is located
        router.push('/dashboard');
      })
      .catch((error) => {
        console.error('Authentication error:', error);
        // Optionally handle errors here (e.g., display an error message)
      });
  };

  return (
    <div className={styles.login}>
      <img src="/login-bg-copy.jpg" alt="image" className={styles.login__bg} />
      <form className={styles.login__form}>
        <h1 className={styles.login__title}>Login</h1>
        <div className={styles.login__inputs}>
          <div className={styles.login__box}>
            <input type="email" placeholder="Email ID" required className={styles.login__input} />
            <i className="ri-mail-fill"></i>
          </div>
          <div className={styles.login__box}>
            <input type="password" placeholder="Password" required className={styles.login__input} />
            <i className="ri-lock-2-fill"></i>
          </div>
        </div>
        <div className={styles.login__check}>
          <div className={styles.login__check_box}>
            <input type="checkbox" className={styles.login__check_input} id="user-check" />
            <label htmlFor="user-check" className={styles.login__check_label}>Remember me</label>
          </div>
          <a href="#" className={styles.login__forgot}>Forgot Password?</a>
        </div>
        <div className={styles.iconContainer}>
          <img src="/google.svg" alt="Google login" className={styles.authIcon} onClick={() => handleAuth(googleProvider)} />
          <img src="/github.svg" alt="GitHub login" className={styles.authIcon} onClick={() => handleAuth(githubProvider)} />
          <img src="/facebook.svg" alt="Facebook login" className={styles.authIcon} onClick={() => handleAuth(facebookProvider)} />
          <img src="/microsoft.svg" alt="Microsoft login" className={styles.authIcon} onClick={() => handleAuth(microsoftProvider)} />
        </div>
        <div className={styles.login__register}>
          Don't have an account? <a href="#">Register</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
