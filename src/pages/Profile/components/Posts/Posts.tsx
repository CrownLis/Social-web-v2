/* eslint-disable eqeqeq */
import { Form } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { FC, useEffect, useState } from 'react';
import { addPost, deletePost } from '../../../../API/socialWeb';

import { IPost } from '../../../../type/types';
import MyButton from '../../../../UI/MyButton/MyButton';
import Post from './Post/Post';

import styles from './Posts.module.css';

interface PostsProps {
  posts: IPost[];
}

const Posts: FC<PostsProps> = ({ posts: externalPosts }) => {
  const [posts, setPosts] = useState(externalPosts);
  console.log(posts)
  const removePost = async (id: number) => {
    await deletePost(id);
    setPosts(posts.filter(p => p.id !== id));
  };

  const addNewPost = async (values:{}) => {
    await addPost(values)
  };

  useEffect(() => {
  }, [])

  return (
    <div className={styles.posts}>
      <h2>Посты</h2>

      <div className={styles.newPost}>
        {posts.length == 0 ? (
          <h4>Посты отсутсвуют</h4>
        ) : (
          posts.map(p => (
            <Post
              id={p.id}
              text={p.text}
              userId={p.userId}
              onClick={removePost}
            />
          ))
        )}
        <span>Добавить пост</span>
        <Form
        onFinish={addNewPost}
        >
          <Form.Item 
          name='text'>
        <TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }} className={styles.btn}>
        <MyButton type="primary" htmlType="submit">
          Submit
        </MyButton>
      </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Posts;
