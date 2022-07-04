import { useState } from "react";
import Post from "./Post/Post";

import styles from "./Posts.module.css";





const Posts = (props) => {

  const removePost = (posts) => {
    setPost(post.filter(p => p.id !== posts.id))
    console.log(posts)
  }

  const [post, setPost] = useState((props.post))
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
      {post == 0 ? <h4>Посты отсутсвуют</h4> : post.map(p => <Post post={p} remove={removePost} />)}
        <span>Добавить пост</span>
        <textarea
          placeholder="Введите комментарий"
          maxLength={600} type='text'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <button className={styles.add} onClick={addNewPost}>Добавить</button>
      </div>
    </div>
  );
};
export default Posts;
