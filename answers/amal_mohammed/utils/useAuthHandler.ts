import { useRouter } from 'next/router';
import { AuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebase-config';

export const useAuthHandler = () => {
  const router = useRouter();

  const handleAuth = (provider: AuthProvider) => {
    signInWithPopup(auth, provider)
      .then(() => {
        router.push('/dashboard');
      })
      .catch((error) => {
        console.error('Authentication error:', error);
      });
  };

  return handleAuth;
};
