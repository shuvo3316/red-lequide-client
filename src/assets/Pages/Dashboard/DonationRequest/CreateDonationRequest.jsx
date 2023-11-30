import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAutth/useAuth";
import Swal from "sweetalert2";

const CreateDonationRequest = () => {


    const {user}=useAuth()
    const axiosPublic=useAxiosPublic()

    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedUpazila, setSelectedUpazila] = useState('');
  
    const districtOptions = ['dhaka', 'chittagong', 'rajshahi'];
    const upazilaOptions = {
      dhaka: ['gulshan', 'banani', 'mirpur'],
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


   //const{createUser,logOut,updateUserProfile}=useAuth();
   const {
       register,
       handleSubmit,
       reset,
       formState: { errors },
     } = useForm()

   
     const onSubmit = (data) =>{
       console.log(data)
       console.log(user)

       const donationRequestInfo ={
        requesterName:user.displayName,
        requesterEmail:user.email,
        recipient:data.Recipient,
        address:data.address,
        distric:data.distric,
        donationdate:data.donationdate,
        donationtime:data.donationtime,
        group:data.group,
        hospital:data.hospital,
        upazila:data.upazila,
        status:'pending'

       }

       axiosPublic.post('/blood-request',donationRequestInfo)
       .then(res=>{
        console.log("inserted  data",res.data)
        if(res.data.insertedId){
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
              <div className="flex justify-center items-center ">
  <form className="border-2 md:w-3/4 rounded-xl" onSubmit={handleSubmit(onSubmit)}>

  <div className="w-full  p-8 space-y-3 rounded-xl dark:bg-gray-900 dark:text-gray-100">
	<h1 className="text-2xl font-bold text-center">Make a Request</h1>
		
        <div className="flex gap-4 ">
            <div className="space-y-1 flex-1 text-sm">
			<label  className="block dark:text-gray-400"> Recipient Name</label>
			<input {...register("Recipient", { required: true })} type="text" name="Recipient" id="Recipient" placeholder=" Recipient Name" className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />
            {errors.Recipient && <span>This field is required</span>}
		</div>
		<div className="space-y-1 flex-1 text-sm">
			<label  className="block dark:text-gray-400"> hospital name</label>
			<input {...register("hospital", { required: true })} type="text" name="hospital" id="hospital" placeholder="hospital name" className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />
            {errors.hospital && <span>This field is required</span>}
		</div>
        </div>
		
        <div className="flex gap-4 ">

        <div className="space-y-1 flex-1 text-sm">
			<label  className="block dark:text-gray-400">Blood Group</label>
			<input {...register("group", { required: true })} type="text" name="group" id="username" placeholder="blood group" className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />
            {errors.group && <span>This field is required</span>}
		</div>
		<div className="space-y-1 flex-1 text-sm">
			<label  className="block dark:text-gray-400">full address line</label>
			<input {...register("address", { required: true })} type="text" name="address" id="username" placeholder="full address line" className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />
            {errors.address && <span>This field is required</span>}
		</div>

        </div>
		
        <div className="flex gap-4">

        <div className="space-y-1 flex-1 text-sm">
			<label  className="block dark:text-gray-400">donate date</label>
			<input {...register("donationdate", { required: true })} type="date" name="donationdate" id="donationdate" placeholder="Donation Date" className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />
            {errors.donationdate && <span>This field is required</span>}
		</div>
		<div className="space-y-1 flex-1 text-sm">
			<label  className="block dark:text-gray-400">Donation Time</label>
			<input {...register("donationtime", { required: true })} type="time" name="donationtime" id="donationtime" placeholder="Donation Time" className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />
            {errors.donationtime && <span>This field is required</span>}
		</div>

        </div>

        <div className="space-y-2 mx-1  rounded text-sm">
        <label htmlFor="underline_select" className="sr-only">Underline select</label>
        <div className="flex gap-4 flex-row">
     <div className="flex-1">
     <h2>Select a District:</h2>
      
      <select {...register("distric", { required: true })} className="w-full rounded flex-1" value={selectedDistrict} onChange={handleDistrictChange}>
        <option value="">Select District</option>
        {districtOptions.map((district) => (
          <option key={district} value={district}>
            {district}
          </option>
        ))}
      </select>
     </div>

      {selectedDistrict && (
        <div className="flex-1">
          <h2>Select an Upazila:</h2>
          <select className="w-full rounded" {...register("upazila", { required: true })} value={selectedUpazila} onChange={handleUpazilaChange}>
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
		{/* <div className="space-y-1 text-sm">
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


			<div className="flex justify-end text-xs dark:text-gray-400">
				<a rel="noopener noreferrer" href="#">Forgot Password?</a>
			</div>
         
		</div> */}
        <div className="text-center flex justify-center items-center">
        <button  className="block text-center  p-3   from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5  me-2 mb-2">Make a Request</button>

        </div>

</div>
   
    </form>   
         </div>
        </div>
    );
};

export default CreateDonationRequest;