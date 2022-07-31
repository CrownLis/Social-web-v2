

import { Avatar, Dropdown, Form, Input, List, Menu } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { deleteMessage, getMessages, postMessage } from '../../../API/socialWeb'
import { getActiveUser } from '../../../store/ducks/activeUser/selectors'
import { ADD_MESSAGE, DELETE_MESSAGE, GET_MESSAGES } from '../../../store/ducks/dialogs/actions'
import { getDialogMessages } from '../../../store/ducks/dialogs/selectors'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { IMessage } from '../../../type/types'
import MyButton from '../../../UI/MyButton/MyButton'
import Loader from '../../Loader/Loader'

import style from './Dialog.module.css'

const Dialog: FC = () => {

  const dispatch = useAppDispatch()
  const messages:IMessage[] = useAppSelector(getDialogMessages)
  const params = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState('')
  const activeUser = useAppSelector(getActiveUser)

  const fetchMessages = async () => {
    setIsLoading(true)
    dispatch({type:GET_MESSAGES,payload:(await getMessages(params.conversationId)).data})
    setIsLoading(false)
  }

  const removeMessage = async (id: number) => {
    dispatch({type:DELETE_MESSAGE,payload:id});
  };

  const post = async () => {
    if (params.conversationId) {
      let msg = { text: message, conversationId: params.conversationId }
      dispatch({type:ADD_MESSAGE,payload:msg})
      setMessage('')
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  if (messages) {
    return (
      <div className={style.container}>
        {isLoading ? <Loader /> : (
          <div className={style.wrapper}>
            <div className={style.dialog}>
              <List
                itemLayout="horizontal"
                dataSource={messages}
                renderItem={item => (
                  <List.Item className={item.authorId !== activeUser?.id ? style.right : style.left}>
                    <List.Item.Meta
                      className={style.flexNone}
                      avatar={<Avatar src={item.author.avatar} />}
                      title={item.authorId === activeUser?.id ?
                        <Dropdown overlay={<Menu className={style.delete}
                          items={[
                            {

                              key: '1',
                              label: (
                                <div onClick={() => removeMessage(item.id)}>delete</div>
                              ),

                            },
                          ]
                          }
                        />}>
                          <div>{item.text}</div>
                        </Dropdown> : <div>{item.text}</div>}
                    />
                  </List.Item>
                )}
              />
            </div>
            <div className={style.input}>
              <Form
                onFinish={post}
              >
                <div> <TextArea onChange={e => setMessage(e.target.value)} value={message} /></div>
                <div>  <MyButton htmlType='submit'>send</MyButton></div>
              </Form>
            </div>
          </div>
        )
        }
      </div>
    )
  } else {
    return (<div></div>)
  }
}

export default Dialog