import { FC, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Avatar, List, Skeleton } from 'antd';
import _ from 'lodash'

import Loader from '../Loader/Loader';
import { IUser } from '../../type/types';

import style from './Users.module.css';
import { searchUsers } from '../../API/socialWeb';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { getActiveUser } from '../../store/ducks/activeUser/selectors';

const Users: FC = () => {
  const [search, setSearch] = useState('')
  const activeUser = useAppSelector(getActiveUser)
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(true)
    if (activeUser?.id) {
      try {

        const searchedUsers = await searchUsers(activeUser.id, search)
        setUsers(searchedUsers.data)
        setIsLoading(false);
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
              renderItem={item => (
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
