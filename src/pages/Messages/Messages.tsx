

import { Avatar, Checkbox, Form, List, Modal, Skeleton } from 'antd'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import { FC, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { addConversation, getConversations, searchUsers } from '../../API/socialWeb'
import { getActiveUser } from '../../store/ducks/activeUser/selectors'
import { ADD_CONVERSATION, GET_CONVERSATIONS } from '../../store/ducks/dialogs/actions'
import { getConversationsState } from '../../store/ducks/dialogs/selectors'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { IConversation, IUser } from '../../type/types'
import MyButton from '../../UI/MyButton/MyButton'
import Loader from '../Loader/Loader'

import style from './Messages.module.css'

const CheckboxGroup = Checkbox.Group;

const Messages: FC = () => {

  const activeUser = useAppSelector(getActiveUser)
  const dialogs:IConversation[] = useAppSelector(getConversationsState)
  const dispatch = useAppDispatch()

  const navigator = useNavigate()
  const [isLoading, setIsLoading] = useState(true);
  const [checkList, setCheckList] = useState<CheckboxValueType[]>([])
  const [users, setUsers] = useState<IUser[]>([]);
  const [visible, setVisible] = useState(false);

  const fetchConservations = async () => {
    setIsLoading(true)
    dispatch({ type: GET_CONVERSATIONS, payload: (await getConversations()).data })
    setIsLoading(false);
  }
  console.log(dialogs)
  const onChangeSearch = async () => {
    if (activeUser?.id) {
      try {
        setIsLoading(true);
        const searchedUsersList = await searchUsers(activeUser.id);
        setUsers(searchedUsersList.data)
        setIsLoading(false);
      }
      catch {
        console.log('error')
      }
    }
  }
  const onChange = (list: CheckboxValueType[]) => {
    setCheckList(list)
  };

  const showModal = () => {
    setIsLoading(true)
    setVisible(true);
    onChangeSearch()
    setIsLoading(false)
  };

  const addDialog = async () => {
    let obj = {
      "participantIds": checkList
    }
    dispatch({type:ADD_CONVERSATION,payload:(await addConversation(obj)).data})
  }

  const handleCancel = () => {
    console.log('Clicked cancel button');
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
                    <List
                      className="demo-loadmore-list"
                      loading={isLoading}
                      itemLayout="horizontal"
                      dataSource={users}
                      size='large'
                      renderItem={item => (
                        <List.Item
                        >
                          <div>
                            <label htmlFor={`${item.id}`}>
                              <List.Item.Meta className={style.title}
                                avatar={<Avatar src={item.avatar} className={style.avatar} />}
                                title={`${item.firstName} ${item.lastName}`}
                              />
                            </label>
                          </div>
                          <div>
                            <Checkbox value={item.id} id={`${item.id}`}>Add to group</Checkbox>
                          </div>
                        </List.Item>)}
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
                          title={<NavLink to={`/messages/${item.id}`}>{item.id}</NavLink>}
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