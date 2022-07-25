import { Button, ButtonProps } from 'antd';
import React, { FC, PropsWithChildren } from 'react';

import style from './MyButton.module.css';

type MyButtonProps = PropsWithChildren<{
  type?: ButtonProps['type'];
  htmlType?: ButtonProps['htmlType'];
  onClick?: ButtonProps['onClick']
}>;

const MyButton: FC<MyButtonProps> = ({ children, type = 'ghost', htmlType , onClick }) => {
  return (
    <Button type={type} shape="round" size="large" className={style.btn} htmlType={htmlType} onClick={onClick}>
      {children}
    </Button>
  );
};

export default MyButton;
