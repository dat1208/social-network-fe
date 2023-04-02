import init from "../api/config/init";
import { Response_Refresh_Token_User } from "../../interface/interfaces";
import base from "../function/base";
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
       
        let NewToken : Response_Refresh_Token_User = res.data;
        console.log(NewToken);
        if(NewToken.Data)
        {
            storeToken(NewToken.Data.AccessToken,NewToken.Data.RefreshToken);
        }
        
        window.location.reload();
    })
}

function clearToken() {
    localStorage.clear();
    base.redirect("/");
}

export default {
    storeToken,
    getAccessToken,
    getRefreshToken,
    refreshToken,
    clearToken
}
