import SectionTitle from '@/components/sec-title'
import Link from 'next/link'
import React, { useState, useEffect, useCallback } from 'react'
import service from '@/services/index'
import { Post } from '@prisma/client'

type IPost = Post & {
  author: {
    username: string,
    image: string
  }
}


export default function SavedPosts() {
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState<IPost[]>([])

  useEffect(() => {
    getSavedPosts()
  }, [])


  const getSavedPosts = useCallback(async () => {

    try {
      const res = await service.getSavedPosts()
      console.log(res.data.posts)
      setPosts(res.data.posts)
      setIsLoading(false)
    }
    catch (error) {
      setIsLoading(false)
      console.log(error)
      setPosts([])
    }
  }, [])

  
  if (isLoading) {
    return (
      <div role="status" className=" animate-pulse  ">
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-60 mb-2.5"></div>
        {
          Array.from({ length: 2 }).map((_, i) => (
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
    <div>
      <SectionTitle title='Saved Posts' />
      {
        posts.length === 0 && !isLoading && <div className='text-gray-500 dark:text-gray-400 text-[12px]'>You have no saved posts yet.</div>
        
      }

      {!isLoading &&   posts.slice(0, 3).map((post: IPost) => {

        return (

          <div   className='mb-5 last-of-type:mb-2'
            key={post.id}
          >
            <div className='flex gap-1 items-center '>
            <img src={
            post?.author?.image ? `/images/${post?.author?.image}`
              : '/user.jpg'
          }
            alt="image" className="w-3 h-3 rounded-full mr-2" />


              <p className='  dark:text-gray-100  text-[11px] 
  font-normal  text-black
'
              >
                 {
                    post.author.username
                 }
                 </p>
            </div>

            <p
              className='text-zinc-800 text-[12px] my-[5px] font-bold'
            >
             {post.title}
            </p>

            <div
              className='font-light text-[10px] text-gray-900 dark:text-gray-400'
            >
              {
                new Date(post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })
              }
              {' ·  '}
              5 min read
            </div>

          </div>

        )

      })}

    
      {
        !isLoading && posts.length > 0 && <div className='mb-5'>
          <Link href='/saved-posts'
            className='text-[10px] text-indigo-600 font-medium pb-2'
          >
            See all ({posts?.length})
          </Link>
        </div>
      
      }

     

    </div>
  )
}


