import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'
import { getBidsByUserId } from '../Redux/Slices/bidSlice';
import { BsBoxArrowUpRight } from "react-icons/bs";
export default function MyBids() {
     const token=localStorage.getItem("token");
     const {nameid}=jwtDecode(token);
     const [bids,setBids]=useState([])
     const dispatch=useDispatch();
     const navigate=useNavigate();
     if(!token){
          return (<Navigate to={"/login"}></Navigate>)
     }
 useEffect(()=>{
dispatch(getBidsByUserId(nameid)).unwrap().then(
     (e)=>{
setBids(e.result)



     }
)


 },[])
  return (
    <div>
<p>Tekliflerim</p>
{
     bids && bids.map((bid,index)=>(
          <div  key={index} className='bg-white mt-2 p-2 flex  items-center justify-between'>Teklif Tutarı : {bid.bidAmount}
          <div className='flex items-center justify-center gap-1 text-xl hover:text-blue-500' onClick={()=>{
               navigate("/vehicle-details/"+bid.vehicleId)
          }}>Araca Git <BsBoxArrowUpRight /> </div>
          </div>
     ))
}

    </div>
  )
}
