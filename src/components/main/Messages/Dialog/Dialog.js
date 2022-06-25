import DialogCss from './Dialog.module.css'
import {NavLink} from 'react-router-dom'

let Dialog = (props) => {
    return (
        <div className={DialogCss.dialog}>
                <NavLink to={'/Messages/' + props.id} className={navData => navData.isActive ? DialogCss.active : DialogCss.default}> {props.name}</NavLink>
                </div>
    )
}

export default Dialog