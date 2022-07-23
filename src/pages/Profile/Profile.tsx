import React, { FC, useContext, useEffect, useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';

import Posts from './components/Posts/Posts';
import Info from './components/Info/Info';
import ActiveUserContext from '../../context/ActiveUserContext';
import { signUp } from '../../API/socialWeb';

import styles from './Profile.module.css';
import Loader from '../Loader/Loader';
import { IPost } from '../../type/types';
import { getPosts } from '../../API/socialWeb';
import MyButton from '../../UI/MyButton/MyButton';

const Profile: FC = () => {

  const { activeUser } = useContext(ActiveUserContext);

  useEffect(() => {
    ;
  }, []);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async (values:{}) => {
    // await signUp(values)  на беке нету нужной функции,чтобы изменить аватар
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  if (activeUser) {
  return (
    <div className={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.content}>
          <div className={styles.avatar}>
            <img src={activeUser?.avatar} alt="my avatar"></img>
            <MyButton type="primary" onClick={showModal}>
              Change avatar
            </MyButton>
            <Modal
              title="Change avatar"
              visible={visible}
              confirmLoading={confirmLoading}
              footer={null}
              closable={false}
            >
              <Form
                onFinish={handleOk}

              >
                <Form.Item
                  className={styles.label}
                  label="Avatar:URL"
                  name="avatar"
                  rules={[{ required: true, message: 'Please input URL!' },
                  { type: 'string' }
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item className={styles.btn}>
                  <MyButton type="primary" htmlType="submit">
                    Change
                  </MyButton>
                  <MyButton type="primary" htmlType="button" onClick={handleCancel}>
                    Cancel
                  </MyButton>
                </Form.Item>
              </Form>
            </Modal>
          </div>
          <div className={styles.name}>{`${activeUser?.firstName} ${activeUser?.lastName}`}</div>
          <Info />
          <div className={styles.posts}>
            <Posts users={activeUser} />
          </div>
        </div>
      )}
    </div>
  );
                } else {
                  return null
                }
};

export default Profile;
