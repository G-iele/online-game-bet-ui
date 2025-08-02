import { useEffect, useState } from "react";
import { User } from "../types/user";
import { setAuthToken } from "../services/base-http-client";
import { HttpService } from "../services/http-service";
import { LoginPayload, RegisterPayload } from "../types/auth";
import { AuthContext } from "../context/auth-context";

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const initialUser = localStorage.getItem("user");
  const [user, setUser] = useState<User | null>(initialUser ? JSON.parse(initialUser) : null);

  if (user?.accessToken) {
    setAuthToken(user?.accessToken);
  }

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const login = async (data: LoginPayload) => {
    const res = await HttpService.login(data);
    const token = res.data.accessToken;
    const user: User = res.data;
    setUser(user);
    setAuthToken(token);
  };

  const register = async (data: RegisterPayload) => {
    await HttpService.register(data);
  };

  const logout = () => {
    localStorage.removeItem("user");

    setUser(null);
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
