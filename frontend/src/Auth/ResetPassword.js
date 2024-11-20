// import React, { useState } from 'react'
// import { Modal } from '@mui/material';
// import {  TextField, Button, Box } from '@mui/material';
// import { ApiServices } from '../services/apiServices';
// import { UpdateTask } from '../services/url_helper';
// import swal from 'sweetalert';

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     height: 280,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//     display: 'flex',
//     flexDirection: 'column',

// };
// function ResetPassword() {
//    const [open,setOpen]=useState(true)
//     // const updateHandler = async () => {
//     //     const payload = { title: taskDetailsById.taskNameById, description: taskDetailsById.taskDescriptionById }
//     //     const response = await ApiServices.callServicePutWithFormData(UpdateTask, idToUpdate, payload)
//     //     getData();
//     //     setTaskDetailsById((prevDetails) => ({ ...prevDetails, taskNameById: '' }))
//     //     setTaskDetailsById((prevDetails) => ({ ...prevDetails, taskDescriptionById: '' }));
//     //     swal("Success", "Task updated successfully", "success");
//     //     handleClose()
//     };
//   return (
//     <Modal
//     open={open}
//     onClose={handleClose}
//     aria-labelledby="modal-title"
//     aria-describedby="modal-description"
// >
//     <Box sx={style}>
//         <Box>

//             <TextField
//                 label="Task"
//                 variant="outlined"
//                 value={taskDetailsById.taskNameById}
//                 onChange={(e) => setTaskDetailsById((prevDetails) => ({ ...prevDetails, taskNameById: e.target.value }))}
//                 required
//                 fullWidth
//                 margin="normal"
//             />

//             <TextField
//                 label="Description"
//                 variant="outlined"
//                 value={taskDetailsById.taskDescriptionById}
//                 onChange={(e) => setTaskDetailsById((prevDetails) => ({ ...prevDetails, taskDescriptionById: e.target.value }))}
//                 required
//                 fullWidth
//                 margin="normal"
//             />
//         </Box>

//         <Box sx={{ mt: 4 }}>

//             <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={updateHandler}
//                 style={{ height: "35px", width: "80px" }}
//             >
//                 Update
//             </Button>
//             <Button onClick={handleClose}>Close</Button>
//         </Box> 
//         </Box>
//         </Modal>


//   )
// }

// export default ResetPassword