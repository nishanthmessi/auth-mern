import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setCredentials } from '../redux/slices/authSlice'
import { useUpdateUserMutation } from '../redux/slices/userApiSlice'

const Profile = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.auth)

  const [updateProfile, { isloading }] = useUpdateUserMutation()

  useEffect(() => {
    setName(userInfo.name)
    setEmail(userInfo.email)
  }, [userInfo.name, userInfo.email])

  const submitHandler = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error('Passwords mismatch')
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap()
        dispatch(setCredentials(res))
        toast.success('Profile Updated Successfully')
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  return (
    <div className='flex justify-center items-center h-[94vh]'>
      <form onSubmit={submitHandler}>
        <div className='p-8 border-2 rounded-lg w-[90vw] sm:w-[50vw] md:w-auto'>
          <div className='flex flex-col justify-between py-4 gap-4 my-4'>
            <label className='text-xl font-semibold text-gray-600'>Name</label>
            <input
              className='outline-none'
              type='text'
              placeholder='eg: John Wick'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='flex flex-col justify-between py-4 gap-4 my-4'>
            <label className='text-xl font-semibold text-gray-600'>Email</label>
            <input
              className='outline-none'
              type='email'
              placeholder='eg: johnwick@mail.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='flex flex-col justify-between py-4 gap-4 my-4'>
            <label className='text-xl font-semibold text-gray-600'>
              Password
            </label>
            <input
              className='outline-none'
              type='password'
              placeholder='********'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='flex flex-col justify-between py-4 gap-4 my-4'>
            <label className='text-xl font-semibold text-gray-600'>
              Confirm Password
            </label>
            <input
              className='outline-none'
              type='password'
              placeholder='********'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type='submit'
            className='bg-zinc-800 text-white rounded-lg w-[20vw] p-3'
          >
            Update
          </button>
        </div>
      </form>
    </div>
  )
}

export default Profile
