import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useaxiosSecure";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const image_hosting_key=import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api=`https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const Updateprofile = ({data}) => {
  const {_id,email,photo,name,upazila,distric,group}=data
   /// console.log(email,name,distric,upazila)
   const axiosPublic=useAxiosPublic()
   const axiosSecure=useAxiosSecure();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm()

    
      const onSubmit = async (data) =>{
        console.log(data)
        //image upload to imgbb
        const imageFile={image:data.photo[0]}
        const res = await axiosPublic.post(image_hosting_api,imageFile,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        console.log(res.data)
        if(res.data.success){
            data.photo=res.data.data.display_url;
            console.log(data)
              axiosSecure.patch(`users/${_id}`,data)
        .then(res=>{
            console.log(res.data)
            if(res.data.modifiedCount){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
            
        })
        }



      
        

      }
      const [selectedDistrict, setSelectedDistrict] = useState('');
      const [selectedUpazila, setSelectedUpazila] = useState('');
    
      const districtOptions = ['dhaka', 'chittagong', 'rajshahi'];
      const upazilaOptions = {
        dhaka: ['gulshan', 'banani', 'mirpur','shewrapara','agargaon'],
        chittagong: ['Agrabad', 'Hathazari', 'Pahartali'],
        rajshahi: ['Boalia', 'Motihar', 'Shah Makhdum']
      };
    
      const handleDistrictChange = (event) => {
        const selectedDistrict = event.target.value;
        setSelectedDistrict(selectedDistrict);
    
        // Reset the selected Upazila when the District changes
        setSelectedUpazila('');
      };
    
      const handleUpazilaChange = (event) => {
        const selectedUpazila = event.target.value;
        setSelectedUpazila(selectedUpazila);
      };
   
    return (
        <div>
          <h2 className="text-center text-3xl uppercase">Update blood request</h2>
             <div className="flex justify-center items-center ">
  <form className="border-2 md:w-3/4 rounded-xl" onSubmit={handleSubmit(onSubmit)}>

  <div className="w-full  p-8 space-y-3 rounded-xl dark:bg-gray-900 dark:text-gray-100">
	<h1 className="text-2xl font-bold text-center">Update Profile</h1>
		
        <div className="md:flex gap-4">
        <div className="space-y-1 flex-1 text-sm">
			<label  className="block dark:text-gray-400">Name</label>
			<input defaultValue={name} {...register("name", { required: true })} type="text" name="name" id="username" placeholder="Name" className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />
            {errors.name && <span>This field is required</span>}
		</div>
		<div className="space-y-1 flex-1 text-sm">
			
<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
<input {...register("photo", { required: true })} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/>

            {errors.photo && <span>This field is required</span>}
		</div>
        </div>
	<div className="md:flex gap-4">

    <div className="space-y-1 flex-1 text-sm">
			<label  className="block dark:text-gray-400">Blood Group</label>
			<input defaultValue={group}  {...register("group", { required: true })} type="text" name="group" id="username" placeholder="blood group" className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />
            {errors.email && <span>This field is required</span>}
		</div>
		<div className="space-y-1 flex-1 text-sm">
			<label   className="block dark:text-gray-400">email</label>
			<input defaultValue={email}   {...register("email", { required: true })} type="text" name="email" id="username" placeholder="email" className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />
            {errors.email && <span>This field is required</span>}
		</div>

    </div>
      

      <div className="md:flex gap-4">


      <div className="space-y-2 mx-1  flex-1 rounded text-sm">
        <label htmlFor="underline_select" className="sr-only">Underline select</label>
        <div className="flex-1">
      <h2>Select a District:</h2>
      <select  {...register("distric", { required: true })} className="w-full" value={selectedDistrict} onChange={handleDistrictChange}>
        <option value="">Select District</option>
        {districtOptions.map((district) => (
          <option key={district} value={district}>
            {district}
          </option>
        ))}
      </select>

      {selectedDistrict && (
        <div className="flex-1">
          <h2>Select an Upazila:</h2>
          <select  className="w-full" {...register("upazila", { required: true })} value={selectedUpazila} onChange={handleUpazilaChange}>
            <option value="">Select Upazila</option>
            {upazilaOptions[selectedDistrict].map((upazila) => (
              <option key={upazila} value={upazila}>
                {upazila}
              </option>
            ))}
          </select>
        </div>
      )}

   
    </div>

        </div>
		{/* <div className="space-y-1 flex-1 text-sm">
			<label  className="block dark:text-gray-400">Password</label>
			<input  {...register("password", { 
        required: true ,
        minLength:6,
        maxLength:20,
        pattern:/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
        })} type="password" name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />
            {errors.password?.types==='require' && <span>This field is required</span>}
            {errors.password?.type==='minLength' && <span>enter atlease 6 characters</span>}
            {errors.password?.type==='maxLength' && <span>enter less than 20 characters</span>}
            {errors.password?.type==='pattern' && <span>one special character is needed</span>}


			
         
		</div> */}


        

      </div>
        <div className="text-center flex justify-center items-center">
        <button  className="block text-center  p-3   from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5  me-2 mb-2">Update</button>

        </div>
	
</div>
   
    </form>   
         </div>
        </div>
    );
};

export default Updateprofile;