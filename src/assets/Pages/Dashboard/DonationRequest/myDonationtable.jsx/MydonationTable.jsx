import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useaxiosSecure";

const MydonationTable = ({items,refetch}) => {
    const axiosSecure=useAxiosSecure()
    console.log(items)


    const handleDelte =(id)=>{
        console.log(id)
        axiosSecure.delete(`/blood-request/${id}`)
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
    return (
        <div>
           

<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                recipient name
                </th>
                <th scope="col" className="px-6 py-3">
                recipient location
                </th>
                <th scope="col" className="px-6 py-3">
                donation date
                </th>
                <th scope="col" className="px-6 py-3">
                donation time
                </th>
                <th scope="col" className="px-6 py-3">
               donar information
                </th>
                <th scope="col" className="px-6 py-3">
                donation time
                </th>
                <th scope="col" className="px-6 py-3">
                delete
                </th>
                <th scope="col" className="px-6 py-3">
                update
                </th>
                <th scope="col" className="px-6 py-3">
                donation status
                </th>
            </tr>
        </thead>
        <tbody>
           {
            items.map(item =>  <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {item.recipient}
            </th>
            <td className="px-6 py-4">
            {item.upazila}, {item.distric}
            </td>
            <td className="px-6 py-4">
                {item.donationdate}
            </td>
            <td className="px-6 py-4">
                {item.donationtime}
            </td>
            <td className="px-6 py-4">
                $2999
            </td>
            <td className="px-6 py-4">
               <button>view Details</button>
            </td>
           {
             item.status==='pending' && <> <td className="px-6 py-4">
             <button onClick={()=>handleDelte(item._id)}><MdDelete></MdDelete></button>
          </td>
          <td className="px-6 justify-center py-4">
          <Link to={`dpdaterequest/${item._id}`}><button><FaRegEdit></FaRegEdit></button></Link>
          </td></>
           }
           {
             item.status==='inprogress' && <> <td className="px-6 py-4">
             <button>Done</button>
          </td>
          <td className="px-6 justify-center py-4">
          <button>Canceled</button>
          </td></>
           }
            <td className="px-6 justify-center py-4">
            {item.status}
            </td>
        </tr>)
           }
           
        </tbody>
    </table>
</div>

            
        </div>
    );
};

export default MydonationTable;