import React, { useEffect, useRef, useState } from 'react'
import { FaRegThumbsUp } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const SignupModal = ({closeView}) => {
const toggler = useRef()
  const [screen, setScreen] = useState(1)
  
 useEffect(()=>{
    if(toggler){
        const handleClick = (event) =>{
            if(toggler.current && toggler.current.contains(event.target)){
                console.log('current area clicked')
            }else{
                closeView()
            }
        }
        window.addEventListener('click', handleClick, true)
    return () => {
        window.removeEventListener('click', handleClick, true)
    }
    }
    
 }, []);

  return (
    <div className='h-full w-full top-0 left-0 fixed flex items-center justify-center bg-black/40'>
     <div ref={toggler}
     className="animated   bg-white mx-w-lg w-[30%] rounded-lg px-10 h-32 mx-h-[85vh] justify-center flex items-center">
     {screen === 1 && <>
        <div className="">
          <div className="flex items-center gap-10 ">
            <FaRegThumbsUp className="text-2xl text-blue-800"/> <span className='font-medium'>Account Created Successfully</span>
          </div>
          <div className="text-center text-md mt-5">Start Posting <Link to={`/blog`} className='text-blue-800 font-bold'>Now</Link></div>
        </div>
      </>}
     </div>
    </div>
  )
}

export default SignupModal