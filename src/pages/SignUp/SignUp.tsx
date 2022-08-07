import { Form, Input } from 'antd';
import { FC } from 'react';
import  { useNavigate } from 'react-router-dom'

import style from './SignUp.module.css';
import MyButton from '../../UI/MyButton/MyButton';
import { useAppDispatch } from '../../store/hooks';
import { addNewUsers } from '../../store/ducks/users/asyncActions';

const SignUp: FC = () => {
  

const navigation = useNavigate()
const dispatch = useAppDispatch()

  const onFinish = async (values: { avatar: any; }) => {
    dispatch(addNewUsers(values))
    navigation('/signIn')
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
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

      <Form.Item
        label="FirstName"
        name="firstName"
        rules={[{ required: true, message: 'Please input your firstName!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="LastName"
        name="lastName"
        rules={[{ required: true, message: 'Please input your lastName!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Avatar"
        name="avatar"
        rules={[{ required: false }]}

      >
        <Input/>
      </Form.Item>


      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <MyButton type="primary" htmlType="submit">
          Submit
        </MyButton>
      </Form.Item>
    </Form>
  );
};

export default SignUp;
