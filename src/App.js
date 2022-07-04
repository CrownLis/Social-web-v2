import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/NotFound/NotFound";
import Users from "./pages/Users/Users";
import Loader from './Loader/Loader'
import { ACTIVE_USER_ID } from "./constants/user";
import ActiveUserContext from "./context/ActiveUserContext";

import styles from "./App.module.css";
import UserProfile from "./pages/UserProfile/UserProfile";



function App(props) {

  const [activeUser, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [anotherUsers, setAnotherUsers] = useState()

  const fetchUsers = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const anotherUsers = await response.json();
    setAnotherUsers(anotherUsers);
    setUser(anotherUsers[ACTIVE_USER_ID - 1])
    setIsLoading(false)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const ActiveUserContextValue = { activeUser };
  return (
    <ActiveUserContext.Provider value={ActiveUserContextValue}>
      <div className="container">
        <Header />
        <BrowserRouter>
          <main className={styles.main}>
            <Sidebar />
            <div className={styles.content}>
              {isLoading ? <Loader /> :
                <Routes>
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/users" element={<Users />} />
                  {
                    anotherUsers.map
                      (state =>
                        <Route path={`/users/${state.id}`} element={<UserProfile  name={state.name} email ={state.email} phone = {state.phone} city = {state.address.city} id={state.id}/>} />
                      )}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              }
            </div>
          </main>
        </BrowserRouter>
      </div>
    </ActiveUserContext.Provider>
  );
}

export default App;
