import { EmailOutlined } from '@mui/icons-material'
import { jwtDecode } from 'jwt-decode'
import React from 'react'
import { FaHandHoldingUsd, FaVoicemail } from 'react-icons/fa'
import { FaShop, FaUser } from 'react-icons/fa6'
import { IoInformation } from 'react-icons/io5'
import { TfiEmail } from 'react-icons/tfi'
import { Navigate, useNavigate } from 'react-router-dom'

export default function MyAccountInfos() {
     const token=localStorage.getItem("token")
if(!token){
return <Navigate to={"/login"}/>
}
const {email,fullName}=jwtDecode(token);
const navigate=useNavigate();


     return (
    <div
     className='flex flex-wrap  max-md:flex-col max-md:gap-2.5  gap-4 p-1.5'>
     <p
      className='text-center max-md:w-full w-1/2 bg-white flex items-center justify-center p-1.5 gap-1.5'> Bilgilerim</p>
   <div 
   className='bg-white max-md:w-full w-1/2 flex items-center p-1.5 gap-1.5'><FaUser/>{fullName}</div>
   <div 
   className='max-md:w-full w-1/2 flex items-center  bg-white p-1.5 gap-1.5'> < TfiEmail/>  E-mail : {email}</div>
<div
 className='max-md:w-full w-1/2 flex items-center  bg-white p-1.5 gap-1.5 hover:text-blue-500 cursor-pointer' 
onClick={()=>{
     navigate("/bids/my-bids")
}} > <FaHandHoldingUsd /> Tekliflerim

</div>






    </div>
  )
}
