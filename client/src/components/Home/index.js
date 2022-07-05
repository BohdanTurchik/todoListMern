import React from 'react';
import AuthComponent from '../Auth/index.js';
import TodoList from '../TodoList/index.js';

const Home = () =>{
  const User = localStorage.getItem("user")
  return(
    <div>
      {(User) ? <TodoList/> : <AuthComponent/>}
    </div>
  )
}
export default Home;