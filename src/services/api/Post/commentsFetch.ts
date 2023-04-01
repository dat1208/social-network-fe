import TokenServices from "../../token/TokenServices"
import config from "../config/init"
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Response_Get_Comments, CommentsItf } from "../../../interface/interfaces";



async function getComments(idPost:string, cid:string, page:number, size:number){

    let Data = null;
    try {
        
        await config.with_token.get('/posts/comments',
    { params: { 
        pid: idPost,
        cid: cid,
        page: page,
        size: size
     } }
    ).then(res => {
        console.log("handleCommentsResponse data");
      
        Data =  handleCommentsResponse(res.data);
    }).catch(err => {
        Swal.fire({
            title: 'Error !',
            text: 'Hong biết lỗi gì luôn.',
            icon: 'error',
            confirmButtonText: 'Try again'
        })

        
    });
    } catch (error) {
        console.log("Comments fetch error", error);
    }
    
    return Data;
}

async function handleCommentsResponse(res:Response_Get_Comments){
    let Data;
    console.log(res);
        switch(res.Status){
            case 0:
                
                Data = res.Data.Paging as Array<CommentsItf>;
                break;
                
            case 4:
                //Call refresh token
                console.log("Refresh token");
                await TokenServices.refreshToken();
                break;
            case 1:
                Data = res.Data.Paging as Array<CommentsItf>;
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


export default getComments;