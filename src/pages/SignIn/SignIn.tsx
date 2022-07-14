import { Button, Form, Input } from 'antd';
import { FC, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import socialWebApi, { signIn } from '../../API/socialWeb';
import ActiveUserContext from '../../context/ActiveUserContext';
import MyButton from '../../UI/MyButton/MyButton';

import style from './SignIn.module.css';

const SignIn: FC = () => {

  const {updateUser} = useContext(ActiveUserContext)

  const navigation = useNavigate()

  const onFinish = async (values: {}) => {
    const response = await signIn(values)
    localStorage.setItem('access_token',response.data.access_token)
    socialWebApi.defaults.headers.common['Authorization'] = ` Bearer ${localStorage.getItem('access_token')}`;
    updateUser(response.data.user)
    navigation('/Profile') // Navigation не обновляет данные т.е если не обновить страницу будет показываться предыдущий пользователь
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
     <Form
     className={style.container}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
      className={style.label}
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' },
        { type: 'email' }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item className={style.btn}>
        <MyButton type="primary" htmlType="submit">
          Sumbit
        </MyButton>
        <MyButton type="primary" htmlType="button">
          <NavLink to='/signUp'> Sign up </NavLink>
        </MyButton>
      </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
