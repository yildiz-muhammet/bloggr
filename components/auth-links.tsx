import React from 'react'
import Link from 'next/link'
import { LuPenSquare } from 'react-icons/lu'
type Props = {
  currentUser: {
      username : string,
      email : string,
      image : string
  }
}

export default function AuthLinks({currentUser} :Props) {

  return (
    <>

      <Link href={'/write'} >
        <div
        className='flex items-center gap-2 
        px-3 py-2 text-sm bg-violet-100 rounded-sm  font-medium shadow-sm cursor-pointer
        '>
          <LuPenSquare 
          size={16}
          className ='text-violet-600'
          />
            <p 
            className='text-violet-600'
            >
              Write
               {/* AiFillHighlight */}
            </p>
        </div>
      
      </Link>

      {!currentUser?.email? (
        <>
          <Link href={'/login'}
          >
            Login
          </Link>
          <Link href={'/register'} >
            Register
          </Link>
        </>
      ) : (
        <>
{/* 
          <Link href={'/logout'} >
            Logout
          </Link> */}
        </>
      )}

    </>

  )
}
