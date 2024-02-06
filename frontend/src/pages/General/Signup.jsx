import React, { useRef, useState } from 'react'
import PageLayout from '../../components/PageLayout'
import Forminput from '../../components/utils/Forminput'
import Formbutton from '../../components/utils/Formbutton'
import { Link, useNavigate } from 'react-router-dom'
import SignupModal from './SignupModal'
import { FaUserLarge } from "react-icons/fa6";
import { IoCameraOutline } from "react-icons/io5";
import { Alert, CookieName, UserRole } from '../../components/utils/Utilnames'
import ButtonComponent from '../../components/ButtonComponent'
import Cookie from 'js-cookie'
import { decodeToken, isExpired } from 'react-jwt'
import { Apis, ClientPostApi } from '../../services/Api'
import Loading from '../../components/utils/Loading'


const Signup = () => {
  const imageRef = useRef()
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(false)
  const [check, setCheck] = useState(null)
  const navigate = useNavigate()
  const CheckedFunc = () => {
    setCheck((prev) => !prev)
  }
  const handleTermsClick = () => {
    CheckedFunc();
  }
  const AlertFunc = (e) => {
    e.preventDefault()
    setModal(prev => !prev)
  }


  const [profile, setProfile] = useState({
    img: null,
    image: null
  })


  const handleProfileImage = (e) => {
    const file = e.target.files[0]
    if (file.size > 1000000) {
      imageRef.current.value = ''
      return Alert('File size too large', 'Try uploading a different file', 'info')
    }
    if (!file.type.startsWith('image/')) {
      imageRef.current.value = ''
      return Alert('File format not supported', "Upload a valid photo in the format of jpg, jpeg, png, svg, webp, avif, gif", "info")
    }
    setProfile({
      img: URL.createObjectURL(file),
      image: file
    })
  }


  const cancelUpload = () => {
    if (imageRef.current) {
      imageRef.current.value = ''
    }
    setProfile({
      img: null,
      image: null
    })
  }



  const [forms, setForms] = useState({
    email: '',
    username: '',
    password: '',
    confirm_password: ''
  })

  const handleForms = (e) => {
    setForms({
      ...forms, [e.target.name]: e.target.value
    })
  }



  const submitForms = async (event) => {
    event.preventDefault()
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    if (!profile.img) return Alert('request failed', 'profile image is required', 'info')
    if (!forms.username) return Alert('Incomplete request', 'Username is required', 'info')
    if (!forms.email) return Alert('Incomplete request', 'Email is required', 'info')
    if (!isValidEmail(forms.email)) return Alert('Ivalid Email', 'Input a valid email', 'info')
    if (!forms.password) return Alert('Incomplete request', 'Password is required', 'info')
    if (forms.password.length < 6) return Alert('Invalid Password', 'Your password must be at least 8 characters long', 'info')
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(forms.password)) {
      return Alert('Invalid Password', 'Your password must contain at least one uppercase letter, one number, and one special character', 'info');
    }
    if (!forms.confirm_password) return Alert('Incomplete request', 'Confirm passoword is required', 'info')
    if (forms.confirm_password !== forms.password) return Alert('Password Error', 'Passoword mismatched', 'info')
    if (!check) return Alert('Validation Error', 'Please agree to our terms and conditions', 'info')

    const formbody = new FormData()
    formbody.append('image', profile.image)
    formbody.append('username', forms.username)
    formbody.append('email', forms.email)
    formbody.append('password', forms.password)
    formbody.append('confirm_password', forms.confirm_password)

    setLoading(true)
    try {
      const response = await ClientPostApi(Apis.auth.signup, formbody)
      console.log(response)
      console.log('Profile Image:', profile.image);
      console.log('Form Body:');
      for (const pair of formbody.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }


      if (response.status === 201) {
        Alert('Sign Up Successful', response.msg, 'success')
        Cookie.set(CookieName, response.token)
        const decoded = decodeToken(response.token)
        const findUserRole = UserRole.find((ele) => ele.role === decoded.role)
        if (findUserRole) return navigate(`${findUserRole.url}`)

      }
      else {
        Alert('Request Failed', response.msg, 'error')
      }

    } catch (error) {
      Alert('Request Error', `${error.msg}`, 'error')
    }
    finally {
      setLoading(false)
    }
  }
  return (
    <PageLayout>

      {/* {modal && <SignupModal closeView={() => setModal(prev => !prev)} />} */}
      {loading && <Loading />}
      <div className="w-full h-full flex items-center justify-center mb-40  mt-10 ">
        <div className="w-[80%] h-full ">
          <div className="w-[80%] mx-auto flex items-center justify-center flex-col ">

            <label className=' cursor-pointer' >
              {profile.img ? <img src={profile.img} className='h-[8rem] w-[8rem] rounded-full object-cover' /> : <div className="h-[8rem] w-[8rem] rounded-full border flex items-center justify-center">
                <input ref={imageRef} type="file" hidden onChange={handleProfileImage} />
                <FaUserLarge className="text-6xl" />
              </div>}
              {!profile.img && <div className="flex  items-center gap-3 mt-3">Upload Photo <IoCameraOutline className="text-2xl" /></div>}

            </label>

            {profile.img && <button type='button' onClick={cancelUpload} className={`bg-red-600 text-white px-3 py-1 ${profile.img ? 'mt-5' : 'mt-2'} text-sm rounded-md`}>change photo</button>}
          </div>

          <form onSubmit={submitForms} className=''>
            <Forminput name={'username'} value={forms.username} onchange={handleForms} className="mt-2" label={'Username'} formtype='text' placeholder={'enter username'} />
            <Forminput name={'email'} value={forms.email} onchange={handleForms} className="mt-2" label={'Email'} formtype='text' placeholder={'enter your email'} />
            <Forminput formtype={'password'} name={'password'} value={forms.password} onchange={handleForms} className="mt-2" label={'Create password'} placeholder={'********'} />

            <Forminput name={'confirm_password'} value={forms.confirm_password} onchange={handleForms} className="mt-2" label={'Confirm password'} formtype='password' placeholder={'********'} />


            <label htmlFor='checkInput' onClick={CheckedFunc} className="flex w-full justify-center items-start mt-5  ">
              <input id='checkInput' checked={check} type='checkbox' />
              <span onClick={handleTermsClick} className='ml-5 w-11/12 text-[.8rem]'>by checking this box you agree to our user <span>Terms and Conditions</span> and our <span>Privacy Policy</span></span>
            </label>
            <div className="mt-3 mb-20 w-fit ml-auto h-full 
            "><Formbutton title={'create account'} /></div>
            <div className="text-md text-center -mt-9 pb-10 font-medium">Already have an account? <Link to={`/login`} className='text-blue-800 text-md cursor-pointer'>Login</Link></div>
          </form>
        </div>
      </div>

    </PageLayout>
  )
}

export default Signup