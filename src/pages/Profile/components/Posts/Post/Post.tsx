import { FC } from 'react';
import { IPost } from '../../../../../type/types';

import style from './Post.module.css';

interface PortProps extends IPost {
  onClick: (id: number) => void;
}

const Post: FC<PortProps> = ({ id, userId, title, body, onClick }) => {
  return (
    <div className={style.post} key={id}>
      Name: {body}
      <button className={style.remove} onClick={() => onClick(id)}>
        Удалить
      </button>
    </div>
  );
};

export default Post;
