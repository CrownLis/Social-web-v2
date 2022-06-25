import Pineapple from "../../assets/images/pineapple.png";

import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <img src={Pineapple} alt="pineapple"></img>
      <h1>Ananasoviy Sok</h1>
    </div>
  );
};

export default Header;
