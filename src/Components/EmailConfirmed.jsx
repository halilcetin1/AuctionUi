//userId

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";


import { confirmEmail } from "../Redux/Slices/userSlice";
import { toast } from "react-toastify";


//token



export default function EmailConfirmed() {
     const dispatch=useDispatch();
     const navigate=useNavigate()
     const [searchParams] = useSearchParams();
    const email = searchParams.get("email");
    const token = searchParams.get("token");

 useEffect(()=>{
     
if(!token || !email){
  navigate("/")
  return;
}
     
  handleConfirm()

 },[])
    const handleConfirm=()=>{
     const model={
          email: email,
          token: token
     }
     dispatch(confirmEmail(model)).unwrap().then(()=>{
       toast.success("E-posta adresiniz doğrulanmıştır.")
     navigate("/")
     
     
     
     }).catch(()=>{
      toast.error("E-posta doğrulanamadı lütfen tekrar denyin!")
       navigate("/")
     })
    }
    
  return (
    <div>EmailConfirmed</div>
  )
}
