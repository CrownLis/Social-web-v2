import { FC, useContext, useEffect, useRef, useState } from 'react';
import { Avatar, Input, InputRef, List, Skeleton } from 'antd';

import Loader from '../Loader/Loader';
import { IUser } from '../../type/types';

import style from './Users.module.css';
import { getUsers, searchUser } from '../../API/socialWeb';
import MyButton from '../../UI/MyButton/MyButton';
import { NavLink } from 'react-router-dom';
import ActiveUserContext from '../../context/ActiveUserContext';
import MyInput from '../../UI/MyInput/MyInput';

const Users: FC = () => {
  const search = useRef<HTMLInputElement | null>(null)
  const { activeUser } = useContext(ActiveUserContext);
  const [users, setUsers] = useState<IUser[]>([]);
  const [initLoading, setInitLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    const usersList = await getUsers();
    const userListWithoutActive = usersList.data.filter((user: { id: number | undefined; }) => user.id != activeUser?.id)
    setUsers(userListWithoutActive);
    setIsLoading(false);
    setInitLoading(false);
  };

  const useSearch = async () => {
    const searchedUsers: any = await searchUser(search?.current?.value)
      .catch(
        fetchUsers
      )
    const searchedUsersWithoutActive = searchedUsers.data.filter((user: { id: number | undefined; }) => user.id != activeUser?.id)
    setUsers(searchedUsersWithoutActive);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

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
            <input ref={search} onChange={useSearch} placeholder='search'/>
            <List
              className="demo-loadmore-list"
              loading={initLoading}
              itemLayout="horizontal"
              dataSource={users}
              size='large'
              renderItem={item => (
                <List.Item
                >
                  <Skeleton avatar title={false} loading={item.loading} active >
                    <List.Item.Meta className={style.title}
                      avatar={<Avatar src={item.avatar} className={style.avatar} />}
                      title={<NavLink to={`/users/${item.id}`} > {`${item.firstName} ${item.lastName}`}</NavLink>}
                    />
                    <div>
                      <MyButton>
                        Добавить в друзья
                      </MyButton>
                    </div>
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
