import config from "../config/init"
import { Response_Like } from "../../../interface/interfaces";

async function like(pid:string){
 let data;
    await config.with_token.put("/posts/likes",null,{
        params:{
            pid:pid,
        }
    }).then(res => {
        console.log(res.data);
        data = res.data;
    }).catch(err => {
        console.log(err.message);
    });
    return data;
}

async function unLike(pid:string){
    let data;
    await config.with_token.delete("/posts/likes",{
        params:{
            pid:pid,
        }
    }).then(res => {
        console.log(res.data);
        data = res.data;
    }).catch(err => {
        console.log(err.message);
    });
    return data;
}

export default {
    like,
    unLike,
}