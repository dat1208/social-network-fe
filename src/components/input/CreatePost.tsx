import React from 'react';

import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import ButtonMui from '@mui/joy/Button';
import Avatar from '@mui/joy/Avatar'
import Gallery from '../post/MediaGalleryCmpnW';
import 'bootstrap/dist/css/bootstrap.css';
import {AiFillCamera} from 'react-icons/ai'
import {BsFillCameraVideoFill} from 'react-icons/bs'
import {AiFillFileAdd} from 'react-icons/ai'
import {AiOutlineGif} from 'react-icons/ai'
import { Create_Post } from '../../interface/interfaces';
import handleSubmitService from '../../services/api/Post/postCreate';

import './CreatePostStyles.css'

interface props{
    urlAvatar: string;
    name:string;
    urlProfile:string;
}
interface Image {
    id: number;
    url: string;
  }

interface Post {
    Content: string;
    Media: Image[];
}



function CreatePost(props: props){

    const [post, setPost] = React.useState<Post>();
    const [text, setText] = React.useState('');
    const [imagePreviews, setImagePreviews] = React.useState<Array<string>>([]);
    const [images, setImages] = React.useState<FileList>();

    const ExampleContext = React.createContext<string|null>(null);

    function handleMedia(props:string[]){
        if(props.length === 0)
        {
            return;
        }
        else return <Gallery images={props}></Gallery>
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
    async function handleSubmit(){
        const status = await handleSubmitService(text, images) as unknown as boolean;
        if(status === true){
            console.log(status);
            setText("");
            setImagePreviews([]);
           
        }
        
    }
      
    return (

            
                        <div>
                        <div style={{marginBottom:5}} className='row p-0 input-group'>
                            <div className='col-sm-auto padding-0'>
                                <div className='input-group-img'>
                                <Avatar alt={props.name} src={props.urlAvatar}></Avatar>
                                </div>
                            </div>
                            <div className='col-sm input-group-form'>
                                <Textarea 
                                size="lg" 
                                placeholder="Type anything…" 
                                value={text}
                                onChange={(event) => setText(event.target.value)}
                                endDecorator={
                                    <Typography level="body3" sx={{ ml: 'auto' }}>
                                      {text.length} character(s)
                                    </Typography>
                                  }
                                  sx={{ minWidth: 300 }}
                                ></Textarea>
                            </div>
                        </div>
                        <div className='row img-display d-flex justify-content-center'>
                            {handleMedia(imagePreviews)}        
                        </div>
                        <div className='row p-0 w-100 btn-group'>
                            <div className='col-sm-auto'>
                            <label>
                            <a className='btn createpost-btn'><AiFillCamera className='createpost-icon'></AiFillCamera></a>
                                <input type="file" accept="image/*" style={{display:'none'}} multiple onChange={(e) => selectFiles(e)} />
                            </label>
                            <a className='btn createpost-btn'><BsFillCameraVideoFill className='createpost-icon'></BsFillCameraVideoFill></a>
                            <a className='btn createpost-btn'><AiFillFileAdd className='createpost-icon'></AiFillFileAdd></a>
                            <a className='btn createpost-btn'><AiOutlineGif className='createpost-icon'></AiOutlineGif></a>
                            </div>
                            <div className='col-sm float-right'>
                                <div className='float-right'>
                                    <ButtonMui onClick={handleSubmit}>Submit</ButtonMui>
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
            
                    
    );
}

export default CreatePost;
