import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/use-auth-context";
import { BetsSection } from "../../components/bets-section/bets-section";

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
      <BetsSection />
      <div>
        <h2>Wallet</h2>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
