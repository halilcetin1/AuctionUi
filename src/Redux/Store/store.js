
import { configureStore } from '@reduxjs/toolkit'
import  UserSlice  from '../Slices/userSlice';
import  VehicleDetailsSlice  from '../Slices/vehicleDetailsSlice';
import Vehicle from '../Slices/vehcileSlice'
import GetBidsSlice from '../Slices/bidSlice';
import PaymentSlice from '../Slices/paymentSlice' 




export const store = configureStore({
     reducer: {
       user:UserSlice,
     vehicle:Vehicle,
     vehicledetails:VehicleDetailsSlice,
   getbids:GetBidsSlice,
   payment:PaymentSlice
     },
   })