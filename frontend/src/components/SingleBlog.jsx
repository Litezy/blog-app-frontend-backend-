import React from 'react'
import BlogUserComponent from './BlogUserComponent'
import blogimg from '../assets/images/animals-2222007_1280.jpg'
import ButtonComponent from './ButtonComponent'
import profilepic from '../assets/images/cat.jpg'
import { imageurl } from '../services/Api'
const SingleBlog = ({item}) => {
  return (
    <div className='mb-10 '>
        <BlogUserComponent blog={item} title={'Mike Ashley'} post={'Posted: 20 minutes ago'}/>
        <div className="mt-4 overflow-y-hidden">
            <img src={`${imageurl}/blogs/${item?.image}`} className=' cursor-pointer w-11/12 mx-auto h-[15rem] object-cover' alt="blogimg" />
            <div className="w-11/12 mx-auto px-1">
            <h1 className='font-bold text-2xl mt-3'>{item.title}</h1>
            <p className='text-md font-md mt-3 text-orange-500'>{item.content}.</p>
            </div>
        </div>
        <ButtonComponent blog={item}/>
    </div>
  )
}

export default SingleBlog