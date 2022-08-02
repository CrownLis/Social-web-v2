import { FC } from 'react';
import { IUser } from '../../../../type/types';
import style from './UsersInfo.module.css';

const UsersInfo: FC<IUser> = ({ firstName, lastName, id, avatar, email }) => {
  return (
    <div className={style.info}>
      <h2>About me</h2>
      <span>Email: {email}</span>
    </div>
  );
};

export default UsersInfo;
