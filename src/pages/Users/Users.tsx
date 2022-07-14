import { FC, useContext, useEffect, useState } from 'react';
import { Avatar, List, Skeleton } from 'antd';

import Loader from '../Loader/Loader';
import { IUser } from '../../type/types';

import style from './Users.module.css';
import { getUsers } from '../../API/socialWeb';
import MyButton from '../../UI/MyButton/MyButton';
import { NavLink } from 'react-router-dom';
import ActiveUserContext from '../../context/ActiveUserContext';

const Users: FC = () => {
  const {activeUser} = useContext(ActiveUserContext);
  const [users, setUsers] = useState<IUser[]>([]);
  const [initLoading, setInitLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    const usersList = await getUsers();
    const userListWithoutActive = usersList.data.filter((user: { id: number | undefined; }) =>  user.id != activeUser?.id)
    setUsers(userListWithoutActive);
    setIsLoading(false);
    setInitLoading(false);
    console.log(usersList)
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={style.userList}>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <List
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="horizontal"
            dataSource={users}
            size= 'large'
            renderItem={item => (
              <List.Item
              >
                <Skeleton avatar title={false} loading={item.loading} active >
                  <List.Item.Meta className={style.title}
                    avatar={<Avatar src={item.avatar} className={style.avatar}/>}
                    title = {<NavLink to={`/users/${item.id}`} > {`${item.firstName} ${item.lastName}`}</NavLink>}
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
      )
      }
    </div>
  )
};

export default Users;
