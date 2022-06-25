
import postsCss from './posts.module.css'


let Posts = (props) => {
    return (
        <div className={postsCss.comment}>
            <h2>Оставить комментарий</h2>
            <textarea maxLength={100} placeholder={'Оставьте комментарий'}></textarea>
            <button>Отправить</button>
            {props.post}
        </div>
    )
}
export default Posts