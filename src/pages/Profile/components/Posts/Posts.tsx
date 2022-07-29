/* eslint-disable eqeqeq */
import { Form } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import TextArea from 'antd/lib/input/TextArea';
import { FC, useEffect, useState } from 'react';
import { addPost, deletePost, getPosts } from '../../../../API/socialWeb';
import { GET_POSTS } from '../../../../store/ducks/activeUser/actions';
import { useAppDispatch } from '../../../../store/hooks';

import { IUser, IPost } from '../../../../type/types';
import MyButton from '../../../../UI/MyButton/MyButton';
import Loader from '../../../Loader/Loader';
import Post from './Post/Post';

import styles from './Posts.module.css';

interface UserProps {
  users: IUser
}

const Posts: FC<UserProps> = (user) => {

  const dispatch = useAppDispatch()
  const [form] = useForm()
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const removePost = async (id: number) => {
    await deletePost(id);
    setPosts(posts.filter(p => p.id !== id));
  };

  const fetchPosts = async () => {
    const postList = await getPosts(user.users.id);
    setPosts(postList.data)
    dispatch({type:GET_POSTS,payload:postList.data})
    setIsLoading(false)
  }

  const addNewPost = async (values:{}) => {
    const newPost = await addPost(values)
    setPosts([...posts,newPost.data])
    form.resetFields()
  };

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    isLoading ? <Loader/> : (
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
        form={form}
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
    )
  );
};
export default Posts;
