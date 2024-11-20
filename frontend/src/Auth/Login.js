import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Grid, Avatar, Link as MuiLink  } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ApiServices } from '../services/apiServices';
import {login} from '../services/url_helper';
import { Link, Navigate, useNavigate } from 'react-router-dom';


const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate=useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);
    const payload={
      username:formData.username,
       password:formData.password
    }
      const response = await ApiServices.callServicePostWithFormData(login,payload)
      console.log("resposne",response)
      if(response.message=="Login successful"){
        navigate("/task")
      }
  };


  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
           <Typography>
                Don't have an account?{' '}
                <MuiLink component={Link} to="/signup">
                  Signup
                </MuiLink>
                </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
