import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import useAuth from "../components/hooks/useAuth";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import useUserRole from "@/components/hooks/useUserRole";

type Props = {
  children: ReactNode;
  allowedRoles: string[]; 
};


const RoleBasedRoute = ({ children, allowedRoles }: Props) => {
  const { user, loading } = useAuth();
  const {role, isLoading} = useUserRole()
  const location = useLocation();
//   console.log(role)

  if (loading || !role) return <LoadingSpinner></LoadingSpinner>

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RoleBasedRoute;
