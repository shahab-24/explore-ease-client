
import { createContext, useEffect, useState, ReactNode } from "react";
// import { app } from "../firebase/firebase.config";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User as FirebaseUser,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import axios from "axios";
import { AuthContextType } from "@/Types/auth";
import { app } from "@/firebase/firebase.config";

export const AuthContext = createContext<AuthContextType | null>(null);
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string>("");

  const createUser = (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async (): Promise<FirebaseUser | undefined> => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error: any) {
      setErr(error.message);
      console.error("Google Sign-In Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser?.email) {
          setUser(currentUser);

          await axios.post(
            `${import.meta.env.VITE_API_URL}/jwt`,
            { email: currentUser.email },
            { withCredentials: true }
          );
        } else {
          setUser(null);
          await axios.get(`${import.meta.env.VITE_API_URL}/jwt/logout`, {
            withCredentials: true,
          });
        }
      } catch (error) {
        console.error("JWT logout failed", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unSubscribe();
  }, []);

  const logOut = async () => {
    await signOut(auth);
  };

  const authInfo: AuthContextType = {
    user,
    setUser,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    loading,
    setLoading,
    err,
    setErr,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
