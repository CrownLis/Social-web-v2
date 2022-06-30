import { useEffect, useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";

import User from "./User/User";
import Loader from "../../Loader/Loader";
import { ACTIVE_USER_ID } from "../../constants/user";

import style from './Users.module.css'

const Users = (props) => {

  const [users, setUsers] = useState(null);

  const [isLoading, setIsLoading] = useState(true)

  const fetchUsers = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const userData = await response.json();
    setUsers(userData);
    setIsLoading(false)
  }
  useEffect(() => {
    fetchUsers();
  }, [])


  
  return (
    
    <div className={style.userList}>
     {isLoading? <Loader/> : 
     <div>
     <h2>Список пользователей</h2>
      {
        users.map(state => 
  <NavLink key={state.id} to={`/users/${state.id}`} className={style.user}>
    <User name={state.name} />
  </NavLink>
)}
      </div>}
    </div>
  );
};

export default Users;
