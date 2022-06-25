import PostCss from './post.module.css'

let Post = (props) => {
    return (
        <div className={PostCss.newComment}>
        <img src={props.urlAvatar} alt={props.username}></img>
        <span>{props.newComment}</span>
    </div>
    )
}

export default Post