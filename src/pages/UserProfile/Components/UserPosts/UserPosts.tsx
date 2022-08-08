/* eslint-disable eqeqeq */
import { FC, useEffect } from 'react';

import styles from './UserPosts.module.css';
import { IPost } from '../../../../type/types';
import UserPost from './UserPost/UserPost';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { getLoadingPosts, getProfilePosts, getUserProfiles } from '../../../../store/ducks/users/selectors';
import { getUserProfilePosts } from '../../../../store/ducks/users/asyncActions';


const UserPosts: FC = () => {
  const dispatch = useAppDispatch()
  const posts = useAppSelector(getProfilePosts)
  const user = useAppSelector(getUserProfiles)
  const isLoading = useAppSelector(getLoadingPosts)

  const fetchPosts = () => {
    dispatch(getUserProfilePosts(user.id))
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    isLoading ? null :
      <div className={styles.posts}>
        <h2>Посты</h2>
        <div className={styles.newPost}>
          {posts.length == 0 ? (
            <h4>Посты отсутсвуют</h4>
          ) : (
            posts.map((p: IPost) => (
              <UserPost
                id={p.id}
                text={p.text}
                userId={p.userId}
                onClick={() => { }}
              />
            ))
          )}
        </div>
      </div>
  );
};
export default UserPosts;
