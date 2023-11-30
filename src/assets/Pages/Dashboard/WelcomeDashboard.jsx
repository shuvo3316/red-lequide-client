import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import MydonationTable from "./DonationRequest/myDonationtable.jsx/MydonationTable";
import useAuth from "../../Hooks/useAutth/useAuth";
import { Link } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import useUser from "../../Hooks/useUser";
import useRequest from "../../Hooks/useRequest";
import { useEffect, useState } from "react";

const WelcomeDashboard = () => {
  const{user}=useAuth()
  const axiosPublic=useAxiosPublic();
  const isadmin=useAdmin();
  const admin=isadmin[0]
  const[req,setReq]=useState(0)
  console.log(admin)

  const {refetch,data : request1=[]}=useQuery({
    queryKey:['request'],
    queryFn: async ()=>{
        const res = await axiosPublic.get(`/blood-request?email=${user.email}`)
        return res.data;
    }
    
  })
   useEffect(()=>{
    axiosPublic.get('/blood-request')
    .then(res=>{
      console.log(res.data)
      setReq(res.data)
    })
   },[axiosPublic])



  const [x]=useUser();
  
  const allreq =request1.slice(0,3);
    return (
      <div>
        {admin &&
        <section className="p-6 dark:bg-gray-800 dark:text-gray-100">
        <div className="container mx-auto grid justify-center grid-cols-2 text-center lg:grid-cols-3">
          <div className="flex flex-col justify-start m-2 lg:m-6">
            <p className="text-4xl font-bold leadi lg:text-6xl">{x.length}+</p>
            <p className="text-sm sm:text-base">Clients</p>
          </div>
          <div className="flex flex-col justify-start m-2 lg:m-6">
            <p className="text-4xl font-bold leadi lg:text-6xl">{req.length}</p>
            <p className="text-sm sm:text-base">Blood Request</p>
          </div>
          <div className="flex flex-col justify-start m-2 lg:m-6">
            <p className="text-4xl font-bold leadi lg:text-6xl">3</p>
            <p className="text-sm sm:text-base">Published books</p>
          </div>
         
        </div>
      </section>
        }
        {
         
          !admin&&
          <div className="">
          <MydonationTable items={allreq}></MydonationTable>
        <div className="flex justify-center my-6">
        <Link to={'my-donation-request'}> <button className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">My Donation Requests</button></Link>

        </div>
        </div>
        }

      </div>
    );
};

export default WelcomeDashboard;