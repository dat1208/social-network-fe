import config from "../config/init";
import { Response_Token_User, Response_Page_Next_Previous } from "../../../interface/interfaces";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import tokenServices from "../../token/TokenServices"


 
async function login(username:string, password:string){
    let data;
    console.log(username, password);
    await config.with_default.post('/auth', {
        username: username,
        password: password
    }).then(res => {
        console.log(res.data.Data)
        data = handleLoginResponse(res.data);
    }).catch(err => {
        console.log(err)
        Swal.fire({
            title: 'Login Failed',
            text: 'Please check your internet connection',
            icon: 'error',
            confirmButtonText: 'Try again!',
            allowOutsideClick: true,
        })
    });
    return data;
}

function handleLoginResponse(res:Response_Token_User){

    let data;

    
    switch(res.Status){
        
        case 0:
            console.log("Login Success");
            Swal.fire({
                title: 'Login Success',
                text: 'Welcome back',
                icon: 'success',
                confirmButtonText: 'Great ',
                allowOutsideClick: true,
            })
             tokenServices.storeToken(res.Data.Token.AccessToken, res.Data.Token.RefreshToken);
            data = res.Data;
            
            break;
        case 1:
            console.log("Failure");
            break;
        case 2:
            console.log("Wrong Format");
            break;
        case 3:
            console.log("Forbidden");
            Swal.fire({
                title: 'Access Denined',
                text: 'Your account don\'t have permistion',
                icon: "warning",
                confirmButtonText: 'Try again!',
                allowOutsideClick: true,
            })
            break;
        case 4:
            console.log("Unauthorized");
            Swal.fire({
                title: 'Login Failed',
                text: 'Username or password was wrong',
                icon: 'error',
                confirmButtonText: 'Try again!',
                allowOutsideClick: true,
            })
            break;
        case 5:
            console.log("Error");
            break;    
    }
    return data;
}

export default login;