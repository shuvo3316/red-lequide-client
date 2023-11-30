import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useaxiosSecure';
import { Link } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
import ReactiveButton from 'reactive-button';

export default function BasicSelect() {
    const axiosSecure=useAxiosSecure()
    const [status,setStatus]=React.useState('public')
  const handleChange = (event) => {
    if(event.target.value){
        console.log(event.target.value)
        setStatus(event.target.value)
    }
    


  };
  console.log(status)
  const {refetch,data:blogs=[]}=useQuery({
    queryKey:['blogs'],
    queryFn: async ()=>{
        const res = await axiosSecure.get(`/blogs`)
        return res.data;
    }
  })
//   const pending =request.filter(item=>item.status ==='pending');
//   const inprogress =request.filter(item=>item.status ==='inprogress');
  const drafts =blogs.filter(item=>item.status ==='draft');
  const publishs =blogs.filter(item=>item.status ==='publish');
console.log(publishs)

const handleDelte =(id)=>{
    console.log(id)
    axiosSecure.delete(`/blogs/${id}`)
    .then(res=>{
        console.log(res.data)
        if(res.data.deletedCount>0){
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your request is in process",
                showConfirmButton: false,
                timer: 1500
              });
        }
    })
}
const handleChangeRole = (status,id) => {
    const role = {role:status};
    
    console.log(id,role)

    axiosSecure.patch(`/blogs/${id}`,role)
    .then(res=>{
        console.log(res.data)
        refetch();
    })

    // Reset the selected Upazila when the District changes
    //setSelectedUpazila('');
  };

  return (
    <div>
 <div className='w-9'>
       <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={'publish'}>publish</MenuItem>
          <MenuItem value={'draft'}>draft</MenuItem>
        </Select>
      </FormControl>
    </Box>

    
 </div>
 

 <div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                blog title
                </th>
               
                <th scope="col" className="px-6 py-3">
                blog status
                </th>
              
                <th scope="col" className="px-6 py-3">
                delete
                </th>
                
                
            </tr>
        </thead>
        <tbody>
           { 
           status==='draft'&&
            drafts.map(item =>  <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {item.title}
            </th>
           
            <td className="px-6 py-4">
            {
                    item.status==='draft'&&<button onClick={()=>handleChangeRole('publish',item._id)} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">publish</button>
                    


                }            </td>
            
            <td className="px-6 py-4">
               <button onClick={()=>handleDelte(item._id)}>Delete</button>
            </td>
       
        
        </tr>)
           }
           {
            status==='publish'&&
            publishs.map(item =>  <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {item.title}
            </th>
           
            <td className="px-6 py-4">
            {
                    item.status==='draft'&&<button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">publish</button>
                    


                }               </td>
            
            <td className="px-6 py-4">
               <button onClick={()=>handleDelte(item._id)}>Delete</button>
            </td>
       
        
        </tr>)
           }
           
        </tbody>
    </table>
</div>
 </div>
  );
}