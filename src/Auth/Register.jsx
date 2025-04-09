
// export interface Root {
//     fullName: string
//     userType: string
//     email: string
//     password: string


import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

import { signIn } from "../Redux/Slices/userSlice";

import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
//   }



export default function  Register() {
    const navigate=useNavigate()
const [fullName,setFullname]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [role,setRole]=useState("Admin");
const [confirmPassword,setConfirmPassword]=useState("");
const [errors,setError]=useState("");
const [show,setShow]=useState(true)
const dispatch=useDispatch()
const {loading,error}=useSelector((state)=>state.user);
const inputRef=useRef(null);
if(localStorage.getItem("token")){
    
    return <Navigate to={"/"}/>
}

const handleForm=()=>{
if(email=="" || email==null){
    setError("email alanı boş geçilemez.")
    return
}
if(fullName==""){
    setError("isim alanı boş olamaz")
    return
}
if(password!==confirmPassword){
    setError("şifreler uyuşmuyor lütfen kontrol ediniz.");
    return;
}
const model={
    fullName:fullName,
    password:password,
    email:email,
    userType:role
}
dispatch(signIn(model)).unwrap().then(()=>{
    toast.success("başarıyla kayıt olundu.")
    navigate("/")


}).catch()



}

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-10 w-auto" src="https://www.svgrepo.com/show/301692/login.svg" alt="Workflow"/>
      
        <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
           Veya
            <a href="/login"
                className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
             Hesabınız varsa giriş yapın.
            </a>
        </p>
    </div>

    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div >
                <div>
                    <label htmlFor="fullname" className="block text-sm font-medium leading-5  text-gray-700">Ad Soyad</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <input id="name" name="name" placeholder="Ad-soyad" type="text" required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" onChange={(e)=>{setFullname(e.target.value)}} value={fullName}/>
                        <div className="hidden absolute inset-y-0 right-0 pr-3  items-center pointer-events-none">
                            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                    clip-rule="evenodd">
                                </path>
                            </svg>
                        </div>
                    </div>
                
                </div>

                <div className="mt-6">
                    <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">E-posta</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <span
                            className="inline-flex h-10 items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                            abc@cars.com
                        </span>
                        <input id="email" name="email" placeholder="e-posta" type="text" required
                            className="flex-1  border border-gray-300 form-input pl-3 block w-full rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5" onChange={(e)=>{
                                setEmail(e.target.value)
                            }}/>
                    </div>
                  
                </div>


                <div className="mt-6">
                    <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                        Password
                    </label>
                    <div className="mt-1 rounded-md shadow-sm relative">
                        <input id="password" name="password" type={show ? "password":"text"} 
                            className=" block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" onChange={(e)=>setPassword(e.target.value)}/>
                            {
                                show ? <FaEyeSlash className=" absolute  right-2 cursor-pointer top-2 text-2xl" onClick={()=>{setShow(!show)}}/> :<FaEye  className=" absolute  right-2 cursor-pointer top-2 text-2xl" onClick={()=>setShow(!show)}/>
                            }
                            
                    </div>
                 
                </div>

                <div className="mt-6">
                    <label htmlFor="password_confirmation" className="block text-sm font-medium leading-5 text-gray-700">
                        Confirm Password
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                        <input id="password_confirmation" name="password_confirmation" type={show ? "password":"text"}  required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 relative" onChange={(e)=>setConfirmPassword(e.target.value)}/>
                    </div>
                    
                </div>

                <div className="mt-6">
                    <span className="block w-full rounded-md shadow-sm">
                        <button onClick={()=>handleForm()}
                            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out" >
                         {
                            loading ? "Oluşturuluyor...":"Hesap oluştur"
                         } 
                        </button>
                    </span>
                </div>
                {
                        errors && <p className="text-red-500">{errors}</p>
                    }
                    
            </div>

        </div>
    </div>
</div>
  )
}
