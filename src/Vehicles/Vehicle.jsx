
import CountdownTimer from "./CountdownTimer";
import { useNavigate } from "react-router-dom";
export default function Vehicle(props) {
     const vehicle=props.vehicle
const navigate=useNavigate()

const {vehicleId}=vehicle;

     return (
          <div className="border border-solid justify-between w-2/3 border-gray-200  flex flex-row rounded-xl       max-md:flex-col " id="container-card" onClick={()=>{
               navigate("/vehicle-details/"+vehicleId)
          }}>
          
          <div className=" w-1/2 h-64  max-md:w-full" id="image-container">
          <img src={vehicle.image} alt="" className="w-full h-full "/>
          </div>
             <div className=" w-1/2 relative  max-md:w-full">
             <p className="font-bold">{vehicle.brandAndModel}</p>
               <p>{vehicle.engineCapacity}  | {vehicle.millage} KM | {vehicle.color}</p>
            
<p className="absolute top-0 right-0 rounded-md max-md:bottom-0" id="countertimer-container"> <CountdownTimer endTime={vehicle.endTime}/></p>

{/* <button className="flex items-center justify-center bg-white border border-solid border-blue-500 text-blue-500 w-2/3 rounded-2xl h-10 mb-3 cursor-pointer">Detay <RightIcon/></button> */}
<div className="  flex  justify-around  max-sm:w-full">

    
<p className=" ">Başlangıç fiyatı<span className="font-bold"> {
                    vehicle.auctionPrice
               }</span></p>
</div>
             </div>

          

          </div>
     )
}
