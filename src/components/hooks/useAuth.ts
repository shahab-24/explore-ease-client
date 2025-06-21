import { useContext } from "react";

import { AuthContext } from "@/Providers/AuthProvider";
import { AuthContextType } from "@/Types/auth";




const useAuth = () : AuthContextType => {
        const auth = useContext(AuthContext); 
        if (!auth) {
          throw new Error("useAuth must be used within an AuthProvider"); 
        }
        return auth; 
      };


export default useAuth;