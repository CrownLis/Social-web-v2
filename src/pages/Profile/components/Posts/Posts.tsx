/* eslint-disable eqeqeq */
import { FC, useState } from "react";

import { IPosts } from "../../../../type/types";
import Post from "./Post/Post";

import styles from "./Posts.module.css";


interface IPostProps {
  posts:IPosts[];
}

const Posts:FC<IPostProps> = (posts) => {
  const [post, setPost] = useState(posts.posts)
  const [title, setTitle] = useState('')
console.log(post)


  const removePost = (id:number) => {
    setPost(post.filter((p => p.id !== id)))
  }


  const addNewPost = (e:any) => {
    e.preventDefault()
    const newPost = {
      name: 'name',
      body: title,
      id: post.length + 1,
      onClick: () => console.log('jopa') // это надо подправить...
    }
    setPost([...post, newPost])
    setTitle('')
  }

  return (
    <div className={styles.posts}>
      <h2>Посты</h2>
      
      <div className={styles.newPost}>
      {post.length == 0 ? <h4>Посты отсутсвуют</h4> : post.map(p => <Post body={p.body} id={p.id} title={p.title} userId={p.userId} onClick={removePost}/>)}
        <span>Добавить пост</span>
        <textarea
          placeholder="Введите комментарий"
          maxLength={600}
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <button className={styles.add} onClick={addNewPost}>Добавить</button>
      </div>
    </div>
  );
};
export default Posts;
