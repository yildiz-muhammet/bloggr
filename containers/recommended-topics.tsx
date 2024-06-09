import SectionTitle from '@/components/sec-title'
import { Tag } from '@prisma/client'
import { useState  ,useEffect, useCallback} from 'react'

import service from '@/services/index'
import Link from 'next/link'

export default function RecommendedTopics() {

  // getAlltags yapılıcak 

  const [isLoading, setIsLoading] = useState(true)
  const [allTags, setAllTags] = useState<Tag[]>([])

  useEffect(() => {
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



  if (isLoading) {
    return (
      <div role="status" className=" animate-pulse  ">
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-60 mb-2.5"></div>
        <div className="flex  items-center mt-2  py-[5px]  justify-between flex-wrap gap-3 pr-2"
        >
          {
            Array.from({ length: 6 }).map((_, i) => (

              <div key={i} className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-16 "></ div>

            ))
          }
        </div>

        <span className="sr-only">Loading...</span>
      </div>

    )

  }




  return (
    <div className='pb-3'>
      <SectionTitle title='Recommended Topics' />

      <div
        className='flex flex-wrap  w-full mt-4 gap-2'
      >
        {
          !isLoading &&  allTags.slice(0, 6).map((tag, i) => (
            <Link key={i} className="inline "
              href={`?tag=${tag.name}`}

            >

              <div className="inline-block px-3 py-[7px] text-[10px] font-medium bg-gray-200/70 rounded-full">
                {tag.name}
              </div>
            </Link>
          ))
        }
      </div>

    </div>
  )
}
