import React, { useEffect, useState } from 'react'
import PageLayout from '../../components/PageLayout'
import profileimg from '../../assets/images/cat.jpg'
import { Alert, CookieName } from '../../components/utils/Utilnames'
import { Apis, ClientGetApi, ClientPostApi, URL, imageurl } from '../../services/Api'
import Loading from '../../components/utils/Loading'
import { decodeToken } from 'react-jwt'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Profile = () => {

  const navigate = useNavigate()
  const [screen, setScreen] = useState(1)
  const [profile, setProfile] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({
    status: false,
    msg: ''
  })



  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true)
      setError({
        ...error, status: false
      })
      try {
        const getCookie = Cookies.get(CookieName)
        const response = await fetch(`${URL}/${Apis.auth.profile}`, {
          headers: {
            Authorization: `Bearer ${getCookie}`, // Include the JWT token in the Authorization header
          },
        });
        // console.log(response.status)

        if (response.status === 200) {
          // Alert('User profile fetched successfully','success')
          const responseData = await response.json()
          setProfile(responseData.user)
          // console.log(responseData.user)
        }
        else if (response.status !== 200) {
          setError({
            status: true,
            msg: "Unable to fetch user data"
          })
        }

      } catch (error) {
        setError({
          status: true,
          msg: "Error, can't fetch profile at this time"
        })
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const Logout = async () => {
    try {
      const getCookie = Cookies.get(CookieName)
      const response = await fetch(`${URL}/${Apis.auth.logout}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getCookie}`
        }
      })
      if(response.status === 200){
        Cookies.remove(getCookie)
        navigate(`/`)
      }else{
        Alert('Request failed','Try to logout again', 'error')
      }
    } catch (error) {
      Alert('Request failed', error, 'error')
    }
  }

  useEffect(() => { },)
  return (
    <PageLayout>
      {loading && <Loading />}
      <div className="mt-5">

        <div className=" w-fit ml-auto mr-5"><button onClick={() => setScreen(2)} className='px-3 py-2 bg-blue-600 text-white rounded-lg'>logout</button></div>
        <div className="flex w-full h-full gap-3 items-center justify-center">
          {profile && (
            <div className="">
              <img src={`${imageurl}/profiles/${profile.image}`} className="w-[20rem] border h-[20rem] object-cover rounded-full" alt="profile-img" />
              <div className="text-center mt-8">
                <h1 className='text-2xl font-bold'>{profile.username}</h1>
                <p className='text-md mt-2'>{profile.email}</p>
              </div>
            </div>
          )}
          {screen === 2 && <>
            <div className=" fixed top-[40%] border bottom-[50%] w-[30%] mx-auto flex items-center justify-center  h-32 bg-black/80">
              <div className="flex items-center justify-between bg-white w-11/12 h-20 px-10">
                <button onClick={() => setScreen(1)} className='px-2 py-1 bg-red-600 text-white rounded-sm text-sm'>Cancel</button>
                <button onClick={Logout} className='px-2 py-1 bg-green-600 text-white rounded-sm text-sm'>Proceed</button>
              </div>
            </div>
          </>}
        </div>

      </div>
    </PageLayout>
  )
}

export default Profile