import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/use-auth-context";

export const PrivateRoutes = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthContext();

  const accessToken = user?.accessToken;
  return accessToken ? <>{children}</> : <Navigate to="/login" />;
};
