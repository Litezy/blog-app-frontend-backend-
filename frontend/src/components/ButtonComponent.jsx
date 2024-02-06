import React, { useEffect, useState } from 'react'
import { FaCommentAlt, FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa'
import dogimg from '../assets/images/dog.avif'
import deerimg from '../assets/images/deer.avif'
import chameleonimg from '../assets/images/chameleon.avif'
import eagleimg from '../assets/images/eagle.avif'
import giraffeimg from '../assets/images/giraffe.avif'
import CommentsComponent from './utils/CommentsComponent'
import { BsEmojiFrown } from 'react-icons/bs'
import Forminput from './utils/Forminput'
import Formbutton from './utils/Formbutton'

const ButtonComponent = ({ blog }) => {
  const [likes, setLikes] = useState(false)
  const [dislikes, setDislikes] = useState(false)
  const [comment, setComment] = useState(false)


  const [showcomments, setShowComments] = useState([])
  const [error, setError] = useState({
    status: false,
    msg: ''
  })
  const checkLikes = () => {
    setDislikes(false)
    setLikes(prev => !prev)
  }
  const checkDisLikes = () => {
    setLikes(false)
    setDislikes(prev => !prev)
  }

  useEffect(() => {
    const fetchComments = async () => {
      setError({
        ...error, status: false
      })
      try {
        const response = await ClientGetApi(blog_urls.all)
        if (response.status === 200) return setShowComments(response.msg)
        console.log(response.msg)
      } catch (error) {
        setError({
          status: true,
          msg: 'Error loading comments at this time, check your network'
        })
      }
    }
    fetchComments()
  }, [])




  return (
    <div className="w-full">
      <div className='flex items-center justify-between md:w-[90%] md:mx-auto px-3 w-[100%] mt-5'>
        <button onClick={checkLikes} className={`flex items-center justify-center px-8 py-1  android:px-5 md:px-12 md:py-3 rounded-md border-2 ${likes === true ? 'border-blue-400' : ''}`}>
          <FaRegThumbsUp className={`text-xl font-bold ${likes === true ? 'text-blue-500' : ''}`} />
          <p className='pl-1 font-medium'>{blog.likes.length}</p></button>

        <button onClick={checkDisLikes} className={`flex items-center android:px-5 px-8 py-1 md:px-12 md:py-3 rounded-md border-2 ${dislikes === true ? 'border-red-500' : ''} `}><FaRegThumbsDown className={`text-xl font-bold ${dislikes === true ? 'text-red-500' : ''}`} /> <span className='pl-1 font-medium'>{blog.dislikes.length}</span></button>

        <button onClick={() => setComment(prev => !prev)} className='flex items-center android:px-5 px-8 py-1 md:px-12 md:py-3 rounded-md border-2 '>
          <FaCommentAlt className="text-lg font-bold" /> <span className='pl-1 font-medium'>{blog.comments.length}</span></button>

      </div>
      {(comment === true || showcomments.length > 0 ) && (<>

        <div className='font-md text-sm pl-2 pt-2'>{showcomments.length === 0  && 'be the first to comment on this blog post'}</div>
        {showcomments.map((item, i) => (
          <div className='flex flex-col h-[20rem] overflow-y-auto w-[90%] mx-auto mt-5'>
            <div className="">{item.comments}</div>
            <CommentsComponent item={item} key={i} />
            <hr className='shadow-lg mt-2' />
          </div>
        ))}

        <Forminput blog={blog} className="font-medium" formtype='text' placeholder={'comment your reply'} />
        <div className="w-fit ml-auto text-md">
          <Formbutton Alert={() => setComment(prev => !prev)} title={'Upload comment'} />
        </div>
        <hr className='mt-5' />

      </>)}
    </div>

  )
}

export default ButtonComponent