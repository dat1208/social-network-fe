import TokenServices from "../../token/TokenServices";
import init from "../config/init";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Response } from "../../../interface/interfaces";

async function userEdit(images: FileList | undefined , text:string, postId:string){

        if(images){
            const formData = new FormData();
            for (let i = 0; i < images.length; i++) {
                formData.append('Media',images[i]);
            }
            formData.append('Content', text);
            await init.with_token.put("/posts/update",formData,
            {
                params:{
                    postId: postId
                },
                headers: {
                    'Content-Type': 'multipart/form-data',
                  }
            }).then(response => {
                const res = response.data as unknown as Response;
                console.log(res);
                switch (res.Status) {
                    case 0:
                        window.location.reload();
                        break;
                    case 4:
                        TokenServices.refreshToken();
                        break;
                    default:
                        alert("Error");
                        break;
                }
            })
        }
        else {
            const formData = new FormData();
            const blob = new Blob();
            formData.append('Media',blob);
            formData.append('Content',text);
            await init.with_token.put("/posts/update",formData,
            {
                params:{
                    postId: postId
                },
                headers: {
                    'Content-Type': 'multipart/form-data',
                  }
            }).then(response => {
                const res = response.data as unknown as Response;
                console.log(res);
                switch (res.Status) {
                    case 0:
                        window.location.reload();
                        break;
                    case 4:
                        TokenServices.refreshToken();
                        break;
                    default:
                        alert("Error");
                        break;
                }
            })
        }
}
export default userEdit;