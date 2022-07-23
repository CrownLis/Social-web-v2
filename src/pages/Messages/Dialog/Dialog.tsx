

import { Avatar, Form, Input, List } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMessages, postMessage } from '../../../API/socialWeb'
import { IMessage } from '../../../type/types'
import MyButton from '../../../UI/MyButton/MyButton'
import Loader from '../../Loader/Loader'

import style from './Dialog.module.css'

const Dialog: FC = () => {
  const params = useParams()
  const [messages, setMessages] = useState<IMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState('')

  const fetchMessages = async () => {
    console.log(params)
    let x = await getMessages(params.conversationId)
    setMessages(x.data)
    setIsLoading(false)
  }

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
        {isLoading ? <Loader/> : (
          <div className={style.wrapper}>
            <div className={style.dialog}>
            <List
              itemLayout="horizontal"
              dataSource={messages}
              renderItem={item => (
                <List.Item className={style.j}>
                  <List.Item.Meta
                  className={style.padding}
                    avatar={<Avatar src={item.author.avatar} />}
                    title={item.text}
                  />
                </List.Item>
              )}
            />
            </div>
            <div className={style.input}>
             <Form
              onFinish={post}
            >
             <div> <TextArea onChange={e => setMessage(e.target.value)} value={message}/></div>
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