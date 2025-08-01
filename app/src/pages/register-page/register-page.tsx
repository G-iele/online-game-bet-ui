import { useState } from "react";
import { useAuthContext } from "../../hooks/use-auth-context";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

export const RegisterPage = () => {
  const { register, token } = useAuthContext();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState<string | null>(null);

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

  if (token) {
    return <Navigate to="/goodluck" replace />;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>

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
      <div style={{ padding: 40, textAlign: "center" }}>
        <a href="/login">Go to Login</a>
      </div>
    </>
  );
};
