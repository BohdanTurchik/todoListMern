import React from 'react';
import { Container, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import { useAuth } from '../../hooks/AuthHook';
import { v4 as uuidv4 } from 'uuid';

const CreateTask = () =>{
  const { request, loading } = useAuth();
  const user = JSON.parse(localStorage.getItem("user"));

  const formik = useFormik({
    initialValues: {
      task: '',
    },
  });
  const addTodo = async () => {
    const reqParam = {
      id: user.user._id,
      task: formik.values.task,
      taskId: uuidv4(), 
      isDone: false
    }
    console.log(reqParam)
    const todo = await request("http://localhost:5000/api/auth/made", "POST", reqParam);
    console.log(todo)

  }

  return (
    
    <Container maxWidth="sm"
      
    >
      <TextField
        sx={{
          width: "95%",
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
          margin: "0 25% 10%",
          width: "50%"
        }}
        variant="outlined"
        onClick={() => addTodo()}
        disabled={loading}
      >
        Create an account
      </Button>
    </Container>
  )
}
export default CreateTask;