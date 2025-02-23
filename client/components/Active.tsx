import React from 'react'

const Active = () => {
  return (
    <div className="w-full flex h-[10rem]   p-6 items-center justify-center mr-[4rem] bg-white">
        <div className='shadow w-full h-full p-2  gap-3 bg-white flex items-start flex-col' >
          <p className="font-nunito text-xl font-semibold ">Active Therapist</p>
          <span className="text-white-400 bg-slate-800 text-lg w-full h-1" ></span>
          <small className=" text-start  text-gray-500 text-sm font-poppins">There are no recently active members</small>
      </div>
    </div>
  )
}

export default Active
