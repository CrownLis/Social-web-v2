import { useState } from "react";

import styles from "./Posts.module.css";





const Posts = (props) => {

  const [post, setPost] = useState((props.post))
  console.log(post)
  const [title, setTitle] = useState('')
  const addNewPost = (e) => {
    e.preventDefault()
    const newPost = {
      name: 'name',
      body: title,
      id: post.length + 1
    }
    setPost([...post, newPost])
    setTitle('')
  }

  return (
    <div className={styles.posts}>
      <h2>Посты</h2>
      {post.body}
      <div className={styles.newPost}>
        Добавить пост
        {(post).map(post => <div className={styles.post} key={post.id}>Name: {post.body}</div>)}
        <textarea
          placeholder="Введите комментарий"
          maxLength={600} type='text'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <button onClick={addNewPost}>Добавить</button>
      </div>
    </div>
  );
};
export default Posts;
