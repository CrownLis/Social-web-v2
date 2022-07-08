import { NavLink } from "react-router-dom";

import styles from "./Sidebar.module.css";

const Sidebar = () => {
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
        <NavLink
          to="/message"
          className={(navData) =>
            navData.isActive ? styles.active : styles.default
          }
        >
          Сообщения
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
