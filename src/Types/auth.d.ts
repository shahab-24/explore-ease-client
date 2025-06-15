
export interface AuthContextType {
        user: FirebaseUser | null;
        setUser: React.Dispatch<React.SetStateAction<FirebaseUser | null>>; 
      
        createUser: (email: string, password: string) => Promise<any>;
        signIn: (email: string, password: string) => Promise<any>; 
        signInWithGoogle: () => Promise<FirebaseUser | undefined>; 
        logOut: () => Promise<void>; 
      
        loading: boolean;
        setLoading: React.Dispatch<React.SetStateAction<boolean>>; 
      
        err: string; 
        setErr: React.Dispatch<React.SetStateAction<string>>; 
      }
      