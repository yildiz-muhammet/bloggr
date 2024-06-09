import RecommendedUser from '@/components/recommended-user'
import SectionTitle from '@/components/sec-title'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'
import service from '@/services/index'

type Props = {
    data: any
}


export default function WhoToFollow({ data }: Props) {

    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        getWhoToFollow()
    }, [])

    const getWhoToFollow = useCallback(async () => {
        try {
            const res = await service.getWhoToFollow()

            console.log(res.data)
            setIsLoading(false)
            setUsers(res.data)
        }
        catch (error) {
            console.log(error)
            setUsers([])
            setIsLoading(true)
        }

    }, [] )

    if (isLoading) {
        return (
            <div role="status" className=" animate-pulse  ">
            <div className="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700 w-60 mb-3.5"></div>
            {
              Array.from({ length: 3 }).map((_, i) => (
                <div className="flex items-center mt-2  py-[5px] "
                  key={i}
                >
                  <svg className="w-8 h-8  text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg>
                  <div className='ml-2'>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                    <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  </div>
                </div>
              ))
            }
            <span className="sr-only">Loading...</span>
          </div>
        )
    }


    return (
        data.length > 0 && !isLoading && <div>
            <SectionTitle title='Who to follow' />

            {users.map((user: any) => (
                <RecommendedUser
                    key={user.id}
                    user={user}
                />
            ))}

        </div>
    )
}
