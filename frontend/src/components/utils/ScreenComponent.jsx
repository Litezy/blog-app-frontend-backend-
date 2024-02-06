import React from 'react'
import { Link } from 'react-router-dom'

const ScreenComponent = ({comment,log,linking}) => {
  return (
    <div className='mt flex flex-col gap-10 items-center justify-center text-md w-full'>
    <div className="text-white text-lg font-medium">{comment}</div>
    <Link to={linking} className='text-md px-5 py-2 bg-white rounded-lg text-blue-800 font-bold'>{log}</Link>
    </div>
  )
}

export default ScreenComponent