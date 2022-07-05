import { NavLink } from "react-router-dom";
import Pineapple from "../../assets/images/pineapple.png";

import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
    <div className={styles.logo}>
      <NavLink to='/main'><img src={Pineapple} alt="pineapple" className={styles.logotype}></img></NavLink>
      <h1>Ananasoviy Sok</h1>
      </div>
      <NavLink to='signIn' className={styles.btn}><button className={styles.signIn}>Sign in</button></NavLink>
    </div>
  );
};

export default Header;
