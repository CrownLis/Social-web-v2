import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Post from './components/main/Profile/posts/post/post'
import Dialog from './components/main/Messages/Dialog/Dialog';
import Message from './components/main/Messages/Message/Message';

let postData = [
  {url: 'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcS1xiT6qVFhxkibqkniltoCX2igbcSxDhosS_GHdrmCcvA2UnX-3n71K_L-uLGQfBAT', username: 'Джонатан', newComment:'А ты красавчик'},
  {url: 'https://oir.mobi/uploads/posts/2020-04/thumbs/1586448949_13-p-ember-kherd-18.jpg', username: 'Эмбер Херд', newComment:'Ты свободен?' }
]

let postsElem = postData.map(post => <Post urlAvatar ={post.url} username= {post.username} newComment={post.newComment} />)

let DialogData = [
  {name:'Антон', id:'1'},
  {name:'Петр',id:'2'},
  {name:'Вася',id:'3'},
  {name:'Стас',id:'4'},
  {name:'Юля',id:'5'},
  {name:'Леха',id:'6'}
]

let dialogs = DialogData.map(dialog => <Dialog name={dialog.name} id ={dialog.id}/>)

let messageData = [
{text:'Ку'},
{text:'Ты как?'},
{text:'Все хорошо?'}
]

let messagesElements = messageData.map(message => <Message text={message.text}/>)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App post={postsElem} message={messagesElements} dialogs={dialogs}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
