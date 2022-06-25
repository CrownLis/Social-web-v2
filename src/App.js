import "./App.css"
import Header from './components/Header/header';
import Main from "./components/main/Main";
import React from "react";


function App(props) {
  return (
<div className='container'>
    <Header />
    <Main post={props.post.posts} dialogs={props.messagesPage.dialog} message={props.messagesPage.message}/>
    </div>
  );
}

export default App;
