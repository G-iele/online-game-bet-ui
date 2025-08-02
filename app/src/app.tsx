import { ReactElement } from "react";
import "./app.scss";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { OnlineGameBetScreen } from "./pages/online-game-bet-page/online-game-bet-page";
import { PrivateRoutes } from "./routes/private-routes";
import { LoginPage } from "./pages/login-page/login-page";
import { RegisterPage } from "./pages/register-page/register-page";
import { Header } from "./components/header/header";
import { BetsPage } from "./pages/bets-page/bets-page";
import { WalletPage } from "./pages/wallet-page/wallet-page";
import { useAuthContext } from "./hooks/use-auth-context";

export function App(): ReactElement {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      {user && <Header />}
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/goodluck"
          element={
            <PrivateRoutes>
              <OnlineGameBetScreen />
            </PrivateRoutes>
          }
        />
        <Route
          path="/bets"
          element={
            <PrivateRoutes>
              <BetsPage />
            </PrivateRoutes>
          }
        />
        <Route
          path="/wallet"
          element={
            <PrivateRoutes>
              <WalletPage />
            </PrivateRoutes>
          }
        />
        <Route
          path="*"
          element={
            <div style={{ padding: 40, textAlign: "center" }}>
              <h1>404</h1>
              <p>You can try again!</p>
              <a href="/register">Go back</a>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
