import TokenServices from "../../token/TokenServices";
import init from "../config/init";
import { Response_DetelePost } from "../../../interface/interfaces";
import Swal from 'sweetalert2/dist/sweetalert2.js'



async function deletePost(pid: string){
    await init.with_token.delete("/posts",{
        params:{
            pid: pid
        }
    }).then(response => {
        const res = response.data as unknown as Response_DetelePost;
        handlePostDelete(res);
    }).catch(err => {console.log(err)});
}

function handlePostDelete(response: Response_DetelePost){
    switch (response.Status) {
        case 0:
            Swal.fire({
                title: 'Delete Success',
                icon: 'success',
                confirmButtonText: 'Back',
                didClose() {
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
                title: 'Delete Failed',
                text: 'You do not have permission to delete this post',
                icon: 'error',
                confirmButtonText: 'Back',
                allowOutsideClick: true,
            })
            break;
    }
}

export default deletePost;