import { firebase_app } from "@/lib/firebase/config";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const auth = getAuth(firebase_app);

const AuthContext = createContext<{ user: User | null; loading: boolean }>({
  user: null,
  loading: false,
});
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {loading ? <div>loading...</div> : children}
    </AuthContext.Provider>
  );
};
