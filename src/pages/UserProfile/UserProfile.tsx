import { FC, useEffect, useState } from 'react';
import { IPost, IUser } from '../../type/types';
import { getPosts, getUser } from '../../API/socialWeb';
import { useParams } from 'react-router-dom';

import UsersInfo from './UsersInfo/UsersInfo';
import Loader from '../Loader/Loader';
import UserPosts from './UserPosts/UserPosts';

import style from './UserProfile.module.css';

const UserProfile: FC = () => {
  const { id } = useParams()

  const [posts, setPosts] = useState<IPost[]>([]);
  const [user,setUser] = useState<IUser>()
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async (userId:string) => {
    const activeUser = await getUser(userId);
    setUser(activeUser.data);
    const postList = await getPosts(userId);
    setPosts(postList.data);
    setIsLoading(false);
  }


  useEffect(() => {
   if (id) { fetchUser(id)};
  }, [id]);

  return (
    <div className={style.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={style.content}>
          <div className={style.avatar}>
            <img src={user?.avatar} alt={user?.avatar}></img>
          </div>
          <div className={style.name}>{`${user?.firstName} ${user?.lastName}`}</div>
          <UsersInfo firstName={user?.firstName} lastName={user?.lastName} email={user?.email} avatar={user?.avatar} id={user?.id} />
          <div className={style.posts}>
            <UserPosts posts={posts} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
