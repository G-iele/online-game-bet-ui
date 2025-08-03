import { WalletSection } from "../../components/wallet-section/wallet-section";

import classes from "./wallet-page.module.scss";

export const WalletPage: React.FC = () => (
  <div className={classes.container}>
    <h1>Your Transactions</h1>
    <WalletSection />
  </div>
);
