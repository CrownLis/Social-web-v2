import style from './User.module.css'

const User = (props) => {
    return (
    <div className={style.user}>
     <span>Имя: {props.name}</span>
    </div>
    )
}

export default User