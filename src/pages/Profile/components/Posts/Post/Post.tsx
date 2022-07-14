import { FC } from 'react';
import { IPost } from '../../../../../type/types';

import style from './Post.module.css';

interface PostProps extends IPost {
  onClick: (id: number) => void;
}

const Post: FC<PostProps> = ({ text, id, onClick }) => {
  return (
    <div className={style.post} key={id}>
      {text}
      <button className={style.remove} onClick={() => onClick(id)}>
        Удалить
      </button>
    </div>
  );
};

export default Post;
