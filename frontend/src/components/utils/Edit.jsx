import React from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const Edit = ({title}) => {
  return (
    <div className="flex items-center justify-between">
    <div className="font-bold ml-4 mt-8  ">
        <Link to={`/blog`} className=' text-xl text-blue-800'><FaArrowLeftLong /></Link>
    </div>
    <div className="w-[50%] mx-auto text-center  mt-10">
    <button className="w-fit   text-blue-800 font-bold rounded-lg text-2xl ">{title}</button>
    </div>
    </div>
    
  )
}

export default Edit