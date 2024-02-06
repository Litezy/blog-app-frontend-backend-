import React, { useState } from 'react'
import PageLayout from '../../components/PageLayout'
import { BsEmojiGrin } from "react-icons/bs";
import { BsEmojiFrown } from "react-icons/bs";
import { BsEmojiAngry } from "react-icons/bs";
import { BsEmojiHeartEyes } from "react-icons/bs";
import { BsEmojiSmile } from "react-icons/bs";
import { Link } from 'react-router-dom';
import ScreenComponent from '../../components/utils/ScreenComponent';
const Logout = () => {

  const [screen1, setScreen1] = useState(false)
  const [screen2, setScreen2] = useState(false)
  const [screen3, setScreen3] = useState(false)
  const [screen4, setScreen4] = useState(false)
  const [screen5, setScreen5] = useState(false)

  const EmojiShow1 = () => {
    setScreen1(prev => !prev)
    setScreen2(false)
    setScreen3(false)
    setScreen4(false)
    setScreen5(false)
  }
  const EmojiShow2 = () => {
    setScreen1(false)
    setScreen2(prev => !prev)
    setScreen3(false)
    setScreen4(false)
    setScreen5(false)
  }
  const EmojiShow3 = () => {
    setScreen1(false)
    setScreen2(false)
    setScreen3(prev => !prev)
    setScreen4(false)
    setScreen5(false)
  }
  const EmojiShow4 = () => {
    setScreen1(false)
    setScreen2(false)
    setScreen3(false)
    setScreen4(prev => !prev)
    setScreen5(false)
  }
  const EmojiShow5 = () => {
    setScreen1(false)
    setScreen2(false)
    setScreen3(false)
    setScreen4(false)
    setScreen5(prev => !prev)
  }
  return (
    <PageLayout>
      <div className="flex h-full mx-auto w-[80%] items-center justify-center">
        <div className="">
          <h1 className='text-xl font-bold text-center'>Show your ratings of this blog site!!!</h1>
          <div className="text-center mt-5">
            <div className="w-full flex items-center justify-between text-4xl hover:transition-all">
              <BsEmojiAngry
                className="text-red-600 cursor-pointer hover1"
                onClick={EmojiShow1} />
              <BsEmojiFrown
                className="text-orange-300 cursor-pointer hover2"
                onClick={EmojiShow2} />
              <BsEmojiSmile className="text-yellow-400 cursor-pointer hover3"
                onClick={EmojiShow3} />
              <BsEmojiGrin className="text-teal-800 cursor-pointer hover4"
                onClick={EmojiShow4} />
              <BsEmojiHeartEyes className="text-green-400 cursor-pointer hover5"
                onClick={EmojiShow5} />
            </div>
          </div>


          {screen1 && <div className="mt-20 animated transition-all ease-in-out text-center w-11/12 mx-auto border-2 px-5 py-7 bg-black/60 rounded-md">
            <ScreenComponent comment={'You have chosen a bad score for our blog, we hope to serve you better later on, have a great time'} log={`Logout`} linking={`/`}/> </div>}


          {screen2 && <div className="mt-20 animated transition-all ease-in-out text-center w-11/12 mx-auto border-2 px-5 py-7 bg-black/60 rounded-md">
            <ScreenComponent comment={'No quite bad for an awful rating, see you around'} log={`Logout`} /> </div>}


          {screen3 && <div className="mt-20 animated transition-all ease-in-out text-center w-11/12 mx-auto border-2 px-5 py-7 bg-black/60 rounded-md">
            <ScreenComponent comment={`Oh we'll keep on with the good work, we're glad you at least like our blog.`} log={`Logout`} /> </div>}


          {screen4 && <div className="mt-20 animated transition-all ease-in-out text-center w-11/12 mx-auto border-2 px-5 py-7 bg-black/60 rounded-md">
            <ScreenComponent comment={`Yeah got you there! You like what you se huh? now go ahead and sign up`}
              log={`Signup`} linking={`/Signup`} /> </div>}


          {screen5 && <div className="mt-20 animated transition-all ease-in-out text-center w-11/12 mx-auto border-2 px-5 py-7 bg-black/60 rounded-md">
            <ScreenComponent comment={`Thanks for rating us this high! You're the best!!`} log={`Logout`} linking={`/`} /> </div>}
          <div className='mt-20 text-center'>
            <Link to={`/`} className='text-xl font-bold'>Proceed anyway</Link>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default Logout