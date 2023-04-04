import TokenServices from "../../token/TokenServices";
import init from "../config/init";
import { Response, Response_UserInvitations } from "../../../interface/interfaces";
import base from "../../function/base";

async function checkSendInvite(uid: string){
    let data;
    await  init.with_token("/user/invitations",{
        params:{
            uid:uid,
            page:0,
            size:10
        }
    }).then(response =>{
        const res = response.data as unknown as Response_UserInvitations;
        switch (res.Status) {
            case 0:
                if(res.Data)
                data = res.Data.Paging;
                break;
            case 4:
                TokenServices.refreshToken();
                break;
            default:

                break;
        }
        
    }).catch(error => {
        TokenServices.refreshToken();
    });
    return data;
}

async function addFriend(userId: string, userOwnId: string){
    await init.with_token.post("/user/friends/invite",null,{
        params:{
            uid: userOwnId,
            fid: userId
        }
    }).then(response => {
        const res = response.data as unknown as Response;
        switch (res.Status) {
            case 0:
                window.location.reload();
                break;
            case 4:
                TokenServices.refreshToken();
                break;
            case 1: 
            console.log("Send before");
            break;
            default:
                
                break;
        }
    })
}

async function deny(uid: string, fid:string){
    init.with_token.post("/user/friends/denied",null,{
        params:{
            uid: uid,
            fid: fid
        }
    }).then(response =>{
        const res = response.data as Response;
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
    });
}

async function accept(uid: string, fid:string){
    init.with_token.post("/user/friends/accept",null,{
        params:{
            uid: uid,
            fid: fid
        }
    }).then(response =>{
        const res = response.data as Response;
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
    });
}

async function unfriend(uid: string, fid:string){
    init.with_token.post("/user/friends/remove",null,{
        params:{
            uid: uid,
            fid: fid
        }
    }).then(response =>{
        const res = response.data as Response;
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
    });
}


export default {checkSendInvite, addFriend, deny, accept, unfriend};