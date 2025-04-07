import { useDispatch, useSelector } from "react-redux"

import { useEffect, useState } from "react"
import { getAllVehicles } from "../Redux/Slices/vehcileSlice"

import Loading from "../Components/Loading"
import Vehicle from "./Vehicle"


export default function VehicleHome() {
const dispatch=useDispatch()
const [data,setData]=useState();
const [error,setError]=useState("") 

useEffect(()=>{
if(!navigator.onLine){
setError("Lütfen internet bağlantınızı kontrol ediniz !")
  return
}

  dispatch(getAllVehicles()).unwrap().then((e)=>{
 console.log(e);
 
    
   setData(e)
    
  })








},[])

//if(navigator.onLine){}
  if(!data){

  
    return(<Loading/>)
    }

 
  return (


    <div className="flex items-center justify-center flex-col gap-2">
{
  data.length>0 ?  data.map((vehicle)=>(<Vehicle key={vehicle.vehicleId} vehicle={vehicle}/>)) :""
}

{
error &&  <div className="flex items-center justify-center w-full h-full mt-20 flex-col">
  <p className=" text-red-600">{error} </p>
  
  <button className="bg-blue-500 rounded-md text-white p-1.5 mt-1.5 cursor-pointer" onClick={()=>{
    location.reload()
  }}>Yeniden dene</button>
  </div>
}
    </div>
  )

 
  
}

