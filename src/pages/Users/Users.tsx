import { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { Table } from 'antd';

import User from './User/User';
import Loader from '../Loader/Loader';
import { IUser } from '../../type/types';

import style from './Users.module.css';

const columns: [items: {}] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
];

const Users: FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    const response = await axios.get<IUser[]>(
      `https://jsonplaceholder.typicode.com/users`,
    );
    const userData = response.data;
    setUsers(userData);
    setIsLoading(false);
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
          <h2>Список пользователей</h2>
          {users.map(state => (
            <NavLink key={state.id} to={`/users/${state.id}`} className={style.user}>
              <User name={state.name} />
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;
