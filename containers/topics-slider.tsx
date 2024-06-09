"use client"
import { Tag } from '@prisma/client';
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import service from '@/services/index'
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function TopicsSlider() {

  const someElement = useRef() as React.MutableRefObject<HTMLInputElement>;


  const currentTag = useSearchParams().get('tag')

  const [isLoading, setIsLoading] = useState(true)
  const [allTags, setAllTags] = useState<Tag[]>([])

  useEffect(() => {
    console.log('useEffect topics-slider')
    getAllTags()
  }, [])


  const getAllTags = useCallback(async () => {

    try {
      const res = await service.getTags()
      console.log(res.data)
      setAllTags(res.data)
      setIsLoading(false)
    }
    catch (error) {
      setIsLoading(false)
      console.log(error)
      setAllTags([])
    }
  }, [])

  if(isLoading){
    return (
      <div role="status" className=" animate-pulse  col-span-10 border-b border-gray-200 pb-2">
        <div className="flex   items-center mt-2  py-[5px]  justify-between  gap-1 pr-2  "
        >
          {
            Array.from({ length: 8 }).map((_, i) => (

              <div key={i} className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-16 "></ div>

            ))
          }
        </div>

        <span className="sr-only">Loading...</span>
      </div>

    )
  }



  return (
    <div className='relative border-b border-gray-200  col-span-10 pb-1   pr-4'>

      <div className=' pl-4 relative  overflow-x-hidden  overflow-y-hidden scroll-smooth snap-x'
        ref={someElement}
      >
        <div className="flex items-center  ">
          {
            [{ id: 0, name: 'All' }, ...allTags].map((tag) => (
              <Link className=" text-[13px] font-body text-gray-600 mr-1"       key={tag.id}
                    href={
                      tag.name === 'All' ? `/` : `?tag=${tag.name}`
                    }
                  >
              <div
                className={`flex items-center justify-center py-2  px-4 rounded-xl cursor-pointer hover:bg-gray-100 snap-start scroll-mx-3 ] 
                ${currentTag === tag.name ? 'bg-violet-100' :  currentTag === null && tag.name === 'All' ? 'bg-violet-100' : 'bg-gray-100'}`} 
              >
                <p  className='text-[13px] font-body text-gray-600   
              whitespace-nowrap overflow-hidden overflow-ellipsis ' >  {tag.name} </p>
              </div>
              </Link>
            ))}

        </div>

      </div>

      <div
        className="absolute  top-[2px] right-[-16px] bottom-0  flex items-center justify-center cursor-pointer text-3xl  rounded-full
              transition-all duration-100 ease-in-out bg-gray-100   shadow-gray-200    w-8 h-8  shadow-2xl opacity-90  z-10"
        onClick={() => {
          someElement.current.scrollLeft += 75;
        }}
      >
        <HiOutlineChevronRight
          size={15}
          className='text-gray-600 hover:text-gray-800'
        />
      </div>
      <div
        className="absolute   top-[2px] left-[-14px] bottom-0  flex items-center justify-center cursor-pointer text-3xl  rounded-full
              transition-all duration-100 ease-in-out bg-gray-100   shadow-gray-200    w-8 h-8  shadow-2xl opacity-90 "
        onClick={() => {
          someElement.current.scrollLeft -= 75;
        }}
      >
        <HiOutlineChevronLeft
          size={15}
          className='text-gray-600 hover:text-gray-800'
        />
      </div>
    </div>


  )
}
