import { NavLink } from 'react-router-dom'
import SidebarCss from './Sidebar.module.css'

let Sidebar = (props) => {
    return (
<div className={SidebarCss.sidebarLeft}>
    <nav>
        <NavLink to="/Profile" className={navData => navData.isActive ? SidebarCss.active : SidebarCss.default}>Мой профиль</NavLink>
        <NavLink to="/Messages" className={navData => navData.isActive ? SidebarCss.active : SidebarCss.default}>Мои сообщения</NavLink>
        <NavLink to="/News" className={navData => navData.isActive ? SidebarCss.active : SidebarCss.default}>Новостная лента</NavLink>
        <NavLink to="/Games" className={navData => navData.isActive ? SidebarCss.active : SidebarCss.default}>Игры</NavLink>
        <NavLink to="/Groups" className={navData => navData.isActive ? SidebarCss.active : SidebarCss.default}>Мои группы</NavLink>
        <NavLink to="/Options" className={navData => navData.isActive ? SidebarCss.active : SidebarCss.default}>Настройки</NavLink>
    </nav>
</div>
    )


}
export default Sidebar