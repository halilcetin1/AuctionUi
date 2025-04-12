import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { getVehicleById } from "../Redux/Slices/vehicleDetailsSlice";

import CustomCarousel from "../Components/Slider";
import CountdownTimer from "./CountdownTimer";

import Bids from "../Bid/Bids";
import { checkPaymentStatus } from "../Redux/Slices/paymentSlice";

import { jwtDecode } from "jwt-decode";

import { createBid } from "../Redux/Slices/bidSlice";


function VehicleDetails() {
  const [data, setData] = useState(null)
  const { vehicleId } = useParams()
  const { vehicle } = useSelector((state) => state.vehicledetails)
  const [isSuccess,setIssuccess]=useState(false)
 const [bidAmount,setBidAmount]=useState(0)
  const dispatch = useDispatch()
  const navigate=useNavigate()
 
  const user = useSelector((state) => state.user);
  useEffect(() => {


    dispatch(getVehicleById(vehicleId)).unwrap().then((e) => {
      setData(e)
   console.log(e);
   


    })
  

    if(vehicleId && user.token!=null){
 
      
      const {nameid}=jwtDecode(user.token)


      
      const model={
        vehicleID: vehicleId,
        userId: nameid
      }

 
      dispatch(checkPaymentStatus(model)).unwrap().then((e)=>{
setIssuccess(e.isSuccess) 
       
        
        
      }).catch((w)=>{
        
        
      })
    }



  }, [vehicleId])

const handlecreateBid=()=>{
  if(bidAmount!=0&& user.token!=null){
    const {nameid}=jwtDecode(user.token)
    
    const model={
      bidAmount: bidAmount,
      userId: nameid,
      vehicleId: vehicleId
    }
dispatch(createBid(model))
  }
  return
}

  return (

    <div className="w-full flex items-center justify-center h-full flex-col">

      <div
        className="w-2/3" id="slide-image-container">
        {
          data?.images && <CustomCarousel>
            {
              data.images.map((img, index) => (
                <img src={img} alt="" key={index} className=" " id="img" />
              ))
            }
          </CustomCarousel>
        }
      </div>


      {
        data && <div>
          {<p className="text-white bg-red-500 p-1 ">
            <CountdownTimer endTime={data?.endTime} />
          </p>}
        </div>

      }


      {
        data &&

        <div className="relative overflow-x-auto w-1/2">
          <table className="w-full text-sm text-left rtl:text-right  ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">

            </thead>
            <tbody>
              <tr className="border-b dark:border-gray-300 border-gray-200">
                <th scope="row" className="px-6 py-4  text-gray-900 whitespace-nowrap ">
                  Model
                </th>


                <td className="px-6 py-4">
                  {data.brandAndModel}
                </td>
              </tr>
              <tr className="border-b dark:border-gray-300 border-gray-200">
                <th scope="row" className="px-6 py-4  text-gray-900 whitespace-nowrap ">
                  Renk
                </th>


                <td className="px-6 py-4">
                  {data.color}
                </td>
              </tr>
              <tr className="border-b dark:border-gray-300 border-gray-200">
                <th scope="row" className="px-6 py-4  text-gray-900 whitespace-nowrap ">
                  Yıl
                </th>


                <td className="px-6 py-4">
                  {data.manifacturingYear}
                </td>
              </tr>

              <tr className="border-b dark:border-gray-300 border-gray-200">
                <th scope="row" className="px-6 py-4  text-gray-900 whitespace-nowrap ">
                  KM
                </th>


                <td className="px-6 py-4">
                  {data.millage}
                </td>
              </tr>
              <tr className="border-b dark:border-gray-300 border-gray-200">
                <th scope="row" className="px-6 py-4  text-gray-900 whitespace-nowrap ">
                  Yakıt
                </th>


                <td className="px-6 py-4">
                  Dizel
                </td>
              </tr>
              <tr className="border-b dark:border-gray-300 border-gray-200">
                <th scope="row" className="px-6 py-4  text-gray-900 whitespace-nowrap ">
                  Başlangıç fiyatı
                </th>




                <td className="px-6 py-4">
                  {data.price.toLocaleString("tr-Tr")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      }
      {
        user.token != null ? <div className="flex w-full  justify-center p-3.5 gap-6 max-sm:flex-col">
        
        </div> : <p>teklif yapmak için <a href="/login" className="text-blue-400">giriş</a> yapınız.</p>
      }

      <h2>Tekifler</h2>
      <Bids vehicleId={vehicleId}></Bids>



    </div>
  )
}
export default VehicleDetails;