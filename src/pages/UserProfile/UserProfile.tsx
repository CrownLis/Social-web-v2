import { FC, useEffect, useState } from 'react';

import UsersInfo from './UsersInfo/UsersInfo';
import Posts from '../Profile/components/Posts/Posts';
import Loader from '../Loader/Loader';

import style from './UserProfile.module.css';
import axios from 'axios';
import { IPost, IUser } from '../../type/types';

interface UserProfileProps extends IUser {}

const UserProfile: FC<UserProfileProps> = ({ name, phone, email, address, id }) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    const response = await axios.get<IPost[]>(
      `https://jsonplaceholder.typicode.com/posts?_start=${id}&_limit=5`,
    );
    const posts = response.data;
    setPosts(posts);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={style.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={style.content}>
          <div className={style.avatar}>
            <img src="" alt={name}></img>
          </div>
          <div className={style.name}>{name}</div>
          <UsersInfo name={name} phone={phone} email={email} address={address} id={id} />
          <div className={style.posts}>
            <Posts posts={posts} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
