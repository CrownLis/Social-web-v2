import React, { FC, useContext, useEffect, useState } from 'react';

import Posts from './components/Posts/Posts';
import Info from './components/Info/Info';
import ActiveUserContext from '../../context/ActiveUserContext';

import styles from './Profile.module.css';
import Loader from '../Loader/Loader';
import { IPost } from '../../type/types';
import { getPosts } from '../../API/socialWeb';

const Profile: FC = () => {

  const {activeUser} = useContext(ActiveUserContext);

  const fetchUser = async () => {
    const postList = await getPosts(activeUser?.id);  //any исправить
    setPosts(postList.data)
    console.log(posts)
    setIsLoading(false)
  }
  useEffect(() => {
     fetchUser();
   }, []);

  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.content}>
          <div className={styles.avatar}>
            <img src={activeUser?.avatar} alt="my avatar"></img>
          </div>
          <div className={styles.name}>{`${activeUser?.firstName} ${activeUser?.lastName}`}</div>
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
