import React, { useRef, useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import Forminput from '../../components/utils/Forminput';
import { Link } from 'react-router-dom';
import Formbutton from '../../components/utils/Formbutton';
import JoditEditor from 'jodit-react';
import {FaPlus}from 'react-icons/fa'


const BlogForm = () => {

    const editor = useRef()
    const [content, setContet] = useState('')
    return (
        <div className="px-5">
           
            <Forminput formtype='text' className="text-2xl font-medium text-left mb-2 " label={'Title'} placeholder={'Title of blog post'} />
            <div className=" mt-8 font-medium">
                <h2 className='text-xl'>Content</h2>
                <JoditEditor
                    ref={editor}
                    value={content}
                    tabIndex={1}
                    onBlur={(newContent) => setContent(newContent)}
                    onChange={(newContent) => { }} />
            </div>
            <div className="mt-8 text-xl font-medium mb-2">Upload Media</div>
            <div className="mb-10 w-[100%] mx-auto h-60  border-slate-600 border-4 border-dashed flex items-center justify-center"><FaPlus className=" cursor-pointer text-2xl"/></div>
           <div className="mb-8 ml-auto w-fit">
           <Formbutton title={'Upload Details'} />
           </div>
        </div>

    )
}

export default BlogForm