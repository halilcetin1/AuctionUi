import { useSelector } from "react-redux";

import { FaRegCircleCheck } from "react-icons/fa6";


 function Bid(props) {
 const b=props;
 const bid=b.bid
 console.log(props);
 
 const {userId}=props;
     const amount=bid.bidAmount;
     
     const convert=amount.toLocaleString("tr-TR")
     const { token } = useSelector((state) => state.user)

     

     const date=new Date(bid.bidDate+"Z")


     
     
  return (
    <div className="p-3">

<div className="border border-gray-300 rounded-lg flex items-center justify-between p-7 relative ">
<p className="flex items-center gap-2 font-bold text-2xl">{bid.fullName} <FaRegCircleCheck className="text-green-500"/></p>
<p className="font-bold text-2xl">{convert} TL</p>




<div className="text-gray-500 absolute right-1 top-0">
<span >{date.getDate()<10 ? <span>0{date.getDate()}</span>:<span>{date.getDate()}</span>}</span>/
<span> {date.getMonth()+1<10 ? <span>0{date.getMonth()+1}</span>:<span>{date.getMonth()+1}</span>}      </span>/
<span>{date.getFullYear()}</span>
<span className="ml-2">{date.getHours()}</span>:
<span>{date.getMinutes()}</span>

</div>
</div>


    </div>
  )
}
export default Bid;



