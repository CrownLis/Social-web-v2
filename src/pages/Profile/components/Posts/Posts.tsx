
import { Form } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import TextArea from 'antd/lib/input/TextArea';
import { FC, useEffect } from 'react';
import { getAuth } from '../../../../store/ducks/auth/selectors';
import { addNewPosts, deletePosts, getUserPosts } from '../../../../store/ducks/posts/asyncActions';
import { getPostsLoading, getPostsState } from '../../../../store/ducks/posts/selectors';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

import MyButton from '../../../../UI/MyButton/MyButton';
import Loader from '../../../Loader/Loader';
import Post from './Post/Post';

import styles from './Posts.module.css';


const Posts: FC = () => {
  const isLoading = useAppSelector(getPostsLoading)
  const activeUser = useAppSelector(getAuth)
  const dispatch = useAppDispatch()
  const [form] = useForm()
  const postsState = useAppSelector(getPostsState)


const fetchPosts = () => {
  console.log(activeUser)
dispatch(getUserPosts(activeUser))
}

  const removePost = async (id: number) => {
  dispatch(deletePosts(id))
  };

  const addNewPost = async (values: {}) => {
   dispatch(addNewPosts(values))
    form.resetFields()
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
}
export default Posts;
