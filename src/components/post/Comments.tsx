import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { Response_Get_Comments, CommentsItf } from '../../interface/interfaces'; 
import getComments from '../../services/api/Post/commentsFetch';

interface Props {
    idPost: string; 
  }

const Comments : React.FC<Props> = ({ idPost }) => {


  const [data, setData] = React.useState({
    data: Array<CommentsItf>()
   });
  const [numofComments,setNumofComments] = React.useState();
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  
    const handleClickOpen = (scrollType: DialogProps['scroll']) => async () => {
      await fetchComments();
      setOpen(true); 
      setScroll(scrollType);

     
      
  }
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const descriptionElementRef = React.useRef<HTMLElement>(null);
    React.useEffect(() => {
      if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
          descriptionElement.focus();
        }
      }
    }, [open]);


    async function fetchComments(){
        const getData = async () => {
            
            const CommentsResponse = await getComments(idPost,"",0,10) as unknown as Array<CommentsItf>;
            
            if(CommentsResponse != null)
                setData({data:CommentsResponse});

                console.log(CommentsResponse);
                console.log(data.data);
        };
        
      await getData();
     
        
    }
    
  
    return (
      <div>
        <Button onClick={handleClickOpen('paper')}>Comments</Button>

        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">Comments Detail</DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              {data.data.map(comment =>(
              <div>
              <List sx={{ width: 500, maxWidth: '70%', bgcolor: 'background.paper' }}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                    <Avatar alt={comment.OwnerDisplayName} src={comment.OwnerAvatarURL} />
                    </ListItemAvatar>
                    <ListItemText 
                    primary={comment.OwnerDisplayName}
                    secondary={
                        <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {comment.OwnerDisplayName}
                        </Typography>
                        {"-"+comment.Content}
                        </React.Fragment>
                    }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
              </List>
              </div>
              ))}
              
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  export default Comments;