


import './App.css'
import Register from './Auth/Register'

import { Route, Routes } from 'react-router-dom'
import Header from './Header/Header'
import Login from './Auth/Login'
import VehicleDetails from './Vehicles/VehicleDetails'
import Payment from './Payment/Payment'
import CeheckPay from './Payment/CheckPay'

import ConfirmedPay from './Payment/ConfimedPay'
import { ToastContainer } from 'react-toastify'
import EmailConfirmed from './Auth/EmailConfirmed'

import Home from './Home/Home'
import PanelHome from './Panel/PanelHome'
import AddCar from './Panel/AddCar'
import DeleteVehicle from './Panel/DeleteVehicle'
import MyAccountInfos from './Auth/MyAccountInfos'
import MyBids from './Bid/MyBids'
import Footer from './Components/Footer'

function App() {





  return (
    <>


<div className='w-full bg-amber-200 flex items-center justify-center p-1 font-extrabold text-2xl'>Hoşgeldiniz</div>
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
        <Route path='/panel/deletevehicles' element={<DeleteVehicle />}></Route>
        <Route path='/my-account' element={<MyAccountInfos />}></Route>
        <Route path='/bids/my-bids' element={<MyBids />}></Route>

      </Routes>
      <ToastContainer />
      <Footer/>
    </>

  )
}

export default App
