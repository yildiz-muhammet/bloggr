"use client";
import CategoryBadge from '@/components/category-badge'
import PopularPostItem from '@/components/popular-post-item'

import SectionTitle from '@/components/sec-title'
import { useCallback, useEffect, useState } from 'react'

import service from '@/services/index'

export default function PopularPosts(
) {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    getPosts()
  }, [])

  const getPosts =  useCallback(async () => {

      try {
        const res = await service.getAllPosts()

        console.log(res.data)
        setIsLoading(false)
        setPosts(res.data?.sort(() => Math.random() - 0.5).slice(0, 3)) 

      }
      catch (error) {
        console.log(error)
        setPosts([])
        setIsLoading(true)
      }

    }, [])



  if (isLoading) {
    return (
      <div role="status" className=" animate-pulse  ">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-60 mb-2.5"></div>
        {
          Array.from({ length: 3 }).map((_, i) => (
            <div className="flex flex-col items-center mt-2  py-[5px] "
              key={i}
            >
              <div
                className='flex flex-row items-center justify-start w-full space-x-2 '
              >
                <svg className="w-5 h-5  text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>

                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-52 "></ div>
              </div>

              <div className='w-full mt-2'>

                <div className="w-60 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
            </div>
          ))
        }
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  return (
    posts.length > 0 && !isLoading && <div>
      <span className='text-[11px] text-slate-500 font-semibold '>
        {`What's Hot`}
      </span>
      <SectionTitle title='Most Popular' />

      {posts?.map((post: any) => (

        <PopularPostItem
          key={post._id}
          post={post}
        />
      ))}
    </div>
  )
}
