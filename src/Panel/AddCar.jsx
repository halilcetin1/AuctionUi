import React, { useState } from 'react'


import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import { AddVehicle } from '../Redux/Slices/vehcileSlice';
import Loading from '../Components/Loading';
export default function AddCar() {
     const [isActive, setIsActive] = useState(false);
     const [brandAndModel, setBranAndModel] = useState("");
     const [manifacturingYear, setManifacturingYear] = useState(0);
     const [color, setColor] = useState("");
     const [price, setPrice] = useState(0);
     const [millage, setMillage] = useState(0);
     const [endTime, setEndTime] = useState();
     const [images, setImagesVehcisles] = useState();
     const [engineCapacity, setEngineCapacity] = useState(0);
     const [plateNumber, setPlateNumber] = useState();
     const [auctionPrice, setAuctionPrice] = useState(0);
     const [additionalInformation, setInformation] = useState("")
     const [sellerId, setSellerId] = useState("")
     const [isLoading, setIsLoading] = useState(false)
     const [imagePreviews, setImagePreviews] = useState()

     const dispatch = useDispatch()
     const handleFileChange = (e) => {
          if (e.target.files) {
               const files = Array.from(e.target.files);
               setImagesVehcisles(files);
               const imageUrls = files.map((file) => URL.createObjectURL(file));
               setImagePreviews(imageUrls);
          }

     }
     const handleForm = (e) => {
          e.preventDefault();
          const token = localStorage.getItem("token")
          if (!token) {
               return
          }
        //  setIsLoading(true)

          const { nameid } = jwtDecode(token);


      




          const formData = new FormData();
          formData.append("BrandAndModel", brandAndModel)
          formData.append("ManifacturingYear", manifacturingYear.toString())
          formData.append("Color", color)
          formData.append("EngineCapacity", engineCapacity.toString())
          formData.append("Price", price.toString())
          formData.append("Millage", millage.toString())
          formData.append("PlateNumber", plateNumber)
          formData.append("AuctionPrice", auctionPrice.toString())
          formData.append("AdditionalInformation", additionalInformation)
        
          formData.append("EndTime",new Date(endTime).toISOString())
          formData.append("IsActive", isActive.toString())
          formData.append("SellerId", nameid)
          images?.forEach((image) => {
               formData.append("Imagesvehicle", image)
          })
    
         
          addVehicles(formData)
     
        
     }
     const addVehicles = async (model) => {



       



setIsLoading(true);
          dispatch(AddVehicle(model)).unwrap().then(() => {
               setIsLoading(false)
               toast.success("Araç başarıyla eklendi.")
          }).catch(() => {
               setIsLoading(false)
               toast.error("Bir hata oluştu.")
          })

     }
     

if(isLoading){
     return (<Loading/>)
}

     return (
          <form className='flex  flex-col items-center justify-center w-full h-full' onSubmit={handleForm}>
               <p> Araç Ekle </p>

               <div className="mb-2  w-1/3 max-sm:w-2/3">
                    <label htmlFor="base-input" className="block mb-2 text-sm font-medium  ">Marka & Model ismi</label>
                    <input type="text" required id="base-input" value={brandAndModel}
                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " onChange={(e) => {
                              setBranAndModel(e.target.value)


                         }} />
               </div>
               <div className="mb-2  w-1/3 max-sm:w-2/3">
                    <label htmlFor="base-input" className="block mb-2 text-sm font-medium  ">Renk</label>
                    <input type="text" required id="base-input" value={color}
                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " onChange={(e) => {
                              setColor(e.target.value)

                         }} />
               </div><div className="mb-2  w-1/3 max-sm:w-2/3">
                    <label htmlFor="base-input" className="block mb-2 text-sm font-medium  ">Model Yılı</label>
                    <input type='number' required id="base-input" value={manifacturingYear}
                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " onChange={(e) => {
                              setManifacturingYear(e.target.value)

                         }} />
               </div><div className="mb-2  w-1/3 max-sm:w-2/3">
                    <label htmlFor="base-input" className="block mb-2 text-sm font-medium  ">Başlangıç Fiyatı</label>
                    <input type="number" required id="base-input" value={price}
                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " onChange={(e) => { setPrice(e.target.value) }} />
               </div><div className="mb-2  w-1/3 max-sm:w-2/3">
                    <label htmlFor="base-input" className="block mb-2 text-sm font-medium  ">Plaka</label>
                    <input type="text" required id="base-input" value={plateNumber}
                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " onChange={(e) => {
                              setPlateNumber(e.target.value)
                         }} />
               </div>
               <div className="mb-2  w-1/3 max-sm:w-2/3">
                    <label htmlFor="base-input" className="block mb-2 text-sm font-medium  ">Teklif Ücreti</label>
                    <input type="number" required id="base-input" value={auctionPrice}
                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " onChange={(e) => {
                              setAuctionPrice(e.target.value)
                         }} />
               </div>
               <div className="mb-2  w-1/3 max-sm:w-2/3">
                    <label htmlFor="base-input" className="block mb-2 text-sm font-medium  ">Kilometre</label>
                    <input type="number" required id="base-input" value={millage}
                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " onChange={(e) => { setMillage(e.target.value) }} />
               </div>
               <div className="mb-2  w-1/3 max-sm:w-2/3">
                    <label htmlFor="base-input" className="block mb-2 text-sm font-medium  ">Motor kapasitesi</label>
                    <input type="number" required id="base-input" value={engineCapacity}
                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " onChange={(e) => { setEngineCapacity(e.target.value) }} />



                    <label htmlFor="message" className="block mb-2 text-sm font-medium ">Araç bilgileri</label>
                    <textarea id="message" value={additionalInformation} required
                         rows={3} className="  outline-0  block p-2.5 w-full text-sm  bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500dark:placeholder-gray-400 dark:focus:ring-blue-500   dark:focus:border-blue-300 " placeholder="Araç açıklaması" onChange={(e) => { setInformation(e.target.value) }}></textarea>
               </div>



               <div className=" w-1/3 max-sm:w-2/3">
                    <label htmlFor="">Bitiş Tarihi</label>
                    <input type='datetime-local' required onChange={(e) => { setEndTime(e.currentTarget.value)


                         
                     }} className="  outline-0  block p-2.5 w-full text-sm  bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500dark:placeholder-gray-400 dark:focus:ring-blue-500   dark:focus:border-blue-300 " />
               </div>
               <div className=" w-1/3 max-sm:w-2/3 mt-2">
                    <label className="inline-flex items-center mb-5 cursor-pointer">
                         <input type="checkbox"  className="sr-only peer" onChange={(e) => {
                              console.log(e.target.value, "active");
                              setIsActive(!isActive)



                         }} />
                         <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                         <span className="ms-3 text-sm font-medium ">{
                              isActive ? "Aktif" : "Pasif"
                         }</span>
                    </label>

               </div>
               <div className=" w-1/3 max-sm:w-2/3 mb-6">
                    <label htmlFor="">Resimler</label>
                    <input type='file' multiple required accept="image/*" onChange={handleFileChange} className="  outline-0  block p-2.5 w-full text-sm  bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500dark:placeholder-gray-400 dark:focus:ring-blue-500   dark:focus:border-blue-300 " />
               </div>
               <div className='w-full flex items-center flex-wrap justify-center max-sm:flex-col'>
                    {
                         imagePreviews && imagePreviews.map((e) => (<img src={e} width={400} className=' object-contain  h-96'></img>))
                    }
               </div>
               <div className="w-1/3 max-sm:w-2/3 mb-10">
                    <button type='submit' className='mt-2.5 p-1.5 w-full bg-blue-600 text-white cursor-pointer rounded-md text-center text-2xl flex items-center justify-center gap-1' disabled={isLoading} >
                         {isLoading ? "Kaydediliyor..." : "Kaydet"}
                    </button>
               </div>
          </form>
     )
}
