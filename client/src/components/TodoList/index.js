import React, { useEffect, useState } from 'react';
import { Alert, Button } from '@mui/material';
import { FiCheckSquare, FiDelete } from "react-icons/fi";

import { useAuth } from '../../hooks/AuthHook';
import CreateTask from './createTask';
import { Container } from '@mui/system';

const TodoList = () => {
  const { request } = useAuth();
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const getTodos = async () => {
      const data = await request("http://localhost:5000/api/auth/todos", "GET")
      setTodos(data[0].tasks)
      console.log(data[0].tasks)
    }
    getTodos()
  }, [])

  const deleteTask = async (item) => {
    console.log(item)

    await request("http://localhost:5000/api/auth/del", "DELETE",)
  }

  return (
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
            
            key={item.index}>
            <Alert
              severity={item.isDone = false ? "success" : "error"}
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
                <Button><FiCheckSquare /></Button>
                <Button onClick={() => deleteTask(item)}><FiDelete /></Button>
              </div>
            </Alert>
          </div>
        ))}</div>

      </div>
        : <CreateTask />}

    </Container >)
}
export default TodoList;