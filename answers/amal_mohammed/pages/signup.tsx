// pages/signup.tsx
import React from 'react';
import styles from '../styles/Login.module.css'; // Reusing the same styles as login
import { googleProvider, githubProvider, facebookProvider, microsoftProvider } from '../utils/firebase-config';
import { useRouter } from 'next/router';
import AuthProviderButtons from '../components/AuthProviderButtons';
import { useAuthHandler } from '../utils/useAuthHandler';
import FormDivider from '../components/FormDivider';
import InputField from '../components/InputField';

function Signup() {
  const router = useRouter();
  const handleAuth = useAuthHandler();

  return (
    <div className={styles.login}>
      <img src="/login-bg-copy.jpg" alt="image" className={styles.login__bg} />
      <form className={styles.login__form}>
        <h1 className={styles.login__title}>Signup</h1>
        <div className={styles.login__inputs}>
          <InputField type="email" placeholder="Email ID" iconClass="ri-mail-fill" />
          <InputField type="password" placeholder="Create Password" iconClass="ri-lock-2-fill" />
          <InputField type="password" placeholder="Confirm Password" iconClass="ri-lock-2-fill" />
        </div>
        <button type="submit" className={styles.login__button}>Signup</button>
        <div className={styles.login__register}>
        Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); router.push('/login'); }}>Login</a>
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

export default Signup;