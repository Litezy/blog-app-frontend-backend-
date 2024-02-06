import React, { useState } from 'react'
import PageLayout from '../../components/PageLayout'
import { Link } from 'react-router-dom'
import { FaImage } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaArrowLeftLong } from "react-icons/fa6";
import BlogModal from './BlogModal';
const Allblogs = () => {

    const [modal, setModal] = useState(false)
    return (
        <PageLayout>
            {modal && <BlogModal closeView={() => setModal(prev => !prev)}/>}
          <div className="w-full">
          <div className="flex w-[100%] items-center justify-between">
          <div className="font-bold ml-10 mt-8 mr-5 ">
                <Link to={`/`} className=' text-2xl text-blue-800'><FaArrowLeftLong/></Link>
            </div>
          <div className="w-fit font-bold ml-auto mt-8 mr-5">
                <Link to={`/blog/new`} className='px-6 py-4 text-white mr-auto  rounded-md bg-blue-800'>Create New Blog</Link>
            </div>
          </div>
            <table className='w-[90%] text-center mt-10 mx-auto table-auto'>
                <thead>
                    <tr className='h-10'>
                        <td className=' border-2 bg-blue-800 text-white font-bold '>Title</td>
                        <td className=' border-2 bg-blue-800 text-white font-bold'>Content</td>
                        <td className='border-2 bg-blue-800 text-white font-bold'>Image</td>
                        <td className='bg-blue-800 w-10'></td>
                    </tr>
                </thead>
                <tbody>
                 {new Array(10).fill(0).map((item, index) =>(
                       <tr key={index} className='w-full'>
                       <td className=' text-left w-[30%] border-2 px-1'>Lorem ipsum dolor sit amet consectetur.</td>
                       <td className='w-[55%] text-left border-2 px-1'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem reiciendis dignissimos officiis?</td>
                       <td className='border-2 w-[10%] '><FaImage className="mx-auto w-[80%] cursor-pointer"/></td>
                       <td className='w-[15%] border-2 '><HiDotsHorizontal onClick={() => setModal(prev => !prev)} className="w-[80%] mx-auto cursor-pointer"/></td>
                   </tr>
                 ))}
                </tbody>
            </table>
          </div>

        </PageLayout>
    )
}

export default Allblogs