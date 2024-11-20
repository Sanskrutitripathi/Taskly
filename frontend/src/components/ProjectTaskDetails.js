import React, { useEffect, useState } from 'react'
import { ApiServices } from '../services/apiServices';
import { getTasks } from '../services/url_helper';
import { Button, Grid, Typography } from '@mui/material';

function ProjectTaskDetails({getCount,taskCount}) {
 

    useEffect(()=>{
        getCount()
       
        
    },[])
  return (
    
        <Grid container spacing={2}>
            <Grid item xs={3}>
            <Button variant="contained" color="primary">
                    Total tasks completed: {taskCount.taskCompleted}
                    </Button>

            </Grid>
            <Grid item xs={3}>
            <Button variant="contained" color="warning" >
                    Total tasks remaining: {taskCount.taskPending}
                    </Button>
               
            </Grid>
        </Grid>
  )
}

export default ProjectTaskDetails