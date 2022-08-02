import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Avatar, List, Skeleton } from 'antd';
import _ from 'lodash'

import Loader from '../Loader/Loader';
import { IUser } from '../../type/types';

import style from './Users.module.css';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAuth } from '../../store/ducks/auth/selectors';
import { getUsersLoading, getUsersState } from '../../store/ducks/users/selectors';
import { getUsers } from '../../store/ducks/users/asyncActions';

const Users: FC = () => {
  const [search, setSearch] = useState('')
  const activeUser = useAppSelector(getAuth)
  const users = useAppSelector(getUsersState)
  const isLoading = useAppSelector(getUsersLoading)
  const dispatch = useAppDispatch()

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

  const fetchUsers = async () => {
    if (activeUser?.id) {
      try {
        dispatch(getUsers(activeUser))
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

  useEffect(() => invokeDebounced, [search]);

  return (
    <div className={style.userList}>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div
            style={{
              height: 670,
              overflow: 'auto',
              padding: '0 16px',
            }}
          >
            <div className={style.inputContainer}>
              <input onChange={(e => setSearch(e.target.value))} placeholder='search' className={style.input} value={search} autoFocus/>
            </div>
            <List
              className="demo-loadmore-list"
              loading={isLoading}
              itemLayout="horizontal"
              dataSource={users}
              size='large'
              renderItem={(item:IUser) => (
                <List.Item
                >
                  <Skeleton avatar title={false} loading={false} active >
                    <List.Item.Meta className={style.title}
                      avatar={<Avatar src={item.avatar} className={style.avatar} />}
                      title={<NavLink to={`/users/${item.id}`} > {`${item.firstName} ${item.lastName}`}</NavLink>}
                    />
                  </Skeleton>
                </List.Item>
              )}
            />
          </div>
        </div>
      )
      }
    </div>
  )
};

export default Users;
