import styles from "./Posts.module.css";

const Posts = (props) => {
  return (
    <div className={styles.posts}>
      <h2>Посты</h2>
      {(props.post).map(post => <div className={styles.post}>Name: {post.body}</div>)}
    </div>
  );
};
export default Posts;
