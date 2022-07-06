import { FC, useEffect, useState } from 'react';

import UsersInfo from './UsersInfo/UsersInfo';
import Posts from '../Profile/components/Posts/Posts';
import Loader from '../../Loader/Loader';

import style from './UserProfile.module.css'
import axios from 'axios';
import { IPosts, IUser } from '../../type/types';



const UserProfile:FC<IUser>= ({name,phone,email,address,id}) => {

    const fetchUsers = async () => {
        const response = await axios.get<IPosts[]>(`https://jsonplaceholder.typicode.com/posts?_start=${id}&_limit=5`);
        const posts = await response.data;
        setPosts(posts);
        setIsLoading(false)
      }
    
    useEffect ( () => {fetchUsers()})
    
    const [posts,setPosts] = useState<IPosts[]>()
    const [isLoading,setIsLoading] = useState(true)

if (!posts) {
  return null
}

    return (
        <div className={style.container}>
        {isLoading? <Loader />:  
        <div className={style.content}>
      <div className={style.avatar}>
        <img src="" alt={name}></img>
      </div>
      <div className={style.name}>{name}</div>
      <UsersInfo name={name} phone ={phone} email= {email} address={address} id={id}/>
      <div className={style.posts}>
      <Posts posts={posts}/>
      </div>
      </div>
        }
    </div>
  );
    }

export default UserProfile