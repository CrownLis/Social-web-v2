import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getUserProfile } from '../../store/ducks/users/asyncActions';
import { getLoadingProfile, getUserProfiles } from '../../store/ducks/users/selectors';

import UsersInfo from './Components/UsersInfo/UsersInfo';
import Loader from '../Loader/Loader';
import UserPosts from './Components/UserPosts/UserPosts';

import style from './UserProfile.module.css';


const UserProfile: FC = () => {

  const { id } = useParams()
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(getLoadingProfile)
  const user = useAppSelector(getUserProfiles)

  const fetchUser = async () => {
    if (id) {
      dispatch(getUserProfile(id))
    }
  }

  useEffect(() => {
    fetchUser()
  }, []);

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
          {user ?
            <UsersInfo firstName={user.firstName} lastName={user.lastName} email={user.email} avatar={user.avatar} id={user.id} />
            : null}
          <div className={style.posts}>
            <UserPosts />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
