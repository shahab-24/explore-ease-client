import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";


// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
        try {
                if(currentUser?.email){
                        setUser(currentUser)
                        await axios.post(`${import.meta.env.VITE_API_URL}/users/${currentUser.email}`, {
                                name: currentUser?.displayName,
                                email:currentUser?.email,
                                image: currentUser?.photoURL
                        });

                        await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {
                                email: currentUser?.email},
                                {
                                withCredentials: true
                        })
                }
                
        } catch (error) {
                
        }
      console.log("hello from state", currentUser.email);

    });
    return () => unSubscribe();
  }, []);

  const logOut = async () => {
    await signOut(auth);
  };

  const authInfo = {
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
    <AuthContext.Provider value={authInfo}>
    {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
