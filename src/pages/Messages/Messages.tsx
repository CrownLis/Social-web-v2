

import { Avatar, Checkbox, Form, Input, List, Modal, Skeleton } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import FormItem from 'antd/lib/form/FormItem'
import FormItemLabel from 'antd/lib/form/FormItemLabel'
import Item from 'antd/lib/list/Item'
import { FC, useContext, useEffect, useState } from 'react'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { addConversation, getConversations, searchUsers } from '../../API/socialWeb'
import ActiveUserContext from '../../context/ActiveUserContext'
import { IConversation, IUser } from '../../type/types'
import MyButton from '../../UI/MyButton/MyButton'
import Loader from '../Loader/Loader'

import style from './Messages.module.css'

const CheckboxGroup = Checkbox.Group;

const Messages: FC = () => {

  const navigator = useNavigate()
  const [isLoading, setIsLoading] = useState(true);
  const [checkList, setCheckList] = useState<CheckboxValueType[]>([])
  const [users, setUsers] = useState<IUser[]>([]);
  const { activeUser } = useContext(ActiveUserContext);
  const [conservations, setConservations] = useState<IConversation[]>([])
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const fetchConservations = async () => {
    setIsLoading(true)
    const List = await getConversations()
    setConservations(List.data)
    setIsLoading(false);
  }

  const onChangeSearch = async () => {
    if (activeUser?.id) {
      try {
        const searchedUsersList = await searchUsers(activeUser.id);
        setUsers(searchedUsersList.data)
        setIsLoading(false);;
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
    setVisible(true);
    onChangeSearch()
  };

  const addDialog = async () => {
    console.log(checkList)
    let obj = {
      "participantIds":checkList
    }
    console.log(obj)
    let x = await addConversation(obj)
    console.log(x)
    navigator(`/messages/${x.data.id}`)
  }

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  useEffect(() => {
    fetchConservations()
  }, [])


  if (conservations) {
    return (
      <div className={style.userList}>
        <MyButton onClick={showModal}>Create dialog</MyButton>
        <Modal
          title="Create dialog"
          visible={visible}
          confirmLoading={confirmLoading}
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
        {isLoading ? (
          <Loader />
        ) :
          (
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
                  dataSource={conservations}
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
          )
        }
      </div>
    )
  } else {
    return (
      null
    )
  }
}

export default Messages