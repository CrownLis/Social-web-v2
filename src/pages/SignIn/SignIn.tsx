import { Form, Input } from 'antd';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import socialWebApi, { signIn } from '../../API/socialWeb';
import { SET_ACTIVE_USER } from '../../store/ducks/auth/actions';
import { setActiveUser } from '../../store/ducks/auth/asyncActions';
import { useAppDispatch } from '../../store/hooks';
import MyButton from '../../UI/MyButton/MyButton';

import style from './SignIn.module.css';

const SignIn: FC = () => {

  const dispatch = useAppDispatch()
  const navigation = useNavigate();

  const [form] = Form.useForm();

  const onFinish = async (values: {}) => {
    const response = await signIn(values)
    localStorage.setItem('access_token', response.data.access_token)
    socialWebApi.defaults.headers.common['Authorization'] = ` Bearer ${localStorage.getItem('access_token')}`;
    dispatch(setActiveUser(values))
    navigation('/Profile')
  };

  const onFinishFailed = (errorInfo: any) => {
    form.resetFields()
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Form
        form={form}
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
