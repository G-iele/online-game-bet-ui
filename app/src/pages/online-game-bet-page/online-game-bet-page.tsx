import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/use-auth-context";

export const OnlineGameBetScreen = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h1>Good luck!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
