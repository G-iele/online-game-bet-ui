import { useState } from "react";
import { useAuthContext } from "../../hooks/use-auth-context";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

import classes from "./register-page.module.scss";

export const RegisterPage = () => {
  const { register, user } = useAuthContext();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState<string | null>(null);

  const accessToken = user?.accessToken;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ name, email, password, confirmPassword });
      navigate("/login");
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
      <h1>Online Game Bet</h1>

      <form onSubmit={handleSubmit} className={classes.form}>
        {error && <p>{error}</p>}

        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
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
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />
        <button type="submit">Register</button>
      </form>
      <a href="/login">Go to Login</a>
    </div>
  );
};
