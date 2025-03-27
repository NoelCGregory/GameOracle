import {
  useEffect,
  useState,
  useContext,
  createContext,
  type PropsWithChildren,
} from "react";

import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/FirebaseConfig"; // Adjust the path to your Firebase config

const AuthContext = createContext<{
  user: User | null | undefined;
  loading: boolean;
}>({
  user: null,
  loading: true,
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null | undefined>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useAuth must be wrapped in an <AuthContextProvider />");
    }
  }
  return value;
};
