

import { Avatar, Checkbox, Form, List, Modal, Skeleton } from 'antd'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import { FC, useCallback, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Virtuoso } from 'react-virtuoso'
import { getAuth } from '../../store/ducks/auth/selectors'
import { addUserConversations, getUserConversations } from '../../store/ducks/dialogs/asyncActions'
import { getConversationsLoading, getConversationsState } from '../../store/ducks/dialogs/selectors'
import { getMoreUsers, getUsers } from '../../store/ducks/users/asyncActions'
import { getLimitUsers, getLoadingMoreUsers, getUsersState } from '../../store/ducks/users/selectors'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { IConversation, IUser } from '../../type/types'
import MyButton from '../../UI/MyButton/MyButton'
import Loader from '../Loader/Loader'

import style from './Messages.module.css'

const CheckboxGroup = Checkbox.Group;

const Messages: FC = () => {

  const activeUser = useAppSelector(getAuth)
  const dialogs: IConversation[] = useAppSelector(getConversationsState)
  const dispatch = useAppDispatch()

  const isLoading = useAppSelector(getConversationsLoading)
  const [checkList, setCheckList] = useState<CheckboxValueType[]>([])
  const users = useAppSelector(getUsersState)
  const [visible, setVisible] = useState(false);
  const limit = useAppSelector(getLimitUsers)
  const isLoadingMoreUsers = useAppSelector(getLoadingMoreUsers)

  const loadMore = useCallback(() => {
    if (limit <= 100) {
      return setTimeout(() => {
        dispatch(getMoreUsers(activeUser.id, limit))
      }, 200)
    } else {
      return null
    }
  }, [dispatch(getMoreUsers)])

  const fetchConservations = async () => {
    dispatch(getUserConversations())
  }
  const ChangeSearch = async () => {
    try {
      dispatch(getUsers(activeUser.id, 10))
    }
    catch {
      throw new Error("error");
    }
  }
  const onChange = (list: CheckboxValueType[]) => {
    setCheckList(list)
  };

  const showModal = () => {
    setVisible(true);
    ChangeSearch()
  };

  const addDialog = async () => {
    let obj = {
      "participantIds": checkList
    }
    dispatch(addUserConversations(obj))
    setVisible(false);
  }

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    fetchConservations()
  }, [])

  if (dialogs) {
    return (
      isLoading ?
        <Loader />
        :
        (
          <div className={style.userList}>
            <MyButton onClick={showModal}>Create dialog</MyButton>
            <Modal
              title="Create dialog"
              visible={visible}
              confirmLoading={isLoading}
              footer={null}
              closable={false}
            >
              <Form
                onFinish={showModal}

              >
                <Form.Item>
                  <CheckboxGroup onChange={onChange} className={style.checkbox}>
                  <Virtuoso
                  style={{ height: 560 }}
                  data={users}
                  endReached={loadMore}
                  overscan={200}
                  itemContent={(index, user) => {
                    return <List.Item><div>
                      <label htmlFor={`${user.id}`}>
                      <List.Item.Meta className={style.title}
                        avatar={<Avatar src={user.avatar} className={style.avatar} />}
                        title={`${user.firstName} ${user.lastName}`}
                      />
                      </label>
                      </div>
                      <div>
                            <Checkbox value={user.id} id={`${user.id}`}>Add to group</Checkbox>
                          </div>
                          </List.Item>
                  }}
                  components={isLoadingMoreUsers ? { Footer } : {}}
                />
                  </CheckboxGroup>
                </Form.Item>
                <Form.Item className={style.btn}>
                  <MyButton type="primary" htmlType="submit" onClick={addDialog}>
                    Create
                  </MyButton>
                  <MyButton type="primary" htmlType="button" onClick={handleCancel}>
                    Cancel
                  </MyButton>
                </Form.Item>
              </Form>
            </Modal>
            <div>
              <div
                style={{
                  height: 670,
                  overflow: 'auto',
                  padding: '0 16px',
                }}
              >
                <List
                  className="demo-loadmore-list"
                  loading={isLoading}
                  itemLayout="horizontal"
                  dataSource={dialogs}
                  size='large'
                  renderItem={item => (
                    <List.Item
                    >
                      <Skeleton avatar title={false} loading={false} active >
                        <List.Item.Meta className={style.title}
                          title={<NavLink to={`/messages/${item.id}`}>Participants:{item.participants?.map(name => <span><br></br>{name.firstName} {name.lastName}</span>)}</NavLink>}
                          description={<span>{item.lastMessage ? item.lastMessage.text : ''}</span>}
                        />
                      </Skeleton>
                    </List.Item>
                  )}
                />
              </div>
            </div>
          </div>
        )
    )
  } else {
    return (
      null
    )
  }
}

export default Messages

const Footer = () => {
  return (
    <div
      style={{
        padding: '2rem',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      Loading...
    </div>
  )
}