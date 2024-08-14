import { createSlice } from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode"
import { useNavigate } from "react-router";

const initialState =
    (localStorage.getItem("token"))
? jwtDecode(localStorage.getItem("token"))
: null

const slice = createSlice({
    name: "user",
    initialState,
    reducers:{
        LOGIN_USER(state, action){
            return action.payload
        },
        LOGOUT(state, action){
            localStorage.removeItem("token");
            return state = null
        }
    }
})

export const{LOGIN_USER, LOGOUT} = slice.actions;

export default slice.reducer;