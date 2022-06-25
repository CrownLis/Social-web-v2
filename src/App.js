import "./App.css"
import Header from './components/Header/header';
import Main from "./components/main/Main";
import React from "react";


function App(props) {
  return (
<div className='container'>
    <Header />
    <Main post={props.state.profilePage.posts} dialogs={props.dialogs} message={props.message}/>
    </div>
  );
}

export default App;
