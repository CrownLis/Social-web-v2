import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Avatar, List, Skeleton } from 'antd';
import { Virtuoso } from 'react-virtuoso'

import Loader from '../Loader/Loader';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAuth } from '../../store/ducks/auth/selectors';
import { getLimitUsers, getLoadingMoreUsers, getUsersLoading, getUsersState } from '../../store/ducks/users/selectors';
import { getMoreUsers, getUsers } from '../../store/ducks/users/asyncActions';

import style from './Users.module.css';

const Users: FC = () => {
  const [search, setSearch] = useState('')
  const activeUser = useAppSelector(getAuth)
  const users = useAppSelector(getUsersState)
  const isLoading = useAppSelector(getUsersLoading)
  const dispatch = useAppDispatch()
  const limit = useAppSelector(getLimitUsers)
  const isLoadingMoreUsers = useAppSelector(getLoadingMoreUsers)

  const loadMore = useCallback(() => {
    if (limit <= 100) {
      return setTimeout(() => {
        dispatch(getMoreUsers(activeUser.id, limit, search))
      }, 200)
    } else {
      return null
    }
  }, [dispatch(getMoreUsers)])

  const debounceImpl = (cb: any, delay: number) => {
    let isDebounced: any = null;
    return (...args: any) => {
      clearTimeout(isDebounced);
      isDebounced = setTimeout(() => cb(...args), delay);
    };
  };

  const invokeDebounced = useDebounce(
    () => fetchUsers(),
    300
  );

  const fetchUsers = () => {
    if (activeUser?.id) {
      try {
        dispatch(getUsers(activeUser.id, limit, search))
      }
      catch {
        console.log('error')
      }
    }
  }

  function useDebounce(cb: any, delay: number) {
    const cbRef = useRef(cb);
    useEffect(() => {
      cbRef.current = cb;
    });
    return useCallback(
      debounceImpl((...args: any) => cbRef.current(...args), delay),
      [delay]
    );
  }

  useEffect(() => invokeDebounced(), [search]);

  return (
    <div className={style.userList}>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className={style.inputContainer}>
            <input onChange={(e => setSearch(e.target.value))} placeholder='search' className={style.input} value={search} autoFocus />
          </div>

          <Virtuoso
            style={{ height: 560 }}
            data={users}
            endReached={loadMore}
            overscan={200}
            itemContent={(index, user) => {
              return <Skeleton
                avatar
                title={false}
                loading={isLoading}
                active >
                <List.Item.Meta className={style.title}
                  avatar={<Avatar src={user.avatar} className={style.avatar} />}
                  title={<NavLink to={`/users/${user.id}`} > {`${user.firstName} ${user.lastName}`}</NavLink>}
                />
              </Skeleton>
            }}
            components={isLoadingMoreUsers ? { Footer } : {}}
          />
        </div>
      )
      }
    </div>
  )
};

export default Users;

const Footer = () => {
  return (
    <div
      style={{
        padding: '2rem',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      Loading...
    </div>
  )
}