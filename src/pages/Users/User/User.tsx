import { FC } from 'react';

import style from './User.module.css';

interface UserProps {
  name: string;
}

const User: FC<UserProps> = name => {
  return (
    <div className={style.user}>
      <span>Имя: {name.name}</span>
    </div>
  );
};

export default User;
