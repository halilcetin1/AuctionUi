import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from 'axios'




const baseURL=import.meta.env.VITE_Base_Url;

// const baseURL="http://localhost:8080/api";
const initialState = {
    token: localStorage.getItem("token"),
    loading: false,
    error: ""
}




export const signIn = createAsyncThunk("api/register", async (model, { rejectWithValue }) => {
console.log(model);

    try {
        const res = await axios.post(`${baseURL}/user/register`, model)
    
        localStorage.setItem("token", res.data.result.token)
        return res.data
    } catch (error) {
      return  rejectWithValue(error.response.data.errorMessages)
    }

})

export const logIn = createAsyncThunk("api/login", async (model, { rejectWithValue }) => {

    try {

        const res = await axios.post(`${baseURL}/user/login`, model)

        localStorage.setItem("token", res.data.token);
        return res.data
    } catch (error) {
    return    rejectWithValue(error.response.data.errorMessages)
    }

})
export const confirmEmail=createAsyncThunk("api/user/confirmemail",async(model,{rejectWithValue})=>{
try {
    const res=await axios.get(`${baseURL}/user/confirmemail?email=${model.email}&token=${model.token}`);
    return res.data
} catch (error) {
    console.log(error);
    
    return rejectWithValue(error);
}
})
export const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
logOut:(state)=>{
    localStorage.clear();
    state.token=null;
}


    },
    extraReducers: (builder) => {
        builder.addCase(signIn.pending, (state, actions) => {
            state.loading = true

        }),
            builder.addCase(signIn.fulfilled, (state, actions) => {
                state.loading = false;
    state.token=actions.payload.result.token
      
            }),
            builder.addCase(signIn.rejected, (state, actions) => {
                state.loading = false;
                state.error = actions.payload;

            }),
            builder.addCase(logIn.pending, (state, actions) => {
                state.loading = true;
               
            }),
            builder.addCase(logIn.fulfilled, (state, actions) => {

                state.loading = false;
                state.token=actions.payload.token


            }),
            builder.addCase(logIn.rejected, (state, actions) => {
                state.loading = false;


                state.error = actions.payload;


            })
    }


})

// Action creators are generated for each case reducer function
export const { logOut} = UserSlice.actions

export default UserSlice.reducer