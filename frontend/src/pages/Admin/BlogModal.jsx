import React, { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import blogmodalimg from '../../assets/images/animals-2222007_1280.jpg'
const BlogModal = ({ closeView }) => {

    const navigate = useNavigate()
    const [screen, setScreen] = useState(1)
    const toggle = useRef()


    useEffect(()=>{
        if(toggle){
            window.addEventListener('click', (event) =>{
                  if(toggle.current !== null){
                    if(toggle.current.contains(event.target)){
                    console.log('clicking on the current target')
                    }
                    else{
                        closeView()
                        console.log('clicking on the outside target')
                    }
                  }
            }, true)
        }
    },[])
    return (
        <div className='w-full fixed z-10 bg-black/40 left-0 top-0 flex h-screen items-center justify-center'>
            <div ref={toggle} className="bg-white rounded-lg max-w-lg h-screen pb-10  max-h-[85vh] mt-5 overflow-y-auto">
                {screen === 1 && <div className="mt-4">
                    <h1 className='text-xl w-[95%] mx-auto font-bold mb-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, vel.</h1>
                    <img src={blogmodalimg} className='w-full h-[15rem] object-cover' alt="blogmodal-img" />
                    <p className='w-[95%] mx-auto mt-3 text-amber-600 font-medium'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore beatae iure eos, assumenda minima velit, cum pariatur quae perferendis nesciunt numquam? Nostrum dignissimos amet impedit maiores hic minima. Harum, omnis hic quam, deserunt, excepturi exercitationem esse reprehenderit aut rerum voluptatum dolorum! Omnis, nam vero quod unde, facilis accusamus incidunt aliquam at a ea quis nisi facere soluta corporis eveniet illum, sunt amet veritatis! Nobis error maxime facere, quo earum nihil reiciendis ex vel iste eum impedit. Aliquam, rem nesciunt ab delectus vitae vero eum fugiat quisquam reiciendis impedit, explicabo commodi quasi nam aliquid facilis hic voluptas, mollitia labore sapiente dolor.</p>
                    <div className="w-[90%] mx-auto flex items-center mt-5 justify-between">
                    <button onClick={() => navigate(`/blog/1/edit`)}  className='px-10 py-3 font-bold bg-slate-600 text-white rounded-lg'>Edit</button>
                    <button onClick={() => setScreen(2)} className='px-10 py-3 font-bold bg-red-600 text-white rounded-lg'>Delete</button>
                   
                    </div>
                </div>}
                {screen === 2 && <>
               <div className="bg-white screen2 w-11/12 max-w-lg  h-44 absolute rounded-md">
               <div className=" text-center">
                <h1 className='mt-12 text-xl font-bold text-red-600'>Are you sure you want to delete this blog?</h1>
                <div className="w-[90%] mx-auto flex items-center mt-5 justify-between">
                <button onClick={() => setScreen(1)} className='px-10 py-3 font-bold bg-slate-600 text-white rounded-lg'>Cancel</button>
                    <button onClick={() => closeView()}  className='px-10 py-3 font-bold bg-red-600 text-white rounded-lg'>Delete</button>
                </div>
                </div>
               </div>
                </>}
            </div>
        </div>
    )
}

export default BlogModal