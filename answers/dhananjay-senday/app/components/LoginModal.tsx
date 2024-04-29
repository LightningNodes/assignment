import LoginBtn from "./client/LoginBtn";

export default function LoginModal() {
  return (
    <div className="h-screen bg-black/90 grid place-content-center">
      <div className="flex flex-col  items-center">
        <div className="text-white mb-8">
          Hello , You cannot access this page without logging in first.
        </div>
        <LoginBtn />
      </div>
    </div>
  );
}
