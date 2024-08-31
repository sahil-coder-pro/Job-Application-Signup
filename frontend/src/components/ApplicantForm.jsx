import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const  ApplicantForm = ({setShowRegister}) => {
  const { register, watch,  handleSubmit, formState: { errors } } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false) ;

  const onSubmit = async (data) => {

    setIsSubmitting(true) ;

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("state", data.state) ;
    formData.append("resume", data.resume[0]); // Append the file
    
    try {
      const response = await axios.post("/api/v1/users/add-user", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // console.log(response.data);

      toast.success(response.data.message, {
        position: "top-center",
        onClose: ()=> {
          
          toast.info("Redirecting To Main Page", {
            position: "top-center",
            onClose: () =>{
              setShowRegister(false) ;
            }
          })
        }
      });

    } catch (error) {
      console.error("There was an error uploading the file!", error);

      toast.error(error.response?.data?.message || error.message || "Some Error Occurred", {
        position: "top-center",
        // onClose: ()=> {
          
        //   toast.info("Redirecting To Main Page", {
        //     position: "top-center",
        //     onClose: () =>{
        //       setShowRegister(false) ;
        //     }
        //   })
        // }
      });
    }

    setIsSubmitting(false) ;

  };

  const resumeFile = watch("resume")?.[0]?.name || "No file chosen";

 
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-md bg-gray-100  rounded-lg shadow-md p-6 mx-5">

        <span>

        <svg onClick={() => setShowRegister(false)}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 rounded-full hover:cursor-pointer hover:bg-gray-200 p-2 inline ">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
        </svg>
        </span>


        <h2 className="text-3xl font-semibold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="name">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className={`w-full px-3 bg-gray-50 py-2 mt-1 border focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
          </div>

          

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className={`w-full bg-gray-50 px-3 py-2 mt-1 border  focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="state">State</label>
            <input
              type="text"
              {...register("state", { required: "State is required" })}
              className={`w-full px-3 bg-gray-50 py-2 mt-1 border focus:outline-none focus:ring-2 ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.state && <span className="text-red-500 text-sm">{errors.state.message}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" >Resume</label>

            <label className="pt-4 block text-md font-medium text-center text-gray-500 " htmlFor="resume"><span className="bg-gray-50 border-gray-400 border-2 inline-block p-2 w-full overflow-x-hidden  "> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 inline mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg>
                  {/* TODO: Update the pdf name here */}
                  {resumeFile}
                  {/* {resumeValue?.['0']?.name ? resumeValue['0'].name :"Upload Resume"} */}
            </span></label>
            <input
            id = "resume"
              type="file"
              {...register("resume", { required: "Resume is required" })}
              className="hidden w-full bg-gray-50 px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 border-gray-300"
            />
            {errors.resume && <span className="text-red-500 text-sm">{errors.resume.message}</span>}
          </div>
          <button disabled = {isSubmitting} type="submit" className="w-full bg-blue-500 text-white py-2  mt-4 hover:bg-blue-600 transition duration-300">
            {isSubmitting? "Sending..." : "Submit"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};


