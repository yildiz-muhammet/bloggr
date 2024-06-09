"use client"
import Image from 'next/image'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import LoginForm from '@/components/auth/login-form';
export default function Login() {
  return (
    <div
      className="fixed left-0  h-screen top-0 flex justify-center items-center"
    >
      <div
        className='fixed left-0  h-full lg:w-6/12 w-full '
      >
        <div className="flex  flex-col justify-center    items-center  h-screen 
    bg-slate-50">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">

            <Link href={'/'} className=' transition-colors duration-300 font-bold text-[30px] text-primary dark:text-slate-300 text-center mx-auto block'>
              NEXT-BLOG
            </Link>

            <h2 className="mt-8 text-center text-lg font-semibold leading-4 tracking-tight text-gray-700 font-sans ">
              Sign in to your account
            </h2>
          </div>


          <div className="mt-8 mx-auto w-full max-w-sm font-sans ">
            {/* form */}
            <LoginForm />
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-slate-50 text-gray-500">Or continue with</span>
                </div>
              </div>
              {/* SİGN İN GİTHUB  */}
              <div className="mt-6 grid grid-cols-2 gap-3">

                <div
                  className="w-full inline-flex justify-center py-3 px-3 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium leading-6 text-gray-700 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700
                 cursor-pointer
                 transition duration-400 ease-in-out
                 "
                // onClick={() => signIn('github') }
                >
                  <span className="sr-only">Sign in with GitHub</span>
                  <FaGithub size={22} />
                </div>

                {/* SİGN İN GOOGLE  */}

                <div
                  className="w-full inline-flex justify-center py-3 px-3 border border-gray-300 rounded-md shadow-sm bg-white  leading-6 text-gray-700 hover:bg-gray-100 
                 transition duration-400 ease-in-out
                  cursor-pointer"
                onClick={() => signIn('google') }
                >

                  <span className="sr-only">Sign in with Google</span>
                  <FcGoogle
                    size={22}
                  />
                </div>

              </div>
            </div>
          </div>


          <p className="mt-10 text-center text-sm text-gray-500 font-sans">
          {`Don't have an account yet?`}
            <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-[10px]" >
              Sign up
            </a>
          </p>
        </div>
      </div>

      <div
        className=' fixed  right-0 h-full w-6/12 overflow-hidden hidden lg:block'
      >
        <Image src="/12.jpg" fill
          className='object-cover'
          alt='banner'
          loading='lazy'
          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAA'
        />
      </div>

    </div>
  )
}
