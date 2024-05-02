// pages/index.tsx
import Link from 'next/link';
import LogoutButton from '../components/dashboard/LogoutButton';
import useRequireAuth from '../utils/requireAuth';

const Home = () => {
  const user = useRequireAuth();

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Home Page</h1>
      <Link href="/dashboard">
        <a className="text-blue-500 hover:underline">Go to Dashboard</a>
      </Link>
      <LogoutButton />
    </div>
  );
};

export default Home;
