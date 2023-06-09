import { RiLoginCircleLine, RiFingerprint2Line } from "react-icons/ri"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className='flex justify-evenly py-4 bg-zinc-900 text-white'>
      <div>
        <Link to='/' className='text-xl font-bold'>
          Mern AUTH
        </Link>
      </div>
      <div className='flex gap-6'>
        <Link to='/login' className='flex items-center gap-1'>
          <RiFingerprint2Line className='text-lg' />
          <p className='text-xl font-semibold'>Login</p>
        </Link>
        <Link to='/signup' className='flex items-center gap-1'>
          <RiLoginCircleLine className='text-lg' />
          <p className='text-xl font-semibold'>Signup</p>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
