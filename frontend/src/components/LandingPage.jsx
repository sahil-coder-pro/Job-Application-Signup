import React, { useState } from 'react'

export function LandingPage({setShowRegister}) {


  return (
    <div>
      <div className="h-screen overflow-y-auto w-full bg-black/90">

        {/* this is navbar */}
        
        <div className="bg-white/5 flex justify-around items-center  py-3 text-center ">
          <p className="  text-white text-2xl ">Sg</p>
          <a className="text-white hover:cursor-pointer ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
          </a>
          <span></span>
        </div>
        
        {/* for heading and submit button */}

        <div className=" box-border  p-2 justify-center gap-10 flex flex-col items-center">


          {/* this is the heading  */}

          <h1 className=" text-center bg-gradient-to-t from-white/80 via-white/60 to-white/50 p-2 text-transparent bg-clip-text text-6xl sm:text-8xl mt-10 font-semibold">Welcome To <span className="bg-gradient-to-r from-purple-700 via-pink-600 to-orange-600 text-transparent bg-clip-text font-medium text-7xl sm:text-9xl">JobFind</span></h1>


        <h1 className=" text-center  text-white/50 p-2 text-xl sm:text-3xl font-semibold w-[60%]">The New Hiring platform in the industry with guaranteed job in less than a week</h1>

          
          
          {/* submit button */}
          <button onClick={() => setShowRegister(true)}  className=" bg-gradient-to-r from-purple-700 via-pink-400 to-orange-600  px-4 sm:px-0 text-lg sm:text-xl text-white sm:w-1/6 py-4 rounded-lg font-medium">Register Today</button>

        </div>
      </div>
    </div>
  )
}


