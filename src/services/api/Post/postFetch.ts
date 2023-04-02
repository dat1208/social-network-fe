import TokenServices from "../../token/TokenServices"
import { Response_Page_Next_Previous, Post, Page_Next_Previous} from "../../../interface/interfaces"
import config from "../config/init"
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useNavigate } from "react-router-dom";

async function getPosts(page: number, size: number, sort: string){

    let Data;
    try {
            await config.with_token.get('/posts/current',
        {
            params:{
                page:page,
                size:size,
                sort:sort
            }
        }).then(res => {
            console.log("handlePostsResponse data");
        
            Data =  handlePostsResponse(res.data);
        }).catch(err => {
            console.log("handlePostsResponse error");
        handlePostsResponse(err.response.data);
    
        });
    } catch (error) {
        console.log("Post fetch error: " + error);
    }
    
    return Data;
}

async function getSelfPosts(page: number, size: number, sort: string, uid:string){

    let Data;
    try {
            await config.with_token.get('/posts',
        {
            params:{
                page:page,
                size:size,
                sort:sort,
                uid: uid
            }
        }).then(res => {
            console.log("handlePostsResponse data");
        
            Data =  handlePostsResponse(res.data);
        }).catch(err => {
            console.log("handlePostsResponse error");
        handlePostsResponse(err.response.data);
    
        });
    } catch (error) {
        console.log("Post fetch error: " + error);
    }
    
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
                    confirmButtonText: 'Login',
                    didClose() {
                       () => {
                        window.location.href = "/";
                       }
                    },
                })
                break;
        }
        return Data;
}

export default {getPosts, getSelfPosts};