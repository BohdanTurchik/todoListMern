import React, { useEffect, useState } from 'react';
import { Alert, Button } from '@mui/material';
import { FiCheckSquare, FiDelete } from "react-icons/fi";

import { useAuth } from '../../hooks/AuthHook';
import CreateTask from './createTask';
import { Container } from '@mui/system';

const TodoList = () => {
  const { request } = useAuth();
  const [todos, setTodos] = useState([])
  const user = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {
    const getTodos = async () => {
      const reqParam={
        id: user.user._id
      }
      const data = await request("http://localhost:5000/api/auth/todos", "POST", reqParam)
      setTodos(data.tasks)
      console.log(data)
    }
    getTodos()
  }, [])

  const deleteTask = async (item) => {
    const reqParam={
      id :item,
      idUser: user.user._id,
    }
    console.log(item)

    await request("http://localhost:5000/api/auth/del", "DELETE", reqParam)
  }

  const updateTask = async(item)=>{
    const reqParam = {
      id :item.taskId,
      idUser:user.user._id,
      isDone: item.isDone
    }
    
    await request("http://localhost:5000/api/auth/update", "PUT", reqParam)
  }
  const logout =  async()=>{
    localStorage.clear()
    // await request ("http://localhost:5000/api/auth/logout", "POST")
  }

  return (
    <div>
      <Button onClick={()=>logout()}>logout</Button>
      <Container maxWidth="sm"
      sx={{
        margin: '0 auto',
        width: '60%',
        padding: '3%',
        marginTop: 20,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        borderRadius: 3
      }}
    >
      {todos ? <div>
        
        <CreateTask />
        <div>{todos.map((item) => (
          <div
            
            key={item.taskId}>
            <Alert
              severity={item.isDone != false ? "success" : "error"}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'spaceAround',
                width: "100%"
              }}
            >{item.title}
              <div style={{
                display: 'flex',
              }}>
                <Button onClick = {()=>updateTask(item)}><FiCheckSquare /></Button>
                <Button onClick={() => deleteTask(item.taskId)}><FiDelete /></Button>
              </div>
            </Alert>
          </div>
        ))}</div>

      </div>
        : <CreateTask />}

    </Container >
    </div>
  )
}
export default TodoList;