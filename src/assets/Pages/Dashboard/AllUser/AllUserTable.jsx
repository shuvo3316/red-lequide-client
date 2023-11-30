import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useaxiosSecure";
import { set } from 'react-hook-form';

const AllUserTable = ({items,refetch}) => {
    //const [anchorEl, setAnchorEl] = React.useState(null);
    //const [role,setRole]=React.useState('')
   // const open = Boolean(anchorEl);


    const [role, setRole] = React.useState('');
    //const [selectedUpazila, setSelectedUpazila] = useState('');
  
    const districtOptions = ['admin', 'doner', 'volunteer'];
    //console.log(role)

 


    const axiosSecure=useAxiosSecure()
    //console.log(items)


    // const handleDelte =(id)=>{
    //     console.log(id)
    //     axiosSecure.delete(`/blood-request/${id}`)
    //     .then(res=>{
    //         console.log(res.data)
    //         if(res.data.deletedCount>0){
    //             refetch();
    //             Swal.fire({
    //                 position: "top-end",
    //                 icon: "success",
    //                 title: "Your request is in process",
    //                 showConfirmButton: false,
    //                 timer: 1500
    //               });
    //         }
    //     })
    // }
    const handleDistrictChange = (event,id) => {
        const role = {role:event.target.value};
        setRole(role);
        console.log(id,role)

        axiosSecure.patch(`/users/${id}`,role)
        .then(res=>{
            console.log(res.data)
            refetch();
        })
    
        // Reset the selected Upazila when the District changes
        //setSelectedUpazila('');
      };
    return (
        <div>
           

<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                User Image
                </th>
                <th scope="col" className="px-6 py-3">
                User Name
                </th>
                <th scope="col" className="px-6 py-3">
                User Email
                </th>
                <th scope="col" className="px-6 py-3">
                User Status
                </th>
                <th scope="col" className="px-6 py-3">
               Role
                </th>
                <th scope="col" className="px-6 py-3">
                Change Status
                </th>
                <th scope="col" className="px-6 py-3">
                Change Role
                </th>
                
            </tr>
        </thead>
        <tbody>
           {
            items.map(item =>  <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            <img className="w-10 h-10 rounded-full" src={item.photo} alt="Rounded avatar"/>
            </th>
            <td className="px-6 py-4">
            {item.name}
            </td>
            <td className="px-6 py-4">
                {item.email}
            </td>
            <td className="px-6 py-4">
                {item.status}
            </td>
            <td className="px-6 py-4">
            {item.role}
            </td>
            <td className="px-6 py-4">
                {
                    item.status==='active'?<button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">block</button>
                    :
                    <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">active</button>


                }
            </td>
            <td className="px-6 py-4">
            <select  className="w-full" value={role} onChange={()=>handleDistrictChange(event,item._id)}>
        <option value="">{item.role}</option>
        {districtOptions.map((district) => (
          <option key={district} value={district}>
            {district}
          </option>
        ))}
      </select>
            </td>

         
           
        </tr>)
           }
           
        </tbody>
    </table>
</div>

            
        </div>
    );
};

export default AllUserTable;