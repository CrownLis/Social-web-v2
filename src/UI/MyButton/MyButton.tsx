import { Button, ButtonProps } from 'antd';
import React, { FC, PropsWithChildren } from 'react';

import style from './MyButton.module.css';

type MyButtonProps = PropsWithChildren<{
  type?: ButtonProps['type'];
  htmlType?: ButtonProps['htmlType'];
  OnClick?: ButtonProps['onClick']
}>;

const MyButton: FC<MyButtonProps> = ({ children, type = 'ghost', htmlType , OnClick }) => {
  return (
    <Button type={type} shape="round" size="large" className={style.btn} htmlType={htmlType} onClick={OnClick}>
      {children}
    </Button>
  );
};

export default MyButton;
