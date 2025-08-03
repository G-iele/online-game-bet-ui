import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/use-auth-context";
import axios from "axios";
import { useBetsContext } from "../../hooks/use-bets-context";
import { useWalletContext } from "../../hooks/use-wallet-context";

import classes from "./login-page.module.scss";

export const LoginPage = () => {
  const { login, user } = useAuthContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);

  const { getBets } = useBetsContext();
  const { getTransactions } = useWalletContext();

  const accessToken = user?.accessToken;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login({ email, password });
      navigate("/goodluck");
      getBets();
      getTransactions();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setError(e.response?.data?.message);
      } else if (e instanceof Error) {
        setError("Error message: Server error");
      }
    }
  };

  if (accessToken) {
    return <Navigate to="/goodluck" replace />;
  }

  return (
    <div className={classes.container}>
      <h1>Login</h1>

      <form onSubmit={handleSubmit} className={classes.form}>
        {error && <p>{error}</p>}

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>

      <a href="/register">Go to Register</a>
    </div>
  );
};
