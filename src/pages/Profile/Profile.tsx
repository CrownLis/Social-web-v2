import React, { FC, useContext, useEffect, useState } from 'react';

import Posts from './components/Posts/Posts';
import Info from './components/Info/Info';
import ActiveUserContext from '../../context/ActiveUserContext';

import styles from './Profile.module.css';
import Loader from '../Loader/Loader';
import axios from 'axios';
import { IPost } from '../../type/types';

const Profile: FC = () => {
  const fetchUsers = async () => {
    const response = await axios.get<IPost[]>(
      `https://jsonplaceholder.typicode.com/posts?_limit=5`,
    );
    const posts = response.data;
    setPosts(posts);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { activeUser } = useContext(ActiveUserContext);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.content}>
          <div className={styles.avatar}>
            <img src="" alt="my avatar"></img>
          </div>
          <div className={styles.name}>{activeUser?.name}</div>
          <Info />
          <div className={styles.posts}>
            <Posts posts={posts} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
