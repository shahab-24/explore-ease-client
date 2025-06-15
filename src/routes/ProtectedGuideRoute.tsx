
import { Navigate } from "react-router-dom";
import useAuth from "../components/hooks/useAuth";

const ProtectedGuideRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  
  if (user?.role !== "guide") return <Navigate to="/unauthorized" />;

  return <>{children}</>;
};

export default ProtectedGuideRoute;
