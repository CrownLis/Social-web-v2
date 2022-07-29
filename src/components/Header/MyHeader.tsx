import { FC, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import Pineapple from '../../assets/images/pineapple.png';
import { SET_USER } from '../../store/ducks/activeUser/actions';
import { getActiveUser } from '../../store/ducks/activeUser/selectors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import MyButton from '../../UI/MyButton/MyButton';

import styles from './MyHeader.module.css';

interface MyHeaderProps {}

const MyHeader: FC<MyHeaderProps> = () => { 
  const navigator = useNavigate()
const dispatch = useAppDispatch()
const activeUser = useAppSelector(getActiveUser)

  const logOut = () => {
    localStorage.removeItem('access_token')
    navigator('/SignIn')
    dispatch({type:SET_USER,payload:null})
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
