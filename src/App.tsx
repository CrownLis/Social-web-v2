import React, { FC, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from 'axios'

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/NotFound/NotFound";
import Users from "./pages/Users/Users";
import Loader from './Loader/Loader'
import { ACTIVE_USER_ID } from "./constants/user";
import ActiveUserContext from "./context/ActiveUserContext";
import UserProfile from "./pages/UserProfile/UserProfile";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import { IUser } from "./type/types";

import styles from './App.module.css'

const App: FC = () => {

  const [activeUser, setActiveUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [anotherUsers, setAnotherUsers] = useState<IUser[]>()

  const fetchUsers = async () => {
      const response = await axios.get<IUser[]>(`https://jsonplaceholder.typicode.com/users`);
      const anotherUsers=response.data
      setAnotherUsers(anotherUsers);
      setActiveUser(anotherUsers[ACTIVE_USER_ID - 1])
      setIsLoading(false)
    }

  useEffect(() => {
    fetchUsers()
  }, [])
  
  const ActiveUserContextValue = { activeUser };
  return (
    <ActiveUserContext.Provider value ={ActiveUserContextValue}>
      <BrowserRouter>
        <div className="container">
          <Header />
          <main className={styles.main}>
            <Sidebar />
            <div className={styles.content}>
              {isLoading ? <Loader /> :
                <Routes>
                  <Route path="/main" />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/users" element={<Users />} />
                  {
                    anotherUsers!.map
                      (state =>
                        <Route path={`/users/${state.id}`} element={<UserProfile name={state.name} email={state.email} phone={state.phone} address={state.address} id={state.id} />} />
                      )}
                  <Route path="*" element={<NotFound />} />
                  <Route path="signIn" element={<SignIn />}/>
                  <Route path='signUp' element={<SignUp />} />
                </Routes>
              }
            </div>
          </main>
        </div>
      </BrowserRouter>
    </ActiveUserContext.Provider>

  );
}

export default App;