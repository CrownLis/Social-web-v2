
import { Form } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import TextArea from 'antd/lib/input/TextArea';
import { FC, useEffect, useState } from 'react';
import { addPost, deletePost, getPosts } from '../../../../API/socialWeb';
import { getActiveUser } from '../../../../store/ducks/activeUser/selectors';
import { ADD_POSTS, DELETE_POST, GET_POSTS } from '../../../../store/ducks/posts/actions';
import { getPostsState } from '../../../../store/ducks/posts/selectors';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

import MyButton from '../../../../UI/MyButton/MyButton';
import Loader from '../../../Loader/Loader';
import Post from './Post/Post';

import styles from './Posts.module.css';


const Posts: FC = () => {

  const activeUser = useAppSelector(getActiveUser)
  const dispatch = useAppDispatch()
  const postsState = useAppSelector(getPostsState)
  const [form] = useForm()
  const [isLoading, setIsLoading] = useState(true);

  const removePost = async (id: number) => {
    setIsLoading(true)
    dispatch({type:DELETE_POST,payload:id});
    setIsLoading(false)
  };

  const fetchPosts = async () => {
    setIsLoading(true)
    dispatch({ type: GET_POSTS, payload: (await getPosts(activeUser.id)).data })
    setIsLoading(false)
  }

  const addNewPost = async (values: {}) => {
    setIsLoading(true)
    dispatch({type: ADD_POSTS, payload:(await addPost(values)).data})
    form.resetFields()
    setIsLoading(false)
  };

  useEffect(() => {
    fetchPosts()
  }, [])
  return (
    isLoading ? <Loader /> : (
      <div className={styles.posts}>
        <h2>Посты</h2>

        <div className={styles.newPost}>
          {postsState.length == 0 ? (
            <h4>Посты отсутсвуют</h4>
          ) : (
            postsState.map((p: { id: number; text: string; userId: number | undefined; }) => (
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
