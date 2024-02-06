import React, { useState } from 'react'
import PageLayout from '../../components/PageLayout'
import Forminput from '../../components/utils/Forminput'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, CookieName, UserRole } from '../../components/utils/Utilnames'
import { Apis, ClientPostApi } from '../../services/Api'
import Cookie from 'js-cookie'
import {decodeToken, isExpired} from 'react-jwt'
import Loading from '../../components/utils/Loading'

const Login = () => {
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false)
  const [forms, setForms] = useState({
    email:'',
    password:''
  })

  const handleForms = (e)=>{
    setForms({
      ...forms, [e.target.name]: e.target.value
    })
  }

  const submitForms = async (e) =>{
    e.preventDefault()
    if(!forms.email) return Alert('Incomplete request', 'Email is required', 'info')
    if(!forms.password) return Alert('Incomplete request', 'Password is required', 'info')

    const formbody = {
      email: forms.email,
      password: forms.password
    }
   setLoading(true)
    try {
      const response = await ClientPostApi(Apis.auth.login, formbody )
      if(response.status === 201){
        Alert('login successful', response.msg, 'success')
        Cookie.set(CookieName, response.token)
        const decoded = decodeToken(response.token)
        const findUserRole = UserRole.find((ele) => ele.role === decoded.role)
        if(findUserRole){
          navigate(`${findUserRole.url}`)
        }
      }else{
        Alert('Request Error', response.msg, 'error')
      }
    } catch (error) {
      Alert('Request Failed', response.msg, 'error')
    }finally{
      setLoading(false)
    }

  }
  return (
    <PageLayout>
      {loading && <Loading/>}
      <div className=" flex items-center justify-center w-full h-full">
        <form onSubmit={submitForms} className='w-11/12 lg:w-10/12'>
        <div className="-mb-2 font-bold text-2xl text-slate-800">Login Account</div>
        <div className="">
          <Forminput name={'email'} value={forms.email} onchange={handleForms} formtype='text' className="text-xl font-bold mb-1 text-slate-800" placeholder={'yourname@email.com'} label={'Email Address'} />
        </div>
        <div className='-mt-2'>
          <Forminput name={'password'} value={forms.password} onchange={handleForms} formtype='text' className="mb-1 text-xl font-bold text-slate-800" label={'Password'} placeholder={'*******'} />
        </div>
        <div className="flex items-center justify-between w-full mt-8">
          <p className='text-md font-medium'>Forgot <span className='text-blue-800 text-md cursor-pointer'>Password?</span></p>
          <button className='px-8 py-2 rounded-lg text-white bg-blue-800 font-medium'>Login</button>
        </div>
        <div className="text-md text-center mt-8">Don't have an account? <Link to={`/signup`} className='text-blue-800 text-md cursor-pointer'>Sign up</Link></div>
        </form>
      </div>
    </PageLayout>
  )
}

export default Login