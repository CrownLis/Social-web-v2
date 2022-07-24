import { FC, useContext, useEffect, useState } from 'react';
import { Avatar, List, Skeleton } from 'antd';

import Loader from '../Loader/Loader';
import { IUser } from '../../type/types';

import style from './Users.module.css';
import { searchUsers } from '../../API/socialWeb';
import MyButton from '../../UI/MyButton/MyButton';
import { NavLink } from 'react-router-dom';
import ActiveUserContext from '../../context/ActiveUserContext';

const Users: FC = () => {
  const [search,setSearch] = useState('')
  const { activeUser } = useContext(ActiveUserContext);
  const [users, setUsers] = useState<IUser[]>([]);
  const [initLoading, setInitLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);


  const onChangeSearch = async () => {
    if (activeUser?.id) {
      try {
        const searchedUsersList = await searchUsers(activeUser.id, search);
        setUsers(searchedUsersList.data)
        setIsLoading(false);
      setInitLoading(false);
      }
      catch {
       console.log('error')
      }
    }
  }

  useEffect(() => {
    onChangeSearch();
  }, [search]);


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
              <input onChange={(e => setSearch(e.target.value))} placeholder='search' className={style.input} value={search}/>
            </div>
            <List
              className="demo-loadmore-list"
              loading={initLoading}
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
