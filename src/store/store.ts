import { configureStore } from "@reduxjs/toolkit";
import { User_Display_Slice } from "./features/userSessionSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { User_Display } from "../interface/interfaces";


export const store = configureStore({
    reducer: {
        user:User_Display_Slice.reducer
    }
})

export const useAppDispatch:() => typeof store.dispatch = useDispatch;
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector;