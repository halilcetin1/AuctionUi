import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL=import.meta.env.VITE_Base_Url;





const initialState={
     vehicle:null,
     error:""
}

export const getVehicleById = createAsyncThunk("api/vehicleById", async (vehicleId ) => {

     try {
 const res=await axios.get(`${baseURL}/vehicles/${vehicleId}`)
       return res.data;
     } catch (error) {
    
     }
 
 })







export const VehicleDetailsSlice = createSlice({
     name: 'VehicleDetails',
     initialState,
     reducers: {

 
 
     },
   extraReducers(builder) {
        builder.addCase(getVehicleById.fulfilled,(state,actions)=>{
        state.vehicle=actions.payload;
          
        })
   },

     
 
 
 })
 export const { } = VehicleDetailsSlice.actions
 
 export default VehicleDetailsSlice.reducer