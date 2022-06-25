import { NavLink } from "react-router-dom";

import styles from "./Sidebar.module.css";

const Sidebar = (props) => {
  return (
    <div className={styles.sidebarLeft}>
      <nav>
        <NavLink
          to="/profile"
          className={(navData) =>
            navData.isActive ? styles.active : styles.default
          }
        >
          Мой профиль
        </NavLink>
        <NavLink
          to="/users"
          className={(navData) =>
            navData.isActive ? styles.active : styles.default
          }
        >
          Пользователи
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
