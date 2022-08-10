

import { Avatar, Dropdown, Form, List, Menu } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import TextArea from 'antd/lib/input/TextArea'
import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getAuth } from '../../../store/ducks/auth/selectors'
import { getDialogMessages, getMessagesLoading } from '../../../store/ducks/messages/selectors'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { IMessage } from '../../../type/types'
import MyButton from '../../../UI/MyButton/MyButton'
import Loader from '../../Loader/Loader'
import { addNewMessage, deleteMessages, getConversationMessages } from './../../../store/ducks/messages/asyncAction'

import style from './Dialog.module.css'

const Dialog: FC = () => {

  const [form] = useForm()
  const dispatch = useAppDispatch()
  const messages: IMessage[] = useAppSelector(getDialogMessages)
  const params = useParams()
  const isLoading = useAppSelector(getMessagesLoading)
  const activeUser = useAppSelector(getAuth)

  const fetchMessages = async () => {
    dispatch(getConversationMessages(params.conversationId))
  }

  const removeMessage = async (id: number) => {
    dispatch(deleteMessages(id));
  };

  const post = async () => {
    if (params.conversationId) {
      let msg = { text: form.getFieldValue('text'), conversationId: params.conversationId }
      dispatch(addNewMessage(msg))
      form.resetFields()
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
                renderItem={item =>
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
                          ]}
                        />}>
                          <div>{item.text}</div>
                        </Dropdown> : <div>{item.text}</div>}
                    />
                  </List.Item>
                }
              />
            </div>
            <div className={style.input}>
              <Form
                form={form}
                onFinish={post}
              >
                <Form.Item
                  name="text"
                >
                  <TextArea />
                </Form.Item>
                <MyButton htmlType='submit'>send</MyButton>
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