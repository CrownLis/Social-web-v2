import React, {useContext} from "react";

import Posts from "./components/Posts/Posts";
import Info from "./components/Info/Info";
import ActiveUserContext from "../../context/ActiveUserContext";

import styles from "./Profile.module.css";

const Profile = () => {

const {ActiveUserContextValue} = useContext(ActiveUserContext)

  return (
    <div className={styles.content}>
      <div className={styles.avatar}>
        <img src="" alt="my avatar"></img>
      </div>
      <div className={styles.name}>{ActiveUserContextValue.activeUser.name}</div>
      <Info  />
      <Posts />
    </div>
  );
};

export default Profile;

