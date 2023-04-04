import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import deletePost from '../../services/api/Post/deletePost';
import { CameraAltRounded } from '@mui/icons-material';
import Gallery from "./MediaGalleryCmpn";
import userEdit from '../../services/api/Post/editPost';

const options = ['Edit post', 'Delete post'];
interface props{
    pid: string;
    text:string;
    images: Array<string>;
}
export default function SplitButton(props: props) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [text, setText] = React.useState(props.text);
  const [imagePreviews, setImagePreviews] = React.useState<Array<string>>(props.images);
  const [images, setImages] = React.useState<FileList>();


  const handleClick = async () => {
   //alert(`You clicked ${options[selectedIndex]}`);
    if(selectedIndex === 1)
       await deletePost(props.pid);

    else if(selectedIndex === 0) 
        setOpenEdit(true); 
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };



  const handleClickOpenEdit = () => {
    setOpenEdit(true);
   
  };

  const handleEditCloseEdit = () => {
    setOpenEdit(false);
  };

   async function handleSaveEdit() {
      if(props.pid)
        await userEdit(images,text,props.pid);
    }
    async function selectFiles(e: React.ChangeEvent<HTMLInputElement>){
      let files = e.target.files;

      const temp: Array<string> = [];
  
      if (files) {
          setImages(files);
          for (let i = 0; i < files.length; i++) {
              temp.push(URL.createObjectURL(files[i]));
          }
      
          setImagePreviews(temp);
          console.log(imagePreviews);

    }}
  return (
    <React.Fragment>
      <ButtonGroup variant="outlined" ref={anchorRef} aria-label="split button">
        <Button onClick={handleClick}>{options[selectedIndex]}</Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

      <Dialog style={{paddingLeft:"2%"}} fullWidth={true} maxWidth={'lg'} open={openEdit} onClose={handleEditCloseEdit}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To change your post.
          </DialogContentText>
          <div className="row">
            <div style={{marginBottom:"3%"}} className="row">
            <TextField  margin="normal" id="text" value={text} onChange={(e) => {setText(e.currentTarget.value)}} fullWidth ></TextField>
            </div>
           
           <div className="row">
            {(imagePreviews.length > 0) ? <Gallery images={imagePreviews}></Gallery> : <></>}
            
           </div>
           <div className="row -100 h-100">
                <label>
                <a id='btn-avatar-edit' ><CameraAltRounded style={{color:'gray'}}/></a>
                <input type="file" accept="image/*" multiple onChange={(e) => selectFiles(e)} style={{display:'none'}}  />
                </label>
            </div>
            
            
          </div> 
        </DialogContent>
        <DialogActions>
          <Button color='warning' onClick={handleEditCloseEdit}>Cancel</Button>
          <Button color='primary' onClick={handleSaveEdit}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    
  );
}