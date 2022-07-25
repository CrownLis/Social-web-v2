

import { Avatar, Dropdown, Form, Input, List, Menu } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { FC, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { deleteMessage, getMessages, postMessage } from '../../../API/socialWeb'
import ActiveUserContext from '../../../context/ActiveUserContext'
import { IMessage } from '../../../type/types'
import MyButton from '../../../UI/MyButton/MyButton'
import Loader from '../../Loader/Loader'

import style from './Dialog.module.css'

const Dialog: FC = () => {
  const params = useParams()
  const [messages, setMessages] = useState<IMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState('')
  const { activeUser } = useContext(ActiveUserContext)

  const fetchMessages = async () => {
    console.log(params)
    let x = await getMessages(params.conversationId)
    setMessages(x.data)
    setIsLoading(false)
  }

  const removeMessage = async (id: number) => {
    await deleteMessage(id)
    await fetchMessages()
  };

  const post = async () => {
    let id = params.conversationId
    if (id) {
      let msg = { text: message, conversationId: id }
      await postMessage(msg)
      setMessage('')
      fetchMessages()
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
                      <Dropdown  overlay={<Menu className={style.delete}
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
                      </Dropdown> :  <div>{item.text}</div>} 
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