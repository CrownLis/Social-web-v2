import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/NotFound/NotFound";
import Users from "./pages/Users/Users";

import styles from "./App.module.css";

function App(props) {
  useEffect(() => {
    // Получить данные о пользователе
    // Использовать ACTIVE_USER_ID
  }, [])

  return (
    <div className="container">
      <Header />
      <BrowserRouter>
        <main className={styles.main}>
          <Sidebar />
          <div className={styles.content}>
            <Routes>
              <Route path="/profile" element={<Profile />} />
              <Route path="/users" element={<Users />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
