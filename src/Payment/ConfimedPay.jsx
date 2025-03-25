import { useEffect } from "react"



import { IoMdCheckmarkCircleOutline } from "react-icons/io"
import { useLocation, useNavigate } from "react-router-dom"


export default function ConfirmedPay() {
  const location=useLocation()
  const navigate=useNavigate();
console.log();

     useEffect(()=>{
          
        if(location.state.payresponse.vehicleId){
          setTimeout(() => {
               navigate(`/vehicle-details/${location.state.payresponse.vehicleId}`)
          }, 1000);
       
        } 
     }
,[])
  return (
    <div className="w-full items-center justify-center flex flex-col" style={{height:"100vh"}}>
     <div
>
<IoMdCheckmarkCircleOutline className="text-6xl text-green-500"/>
</div>
<div>
     Odeme Başarılı oldu. 
</div>




    </div>
  )
}
