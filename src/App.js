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



function App(props) {

  const [activeUser, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  useEffect( () => {
    fetch(`https://jsonplaceholder.typicode.com/users/${ACTIVE_USER_ID}`)
      .then(response => response.json())
      .then(activeUser => { setUser(activeUser) })
      .finally(() => setIsLoading(false))
  }, [])

  const ActiveUserContextValue = {activeUser};

  return (
    <ActiveUserContext.Provider value={{ActiveUserContextValue}}>
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
