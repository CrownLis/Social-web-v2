import { FC } from 'react'
import { IPosts } from '../../../../../type/types'

import style from './Post.module.css'



const Post:FC<IPosts> = ({id,userId,title,body,onClick}) => {

  return (
    <div className={style.post} key={id}>
      Name: {body}
      <button className={style.remove} onClick={() => onClick(id)} >Удалить</button>
    </div>
  )
}

export default Post
