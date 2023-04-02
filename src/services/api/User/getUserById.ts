import TokenServices from "../../token/TokenServices";
import init from "../config/init";
import { UserByUid, Response_GetUser_ById } from "../../../interface/interfaces";
import base from '../../function/base'
async function getUserById(userId: string){
    let data = null;
     await init.with_token.get("/user",{
        params:{
            uid : userId
     }}).then(res => {  
        const res_as = res.data as unknown as Response_GetUser_ById;
        data = handleResponseGetUserById(res_as);
        
     }).catch(err => {
        console.log(err);
     })
     return data;
}

function handleResponseGetUserById(res: Response_GetUser_ById){
    let data;
    switch (res.Status) { 
        case 0:
            data = res.Data;
            
            break;
        case 4:
            TokenServices.refreshToken();
            break;
        default: 
            base.redirect('/profile/notfound');
            
            break;
    }
    return data;
}



export default getUserById;