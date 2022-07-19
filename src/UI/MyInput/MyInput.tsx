import { Input } from 'antd';
import { InputProps } from 'rc-input';
import { FC } from 'react';

import style from './MyInput.module.css'

type MyInputProps = {
    onChange?: InputProps['onChange'];
    placeholder?:InputProps['placeholder'];
    ref?:any
  };

const MyInput:FC <MyInputProps> = ({onChange,placeholder,ref}) => {
    return (
    <Input className={style.myInput} onChange={onChange} placeholder={placeholder}></Input>
    )
}

export default MyInput