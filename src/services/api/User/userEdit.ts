import TokenServices from "../../token/TokenServices";
import init from "../config/init";
import Swal from 'sweetalert2/dist/sweetalert2.js'

import { Response_EditUser } from "../../../interface/interfaces";
interface Request{
    DisplayName:string;
    Email: string;
    Username: string;
    AvatarUrl: File | undefined;
    Password: string;
    uid:string
}

async function editUser(props: Request){
    if(props.Password.length > 0 && props.Password)
    {
        const formData = new FormData();
        formData.append('Username', props.Username);
        formData.append('Displayname', props.DisplayName);
        formData.append('Email', props.Email);
        formData.append('Password', props.Password);
        if(props.AvatarUrl)
            formData.append('AvatarUrl', props.AvatarUrl);
        else {
            const avatarUrl = new Blob();
            formData.append('AvatarUrl', avatarUrl);
        }
        await init.with_token.put("/user/profile",formData,
        {
            params: {
                uid: props.uid
            },
            headers: {
                'Content-Type': 'multipart/form-data',
              }
        }
        ).then(response =>{
            console.log(response.data);
            handleEditUserResponse(response.data as unknown as Response_EditUser);
        }).catch(error =>{console.log(error)})
    }
    else {
        const formData = new FormData();
        formData.append('Username', props.Username);
        formData.append('Displayname', props.DisplayName);
        formData.append('Email', props.Email);
        if(props.AvatarUrl)
            formData.append('AvatarUrl', props.AvatarUrl);
        else {
            const avatarUrl = new Blob();
            formData.append('AvatarUrl', avatarUrl);
        }
        await init.with_token.put("/user/profile",formData,
        {
            params: {
                uid: props.uid
            },
            headers: {
                'Content-Type': 'multipart/form-data',
              }
        }
        ).then(response =>{
            console.log(response.data);
            handleEditUserResponse(response.data as unknown as Response_EditUser);
        }).catch(error =>{console.log(error)})
    }
}

function handleEditUserResponse(response: Response_EditUser){
    switch (response.Status) {
        case 0:
            Swal.fire({
                title: 'Success',
                text: 'Your account had been updated',
                icon: "success",
                confirmButtonText: 'Reload',
                didOpen() {
                    window.location.reload();
                },
                allowOutsideClick: true,
            })
            break;
    
        case 4:
            TokenServices.refreshToken();        
            break;
        default:
            Swal.fire({
                title: 'Failed',
                text: 'Try again or reload page !',
                icon: "error",
                confirmButtonText: 'Back',
                allowOutsideClick: true,
            })
            break;
    }
}


export default editUser;