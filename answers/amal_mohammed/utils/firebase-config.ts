// utils/firebase-config.ts
import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';
import { 
    getAuth, 
    Auth,
    GoogleAuthProvider, 
    GithubAuthProvider, 
    FacebookAuthProvider, 
    OAuthProvider
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

let app: FirebaseApp;
let auth: Auth;

if (process.env.NODE_ENV !== 'test') {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
} else {
    // Properly typed mock
    import('./auth-mock').then(({ authMock }) => {
        auth = authMock;
    });
}

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const microsoftProvider = new OAuthProvider('microsoft.com');

export { auth, googleProvider, githubProvider, facebookProvider, microsoftProvider };
