import { useEffect, useState } from "react";
import User from "./User/User";
import style from './Users.module.css'

const Users = (props) => {

  const [user, setUser] = useState([])

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then(response => response.json())
      .then(user => setUser(user))
  }, [])
  const userList = user.map(state => 
  <User name={state.name}  key={state.id}/>)


  return (
    <div>
      <h2>Пользователи</h2>
      <div className={style.users}>
        {userList}
      </div>
    </div>
  );
};

export default Users;
