// pages/login.tsx
import React from 'react';
import styles from '../styles/Login.module.css';
import { auth, googleProvider, githubProvider, facebookProvider, microsoftProvider } from '../utils/firebase-config';
import { linkWithCredential, AuthProvider, fetchSignInMethodsForEmail, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/router';

function Login() {
  // const auth = getAuth();
  const router = useRouter();

  // Helper function to get provider based on the sign-in method
  const getProviderForMethod = (method: string): AuthProvider => {
    switch (method) {
      case 'google.com':
        return googleProvider;
      case 'github.com':
        return githubProvider;
      case 'facebook.com':
        return facebookProvider;
      case 'microsoft.com':
        return microsoftProvider;
      default:
        throw new Error(`No provider implemented for ${method}`);
    }
  };


  const handleAuthError = async (error: Error, provider: AuthProvider) => {
    // Use type assertion to treat error as having a 'code' property
    const firebaseError = error as any;

    if (firebaseError.code === 'auth/account-exists-with-different-credential') {
        // Fetch the sign-in methods for this email
        const methods = await fetchSignInMethodsForEmail(auth, firebaseError.email);
        if (methods.length > 0) {
            const firstMethod = methods[0];
            const originalProvider = getProviderForMethod(firstMethod);

            try {
                // Sign in with the original provider first
                const result = await signInWithPopup(auth, originalProvider);
                // Assuming it's Google or another OAuth provider, obtain the credential
                const credential = GoogleAuthProvider.credentialFromResult(result);

                // Check if the current user is correctly fetched
                if (auth.currentUser && credential) {
                  await linkWithCredential(auth.currentUser, credential);
                    router.push('/dashboard');
                }
            } catch (linkError) {
                console.error('Error linking accounts:', linkError);
            }
        }
    } else {
        console.error('Authentication error:', error);
    }
  };

  const handleAuth = (provider: AuthProvider) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        router.push('/dashboard');
      })
      .catch((error) => {
        console.error('Authentication error:', error);
        handleAuthError(error, provider);
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
        <div className={styles.login__register}>
          Don't have an account? <a href="#">Register</a>
        </div>
        <div className={styles.iconContainer}>
          <img src="/google.svg" alt="Google login" className={styles.authIcon} onClick={() => handleAuth(googleProvider)} />
          <img src="/github.svg" alt="GitHub login" className={styles.authIcon} onClick={() => handleAuth(githubProvider)} />
          <img src="/facebook.svg" alt="Facebook login" className={styles.authIcon} onClick={() => handleAuth(facebookProvider)} />
          <img src="/microsoft.svg" alt="Microsoft login" className={styles.authIcon} onClick={() => handleAuth(microsoftProvider)} />
        </div>

      </form>
    </div>
  );
}

export default Login;