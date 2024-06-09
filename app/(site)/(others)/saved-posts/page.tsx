"use client"
import { Post } from '@prisma/client'
import React, { useCallback, useEffect, useState } from 'react'
import service from '@/services/index';
import { MdBookmarkAdded } from "react-icons/md";
import { TbDots } from "react-icons/tb";
import SavedPostItem from '@/components/saved-post-item';
import  toast from 'react-hot-toast';
type IData = {
  user: {
    id: string,
    username: string,
    email: string,
    info: string,
    image: string

  },
  posts: Array<Post>

}


export default function SavedPosts() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<IData>({} as IData)


  useEffect(() => {
    getSavedPosts()
  }, [])


  const getSavedPosts = useCallback(async () => {

    try {
      const res = await service.getSavedPosts()
      setData(res.data)
      setIsLoading(false)
    }
    catch (error) {
      setIsLoading(false)
      console.log(error)
      toast.error(' An error occurred while fetching the posts')
      setData( {} as IData)
    }
  } , [])

  if(isLoading) {
    return (
      <div className='flex justify-center items-center h-[470px]'>
      <div
        className="inline-block h-7 w-7 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-violet-500 motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
        <span
          className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span >
      </div>
    </div>
    )
  }


  return (
    <div
      className="container mx-auto  max-w-2xl px-4 py-8 borders bordesr-red-600 font-sans"
    >

      <h2
        className="text-[24px] font-extrabold mb-4
          tracking-tight font-body 
          "
      >
        Saved Posts
      </h2>

      <div
        className="flex items-center justify-between  mb-3 py-2
          border-b       border-t
          border-gray-100
          "
      >
        <div className="flex items-center  space-x-4">

          <img src={
            data?.user?.image ? `/images/${data?.user?.image}`
              : '/user.jpg'
          }
            alt="image" className="w-9 h-9 rounded-full" />
          <div>
            <h6
              className="text-[13px] font-semibold
    text-violet-600 cursor-pointer
              "
            
            >
              {data?.user?.username}  
            </h6> 
            <div 
              className="flex items-center space-x-1"
            >
            <p
              className="text-[11px] text-gray-500 mt-1"
            >
              {
                new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })

              }
            </p>
            <p 
              className="text-[11px] text-gray-500 px-1"
            >
              -
            </p>
           < MdBookmarkAdded
              className="text-[13.6px] text-violet-400 cursor-pointer mt-1"
           />
            <p
              className="text-[11px] text-gray-500 mt-1"
            >
             
             {data?.posts?.length} stories
            </p>
            </div>
          </div>
        </div>
        <div
          className="flex items-center"
        >
          <TbDots
            className="text-gray-600 cursor-pointer text-[21px]"  
          />

        </div>

      </div>
        
      <div className="mt-4"
        >
          {
            data?.posts?.map((post, index) => (
              <SavedPostItem key={index} post={post  as any} />
            ))
          }

        </div>

    </div>
  )
}
