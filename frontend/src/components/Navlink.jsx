import React from 'react'
import { Link } from 'react-router-dom'
import { MdCancel } from "react-icons/md";
const Navlink = ({}) => {
    
    return (
        <div 
    className="absolute top-16 right-1 z-10 flex flex-col  px-[30%] py-5  bg-blue-200/100 rounded-md text-sky-600 transition-all ease-in-out ">
            
        <Link to='/blog' className='cursor-pointer text-xl mb-2 mt-1 hover:text-white transition-all ease-in-out'>Blogs</Link>
            <Link to='/login' className='cursor-pointer text-xl mb-2 hover:text-white transition-all ease-in-out'>Login</Link>
            <Link to='/profile' className='cursor-pointer text-xl mb-2 hover:text-white transition-all ease-in-out'>Profile</Link>
            <Link to='/Signup' className='cursor-pointer text-xl mb-2 hover:text-white transition-all ease-in-out'>Sign Up</Link>
     <Link to='/Logout' className='cursor-pointer text-xl hover:text-white transition-all ease-in-out'>Logout</Link>
            </div>
    )
}

export default Navlink