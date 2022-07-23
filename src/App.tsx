import React, { FC, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import { TeamOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { authMe } from './API/socialWeb';
import { IUser } from './type/types';

import MyHeader from './components/Header/MyHeader';
import Guest from './pages/Guest/Guest';
import Profile from './pages/Profile/Profile';
import NotFound from './pages/NotFound/NotFound';
import Users from './pages/Users/Users';
import ActiveUserContext from './context/ActiveUserContext';
import UserProfile from './pages/UserProfile/UserProfile';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Loader from './pages/Loader/Loader';

import styles from './App.module.css';
import 'antd/dist/antd.css';
import './assets/styles/core.css';
import Messages from './pages/Messages/Messages';
import Dialog from './pages/Messages/Dialog/Dialog';


const App: FC = () => {
  const { Header, Content, Sider } = Layout;

  const [activeUser, setActiveUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const updateUser = (user: IUser | null) => {
    setActiveUser(user)
  }


  const active = async () => {
    const activeID = await authMe();
    setActiveUser(activeID?.data)
    setIsLoading(false)
  }

  useEffect(() => {
    active()
  }, []);

  const ActiveUserContextValue = { activeUser, updateUser };

  return (
    <ActiveUserContext.Provider value={ActiveUserContextValue}>
      <BrowserRouter>
        <div className="container">
          <Layout>
            <Header className={styles.head}>
              <MyHeader />
            </Header>
            <Layout>
              {activeUser ? <Sider width={200}>
                <Menu
                  mode="inline"
                  style={{ height: '100%', borderRight: 0 }}
                >
                  <NavLink to="/profile"
                    className={navData =>
                      navData.isActive ? styles.active : styles.default
                    }>
                    <div>
                      <UserOutlined /> Profile
                    </div>
                  </NavLink>
                  <NavLink
                    to="/users"
                    className={navData =>
                      navData.isActive ? styles.active : styles.default
                    }
                  >
                    <div>
                      <TeamOutlined /> Users
                    </div>
                  </NavLink>
                  <NavLink
                    to="/messages"
                    className={navData =>
                      navData.isActive ? styles.active : styles.default
                    }>
                    <div>
                      <MessageOutlined /> Messages
                    </div>
                  </NavLink>
                </Menu>
              </Sider> : null}
              <Layout style={{ padding: '0 24px 24px' }}>
                <Content
                  className="site-layout-background"
                  style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                  }}
                >
                  <div className={styles.content}>
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <Routes>
                        {activeUser ? (
                          <React.Fragment>
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/users" element={<Users />} />
                            <Route path="/users/:id" element={<UserProfile />} />
                            <Route path='/messages' element={<Messages/>}/>
                            <Route path="/messages/:conversationId" element={<Dialog />} />
                          </React.Fragment>
                        ) :
                          (
                            <React.Fragment>

                              <Route path="signIn" element={<SignIn />} />
                              <Route path="signUp" element={<SignUp />} />
                            </React.Fragment>
                          )
                        }
                        <Route path="guest" element={<Guest />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    )}
                  </div>
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </div>
      </BrowserRouter>
    </ActiveUserContext.Provider >
  );
};

export default App;
