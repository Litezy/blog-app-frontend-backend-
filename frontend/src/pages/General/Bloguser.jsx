import React from 'react'
import PageLayout from '../../components/PageLayout'
import bloguserimg from '../../assets/images/cat.jpg'
import SingleBlog from '../../components/SingleBlog'
import { Link } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";

const Bloguser = () => {
    return (
            <PageLayout>
                
                <div className="flex flex-col itesm-center w-11/12 mx-auto mt-3">
                <Link to={`/`} className='text-blue-800 text-3xl font-medium ml-5'><FaArrowLeftLong/></Link>
                    <img src={bloguserimg} className=' w-64 h-64 mx-auto mt-5 rounded-full object-cover' alt="" />
                    <h1 className='text-center text-2xl font-bold mt-5'>Mike Ashley</h1>
                    <p className='text-center text-lg'>mikeashley@gmail.com</p>
                </div>
              
            <div className="">
                <h1 className='ml-4 mt-8  text-xl font-bold'>Mike Ashley Blogs</h1>
                <p className='mb-8 ml-4 text-blue-600 font-bold'>Mike has posted 6 blogs since joining. </p>
                <hr  className='shadow-xl'/>
              {new Array(6).fill(0).map((item,index) => (
                <SingleBlog key={index}/>
              ))}
            </div>
            </PageLayout>
    )
}

export default Bloguser