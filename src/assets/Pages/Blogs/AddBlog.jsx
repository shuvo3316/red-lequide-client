import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useaxiosSecure";

const image_hosting_key=import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api=`https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddBlog = () => {
  //const {_id,email,photo,name,upazila,distric,group}=data
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
         data.status="draft";
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
              axiosSecure.post(`/blogs`,data)
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
    



      
   
    return (
        <div>
          <h2 className="text-center text-3xl uppercase"></h2>
             <div className="flex justify-center items-center ">
  <form className="border-2 md:w-3/4 rounded-xl" onSubmit={handleSubmit(onSubmit)}>

  <div className="w-full  p-8 space-y-3 rounded-xl dark:bg-gray-900 dark:text-gray-100">
	<h1 className="text-2xl font-bold text-center">Create a Blogs</h1>
		
        <div className="md:flex gap-4">
        <div className="space-y-1 flex-1 text-sm">
			<label  className="block dark:text-gray-400">Title</label>
			<input  {...register("title", { required: true })} type="text" name="title" id="title" placeholder="title" className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />
            {errors.name && <span>This field is required</span>}
		</div>
		<div className="space-y-1 flex-1 text-sm">
			
<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
<input {...register("photo", { required: true })} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/>

            {errors.photo && <span>This field is required</span>}
		</div>
        </div>
        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
<textarea {...register("text", { required: true })} id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
{errors.text && <span>This field is required</span>}
	
      

  
        <div className="text-center flex justify-center items-center">
        <button  className="block text-center  p-3   from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5  me-2 mb-2">Update</button>

        </div>
	
</div>
   
    </form>   
         </div>
        </div>
    );
};

export default AddBlog;