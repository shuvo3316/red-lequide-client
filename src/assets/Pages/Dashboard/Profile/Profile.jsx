import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAutth/useAuth";
import Updateprofile from "./Updateprofile";
import useUser from "../../../Hooks/useUser";

const Profile = () => {
    const axiosPublic=useAxiosPublic();
    const {user}=useAuth()
    //const[request]=useUser();

    // const data1 =request.filter(req => req.email===user.email)
    // const data=data1[0];
    // console.log(data)

    const {data }=useQuery({
        queryKey:['user'],
        queryFn: async ()=>{
            const res = await axiosPublic.get(`/users?email=${user.email}`)
            return res.data;
        }
      })
      console.log(data)
   
    
    return (
        <div>
            {data &&<Updateprofile data={data}></Updateprofile>}
          
            
        </div>
    );
};

export default Profile;