"use client"

import React, { useState, useEffect, useCallback } from 'react'
import service from '@/services/index';
import { HiDotsHorizontal } from "react-icons/hi";
import { AboutPostItem } from '@/components/about-post-item';
import { MdMarkEmailRead } from "react-icons/md";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FollowModal } from '@/components/follow-modal';
export default function AboutPage({ params }: { params: { email: string } }) {
    const { data: session} = useSession() as any
    const [data, setData] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    let [isOpen, setIsOpen] = useState(false)
    const [modalTitle, setModalTitle] = useState('Followers')

    const closeModal = () => setIsOpen(false)

    useEffect(() => {
        getUserAbout()
    }, [params.email, session?.id])




    const getUserAbout = useCallback(async () => {

        const saltEmailParam = params.email.replace('%40', '')

        try {
            const res = await service.getUserAbout(saltEmailParam)
            setData(res.data)
            setIsLoading(false)

        }
        catch (error) {
            router.push('/')

            console.log(error)
            setIsLoading(false)

            setData(null)
        }
    }, [params.email, session?.id])


    const followUser = async (userId: any, active: any) => {

        if(!session) {
            router.push('/login')
            return
        }

        if (!active) {

            setData({
                ...data,
                followersIDs: data?.followersIDs.includes(session?.id) ? data?.followersIDs.filter((item: any) => item !== session?.id) : [...data?.followersIDs, session?.id]
            })
        }

        try {
            const res = await service.followUser(userId)


        }

        catch (error) {
            console.log(error)
            toast.error('Something went wrong')

        }
    }




    if (isLoading) {
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

        data &&
        <>
            <FollowModal isOpen={isOpen} closeModal={closeModal}
                modalTitle={modalTitle}
                followUser={followUser}
                data={data} />

            <div className=" grid grid-cols-12 gap-4 font-sans mt-5   ">

                <div className="   col-span-12   sm:col-span-8  p-8 pr-10 pl-0">
                    <p
                        className='text-zinc-600 text-[19px] font-bold  
                    border-b border-gray-200 pb-[17px]
                    bg-violet-50  p-3 pt-5 mb-7'>
                        {data?.username + "'s"}  Posts

                    </p>

                    <div>
                        {
                            data?.posts?.map((item: any, index: number) => (
                                <AboutPostItem key={index} post={item} />
                            ))
                        }
                    </div>


                </div>

                <div className='col-span-1 '  ></div>


                <div className="col-span-12  sm:col-span-3  bordesr-2 
            border-bluse-500 pt-5" >
                    <div >
                        <img src={data?.image ? `/images/${data.image}`
                            : '/user.jpg'}
                            alt="image"
                            className="w-20 h-20 rounded-full" />
                        <h6 className=' line-clamp-2  leading-[16px]  
                text-zinc-800 text-[13.9px] my-[12px] font-bold '
                        >
                            {data?.username}
                        </h6>
                        <h6 className=' line-clamp-2  leading-[16px]  
                text-zinc-400 text-[13.5px] mt-[8px] font-semibold 
                    mb-[12px] cursor-pointer hover:text-zinc-500
                '
                            onClick={() => {
                                setModalTitle('Followers')
                                setIsOpen(true)
                            }}
                        >
                            {data?.followersIDs.length} Followers
                        </h6>

                        <p className='text-zinc-700 text-[11.5px] 
                    max-w-[220px] mt-4
                '>
                            {data?.info}
                        </p>
                        {
                            data?.email !== session?.email &&
                            <div
                                className='flex items-center mt-5 '
                            >

                                <button
                                    className={` px-5 py-2 rounded-2xl 
                        text-[12px] font-medium 
                        transition duration-300 ease-in-out border border-solid
                        border-violet-600
           ${data?.followersIDs.includes(session?.id) ? ' text-violet-600  ' : 'bg-violet-600 text-white hover:bg-violet-700'}
                    `}
                                    onClick={() => followUser(data?.id, false)}
                                >
                                    {data?.followersIDs.includes(session?.id) ? 'Unfollow' : 'Follow' }
                                </button>
                                <button
                                    className='text-white bg-violet-600 rounded-full ml-3 font-medium hover:bg-gray-700  p-[9px]  '
                                >
                                    <MdMarkEmailRead />
                                </button>
                            </div>
                        }
                    </div>

                    <div className='mt-7'>

                        <h6 className='text-zinc-800 text-[12.9px] 
                    font-bold mb-[17px] 
                '>
                            Following
                        </h6>

                        <div className='flex flex-col  '>
                            {
                                data?.following.map((item: any, index: number) => (

                                    <div key={index}
                                        className='flex items-center space-x-3 mb-[16px]  w-[220px] relative'
                                    >
                                        <img src={item.image ? `/images/${item.image}` : '/user.jpg'}
                                            alt="image"
                                            className='w-4 h-4 rounded-full'
                                        />

                                        <p  className='text-zinc-500 text-[10.1px] font-semibold font-body pl-1'
                                        >

                                            {item.username}
                                        </p>
                                        <HiDotsHorizontal
                                            className='
                                        absolute right-0 text-zinc-500 font-semibold
                                        cursor-pointer hover:text-zinc-600
                                        '
                                        />
                                    </div>

                                ))
                            }

                        </div>

                        <p
                            className='text-[10px] text-zinc-600  pb-2 mt-1 font-semibold cursor-pointer hover:text-zinc-700'
                            onClick={() => {
                                setModalTitle('Following')
                                setIsOpen(true)
                            }}
                        >
                            See all ({data?.followingIDs.length})
                        </p>


                    </div>
                </div>


            </div>

        </>
    )
}
