import { FC } from 'react'
import style from './User.module.css'

interface UserListName {
    name:string
}

const User:FC<UserListName> = (name) => {
    return (
    <div className={style.user}>
     <span>Имя: {name.name}</span>
    </div>
    )
}

export default User