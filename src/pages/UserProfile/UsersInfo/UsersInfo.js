import style from './UsersInfo.module.css'

const UsersInfo = (props) => {

  
    return (
      <div className={style.info}>
        <h2>About me</h2>
        <span>Phone: {props.phone}</span> <br></br>
        <span>Email: {props.email}</span>
        <br></br>
        <span>Nickname: {props.username}</span>
        <br></br>
        <span>City:{props.city}</span>
      </div>
    );
  };

  export default UsersInfo