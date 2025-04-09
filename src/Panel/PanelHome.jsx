import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { jwtDecode } from "jwt-decode";
import { Navigate, useNavigate } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
export default function PanelHome() {
const {token}=useSelector((state)=>state.user);
     const [role,setRole]=useState("")
     const navigate=useNavigate();
     useEffect(()=>{
if(!token){
     return
}
const {role}=jwtDecode(token);
setRole(role);
if(role!="Adminstrator") {
     (navigate("/"))
} 




     },[])
  return (
    <div className="flex-col  flex items-center justify-center w-full h-full ">
     <p>Admin Paneli</p>
<div className="flex flex-wrap gap-8 items-center justify-center">
<div className="w-2xs border border-gray-300 h-64 rounded-3xl flex items-center justify-center p-1.5 gap-2 cursor-pointer  " onClick={()=>{
     navigate("/panel/addcar")
}}>

<IoIosAddCircleOutline className="text-2xl "/>Araç Ekle
</div>




<div className="w-2xs border border-gray-300 h-64 rounded-3xl flex items-center justify-center p-1.5 gap-2 cursor-pointer  hover:bg-" onClick={()=>navigate("/panel/deletevehicles")}>

<IoIosAddCircleOutline className="text-2xl "/>Araçları sil
</div><div className="w-2xs border border-gray-300 h-64 rounded-3xl flex items-center justify-center p-1.5 gap-2 cursor-pointer  hover:bg-">

<IoIosAddCircleOutline className="text-2xl "/>Araçları düzenle
</div><div className="w-2xs border border-gray-300 h-64 rounded-3xl flex items-center justify-center p-1.5 gap-2 cursor-pointer  ">

<IoIosAddCircleOutline className="text-2xl "/>Araçları listele
</div>

<div className="w-2xs border border-gray-300 h-64 rounded-3xl flex items-center justify-center p-1.5 gap-2 cursor-pointer  hover:bg-">

<IoIosAddCircleOutline className="text-2xl "/>Bilgileri düzenle
</div>
</div>



    </div>
  )
}
