import { createRoot } from "react-dom/client";
import { App } from "./app";
import { AuthProvider } from "./providers/auth-provider";
import { BetsProvider } from "./providers/bets-provider";
import { WalletProvider } from "./providers/wallet-provider";

const container = document.getElementById("root");

if (!container) {
  throw new Error("No container to render to.");
}

const root = createRoot(container);
root.render(
  <AuthProvider>
    <BetsProvider>
      <WalletProvider>
        <App />
      </WalletProvider>
    </BetsProvider>
  </AuthProvider>,
);
