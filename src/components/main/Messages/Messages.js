import MessagesCss from './Messages.module.css'


let Messages = (props) => {
    return (
        <div className={MessagesCss.content}>
            <div className={MessagesCss.dialogs}>
            {props.dialogs}
            </div>
            <div className={MessagesCss.messages}>
                  {props.message}
            </div>
        </div>

    )
}

export default Messages