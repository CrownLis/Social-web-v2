import { Button, ButtonProps } from 'antd';
import React, { FC, PropsWithChildren } from 'react';

import style from './MyButton.module.css';

type MyButtonProps = PropsWithChildren<{
  type?: ButtonProps['type'];
}>;

const MyButton: FC<MyButtonProps> = ({ children, type = 'primary' }) => {
  return (
    <Button type={type} shape="round" size="large" className={style.primary}>
      {children}
    </Button>
  );
};

export default MyButton;
