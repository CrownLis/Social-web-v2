/* eslint-disable eqeqeq */
import { FC, useEffect, useState } from 'react';

import styles from './UserPosts.module.css';
import { IPost } from '../../../type/types';
import Post from '../../Profile/components/Posts/Post/Post';

interface PostsProps {
  posts: IPost[];
}

const UserPosts: FC<PostsProps> = ({ posts: externalPosts }) => {
  const [posts, setPosts] = useState(externalPosts);

  useEffect(() => {
  }, [])

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
              text={p.text}
              userId={p.userId}
              onClick={() => {}}
            />
          ))
        )}
      </div>
    </div>
  );
};
export default UserPosts;
