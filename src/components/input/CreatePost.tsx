import React from 'react';

import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import ButtonMui from '@mui/joy/Button';
import Avatar from '@mui/joy/Avatar'
import Gallery from '../post/MediaGalleryCmpnW';

import {AiFillCamera} from 'react-icons/ai'
import {BsFillCameraVideoFill} from 'react-icons/bs'
import {AiFillFileAdd} from 'react-icons/ai'
import {AiOutlineGif} from 'react-icons/ai'
import init from '../../services/api/config/init'
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
    const [images, setImages] = React.useState<FileList | null>();

    function handleMedia(props:string[]){
        if(props.length === 0)
        {
            return;
        }
        else return <Gallery images={props}></Gallery>
   }

    function handleSubmit(){
        
        const formData = new FormData();
        formData.append('Content',text);
        if(images)
        {
            for (let i = 0; i < images.length; i++) {
                formData.append('Media',images[i]);
            }
        }
        init.with_token.post('/posts',formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
        console.log(formData.getAll('Content'));
        console.log(formData.getAll('Media'));
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
        <div className='row border m-0 rounded bg-white create-post w-100'>
                        <div className='row p-0 input-group border-bottom'>
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
                        <div role='group' className='row p-0 btn-group'>
                            <div className='col-sm-auto'>
                            <label>
                            <a className='btn createpost-btn'><AiFillCamera className='createpost-icon'></AiFillCamera></a>
                                <input type="file" accept="image/*" style={{display:'none'}} multiple onChange={(e) => selectFiles(e)} />
                            </label>
                            <a className='btn createpost-btn'><BsFillCameraVideoFill className='createpost-icon'></BsFillCameraVideoFill></a>
                            <a className='btn createpost-btn'><AiFillFileAdd className='createpost-icon'></AiFillFileAdd></a>
                            <a className='btn createpost-btn'><AiOutlineGif className='createpost-icon'></AiOutlineGif></a>
                            </div>
                            <div className='col-sm'>
                                <div className='float-right'>
                                <ButtonMui onClick={handleSubmit}>Submit</ButtonMui>
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
    );
}

export default CreatePost;