import { useEffect, useState } from 'react';

import UsersInfo from './UsersInfo/UsersInfo';
import Posts from '../Profile/components/Posts/Posts';
import Loader from '../../Loader/Loader';

import style from './UserProfile.module.css'



const UserProfile = (props) => {

    const fetchUsers = async () => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${props.id}&_limit=5`);
        const posts = await response.json();
        setPosts(posts);
        setIsLoading(false)
      }
    
    useEffect ( () => {fetchUsers()})
    
    const [posts,setPosts] = useState()
    const [isLoading,setIsLoading] = useState(true)

    return (
        <div className={style.container}>
        {isLoading? <Loader />:  
        <div className={style.content}>
      <div className={style.avatar}>
        <img src="" alt={props.name}></img>
      </div>
      <div className={style.name}>{props.name}</div>
      <UsersInfo name={props.name} phone ={props.phone} email= {props.email} city={props.city} />
      <div className={style.posts}>
      <Posts post={posts}/>
      </div>
      </div>
        }
    </div>
  );
    }

export default UserProfile