import init from "../config/init";
import TokenServices from "../../token/TokenServices";
import { FriendsItf, Response_GetFriends } from "../../../interface/interfaces";
import getUID from "./getuid";
import base from "../../function/base";
async function getFriends(page: number, size: number){
    let data;
    const UID = await getUID();
     if(UID)
        await init.with_token.get("/user/friends",{
            params:{
                uid: UID,
                page: page,
                size: size
            }
        }).then(res => {
            const response  = res.data as unknown as  Response_GetFriends;
            data = handleResponseGetFriends(response);
        }).catch(err => {

        });
    return data;
}


function handleResponseGetFriends(response: Response_GetFriends){
    let data;
    switch (response.Status) {
        case 0:
            data = response.Data;
            break;
        case 1:
            data = response.Data;
            break;
        case 4:
            TokenServices.refreshToken();
            break;
        default:
            base.redirect("/");
            break;
    }
    return data;
}

export default {getFriends}

