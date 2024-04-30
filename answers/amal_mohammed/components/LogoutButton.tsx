// components/LogoutButton.tsx
import { useRouter } from 'next/router';
import { getAuth, signOut } from 'firebase/auth';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      router.push('/login');  // Redirect to login after logout
    }).catch((error) => {
      console.error('Logout Error:', error);
    });
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
      Logout
    </button>
  );
};

export default LogoutButton;
