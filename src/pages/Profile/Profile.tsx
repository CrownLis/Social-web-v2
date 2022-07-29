import { FC, useEffect, useState } from 'react';
import { Form, Input, Modal } from 'antd';

import Posts from './components/Posts/Posts';
import Info from './components/Info/Info';
import { editUser } from '../../API/socialWeb';

import styles from './Profile.module.css';
import Loader from '../Loader/Loader';
import MyButton from '../../UI/MyButton/MyButton';
import { useForm } from 'antd/lib/form/Form';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getActiveUser } from '../../store/ducks/activeUser/selectors';
import { SET_USER } from '../../store/ducks/activeUser/actions';

const Profile: FC = () => {

  const dispatch = useAppDispatch()
  const [form] = useForm()
  const activeUser = useAppSelector(getActiveUser)

  const showModal = () => {
    setVisible(true);
    form.setFieldsValue({
      firstName: activeUser?.firstName,
      lastName: activeUser?.lastName,
      avatar: activeUser?.avatar
    });
  };


  const handleOk = async () => {
    setConfirmLoading(true);
    const ava = form.getFieldValue('avatar')
    if (ava === '') {
      form.setFieldsValue({
        avatar: 'https://инобр.рф/upload/iblock/61f/no-avatar-8.png'
      })
    }
    const newUser = await editUser(form.getFieldsValue())
    dispatch({type:SET_USER,payload:newUser.data})
    setVisible(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  if (activeUser) {
    return (
      <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.avatar}>
              <img src={activeUser?.avatar} alt="my avatar"></img>
              <MyButton type="primary" onClick={showModal}>
                Edit user
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
                  form={form}

                >
                  <Form.Item
                    className={styles.label}
                    label="firstName"
                    name="firstName"
                    rules={[{ required: true, message: 'Please input firstName' },
                    { type: 'string' }
                    ]}
                  >
                    <Input value={activeUser.firstName} />
                  </Form.Item>
                  <Form.Item
                    className={styles.label}
                    label="lastName"
                    name="lastName"
                    rules={[{ required: true, message: 'Please input lastName' },
                    { type: 'string' }
                    ]}
                  >
                    <Input value={activeUser.lastName} />
                  </Form.Item>
                  <Form.Item
                    className={styles.label}
                    label="Avatar:URL"
                    name="avatar"
                    rules={[{ required: false, message: 'Please input URL!' },
                    { type: 'string' }
                    ]}
                  >
                    <Input allowClear />
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
            <Info/>
            <div className={styles.posts}>
              <Posts users={activeUser} />
            </div>
          </div>
      </div>
    );
  } else {
    return null
  }
};

export default Profile;
