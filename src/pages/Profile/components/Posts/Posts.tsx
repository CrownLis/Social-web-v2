/* eslint-disable eqeqeq */
import { FC, useState } from 'react';

import { IPost } from '../../../../type/types';
import Post from './Post/Post';

import styles from './Posts.module.css';

interface PostsProps {
  posts: IPost[];
}

const Posts: FC<PostsProps> = ({ posts: externalPosts }) => {
  const [posts, setPosts] = useState(externalPosts);
  const [title, setTitle] = useState('');

  const removePost = (id: number) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  const addNewPost = (e: any) => {
    e.preventDefault();
    const newPost = {
      id: posts.length + 1,
      name: 'name',
      body: title,
    };
    setPosts([...posts, newPost]);
    setTitle('');
  };

  return (
    <div className={styles.posts}>
      <h2>Посты</h2>

      <div className={styles.newPost}>
        {posts.length == 0 ? (
          <h4>Посты отсутсвуют</h4>
        ) : (
          posts.map(p => (
            <Post
              id={p.id}
              body={p.body}
              title={p.title}
              userId={p.userId}
              onClick={removePost}
            />
          ))
        )}
        <span>Добавить пост</span>
        <textarea
          placeholder="Введите комментарий"
          maxLength={600}
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <button className={styles.add} onClick={addNewPost}>
          Добавить
        </button>
      </div>
    </div>
  );
};
export default Posts;
