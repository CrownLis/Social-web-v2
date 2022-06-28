import styles from "./Info.module.css";

const Info = (props) => {
  return (
    <div className={styles.info}>
      <h2>About me</h2>
      <span>Phone: {props.phone}</span> <br></br>
      <span>Email: {props.email}</span>
      <br></br>
      <span>Nickname: {props.username}</span>
      <br></br>
      <span>City: {props.city} </span>
    </div>
  );
};

export default Info;
