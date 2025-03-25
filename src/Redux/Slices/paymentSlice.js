import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const baseURL=import.meta.env.VITE_Base_Url;


const initialState={
     isSuccess: false,
     errors: undefined,
     payresponse: undefined
}


export const checkPaymentStatus=createAsyncThunk("api/checkStatus",async(model,{rejectWithValue})=>{
try {
     const res=await axios.post(`${baseURL}/PaymentHistory/CheckStatus`,model)

     
     return res.data;
} catch (error) {
   return  rejectWithValue(error)
}
})
export const pay=createAsyncThunk("api/pay",async(model,{rejectWithValue})=>{
console.log(`${baseURL}/payment/pay`);


     try {
          const res=await axios.post(`${baseURL}/Payment/pay`,model);
          return res.data.result;
    
     } catch (error) {
         return rejectWithValue(error)
          
     }


})
export  const addPayHistory=createAsyncThunk("api/addpaymentHistory",async(model,{rejectWithValue})=>{
     
    console.log("payment model",model);
    

     try {
          const res=await axios.post(`${baseURL}/PaymentHistory/AddPayHistory`,model);
          console.log(res.data);
       return res.data
    
          
     } catch (error) {
          return rejectWithValue(error);
     }
})


const PaymentSlice=createSlice({
     name:"Payment",
     initialState,
     reducers:{
         
     },
     extraReducers(builder) {
          builder.addCase(checkPaymentStatus.fulfilled,(state,actions)=>{
             //  console.log(actions.payload);
               state.isSuccess=actions.payload.isSuccess
               
               
          })
          builder.addCase(checkPaymentStatus.rejected,(state,actions)=>{
           state.errors=actions.payload;
          })

          builder.addCase(pay.fulfilled,(state,actions)=>{
               state.payresponse=actions.payload
          })
          builder.addCase(pay.rejected,(state,actions)=>{
               state.errors=actions.payload;
          })
     },
})



export  const {}=PaymentSlice.actions;
export default PaymentSlice.reducer;