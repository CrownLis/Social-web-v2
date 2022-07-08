import { Button } from 'antd';
import React, { FC } from 'react';

import style from './MyButton.module.css'

const MyButton:FC = () => {
    return (
        <Button type="primary" shape="round" size='large' className={style.primary}>
          Sign In
          </Button>
    )
}

export default MyButton