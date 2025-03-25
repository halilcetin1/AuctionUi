import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"

import { pay } from "../Redux/Slices/paymentSlice";

import { jwtDecode } from "jwt-decode";
import { FaArrowRight } from "react-icons/fa";
import Loading from "../Components/Loading";

export default function CeheckPay() {
const navigate=useNavigate()
     const location=useLocation()
    const {vehicleId} =location.state
const {vehicles}=useSelector((state)=>state.vehicle)
    const {token}=useSelector((state)=>  state.user)
    const [status ,setStatus]=useState(true)
    const [model,setModel]=useState(null);
console.log(location.state);

     const dispatch=useDispatch()
useEffect(()=>{
     if(token){
           const {nameid}=jwtDecode(token)
          
          
          const model={
               userId: nameid,
               vehicleId: vehicleId
          }

dispatch(pay(model)).unwrap().then(()=>{
     setStatus(false)
}).catch(()=>{
     setStatus(false);
})

     }
if(vehicles){
const v=vehicles.find((vehicle)=>vehicle.vehicleId==vehicleId)
setModel(v);


}



},[vehicleId])
  
if(status){
     return (<Loading/>)
}
     
  return (
    <div className="flex flex-col items-center justify-center gap-3.5" style={{height:"100vh"}}>

<img src={model?.image} alt={model?.image}  width={400} height={400} className="object-cover"/>

<h1>{model?.brandAndModel
} için   Ödenecek Tutar <span className="font-bold">{model?.auctionPrice}</span>$ dır.</h1>
<button className="text-white bg-blue-500 p-1.5 rounded-md cursor-pointer w-52 font-bold flex items-center justify-between" onClick={()=>{
     navigate("/payment")
}}>Ödemeye Geç <FaArrowRight/></button>

    </div>
  )
}
