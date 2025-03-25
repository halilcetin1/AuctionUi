
import { useSelector } from 'react-redux'
import '../Styles/filter.css'

import { useEffect, useState } from 'react'
import { FaChevronRight } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'
export default function Fillter() {
  const [text,setText]=useState("")
const {vehicles}=useSelector((state)=>state.vehicle)
const [findedVehicles,setFindedVehicles]=useState()
const navigate=useNavigate();

const filtervehicles=(text,vehicles)=>{
  return vehicles.filter((vehicle)=>vehicle.brandAndModel.toLocaleLowerCase().includes(text.toLocaleLowerCase()));

}
useEffect(()=>{

if(!text|| !vehicles){
  return
}
const handlerSearch=setTimeout(() => {
 const finded= filtervehicles(text,vehicles);
 setFindedVehicles(finded)
  
}, 500);



return()=>{
  clearTimeout(handlerSearch)
}
},[text])



  return (
    <div 
    className="flex flex-col items-center justify-center" id='filter-container' >

<div className='w-full h-1/5  flex justify-center items-center gap-1'>
  <input type="text" className='bg-white w-3xl h-11 rounded-lg max-md:w-xl max-sm:w-80'placeholder='
  Ara' onChange={(e)=>{setText(e.currentTarget.value)}}/>
  <button className='bg-blue-500 text-white p-1.5 rounded-lg border border-white w-40 h-11 cursor-pointer hover:bg-gray-900 '>Ara</button>
</div>
{
  findedVehicles && findedVehicles.map((vehicle)=>(<div className='w-full bg-white mt-3 flex relative rounded-md  cursor-pointer' onClick={()=>{
    navigate(`/vehicle-details/${vehicle.vehicleId}`)
  }}>
    <img src={vehicle.image} alt="" width={100} height={80}/>
    <p>{vehicle.brandAndModel}</p>
    <FaChevronRight className=' absolute right-0 bottom-5 text-gray-600 text-3xl'/>
  </div>))
}

    </div>
  )
}
