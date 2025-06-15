import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../components/hooks/useAuth";
import { ReactNode } from "react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import useUserRole from "@/components/hooks/useUserRole";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const {isLoading} = useUserRole()

  const location = useLocation();

  if ( loading || user === undefined) return <LoadingSpinner></LoadingSpinner>;
  // console.log(user.email)

  if (!user?.email) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
