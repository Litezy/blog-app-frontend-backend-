import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { SlMenu } from 'react-icons/sl'
import Navlink from './Navlink';
import { MdCancel } from "react-icons/md";
const Header = () => {
  const [nav, setNav] = useState(false)
  const[menu,setMenu] = useState(false)
  const Icon = menu ? MdCancel : SlMenu
  
  const ControlNav = () =>{
    setMenu(prev => !prev)
    setNav(prev => !prev)
  }
  return (
    <>
      <div className='flex items-center justify-between w-[90%]  mx-auto mt-1'>
        <div className="">
          <Link to='/' className=' text-sky-100 text-lg font-bold'>Blog Application</Link>
        </div>
        <div className="md:flex hidden text-sky-100 font-medium items-center justify-between w-3/6 ml-3">
          <Link to='/blog' className='cursor-pointer text-sm'>Blogs</Link>
          <Link to='/login' className='cursor-pointer text-sm'>Login</Link>
          <Link to='/profile' className='cursor-pointer text-sm'>Profile</Link>
          <Link to='/Signup' className='cursor-pointer text-sm'>Sign Up</Link>
          <Link to='/Logout' className='cursor-pointer text-sm'>Logout</Link>
        </div>
        <div className="md:hidden">
        <Icon onClick={ControlNav} className={`mr-3 ${menu ? 'text-4xl': 'text-2xl'} text-sky-100  cursor-pointer`} /> 
        </div>
      </div>
     {nav && <Navlink  /> }
    </>
  )
}

export default Header