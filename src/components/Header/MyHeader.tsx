import { FC, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import Pineapple from '../../assets/images/pineapple.png';
import ActiveUserContext from '../../context/ActiveUserContext';
import MyButton from '../../UI/MyButton/MyButton';

import styles from './MyHeader.module.css';

interface Rerendering {
  rerender: () => void
}

const MyHeader: FC<Rerendering> = (rerender) => { 
  const navigator = useNavigate()

  const logOut = () => {
    localStorage.removeItem('access_token')
    navigator('/SignIn')
    rerender.rerender()
  }


  
  const { activeUser } = useContext(ActiveUserContext)

  return (
    <div className={styles.header}>
      {activeUser ? <NavLink to="/profile" className={styles.logo}>
        <img src={Pineapple} alt="pineapple" className={styles.logotype}></img>
        <h1>Ananasoviy Sok</h1>
      </NavLink> : <NavLink to="/signIn" className={styles.logo}>
        <img src={Pineapple} alt="pineapple" className={styles.logotype}></img>
        <h1>Ananasoviy Sok</h1>
      </NavLink>}
      {activeUser ? <NavLink to="signIn" className={styles.btn}>
        <MyButton OnClick={logOut} htmlType='button'>Log out</MyButton>
      </NavLink> : <NavLink to="signIn" className={styles.btn}>
        <MyButton>Sign In</MyButton>
      </NavLink>}
    </div>
  );
};

export default MyHeader;
