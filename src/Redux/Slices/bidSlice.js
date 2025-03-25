import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const baseURL=import.meta.env.VITE_Base_Url;





const initialState={
     bid: [],
     error: ""
}

export const getBidByVehcileId = createAsyncThunk("api/bid/vehicleId", async (vehicleId ) => {


     try {
 const res=await axios.get(`${baseURL}/bid/getBidByVehicleId/${vehicleId}`)
 console.log("data",res.data);
 
       return res.data;
     } catch (error) {

          console.log(error);
          
return error
    
     }
 
 })



export const createBid=createAsyncThunk("api/createbid",async(model,{rejectWithValue})=>{

     try {
          const res= await axios.post(`${baseURL}/bid/createbid`,model)
          console.log(res.data);
          
          return res.data

     } catch (error) {
          console.log(error);
          
          return rejectWithValue(error);
     }
})
export const createBidAuto=createAsyncThunk("api/bid/createbidauto",async(model,{rejectWithValue})=>{


     try {
        
          
          const res= await axios.post(`${baseURL}/bid/createbidAutomatic`,model);
     return res.data;
     } catch (error) {
          return rejectWithValue(error);
     }

})




export const getBidsSlice = createSlice({
     name: 'bids',
     initialState,
     reducers: {

 
 
     },
   extraReducers(builder) {
        builder.addCase(getBidByVehcileId.fulfilled,(state,actions)=>{
  state.bid=actions.payload.result;

      
        
          
        })
        builder.addCase(getBidByVehcileId.rejected,(state,actions)=>{
          console.log(actions.payload);
          
        })
   },

     
 
 
 })
 export const { } = getBidsSlice.actions
 
 export default getBidsSlice.reducer