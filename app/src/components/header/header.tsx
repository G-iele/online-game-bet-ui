import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../hooks/use-auth-context";
import { useCurrencyFormatting } from "../../hooks/use-currency-formatting";

import Logout from "./logout.svg";

import classes from "./header.module.scss";

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
    <header className={classes.header}>
      <div className={classes.navigation}>
        <nav>
          <Link to="/goodluck">Bet</Link>
          <Link to="/bets">Bets</Link>
          <Link to="/wallet">Transactions</Link>
        </nav>

        <button onClick={handleLogout} className={classes.mobileButton}>
          <Logout />
        </button>

        <button onClick={handleLogout} className={classes.tabletButton}>
          Logout
        </button>
      </div>
      <span>Balance: {formatCurrency(user?.balance ?? 0)}</span>
    </header>
  );
};
