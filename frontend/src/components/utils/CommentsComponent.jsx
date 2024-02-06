import moment from 'moment'
import React, { useEffect, useState } from 'react'
import pic from '../../assets/images/cat.jpg'
import { Link } from 'react-router-dom'
// import { ClientGetApi, blogAtt_urls, blog_urls } from '../../services/Api'

const CommentsComponent = ({ item }) => {
 
  return (
    <div>
      <Link to={`/blog/1/user`}>
        <div className='pl-2 pt-2 flex items-center' key={i}>
          <img src={pic} className='w-10 h-10  object-cover rounded-full' alt="profile-pic" />
          <div className="ml-2">
            <h2 className='font-bold text-lg'>{title}</h2>
            <p className='text-md'>Posted: {moment(item.createdAt).fromNow()}  </p>
          </div>
        </div>
        <div className="font-md text-sm pl-2 pt-2">
          <div className="ml-2 ">{item.content}</div>
        </div>
      </Link>
    </div>
  )
}

export default CommentsComponent