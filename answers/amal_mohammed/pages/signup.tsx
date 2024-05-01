// pages/signup.tsx
import React from 'react';
import styles from '../styles/Login.module.css'; // Reusing the same styles as login
import { auth, googleProvider, githubProvider, facebookProvider, microsoftProvider } from '../utils/firebase-config';
import { AuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/router';

function Signup() {
  const router = useRouter();

  const handleAuth = (provider: AuthProvider) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        router.push('/dashboard');
      })
      .catch((error) => {
        console.error('Authentication error:', error);
      });
  };

  return (
    <div className={styles.login}>
      <img src="/login-bg-copy.jpg" alt="image" className={styles.login__bg} />
      <form className={styles.login__form}>
        <h1 className={styles.login__title}>Signup</h1>
        <div className={styles.login__inputs}>
          <div className={styles.login__box}>
            <input type="email" placeholder="Email ID" required className={styles.login__input} />
            <i className="ri-mail-fill"></i>
          </div>
          <div className={styles.login__box}>
            <input type="password" placeholder="Create Password" required className={styles.login__input} />
            <i className="ri-lock-2-fill"></i>
          </div>
          <div className={styles.login__box}>
            <input type="password" placeholder="Confirm Password" required className={styles.login__input} />
            <i className="ri-lock-2-fill"></i>
          </div>
        </div>

        <button type="submit" className={styles.login__button}>Signup</button>

        <div className={styles.login__register}>
        Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); router.push('/login'); }}>Login</a>
        </div>

        <div className={styles.login__divider}>
          <span className={styles.login__divider_bar}></span> {/* Left bar */}
          <span className={styles.login__divider_text}>Or</span> {/* Text */}
          <span className={styles.login__divider_bar}></span> {/* Right bar */}
        </div>

        <div className={styles.iconContainer}>
          <img src="/google.svg" alt="Google signup" className={styles.authIcon} onClick={() => handleAuth(googleProvider)} />
          <img src="/github.svg" alt="GitHub signup" className={styles.authIcon} onClick={() => handleAuth(githubProvider)} />
          <img src="/facebook.svg" alt="Facebook signup" className={styles.authIcon} onClick={() => handleAuth(facebookProvider)} />
          <img src="/microsoft.svg" alt="Microsoft signup" className={styles.authIcon} onClick={() => handleAuth(microsoftProvider)} />
        </div>

      </form>
    </div>
  );
}

export default Signup;
