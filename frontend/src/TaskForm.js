import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider, CssBaseline, IconButton } from '@mui/material';
import { Container, TextField, Button, Typography, Box, AppBar, Toolbar, } from '@mui/material';
import swal from 'sweetalert';
import './App.css';
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { ApiServices } from './services/apiServices';
import { getTasks, postTask } from './services/url_helper';
import GetList from './components/GetList';
import { IoIosLogOut } from "react-icons/io";
import { Height } from '@mui/icons-material';
import {useNavigate } from 'react-router-dom';
function TaskForm() {
  const [taskDetails,setTaskDetails]=useState({
    taskName:'',
    taskDescription:''
})
const [taskCount, setTaskCount] = useState({
  taskCompleted:0,
  taskPending:0
})
const navigate=useNavigate()
  const [taskList, setTaskList] = useState([]);
  const [index, setIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const submitHandler = async () => {
    const payload = {
      title: taskDetails.taskName, description: taskDetails.taskDescription,status:"pending"
    }
    const response = await ApiServices.callServicePostWithFormData(postTask, payload)
    setTaskDetails((prevDetails)=>({...prevDetails,taskName:''}));
    setTaskDetails((prevDetails)=>({...prevDetails,taskDescription:''}));

    swal("Success", "Task added successfully", "success");
    getData();
    getCount()
  }

  const getCount = async () => {
    const response = await ApiServices.callServiceGet(getTasks);
    const taskCompleted=response.filter(task => task.status=="completed").length
    setTaskCount((prevDetails)=>({...prevDetails,taskCompleted:taskCompleted}))
    setTaskCount((prevDetails)=>({...prevDetails,taskPending:response.length-taskCompleted}))

  };

  const getData = async () => {
    const response = await ApiServices.callServiceGet(getTasks);
    setTaskList(response)
  };

  const handleLogout = async () => {
   navigate("/")
  };
  useEffect(() => {
    getData();
  }, []);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Taskly
          </Typography>
          <IconButton edge="middle" color="inherit" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <CiLight /> : <MdDarkMode />}
          </IconButton>
          <IoIosLogOut onClick={handleLogout} style={{height:"26px",width:"20px"}} />
        </Toolbar>
      </AppBar>
      <Container className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <div>
          <Typography variant="h4" mr={96} pr={24}>Add tasks</Typography>
          <Box
            sx={{
              mt: '4',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              ml: 2,
              pr: 6,
              mb: 8,
              gap: 2,
            }}
          >
            <TextField
              label="Task"
              variant="outlined"
              value={taskDetails.taskName}
              onChange={(e) =>  setTaskDetails((prevDetails)=>({...prevDetails,taskName:e.target.value}))}
              required
              fullWidth
              margin="normal"
            />

            <TextField
              label="Description"
              variant="outlined"
              value={taskDetails.taskDescription}
              onChange={(e) =>  setTaskDetails((prevDetails)=>({...prevDetails,taskDescription:e.target.value}))}
              required
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={submitHandler}
              style={{ height: "52px", width: "120px" }}
            >
              Submit
            </Button>
          </Box>
        </div>
        <GetList taskList={taskList} getData={getData} taskCount={taskCount} getCount={getCount}/>
      </Container>
    </ThemeProvider>
  );
}

export default TaskForm;
