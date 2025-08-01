import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/use-auth-context";

export const PrivateRoutes = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuthContext();
  return token ? <>{children}</> : <Navigate to="/login" />;
};
