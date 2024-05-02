// components/dashboard/Header.tsx
import LogoutButton from './LogoutButton';

const Header = () => (
  <div className="flex justify-between items-center bg-gray-800 p-4">
    <div className="flex-1 text-center">
      <h1 className="text-2xl font-bold text-cyan-400">Crypto Rate Dashboard</h1>
    </div>
    <LogoutButton />
  </div>
);

export default Header;
