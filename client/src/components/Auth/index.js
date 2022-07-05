import { Container, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { useAuth } from '../../hooks/AuthHook';

const AuthComponent = () => {
  const { request, loading } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
  });
  const createAc = async () => {
    console.log(formik.values)
    const data = await request("http://localhost:5000/api/auth/create", "POST", { ...formik.values });
    const user =  JSON.stringify(data);
    await localStorage.setItem("user", user)

    console.log(data)
  };
  const loginAcc = async () => {

    const data = await request("http://localhost:5000/api/auth/login", "POST", { ...formik.values })
    
    const user =  JSON.stringify(data);
    await localStorage.setItem("user", user)

    // const todo = await request("http://localhost:5000/api/auth/todos", "GET", data.token)
    console.log(data.token)
  }
  return (
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
        id="email"
        label="Email"
        variant="standard"
        required
        type="email"
        autoComplete='email'
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <TextField
        sx={{
          width: "90%",
          marginBottom: 5
        }}
        id="password"
        label="Password"
        variant="standard"
        required
        autoComplete="current-password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      <div
        style={{
          display: 'flex',
          width: "70%",
          justifyContent: 'space-between'
        }}
      >
        <Button
          sx={{
            width: "45%"
          }}
          variant="outlined"
          onClick={()=>createAc()}
          disabled={loading}
        >
          Create an account
        </Button>
        <Button
          sx={{
            width: "45%"
          }}
          variant="outlined"
          onClick={()=>loginAcc()}
          disabled={loading}
        >
          Login account
        </Button>
      </div>
    </Container>
  )
}
export default AuthComponent