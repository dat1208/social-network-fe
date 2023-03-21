import { User_Display } from "../../interface/interfaces";
import {PayloadAction, createSlice} from "@reduxjs/toolkit"


interface User_Display_State{
    user:User_Display;
}

const initalState: User_Display_State = {
    user: {
        "Id": '',
        "AvatarURL": '',
        "DisplayName": '',
        "UserProfileUrl": ''
    }
};


export const User_Display_Slice = createSlice({
    name: "user",
    initialState: initalState,
    reducers:{
        setUserSession:(state, action: PayloadAction<{user_Display:User_Display}>) =>{
            state.user.AvatarURL = action.payload.user_Display.AvatarURL;
            state.user.DisplayName = action.payload.user_Display.DisplayName;
            state.user.UserProfileUrl = action.payload.user_Display.UserProfileUrl;
            state.user.Id = action.payload.user_Display.Id;
        }
    }
});

export default User_Display_Slice.reducer;

export const {setUserSession}  = User_Display_Slice.actions;