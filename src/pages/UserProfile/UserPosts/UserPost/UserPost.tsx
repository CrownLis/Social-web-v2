import { FC } from 'react';
import { IPost } from '../../../../type/types';


import style from './UserPost.module.css'

interface PostProps extends IPost {
  onClick: (id: number) => void;
}

const UserPost: FC<PostProps> = ({ text, id}) => {
  return (
    <div className={style.post} key={id}>
      {text}
    </div>
  );
};

export default UserPost;
