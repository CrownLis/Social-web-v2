import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import Pineapple from '../../assets/images/pineapple.png';
import { setActiveUser } from '../../store/ducks/auth/asyncActions';
import { getAuth } from '../../store/ducks/auth/selectors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import MyButton from '../../UI/MyButton/MyButton';

import styles from './MyHeader.module.css';

interface MyHeaderProps {}

const MyHeader: FC<MyHeaderProps> = () => { 
  const navigator = useNavigate()
const dispatch = useAppDispatch()
const activeUser = useAppSelector(getAuth)

  const logOut = () => {
    localStorage.removeItem('access_token')
    navigator('/SignIn')
    dispatch(setActiveUser(null))
  }

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
        <MyButton onClick={logOut} htmlType='button'>Log out</MyButton>
      </NavLink> : <NavLink to="signIn" className={styles.btn}>
        <MyButton>Sign In</MyButton>
      </NavLink>}
    </div>
  );
};

export default MyHeader;
