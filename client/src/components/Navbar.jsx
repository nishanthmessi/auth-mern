import {
  RiLoginCircleLine,
  RiFingerprint2Line,
  RiLogoutCircleLine,
} from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation } from '../redux/slices/userApiSlice'
import { logout } from '../redux/slices/authSlice'

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='flex justify-evenly py-4 bg-zinc-900 text-white'>
      <div>
        <Link to='/' className='text-xl font-bold'>
          Mern AUTH
        </Link>
      </div>
      <div className='flex gap-6'>
        {userInfo ? (
          <>
            <div className='flex gap-6'>
              <button className='flex items-center gap-2 hover:opacity-80'>
                <img
                  src='https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1686466280~exp=1686466880~hmac=69f005ec7759e7478d38e544c5b46555155561d412dfb096e6494545507afe89'
                  className='h-8 w-8 rounded-full'
                />
                {userInfo.name}
              </button>
              <button
                className='flex items-center gap-2 hover:text-red-500'
                onClick={logoutHandler}
              >
                <RiLogoutCircleLine />
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <Link to='/login' className='flex items-center gap-1'>
              <RiFingerprint2Line className='text-lg' />
              <p className='text-xl font-semibold'>Login</p>
            </Link>
            <Link to='/signup' className='flex items-center gap-1'>
              <RiLoginCircleLine className='text-lg' />
              <p className='text-xl font-semibold'>Signup</p>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
