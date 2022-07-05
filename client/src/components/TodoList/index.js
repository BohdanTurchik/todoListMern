import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Box } from '@mui/material';
import { useFormik } from 'formik';
import { useAuth } from '../../hooks/AuthHook';

const TodoList = () => {
  const { request, loading } = useAuth();
  const [todos, setTodos] = useState([])
  const user = JSON.parse(localStorage.getItem("user"));
  const formik = useFormik({
    initialValues: {
      task: '',
    },
  });
  const addTodo = async () => {
    const reqParam = {
      id: user.user._id,
      task: formik.values.task
    }
    console.log(reqParam)
    const todo =await request("http://localhost:5000/api/auth/made", "POST", reqParam);
    console.log(todo)
   
  }

  useEffect(() => {
    const getTodos = async () => {
      const data = await request("http://localhost:5000/api/auth/todos", "GET" )
      setTodos(data)
      console.log(data)
    }
    getTodos()
  }, [])
  return (
    <div>
      <Container maxWidth="sm"
        sx={{
          margin: '0 auto',
          width: '50%',
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
        <TextField
          sx={{
            width: "90%",
            marginBottom: 5,

          }}
          id="task"
          label="Task"
          variant="standard"
          required
          type="text"
          autoComplete='text'
          onChange={formik.handleChange}
          value={formik.values.task}
        />
        <Button
          sx={{
            width: "45%"
          }}
          variant="outlined"
          onClick={() => addTodo()}
          disabled={loading}
        >
          Create an account
        </Button>
        <Box>{todos}</Box>
      </Container>
    </div>)
}
export default TodoList;