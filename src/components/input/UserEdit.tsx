import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar } from '@mui/material';
import './styles-useredit.css'

interface props{
  userId: string;
  displayName:string;
  emailAddress:string;
  username: string;
  urlAvatar:string;
}

export default function UserEdit(prop: props) {
  const [open, setOpen] = React.useState(false);
  const [displayName, setDisplayName] = React.useState(prop.displayName);
  const [emailAddress, setEmailAddress] = React.useState(prop.emailAddress);
  const [userId, setUserId] = React.useState(prop.userId);
  const [username, setUsername] = React.useState(prop.username);
  const [password, setPassword] = React.useState("");
  const [urlImage, setUrlImage] = React.useState(prop.urlAvatar);

  
  React.useEffect(() =>{
    
        
   },[]);

  const handleClickOpen = () => {
    setOpen(true);
   
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleSelectedImage(event: React.ChangeEvent<HTMLInputElement>): void {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      // Do something with the selected file, e.g.:
      const image = new Image();
      image.src = URL.createObjectURL(selectedFile);
      image.onload = () => {
        
        setUrlImage(image.src);

        
        // ... do something with the loaded image ...
      };
    }
  }
  

  function handleSave()  {
    alert(displayName + username + emailAddress + password);
  }

  return (
    <div>
      <Button onClick={handleClickOpen} color='inherit' endIcon={<EditIcon />}>
        Edit
       </Button>
      <Dialog fullWidth={true} maxWidth={'md'} open={open} onClose={handleClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To change your profile.
          </DialogContentText>
          <div className="row">
          <div className="col-8">
          <TextField  margin="dense" id="displayname" label="Display Name" value={displayName} onChange={(e)=>{setDisplayName(e.target.value)}} fullWidth ></TextField>
          <TextField  margin="dense" id="email" label="Email Address" type="email" fullWidth value={emailAddress} onChange={(e)=>{setEmailAddress(e.target.value)}}></TextField>
          <TextField  margin="dense" id="username" label="Username" type="text" fullWidth value={username} onChange={(e)=>{setUsername(e.target.value)}}></TextField>
          <TextField  margin="dense" id="password" label="Password" type="password" fullWidth value={password} onChange={(e)=>{setPassword(e.target.value)}}></TextField>
          </div>
          <div className="col-4 right-col">
            <div className="avatar w-100 h-100">
            <Avatar alt='Thành Đạt' variant="rounded" src={urlImage} sx={{ width: '100%', height: '100%' }}></Avatar>
            <label>
              <a id='btn-avatar-edit' ><EditIcon style={{color:'gray'}}/></a>
              <input type="file" accept="image/*" style={{display:'none'}} onChange={(e) => handleSelectedImage(e)} />
            </label>
  
            </div>
            
            
          </div>
          </div> 
        </DialogContent>
        <DialogActions>
          <Button color='warning' onClick={handleClose}>Cancel</Button>
          <Button color='primary' onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


