// components/login_signup/AuthProviderButtons.tsx
import React from 'react';
import styles from '../../styles/Login.module.css';
import { AuthProvider } from 'firebase/auth';

interface AuthProviderButtonsProps {
  handleAuth: (provider: AuthProvider) => void;
  providers: { [key: string]: AuthProvider };
}

const AuthProviderButtons: React.FC<AuthProviderButtonsProps> = ({ handleAuth, providers }) => (
  <div className={styles.iconContainer}>
    {Object.entries(providers).map(([key, provider]) => (
      <img
        src={`/${key}.svg`}
        alt={`${key} login`}
        className={styles.authIcon}
        onClick={() => handleAuth(provider)}
        key={key}
        data-testid={`${key}-auth-button`}  // Add data-testid for testing
      />
    ))}
  </div>
);

export default AuthProviderButtons;
