import { useEffect, useLayoutEffect, useState } from "react";
import { User } from "../types/user";
import { authHeader, httpClient, setAuthToken } from "../services/base-http-client";
import { HttpService } from "../services/http-service";
import { LoginPayload, RegisterPayload } from "../types/auth";
import { AuthContext } from "../context/auth-context";

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  const login = async (data: LoginPayload) => {
    const res = await HttpService.login(data);
    const token = res.data.accessToken;
    const user = res.data.user;
    localStorage.setItem("token", token);
    setToken(token);
    setUser(user);
    setAuthToken(token);
  };

  const register = async (data: RegisterPayload) => {
    const res = await HttpService.register(data);
    console.log(res);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
