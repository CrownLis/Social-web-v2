import { FC, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import Pineapple from '../../assets/images/pineapple.png';
import ActiveUserContext from '../../context/ActiveUserContext';
import MyButton from '../../UI/MyButton/MyButton';

import styles from './MyHeader.module.css';

const MyHeader: FC = () => {

  const logOut = () => {
    console.log('f')
    localStorage.removeItem('access_token')
  }

  const {activeUser} = useContext(ActiveUserContext)

  return (
    <div className={styles.header}>
      {activeUser? <NavLink to="/profile" className={styles.logo}>
        <img src={Pineapple} alt="pineapple" className={styles.logotype}></img>
        <h1>Ananasoviy Sok</h1>
      </NavLink> : <NavLink to="/signIn" className={styles.logo}>
        <img src={Pineapple} alt="pineapple" className={styles.logotype}></img>
        <h1>Ananasoviy Sok</h1>
      </NavLink>}
      { activeUser ? <NavLink to="signIn" className={styles.btn}>
        <MyButton OnClick={logOut} htmlType='button'>Log out</MyButton>
      </NavLink> :  <NavLink to="signIn" className={styles.btn}>
        <MyButton>Sign In</MyButton>
      </NavLink> }
    </div>
  );
};

export default MyHeader;
