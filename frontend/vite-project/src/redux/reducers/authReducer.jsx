import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name:'auth',
    initialState:{
        user: {
            id:'',
            name:'',
            email:'',
            password:'',
            token:''
        }
    },
    reducers:{
        registerUser: ( state, action ) => {
            state.user = action.payload
            
        },
        login( state, action ) {
            
            state.user = action.payload
            const users = JSON.stringify(state.user)
            localStorage.setItem('user',users)
            
        },
        logout: ( state) => {
           state.user = {
            id:'',
            name:'',
            email:'',
            password:'',
            token:''
           }
           localStorage.clear()
        }
    }
})

export default authSlice.reducer
export const { registerUser, login, logout } = authSlice.actions
