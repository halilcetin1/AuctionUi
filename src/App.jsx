


import './App.css'
import Register from './Components/Register'

import { Route, Routes } from 'react-router-dom'
import Header from './Header/Header'
import Login from './Components/Login'
import VehicleDetails from './Vehicles/VehicleDetails'
import Payment from './Payment/Payment'
import CeheckPay from './Payment/CheckPay'

import ConfirmedPay from './Payment/ConfimedPay'
import { ToastContainer } from 'react-toastify'
import EmailConfirmed from './Components/EmailConfirmed'

import Home from './Home/Home'
import PanelHome from './Panel/PanelHome'
import AddCar from './Panel/AddCar'
import DeleteVehicles from './Panel/DeleteVehicles'


function App() {

  // const dispat=useDispatch()
  // useEffect(()=>{

  // dispat(checkPaymentStatus({vehicleID:28,userId:"c0c4b041-9c27-4c83-9394-3d973538b636"}))
  // // dispat(addPayHistory())

  // },[])



  return (
    <>


<div className='w-full bg-amber-200'>h</div>
      <Header />

      <Routes>

        <Route path='/register' element={<Register />}></Route>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/vehicle-details/:vehicleId' element={<VehicleDetails />}></Route>
        <Route path='/payment' element={<Payment />}></Route>
        <Route path='/checkpay' element={<CeheckPay />}></Route>
        <Route path='/confirmedpay' element={<ConfirmedPay />}></Route>
        <Route path='/confirm-email' element={<EmailConfirmed />}></Route>
        <Route path='/panel' element={<PanelHome />}></Route>
        <Route path='/panel/addcar' element={<AddCar />}></Route>
        <Route path='/panel/deletevehicles' element={<DeleteVehicles />}></Route>

      </Routes>
      <ToastContainer />
    </>

  )
}

export default App
