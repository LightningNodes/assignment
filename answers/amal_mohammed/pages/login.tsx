// pages/login.tsx
import React from 'react';
import styles from '../styles/Login.module.css';
import { googleProvider, githubProvider, facebookProvider, microsoftProvider } from '../utils/firebase-config';
import { useRouter } from 'next/router';
import AuthProviderButtons from '../components/login_signup/AuthProviderButtons';
import { useAuthHandler } from '../utils/useAuthHandler';
import FormDivider from '../components/login_signup/FormDivider';
import InputField from '../components/login_signup/InputField';

function Login() {
  const router = useRouter();
  const handleAuth = useAuthHandler();

  return (
    <div className={styles.login}>
      <img src="/login-bg-copy.jpg" alt="image" className={styles.login__bg} />
      <form className={styles.login__form}>
        <h1 className={styles.login__title}>Login</h1>
        <div className={styles.login__inputs}>
          <InputField type="email" placeholder="Email ID" iconClass="ri-mail-fill" />
          <InputField type="password" placeholder="Password" iconClass="ri-lock-2-fill" />
        </div>
        <div className={styles.login__check}>
          <div className={styles.login__check_box}>
            <input type="checkbox" className={styles.login__check_input} id="user-check" />
            <label htmlFor="user-check" className={styles.login__check_label}>Remember me</label>
          </div>
          <a href="#" className={styles.login__forgot}>Forgot Password?</a>
        </div>
        <button type="submit" className={styles.login__button}>Login</button>
        <div className={styles.login__register}>
        Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); router.push('/signup'); }}>Register</a>
        </div>
        <FormDivider />
        <AuthProviderButtons 
          handleAuth={handleAuth}
          providers={{
            google: googleProvider,
            github: githubProvider,
            facebook: facebookProvider,
            microsoft: microsoftProvider
          }}
        />
      </form>
    </div>
  );
}

export default Login;