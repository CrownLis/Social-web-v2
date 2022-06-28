import Posts from "./components/Posts/Posts";
import Info from "./components/Info/Info";

import styles from "./Profile.module.css";
import React from "react";
import { ACTIVE_USER_ID } from "../../constants/user";


const Profile = (props) => {

  console.log(props.user)

  return (
    <div className={styles.content}>
      <div className={styles.avatar}>
        <img src="" alt="my avatar"></img>
      </div>
      <div className={styles.name}>{props.user.name}</div>
      <Info
        phone={props.user.phone}
        email={props.user.email}
        city={props.user.address.city}
        username={props.user.username}
      />
      <Posts />
    </div>
  );
};

export default Profile;

