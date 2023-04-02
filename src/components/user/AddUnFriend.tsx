import Button from '@mui/material/Button';
import React from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { IconButton } from '@mui/material';

interface props{
    status:boolean 
    userId:string
}


export default function AddUnFriend (props: props){
    const [addSend, setAddSend] = React.useState(false);
    const [status, setStatus] = React.useState(props.status);

    const handleClick = () => {
        console.log('Button clicked');
        // Do something with the event object
      };

    return (
        <>
        {status ? <Button variant='outlined'>Unfriend</Button> : 
        <IconButton color={addSend ? "primary" : "inherit"}  onClick={handleClick} component="label">
        <PersonAddIcon />
        </IconButton>}
        </>
    )
}