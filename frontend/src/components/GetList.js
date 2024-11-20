import React, { useState } from 'react'
import { Typography, List, ListItem, ListItemText, Box, Button } from '@mui/material';
import { MdDelete, MdEdit } from "react-icons/md";
import Swal from 'sweetalert2';
import { ApiServices } from '../services/apiServices';
import { DeleteTask, UpdateTask, getTaskById,getTasks } from '../services/url_helper';
import UpdateModal from './UpdateModal';
import swal from 'sweetalert';
import ProjectTaskDetails from './ProjectTaskDetails';



function GetList({ taskList, getData,taskCount,getCount }) {
    const [open, setOpen] = useState(false);
    const [taskDetailsById, setTaskDetailsById] = useState

        ({
            taskNameById: '',
            taskDescriptionById: ''
        })
    
    const [idToUpdate, setIdToUpdate] = useState('');


    const handleOpen = async (index) => {
        setOpen(true);
        const response = await ApiServices.callServiceGet(getTaskById, taskList[index]?._id)
        setIdToUpdate(taskList[index]?._id)
        setTaskDetailsById((prevDetails) => ({ ...prevDetails, taskNameById: response.title }))
        setTaskDetailsById((prevDetails) => ({ ...prevDetails, taskDescriptionById: response.description }));
        getData();
    };
    const handleClose = () => setOpen(false);


    const handleDeleteTask = async (index) => {
        const taskToDeleteId = taskList[index]._id;
        Swal.fire({
            title: 'Warning',
            text: 'Are you sure you want to delete this task?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await ApiServices.callServiceDelete(DeleteTask, taskToDeleteId)
                console.log(response)
                getData()
                getCount()
            }
        });
    };

    const handleStatus=async(id)=>{
 
            const payload = { status:"completed" }
            const response = await ApiServices.callServicePutWithFormData(UpdateTask, id, payload)
            getData();
            setTaskDetailsById((prevDetails) => ({ ...prevDetails, taskNameById: '' }))
            setTaskDetailsById((prevDetails) => ({ ...prevDetails, taskDescriptionById: '' }));
            swal("Success", "Task updated successfully", "success");
            handleClose()
            getCount()
            
    }



    return (
        <div>
            <ProjectTaskDetails  getCount={getCount} taskCount={taskCount}/>
            <br/>
            <br/>

            <Typography variant="h4" mr={100} pr={24}>Task List</Typography>
            <List>
                {taskList.map((task, index) => (
                    <ListItem key={task._id} divider>
                        <ListItemText primary={`Title: ${task.title}`} secondary={`Description: ${task.description}`} />
                        <Box display="flex" alignItems="center">
                        <Box mr={6}>
                                {/* <MdEdit style={{ fontSize: '24px' }} /> */}
                                {task.status!="completed"?(<Button variant="contained" color="primary" onClick={() => handleStatus(task._id)}>
                                    Pending
                                </Button>):(<Button variant="contained" color="success" onClick={() => handleStatus(task._id)}>
                                    Completed
                                </Button>)}
                            </Box>
                            <Box mr={6}>
                                {/* <MdEdit style={{ fontSize: '24px' }} /> */}
                                <Button variant="contained" color="primary" onClick={() => handleOpen(index)}>
                                    Update
                                </Button>
                            </Box>
                            <Box mr={5}>
                                <Button variant="contained" onClick={() => handleDeleteTask(index)} sx={{ bgcolor: '#F44336', '&:hover': { bgcolor: '#D32F2F' } }}>
                                    Delete
                                </Button>
                            </Box>
                        </Box>
                    </ListItem>
                ))}
            </List>

            <UpdateModal open={open} handleClose={handleClose} getData={getData} idToUpdate={idToUpdate} setTaskDetailsById={setTaskDetailsById} taskDetailsById={taskDetailsById} />

        </div>
    )
}

export default GetList