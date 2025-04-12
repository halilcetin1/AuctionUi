import { useDispatch, useSelector } from "react-redux";

import { useEffect, useRef, useState } from "react";
import { createBid, createBidAuto, getBidByVehcileId } from "../Redux/Slices/bidSlice";

import Bid from "./Bid";
import { FaCircleInfo } from "react-icons/fa6";
import { FaMoneyBill } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { checkPaymentStatus } from "../Redux/Slices/paymentSlice";


import { jwtDecode } from "jwt-decode";
import * as signalR from '@microsoft/signalr'
import { toast } from "react-toastify";
import { getVehicleById } from "../Redux/Slices/vehicleDetailsSlice";
//const baseUrl="http://localhost:8080/getbids";
const baseUrl="https://api-h692.onrender.com/getbids";


function Bids(props) {
  const vehicleId= props.vehicleId
const connection=useRef(null);
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  const { bid } = useSelector((state) => state.getbids)
  const [isSuccess, setIssuccess] = useState(false)
  const [bidAmount, setBidAmount] = useState(0)
  const [timeStatus,setTimeStatus]=useState(true);
  const navigate = useNavigate()
  const  user  = useSelector((state) => state.user)
 
  

const [userId,setUserId]=useState();
  useEffect(() => {
dispatch(getVehicleById(vehicleId)).unwrap().then((e)=>{
const  endtime=new Date(e.endTime+"Z").getTime();
endtime >new Date().getTime()? setTimeStatus(true):setTimeStatus(false)

})

startSignalR()




   
    dispatch(getBidByVehcileId(vehicleId)).unwrap().then(e => {
      setData(e.result) 





    })
    if(user.token==null){return}
    const { nameid } = jwtDecode(user.token);
    const model = {
      vehicleID: vehicleId,
      userId: nameid
    }
setUserId(nameid);


    dispatch(checkPaymentStatus(model)).unwrap().then((e) => {

      setIssuccess(e.isSuccess)


    })


  }, [vehicleId])





const startSignalR=()=>{
  connection.current= new signalR.HubConnectionBuilder().withUrl(baseUrl).withAutomaticReconnect().build();

  connection.current.on("GetData",(e)=>{
   setData(e)
    



    
  })

  connection.current.onclose(() => {
});


connection.current.onreconnecting(() => {
});



connection.current.onreconnected(() => {
});



connection.current.start()
.then(() => {

})
.catch(err => {
    
});


}


const updateBids=async()=>{
try {
  
  await connection.current?.invoke('GetBids', parseInt(vehicleId));
 

} catch (error) {

 
  
}

}




  const handlecreateBid = async() => {
    if (bidAmount != 0 && user != null) {
      const { nameid } = jwtDecode(user.token)
      const model = {
        bidAmount: bidAmount,
        userId: nameid,
        vehicleId: vehicleId
      }
      if(bid!=null){
        if(bidAmount<= bid[0].bidAmount ){
          toast.error("Vereceğiniz teklif mevcut en yuksek tekliften daha fazla olmalıdır.")
          return
        }
      }
    
      

      dispatch(createBid(model)).unwrap().then(()=>{
toast.success("teklif yapıldı",{})
updateBids()
      }).catch((e)=>{
toast.error("teklif yapılmadı !")


      })



   
      setBidAmount(0)
    }
    
    return
  }

  const handleCreateAutobid=()=>{
    if(!user){
      return
    }
    const { nameid } = jwtDecode(user.token)
const model={
userId: nameid,
vehicleId: vehicleId
}
    dispatch(createBidAuto(model)).unwrap().then(()=>{
      toast.success("Teklifiniz Alındı.")
      updateBids()
    }).catch((e)=>{
     
      
      toast.error("Bir hata oluştu !")
    })
  }

  return (
    <div className="w-full">
    
 {
  user.token==null ? "": <>
  
  {
      timeStatus ?  <div>

      {
        isSuccess ? <div><div>

          <button className=" p-1 bg-blue-500 text-white h-11 rounded-md w-52 cursor-pointer flex items-center justify-around text-xl  hover:bg-blue-400" onClick={() => {
          handleCreateAutobid()
          }}><FaMoneyBill /> Otomatik teklif{


            }</button>
        </div>

          <div className="flex items-center justify-between gap-1.5">
            <input id="bid" name="bid" type="number"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 h-11"

              onChange={(e) => {
                setBidAmount(e.target.value)
              }}  value={bidAmount}/>  <button className=" p-1 bg-white text-blue-500 h-11 rounded-md w-52 cursor-pointer flex items-center justify-around text-xl border border-blue-500" onClick={() => handlecreateBid()}>Tekif ver</button></div></div> : <div className="flex flex-col mb-10">
          <h2 className="text-gray-600 font-bold flex items-center gap-1.5"> <FaCircleInfo className="text-2xl text-gray-500" /> Teklif yapmak için lütfen ödeme yapınız</h2>
          <button className="p-2 bg-blue-500 text-white rounded-md mt-2 cursor-pointer" onClick={() => { navigate("/checkpay", { state: { data, vehicleId } }) }}>Ödeme yap</button>
        </div>
      }
    </div>: <div className="text-center">Aracın süresi dolmuştur.</div>
     }

  
  </>
 }




      {
        data == null || data.length == 0 ? <p className="w-full flex justify-center gap-4 items-center  text-center border border-gray-300 p-2"><FaCircleInfo className="text-2xl text-gray-500" /> Bu araç için aktif bir teklif yok !</p> : <div>
          {
            data && data.map((b, index) => (
              <Bid key={index} bid={b} userId={userId} />
            ))
          }

        </div>
      }

    </div>
  )
}
export default Bids;



