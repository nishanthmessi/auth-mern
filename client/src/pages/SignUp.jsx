import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useRegisterMutation } from '../redux/slices/userApiSlice'
import { toast } from 'react-toastify'
import { setCredentials } from '../redux/slices/authSlice'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.auth)

  const [register, { isLoading }] = useRegisterMutation()

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [navigate, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error('Passwords mismatch')
    } else {
      try {
        const res = await register({ name, email, password }).unwrap()
        dispatch(setCredentials({ ...res }))
        navigate('/')
      } catch (err) {
        toast.error(err.data.message || err.error)
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
            SignUp
          </button>

          <div className='mt-4'>
            <p>
              Existing User?{' '}
              <Link
                to='/login'
                className='font-semibold hover:underline hover:text-gray-600'
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignUp
