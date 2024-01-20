import { createSlice } from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode"
import { useNavigate } from "react-router";

const initialState =
    (sessionStorage.getItem("token"))
? jwtDecode(sessionStorage.getItem("token"))
: null

const slice = createSlice({
    name: "user",
    initialState,
    reducers:{
        LOGIN_USER(state, action){
            return action.payload
        },
        LOGOUT(state, action){
            sessionStorage.removeItem("token");
            return state = null
        }
    }
})

export const{LOGIN_USER, LOGOUT} = slice.actions;

export default slice.reducer;