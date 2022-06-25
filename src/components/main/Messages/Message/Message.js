import MessageCss from './Message.module.css'

let Message = (props) => {
return (
<div className={MessageCss.message}>{props.text}</div>

)

}

export default Message