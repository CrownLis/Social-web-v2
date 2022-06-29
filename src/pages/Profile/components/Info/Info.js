import React,{useContext} from "react";

import ActiveUserContext from "../../../../context/ActiveUserContext";

import styles from "./Info.module.css";

const Info = () => {

  const {ActiveUserContextValue} = useContext(ActiveUserContext)

  return (
    <div className={styles.info}>
      <h2>About me</h2>
      <span>Phone: {ActiveUserContextValue.activeUser.phone}</span> <br></br>
      <span>Email: {ActiveUserContextValue.activeUser.email}</span>
      <br></br>
      <span>Nickname: {ActiveUserContextValue.activeUser.username}</span>
      <br></br>
      <span>City: {ActiveUserContextValue.activeUser.city} </span>
    </div>
  );
};

export default Info;
