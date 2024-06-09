"use client"
import Image from 'next/image'
import React, { Fragment } from 'react'

import { HiChevronDown } from 'react-icons/hi'
import { User } from '@prisma/client'
import { IoLogOutOutline } from 'react-icons/io5'
import { FiUser } from 'react-icons/fi'
import { signOut } from 'next-auth/react'
import { Menu, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import { IoBookmarksOutline } from "react-icons/io5";

type Props = {
    currentUser: {
        username: string,
        email: string,
        image: string
    }
}

export default function AccountPopover({ currentUser }: Props) {
    // console.log(currentUser);
    const [open, setOpen] = React.useState(false)
    const router = useRouter()



    return (
        <>
            <div className=" text-right">
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="">
                            <button type="button"
                                className={`flex w-full justify-center rounded-md    gap-2 items-center  ${open && 'peer'} `}
                                onClick={() => setOpen(!open)}
                                onBlur={() => setOpen(false)}

                            >
                                <Image src={
                                    currentUser?.image ? `/images/${currentUser?.image}`
                                        : '/user.jpg'}
                                    width={29} height={29}
                                    className='rounded-sm mr-1'
                                    alt='profile'
                                />
                                <div className='text-left pt-[2px]'>
                                    <p
                                        className='text-xs font-medium text-gray-500 '


                                    >
                                        {currentUser?.username}
                                    </p>
                                    <p
                                        className='text-[10px] font-light'
                                    >
                                        {currentUser?.email}
                                    </p>
                                </div>
                                < HiChevronDown
                                    size={20}
                                    color='gray'
                                />
                            </button>

                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute  mt-2 divide-y divide-gray-100   rounded-md bg-white z-50  top-10 h-auto right-0    
border border-gray-200 shadow-lg focus:outline-none   p-2   w-[225px] 

              
        ">
                            <div className="px-2 py-1">
                                <Menu.Item>

                                    <div className='flex gap-2 items-center border-b border-gray-100 pb-3'  >
                                        <Image src={
                                            currentUser?.image ? `/images/${currentUser?.image}`
                                                : '/user.jpg'}
                                            width={33} height={33}
                                            className='rounded-sm mr-1'
                                            alt='profile'
                                        />
                                        <div className='text-left pt-[2px] space-y-[4px]'>
                                            <p
                                                className='text-xs font-semibold text-gray-500 cursor-pointer  hover:text-gray-600'
                                                onClick={
                                                    () => router.push(`/about/@${currentUser?.email.split('@')[0]}`)
                                                }
                                            >
                                                {currentUser?.username}
                                            </p>

                                            <p
                                                className='text-[12px] font-body text-gray-500'
                                            >
                                                {currentUser?.email}
                                            </p>
                                        </div>
                                    </div>
                                </Menu.Item>

                                <Menu.Item >

                                    <div className='flex items-center py-3 gap-3  border-b border-gray-100 cursor-pointer'
                                        onClick={() => router.push('/account')}
                                    >
                                        <FiUser
                                            size={18}
                                            color='gray'
                                        />
                                        <p
                                            className='text-md font-body text-gray-600'
                                        >
                                            Account
                                        </p>
                                    </div>
                                </Menu.Item>

                                <Menu.Item >

                                    <div className='flex items-center py-3 gap-3  border-b border-gray-100 cursor-pointer'
                                        onClick={() => router.push('/saved-posts')}
                                    >
                                        <IoBookmarksOutline
                                            size={18}
                                            color='gray'
                                        />
                                        <p
                                            className='text-md font-body text-gray-600'
                                        >
                                            Saved Posts
                                        </p>
                                    </div>
                                </Menu.Item>

                                <Menu.Item>

                                    <div className='flex items-center py-3 gap-3  border-b border-gray-100 cursor-pointer'
                                        onClick={async () => {
                                            await signOut(
                                                {
                                                    redirect: false, callbackUrl: 'https://next-blog-2024.netlify.app/' 
                                                }
                                            )
                                            router.push('https://next-blog-2024.netlify.app/')
                                        } }
                                    >
                                        <IoLogOutOutline
                                            size={20}
                                            color='gray'
                                        />
                                        <p
                                            className='text-md font-body text-gray-600'
                                        >
                                            Log out
                                        </p>
                                    </div>

                                </Menu.Item>

                            </div>

                        </Menu.Items>

                    </Transition>
                </Menu>
            </div>

        </>

    )
}

