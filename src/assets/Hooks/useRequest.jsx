import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useRequest = () => {
    const axiosPublic=useAxiosPublic();

    const {refetch,data : req=[]}=useQuery({
        queryKey:['request'],
        queryFn: async ()=>{
            const res = await axiosPublic.get(`/blood-request`)
            return res.data;
        }
      });
      console.log(req)
      return [req,refetch]
};

export default useRequest;