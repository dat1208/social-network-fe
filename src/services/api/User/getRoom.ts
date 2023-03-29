import TokenServices from "../../token/TokenServices";
import init from "../config/init";
import { Response_GetRoomID } from "../../../interface/interfaces";

async function getRoom(UIDto :string, UIDown :string) {
    let roomID = null;

    await init.with_token.post("/chat",{
        FirstId: UIDown,
        SecondId: UIDto
    }).then(res => {
        const response = res.data as unknown as Response_GetRoomID;
        
        if(response.Status === 4)
            TokenServices.refreshToken();
        else if(response.Status === 0)
        {
            if(response.Data)
            {
                roomID = response.Data.DocumentStored;
            }
               
        }
4    }).catch(err => TokenServices.refreshToken());
    return roomID;
}

export default getRoom;