// useAuthHandler.ts
import { useRouter } from 'next/router';
import { AuthProvider, signInWithPopup, Auth } from 'firebase/auth';
import { auth } from './firebase-config'; // Make sure this path is correct and the export is typed

export const useAuthHandler = () => {
  const router = useRouter();

  const handleAuth = (provider: AuthProvider) => {
    signInWithPopup(auth as Auth, provider)
      .then(() => {
        router.push('/dashboard');
      })
      .catch((error) => {
        console.error('Authentication error:', error);
      });
  };

  return handleAuth;
};
