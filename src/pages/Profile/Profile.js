import Posts from "./components/Posts/Posts";
import Info from "./components/Info/Info";

import styles from "./Profile.module.css";

const Profile = (props) => {
  return (
    <div className={styles.content}>
      <div className={styles.avatar}>
        <img src="" alt="my avatar"></img>
      </div>
      <div className={styles.name}>Жмышенко Валерий Альбертович</div>
      <Info
        age="21"
        lovely="Одинокие женщины с детьми"
        locate="Санкт-Петербург"
        quality="Пошлый"
      />
      <Posts />
    </div>
  );
};

export default Profile;
