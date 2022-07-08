import { FC } from "react";
import { NavLink } from "react-router-dom";
import Pineapple from "../../assets/images/pineapple.png";
import MyButton from "../../UI/MyButton/MyButton";

import styles from "./MyHeader.module.css";

const MyHeader:FC = () => {
  return (
    <div className={styles.header}>
      <NavLink to='/main' className={styles.logo}><img src={Pineapple} alt="pineapple" className={styles.logotype}></img>
      <h1>Ananasoviy Sok</h1>
      </NavLink>
      <NavLink to='signIn' className={styles.btn}><MyButton/></NavLink>
    </div>
  );
};

export default MyHeader;
