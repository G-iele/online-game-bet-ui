import { useState } from "react";
import { useAuthContext } from "../../hooks/use-auth-context";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const { register } = useAuthContext();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register({ name, email, password, confirmPassword });
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
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
  );
};
