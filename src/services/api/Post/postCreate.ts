import init from "../config/init";
import { Create_Post, Response_Create_Post } from "../../../interface/interfaces";
import Swal from 'sweetalert2/dist/sweetalert2.js'

async function handleSubmitService(text:string,images:FileList | undefined) {
        
    const formData = new FormData();

    let check:boolean = false;

    formData.append('Content',text);
    if(images)
    {
        for (let i = 0; i < images.length; i++) {
            formData.append('Media',images[i]);
        }
    }
    await init.with_token.post('/posts',formData,{
        headers:{
            "Content-Type":"multipart/form-data"
        },
    }).then(async res => {
        const response = res.data as unknown as Response_Create_Post;
        check = handleCreatePostResponse(response);
            
        
        
    }).catch(err => {
        check = false;
        console.log(err);
    })
    console.log(formData.getAll('Content'));
    console.log(formData.getAll('Media'));

    return check;
}

function handleCreatePostResponse(response: Response_Create_Post){
    const Status = response.Status;
    let check:boolean = false;
    switch (Status) {
        case 0:
            Swal.fire({
                title: 'Successfully',
                text: 'Your new post on feed right now',
                icon: 'success',
                confirmButtonText: 'Get back',
                allowOutsideClick: true,
                didClose() {
                    window.location.reload();
                },
            })
            check = true;
            break;
            
    
        default:
            Swal.fire({
                title: 'Have error',
                text: 'Your post has not created yet',
                icon: 'error',
                confirmButtonText: 'Try again!',
                allowOutsideClick: true,
            })
            check = false;
            break;
    }
    return check;
}

export default handleSubmitService