import React from 'react'
import { Link } from 'react-router-dom'
import { imageurl } from '../services/Api'
import moment from 'moment'

const BlogUserComponent = ({blog}) => {
    return (
       <Link to={`/blog/1/user`}>
         <div className='pl-2 pt-2 flex items-center'>
            <img src={`${imageurl}/profiles/${blog.bloguser?.image}`} className='w-10 h-10  object-cover rounded-full' alt="profile-pic" />
            <div className="ml-2">
                <h2 className='font-bold text-lg capitalize'>{blog.bloguser.username}</h2>
                <p className='text-md'>Posted: {moment(blog.createdAt).fromNow()}   </p>
            </div>
        </div>
       </Link>
    )
}

export default BlogUserComponent