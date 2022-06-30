import UsersInfo from './UsersInfo/UsersInfo';
import Posts from '../Profile/components/Posts/Posts';

import style from './UserProfile.module.css'


const UserProfile = (props) => {
    return (
        <div className={style.content}>
      <div className={style.avatar}>
        <img src="" alt={props.name}></img>
      </div>
      <div className={style.name}>{props.name}</div>
      <UsersInfo name={props.name} phone ={props.phone} email= {props.email} city={props.city} />
      <Posts />
    </div>
  );
    }

export default UserProfile