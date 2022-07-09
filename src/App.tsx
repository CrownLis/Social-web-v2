import React, { FC, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import axios from 'axios';
import { TeamOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, PageHeader } from 'antd';

import Profile from './pages/Profile/Profile';
import NotFound from './pages/NotFound/NotFound';
import Users from './pages/Users/Users';
import { ACTIVE_USER_ID } from './constants/user';
import ActiveUserContext from './context/ActiveUserContext';
import UserProfile from './pages/UserProfile/UserProfile';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import { IUser } from './type/types';
import Loader from './pages/Loader/Loader';

import styles from './App.module.css';
import 'antd/dist/antd.css';
import './assets/styles/core.css';
import MyHeader from './components/Header/MyHeader';

const App: FC = () => {
  const { Header, Content, Sider } = Layout;

  const [activeUser, setActiveUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [anotherUsers, setAnotherUsers] = useState<IUser[]>();

  const fetchUsers = async () => {
    const response = await axios.get<IUser[]>(
      `https://jsonplaceholder.typicode.com/users`,
    );
    const anotherUsers = response.data;
    setAnotherUsers(anotherUsers);
    setActiveUser(anotherUsers[ACTIVE_USER_ID - 1]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const ActiveUserContextValue = { activeUser };

  return (
    <ActiveUserContext.Provider value={ActiveUserContextValue}>
      <BrowserRouter>
        <div className="container">
          <Layout>
            <Header className={styles.head}>
              <MyHeader />
            </Header>
            <Layout>
              <Sider width={200} className={styles.site_layout_background}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['0']}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%', borderRight: 0 }}
                >
                  <Menu.Item key="Profile">
                    <NavLink
                      to="/profile"
                      className={navData =>
                        navData.isActive ? styles.active : styles.default
                      }
                    >
                      <UserOutlined /> Profile
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key="Users">
                    <NavLink
                      to="/users"
                      className={navData =>
                        navData.isActive ? styles.active : styles.default
                      }
                    >
                      <TeamOutlined /> Users
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key="Messages">
                    <NavLink
                      to="/message"
                      className={navData =>
                        navData.isActive ? styles.active : styles.default
                      }
                    >
                      <MessageOutlined /> Messages
                    </NavLink>
                  </Menu.Item>
                </Menu>
              </Sider>
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
                        <Route path="/main" />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/users" element={<Users />} />
                        {anotherUsers?.map(state => (
                          <Route
                            path={`/users/${state.id}`}
                            element={
                              <UserProfile
                                name={state.name}
                                email={state.email}
                                phone={state.phone}
                                address={state.address}
                                id={state.id}
                              />
                            }
                          />
                        ))}
                        <Route path="*" element={<NotFound />} />
                        <Route path="signIn" element={<SignIn />} />
                        <Route path="signUp" element={<SignUp />} />
                      </Routes>
                    )}
                  </div>
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </div>
      </BrowserRouter>
    </ActiveUserContext.Provider>
  );
};

export default App;
