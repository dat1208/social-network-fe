import { User_Display } from "../../interface/interfaces";

function storeUserDisplay(user:User_Display){
    try {
        localStorage.setItem("userDisplay",JSON.stringify(user));
    } catch (error) {
        
    }
}

function getUserDisplay(){
    try {
        return localStorage.getItem("userDisplay");
    } catch (error) {
        
    }
}

export default {
    storeUserDisplay,
    getUserDisplay
}