import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { User } from "@/Types/UserTypes";

interface AuthContextType {
        user: User | null

}


const useAuth = () : AuthContextType => {
        const auth = useContext(AuthContext)
        return auth
};

export default useAuth;