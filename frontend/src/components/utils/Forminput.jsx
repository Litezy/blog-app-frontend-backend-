import { Input } from 'postcss'
import { IoEyeSharp } from "react-icons/io5";
import { IoIosEyeOff } from "react-icons/io";
import React, { useRef, useState } from 'react'

const Forminput = ({ formtype = 'text', type, label, blog, placeholder, name, value, onchange, ...props }) => {


    const [text, setText] = useState(false)
    const Icon = text === true ? IoEyeSharp : IoIosEyeOff

    

    const changeText = () =>{
        setText(prev => {
          return !prev
        })
    }
    return (
        <div className='mb-3 ml-2 mt-5 ' >
            <div className="text-md" {...props}> {label}</div>
            {formtype === 'text' && <input type={type} placeholder={placeholder} name={name} value={value} onChange={onchange} className='outline-none border-2 border-slate-400 w-11/12 mx-auto p-2 rounded-md' />}
            {formtype === "textarea" && <textarea name={name} value={value} onChange={onchange} cols={30} rows='2' placeholder={placeholder} className='outline-none border resize-none border-slate-400 w-full rounded-md'></textarea>}
            {formtype === "password" &&
                <div className='w-11/12 px-2 border-2 h-12 flex items-center justify-between border-slate-400 resize-none    rounded-md'>
                    <input type={text ? 'text':'password'}  name={name} value={value} onChange={onchange} placeholder={placeholder} className={`outline-none w-11/12 h-full   `} />
                    <Icon onClick={changeText}  className="pr-3 text-4xl cursor-pointer"/>
                </div>}
        </div>
    )
}

export default Forminput