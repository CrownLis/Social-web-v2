import { useEffect, useState } from 'react'

import style from './Post.module.css'

const Post = (props) => {

  
  return (
    <div className={style.post} key={props.id}>
      Name: {props.post.body}
      <button className={style.remove} id={props.post.id} onClick={() => props.remove(props.post)}>Удалить</button>
    </div>)
}

export default Post
