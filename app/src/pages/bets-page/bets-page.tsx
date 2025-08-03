import { BetsSection } from "../../components/bets-section/bets-section";

import classes from "./bets-page.module.scss";

export const BetsPage: React.FC = () => (
  <div className={classes.container}>
    <h1>Your Bets</h1>
    <BetsSection />
  </div>
);
