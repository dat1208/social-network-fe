import TokenServices from "../../token/TokenServices";
import { Response_GetId_User } from "../../../interface/interfaces";
import init from "../config/init";



async function getUID() {
    let OwnUID;
    await init.with_token.get("/user").then(res => {
        console.log(res);

        const response = res.data as unknown as Response_GetId_User;
        console.log(response);
        if(response.Status === 4)
            TokenServices.refreshToken();
        else if(response.Status === 0){
            OwnUID = response.Data;
        }
    }).catch(err => TokenServices.refreshToken())

    return OwnUID;
}

export default getUID;