import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Grid, Avatar, Link as MuiLink  } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { signup } from '../services/url_helper';
import { ApiServices } from '../services/apiServices';
import swal from 'sweetalert';
const Signup = () => {
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
      const response = await ApiServices.callServicePostWithFormData(signup,payload)
      console.log("resposne",response)
      if(response?.message=="User created successfully"){
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
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                name="username"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                value={formData.username}
                onChange={handleChange}
              />
            </Grid>
           
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Typography>
                Already have an account?{' '}
                <MuiLink component={Link} to="/">
                  Login
                </MuiLink>
                </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
