import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/use-auth-context";
import { BetsSection } from "../../components/bets-section/bets-section";
import { WalletSection } from "../../components/wallet-section/wallet-section";

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
      <WalletSection />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
