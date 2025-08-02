import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../hooks/use-auth-context";
import { useCurrencyFormatting } from "../../hooks/use-currency-formatting";

export const Header: React.FC = () => {
  const { user, logout } = useAuthContext();
  const { formatCurrency } = useCurrencyFormatting();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <nav style={{ display: "flex", gap: 16 }}>
        <Link to="/goodluck">Bet</Link>
        <Link to="/bets">My Bets</Link>
        <Link to="/wallet">Transactions</Link>
      </nav>
      <div>
        <span>Balance: {formatCurrency(user?.balance ?? 0)}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};
