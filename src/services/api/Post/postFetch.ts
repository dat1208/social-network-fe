import TokenServices from "../../token/TokenServices"
import { Response_Page_Next_Previous, Post, Page_Next_Previous} from "../../../interface/interfaces"
import config from "../config/init"
import Swal from 'sweetalert2/dist/sweetalert2.js'

async function getPosts(page: number, size: number){

    let Data;
    await config.with_token.post('/posts/current',null,
    {
        params:{
            page:page,
            size:size
        }
    }).then(res => {
        console.log("handlePostsResponse data");
      
        Data =  handlePostsResponse(res.data);
    }).catch(err => {
        console.log("handlePostsResponse error");
       handlePostsResponse(err.response.data);

        
    });
    return Data;
}


async function handlePostsResponse(res:Response_Page_Next_Previous){
    let Data;
    console.log(res);
        switch(res.Status){
            case 0:
                
                Data = res.Data as Page_Next_Previous;
                break;
                
            case 4:
                //Call refresh token
                console.log("Refresh token");
                await TokenServices.refreshToken();
                break;
            default:
                Swal.fire({
                    title: 'Please login again !',
                    text: 'Your session has expired.',
                    icon: 'info',
                    confirmButtonText: 'Login'
                })
                break;
        }
        return Data;
}

export default getPosts;