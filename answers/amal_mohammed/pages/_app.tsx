// pages/_app.tsx
import '../styles/globals.css'
import type { AppProps } from 'next/app'; // Importing the type for AppProps from Next.js
import { AuthProvider } from '../utils/authContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
