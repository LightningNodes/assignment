// utils/requireAuth.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './authContext';

const useRequireAuth = (redirectUrl = '/login') => {
  console.log("userAuth")
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push(redirectUrl);
    }
  }, [user, loading, router, redirectUrl]);

  return user;
};

export default useRequireAuth;
