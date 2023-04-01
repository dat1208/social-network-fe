import init from "../api/config/init";
import { Response_Refresh_Token_User } from "../../interface/interfaces";

function storeToken(token: string, refreshToken:string){
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
}

function getAccessToken() {
    return localStorage.getItem("token");
}
function getRefreshToken(){
    return localStorage.getItem("refreshToken");
}

async function refreshToken(){
    await init.with_default.post('/auth/token',{
        "AccessToken":getAccessToken(),
        "RefreshToken":getRefreshToken(),
    }).then(async res => {
        console.log("----------Old Token---------");
        console.log(getAccessToken());
        console.log(getRefreshToken());
        console.log('-------------New token--------------');
        let NewToken : Response_Refresh_Token_User = res.data;
        console.log(NewToken);
        if(NewToken.Data)
        {
            storeToken(NewToken.Data.AccessToken,NewToken.Data.RefreshToken);
        }
        console.log("----------After store Token---------");
        console.log(getAccessToken());
        window.location.reload();
    })
}

export default {
    storeToken,
    getAccessToken,
    getRefreshToken,
    refreshToken
}
