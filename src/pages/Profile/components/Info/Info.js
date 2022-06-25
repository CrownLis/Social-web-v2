import styles from "./Info.module.css";

const Info = (props) => {
  return (
    <div className={styles.info}>
      <h2>Обо мне</h2>
      <span>Возраст: {props.age}</span> <br></br>
      <span>Увлечение: {props.lovely}</span>
      <br></br>
      <span>Качества: {props.quality}</span>
      <br></br>
      <span>Город: {props.locate} </span>
    </div>
  );
};

export default Info;
