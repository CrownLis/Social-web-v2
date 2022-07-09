import { FC } from 'react';
import { IUser } from '../../../type/types';
import style from './UsersInfo.module.css';

const UsersInfo: FC<IUser> = ({ name, phone, id, address, email }) => {
  return (
    <div className={style.info}>
      <h2>About me</h2>
      <span>Phone: {phone}</span> <br></br>
      <span>Email: {email}</span>
      <br></br>
      <span>City:{address.city}</span>
    </div>
  );
};

export default UsersInfo;
