import {React,useState} from 'react'
import { Link, useNavigate } from 'react-router-dom' 
import CircularProgress from '@mui/material/CircularProgress';
import toast from 'react-hot-toast';

const SignUp = () => {

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: ''
  })

  const {username, email, password} = user

  const [loading,setLoading] = useState(false)

  const navigate = useNavigate()
  
  const registerUser = async (e)=>{
    e.preventDefault()
    setLoading(true);
    try {
      const response = await fetch('https://task-management-web-app.onrender.com/signup',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, email, password})
      })
      const data = await response.json()
      if(data.success){
        toast.success('Registered Successfully')
        localStorage.setItem('token',data.token)
        navigate('/task')
      } else{
        toast.error('User Already Exists', { icon: '🔒' })
      }  
      console.log(data)
    } catch (error) {
      console.log(error)
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className='text-center text-3xl font-semibold'>Welcome to Task Management App</div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={registerUser}>
          <div>
              <label htmlFor="username" className="block text font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"  
                  onChange={e => setUser({...user, username: e.target.value})}               
                  required
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e)=> setUser({...user,email:e.target.value})}
                  required
                  className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text font-medium leading-6 text-gray-900">
                  Password
                </label>
                
              </div>
              <div className="mt-2">
                <input
                  id="password"                 
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e)=> setUser({...user,password:e.target.value})}
                  required
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              {/* Conditionally render loading bar */}
              {loading ? (
                <div className="flex w-full justify-center">
                  <CircularProgress />
                </div>
              ):(
                <button
                type="submit"
                className="flex w-full  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
              )}
              
            </div>
          </form>

          <p className="mt-10 text-center text-lg text-gray-500">
            Already have an account?{' '}
            <Link to="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
  )
}

export default SignUp
