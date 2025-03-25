import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = import.meta.env.VITE_Base_Url;
//const baseURL = "http://localhost:8080/api"


const initialState = {
   vehicles: [],
   errors: ""
}




export const getAllVehicles = createAsyncThunk("api/vehicle", async () => {

   try {
      const res = await axios.get(`${baseURL}/vehicles/getAllvehicles`)
      return res.data;
   } catch (error) {

   }

})
export const AddVehicle = createAsyncThunk("api/vehicle/addcar", async (model,{rejectWithValue}) => {

   
 try {
   const res = await axios.post(`${baseURL}/vehicles/create`, model, {
      headers: {
         'Content-Type': 'multipart/form-data'
      }
   })
return res.data;

 } catch (error) {
   console.log(error);
   return rejectWithValue(error);
 }
})
  

export const deleteVehicleById=createAsyncThunk("api/vehicles/{vehicleId}",async(vehicleId,{rejectWithValue})=>{
try {
   const res=await axios.delete(`${baseURL}/vehicles/${vehicleId}`);
   return res.data;
} catch (error) {
   return rejectWithValue(error);
}

})



export const VehicleSlice = createSlice({
   name: 'Vehicle',
   initialState,
   reducers: {



   },
   extraReducers: (builder) => {
      builder.addCase(getAllVehicles.fulfilled, (state, actions) => {
         state.vehicles = actions.payload;
      })

   }


})
export const { } = VehicleSlice.actions

export default VehicleSlice.reducer