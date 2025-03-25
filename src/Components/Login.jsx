import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { logIn } from '../Redux/Slices/userSlice'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

export default function Login() {

     const [email, setEmail] = useState ("")
     const [password, setPassword] = useState  ("")
     const [Inputerror, setError] = useState("")

     const dispatch = useDispatch ()
     const { loading, error } = useSelector((state) => state.user);

     const navigate = useNavigate();



     if (localStorage.getItem("token")) {

          return <Navigate to={"/"} />
     }
     const handleform = () => {






          if (email == null || email == "") {
               setError("e-posta alanı boş girilemez.")
               return
          }
          if (password == null || password == "") {
               setError("şifre alanı boş olamaz.")
               return
          }
          const model = {
               email: email,
               password: password
          }
          dispatch(logIn(model)).unwrap().then(() => navigate("/")).catch(
          )
     }

     return (
          <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
               <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img className="mx-auto h-10 w-auto" src="https://www.svgrepo.com/show/301692/login.svg" alt="Workflow" />

                    <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w">

                         <a href="/register"
                              className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                              Hesabınız yoksa kayıt olun
                         </a>
                    </p>
               </div>

               <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                         <div >


                              <div className="mt-6">
                                   <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">E-posta</label>
                                   <div className="mt-1 flex rounded-md shadow-sm">
                                        <span
                                             className="inline-flex h-10 items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                             info@cars.com
                                        </span>
                                        <input id="email" name="email" placeholder="e-posta" type="text" required
                                             className="flex-1  border border-gray-300 form-input pl-3 block w-full rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5" onChange={(e) => {
                                                  setEmail(e.target.value)
                                             }} />
                                   </div>

                              </div>



                              <div className="mt-6">
                                   <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                                        Password
                                   </label>
                                   <div className="mt-1 rounded-md shadow-sm">
                                        <input id="password" name="password" type="password"
                                             className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                             onChange={(e) => { setPassword(e.target.value) }}
                                        />
                                   </div>

                              </div>



                              <div className="mt-6">
                                   <span className="block w-full rounded-md shadow-sm">
                                        <button
                                             className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out" onClick={() => handleform()}>
                                             {
                                                  loading ? "Giriş yapılıyor" : "Giriş Yap"
                                             }
                                        </button>
                                   </span>
                              </div>
                              {
                                   error && <p className='text-red-500'>{error}</p>
                              }
                              {
                                   Inputerror && <p className='text-red'>{Inputerror}</p>

                              }
                         </div>

                    </div>
               </div>
          </div>
     )
}
