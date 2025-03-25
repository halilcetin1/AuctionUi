import { useDispatch, useSelector } from "react-redux"

import { useEffect, useState } from "react"
import { deleteVehicleById, getAllVehicles } from "../Redux/Slices/vehcileSlice"
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { toast } from "react-toastify"
import Loading from "../Components/Loading"

export default function DeleteVehicles() {
     const {vehicles}=useSelector((state)=>state.vehicle)
     const [openDialog,setOpenDialog]=useState(false)
     const [vehicleId,setvehcileId]=useState()
     const [modelName,setModelName]=useState("")
     const [isLoading,setIsLoading]=useState(false)
     const dispatch=useDispatch()

const handleClose=()=>{
     setOpenDialog(false)
}
const handleDelete=()=>{
     handleClose()
    if(!vehicleId) return

     dispatch(deleteVehicleById(vehicleId)).unwrap().then(()=>{
          toast.success("Başarıyla silindi")
          dispatch(getAllVehicles());
     }).catch((e)=>{
          toast.error("bir hata oluştu.")
          console.log(e);
          
     })
}

useEffect(()=>{
     if(vehicles.length==0|| !vehicles){
          setIsLoading(true)
          dispatch(getAllVehicles()).unwrap().then(()=>{
setIsLoading(false)
          })
     }
     

},[])
if(isLoading){
     return(<Loading></Loading>)
     
          };
  return (

    <div className="flex flex-col items-center justify-center mt-3.5 w-full gap-2">
{
     vehicles && vehicles.map((vehicle)=>(<div className=" w-2/3 border border-gray-300 flex items-center justify-between">

        <img src={vehicle.image} width={100} className="h-24" />
        <p className="text-center font-bold text-xl">{vehicle.brandAndModel}</p>
        <button className="bg-red-500 text-white p-2.5  w-24 h-24 cursor-pointer" onClick={()=>{
          setvehcileId(vehicle.vehicleId);
          setModelName(vehicle.brandAndModel);
          setOpenDialog(true)}
     
     }>Sil</button>
     </div>))
}
<Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`${modelName} isimli araç silinsinmi ?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            
          </DialogContentText>
        </DialogContent>
        <DialogActions className="gap-2 ">

        <button className='bg-blue-500 text-white cursor-pointer w-1/2 p-1.5 rounded-sm' onClick={handleClose}>İptal</button>
        <button className= 'ms-0.5 text-white bg-red-500 cursor-pointer w-1/2 p-1.5 rounded-sm' onClick={()=>{
         
         
         handleDelete()
   
        }}>Sil</button>
        </DialogActions>
      </Dialog>


    </div>
  )
}
