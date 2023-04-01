import SendIcon from '@mui/icons-material/Send';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import init from "../../services/api/config/init";
import React from 'react';
import { Box, IconButton, TextField } from '@mui/material';

interface Props {
    pId :string;
}

const NewComment : React.FC<Props> = ({pId}) => {

    const [newComment, setNewComment] = React.useState("");
    
    function sendCommentHandle(){0
        if(newComment.length === 0){
            Swal.fire({
                title: 'Empty',
                text: 'Please enter a comment',
                icon: 'error',
                confirmButtonText: 'Get back',
                allowOutsideClick: true,
            })
      }
        else {
            let data = {
                PostId : pId,
                Comment: newComment
            }
            init.with_token.post("/posts/comments",data).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err); 
            })
        }
    }

    return (
     <div className='row mt-3' >
        <div className="col-sm">
                                <Box 
                                    sx={{
                                    
                                        maxWidth: '100%',
                                    }}
                                    >
                                    <TextField onChange={(e) => {
                                        setNewComment(e.target.value);
                                    }} value={newComment} size="small" fullWidth label="Leave a comment" id="fullWidth" />
                                </Box>
        </div>
        <div className='col-sm-auto'>
            <IconButton onClick={sendCommentHandle} color="primary" sx={{ p: '10px' }} aria-label="directions">
            <SendIcon></SendIcon>
            </IconButton>
        </div>       
     </div>
        
    );
}

export default NewComment;


   