

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TfiMenuAlt } from "react-icons/tfi";
import { IoCloseCircle } from "react-icons/io5";
import {jwtDecode} from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { logOut } from '../Redux/Slices/userSlice';

const Header = () => {
    const navigate=useNavigate()
  const [nav, setNav] = useState(false);
  const [open,setOpen]=useState(false)

  const [isLogin,setIsLogin]=useState(false);
  const [userInfo,setUserInfo]=useState("");
  const user=useSelector((state)=>state.user);
  const [role,setRole]=useState("")
  const dispatch=useDispatch()
const handleClose=()=>{
  setOpen(false)
}

useEffect(()=>{
    if(user.token){
      
        const userRes=jwtDecode(user.token);
      console.log(userRes);
      
    setUserInfo(userRes.fullName);
    setRole(userRes.role)
     setIsLogin(true)
     
    }
},[user])
  return (
  
      <nav className=" w-full   bg-white border-gray-200 px-4 lg:px-6 py-2.5   ">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-lg">
          <Link to="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap ">
              Logo
            </span>
          </Link>

          <div
            className={`flex-col md:flex md:flex-row items-center w-full md:w-auto md:order-2 transition-all duration-300 ${
              nav
                ? 'absolute top-14 left-0 w-full bg-white shadow-md p-4 md:relative md:top-0 md:w-auto md:bg-transparent md:shadow-none'
                : 'hidden md:flex gap-6'
            }`}
          >
            <ul className="flex flex-col md:flex-row md:gap-8 gap-0">
              <li>
              <a href=""  className='text-gray-500 hover:text-gray-800 cursor-pointer hover:border-b'>Home</a>
              </li>
              <li>
              <a href="" className='text-gray-500 hover:text-gray-800 cursor-pointer hover:border-b'>Vehicles</a>
              </li>
              <li>
             <a className='text-gray-500 hover:text-gray-800 cursor-pointer hover:border-b border-gray-800 hover:transition-all '>contact</a>
              </li>
             {isLogin? <li>
              <button className='text-red-500 cursor-pointer' onClick={()=>setOpen(true)}>Çıkış Yap</button>
              <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Çıkış yapılacak devam edilsin mi?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>

        <button className='text-blue-500 cursor-pointer' onClick={handleClose}>Vazgeç</button>
        <button className= 'ms-0.5 text-red-500 cursor-pointer' onClick={()=>{
          dispatch(logOut())
          handleClose()
          setIsLogin(false)
          navigate("/login")
        }}>Çıkış yap</button>
        </DialogActions>
      </Dialog>
              </li>:""}
            
            </ul>
      {
        isLogin ? <div>
           <p className='text-red'>{userInfo}
           </p>
        </div> :<div className='flex gap-1'>


        <button
                      className="mt-4 md:mt-0 rounded-full bg-blue-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg hover:bg-white hover:text-blue-500 hover:border hover:border-blue-500 cursor-pointer"
                      type="button"
                   onClick={()=>navigate("/register")} >
                  Kayıt ol
                    </button>
                    <button
                      className="mt-4 md:mt-0 rounded-full cursor-pointer bg-white  py-2 px-4 border border-blue-500 text-center text-sm text-blue-500 transition-all shadow-md hover:shadow-lg hover:bg-blue-500 hover:text-white"
                      type="button"
                    onClick={()=>navigate("/login")}>
                   Giriş yap
                    </button>
        
                </div>
      }
      {
        isLogin ?  <div>
           {
            role =="Adminstrator" ?  <p className='text-blue-500 cursor-pointer' onClick={()=>{
              navigate("/panel")
            }}>Panel</p>:""
           }
        </div>: ""
      }
          </div>

         
          <div className="md:hidden flex items-center lg:order-1">
            <button
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={nav}
              onClick={() => setNav(!nav)}
            >
              <span className="sr-only">Open main menu</span>
              {nav ? (
         <IoCloseCircle/>
              ) : (
                <TfiMenuAlt />
               
              )}
            </button>
          </div>
        </div>
      </nav>
   
  );
};

export default Header;











