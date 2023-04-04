import TokenServices from "../../token/TokenServices";
import init from "../config/init";
import { Response_Search } from "../../../interface/interfaces";


async function searchUser(text: string){
    let data;

    await init.with_token.get("/user/search",{
        params:{
            searchString: text,
        }
    }).then(response =>{
        data = response.data as Response_Search;
        if(data.Status === 4)
        {
            TokenServices.refreshToken();
        }
        
    })
    return data;
}


export default searchUser;