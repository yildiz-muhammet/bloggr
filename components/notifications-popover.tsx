import React from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { IoNotificationsOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
// import { Notification } from '@prisma/client';
import { useState, useEffect, useCallback } from 'react';
import service from '@/services/index';
import { AiFillNotification } from "react-icons/ai";
import slugify from 'slugify';
import Image from 'next/image';
import { MdNotificationsActive } from "react-icons/md";
import { useRouter } from 'next/navigation';

export const NotificationsPopover = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [notifications, setNotifications] = useState<any[]>([])

  useEffect(() => {
    getNotifications()
  }, [])


  const getNotifications = useCallback(async () => {

    try {
      const res = await service.getNotifications()
      console.log(res.data)
      setNotifications(res.data)
      // setIsLoading(false)
    }
    catch (error) {
      // setIsLoading(false)
      console.log(error)
      setNotifications([])
    }
  }, [])


  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
              ${open ? 'text-white' : 'text-black/90'}
                bg-gray-200 dark:bg-gray-800 p-[10px] rounded-lg
              group inline-flex items-center    text-base font-medium  focus:outline-none `}
          >
            <MdNotificationsActive
              className='text-[20px] dark:text-gray-100 text-gray-500 
            '

            />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 ">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                <div className="bg-gray-50 p-4">
                  <span className="text-[16px] font-bold text-gray-900">
                    Notifications
                  </span>

                </div>
                <div className="relative grid gap-5 bg-white py-1 pb-5 pl-4 grid-cols-1">
                  {notifications.map((item: any) => (
             item &&
                    <a
                      key={item.id}

                      className="-m-3 flex items-center rounded-lg p-1 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none 
                      w-full h-20  px-2 mb-[3px] 
                      "

                    >
                      <div className="flex  shrink-0 items-center justify-center text-white  ">
                        <AiFillNotification className='text-[20px] text-gray-500 
                        ' />
                      </div>
                      <div className="ml-4">
                        <p className="text-[12px] font-semibold text-gray-600 mb-1">
                     

                          {
                            item.type === 'newPost' &&  (
                              <div
                                className=" leading-7 text-gray-700    
                                "
                              >
                                <span className="text-gray-700
          bg-violet-100 rounded-md px-[6px]  mr-1   items-center gap-2 inline-flex cursor-pointer
        "
                                  onClick={() => {
                                    router.push(`/about/@${item.actionBy?.email.split('@')[0]}`)
                                  }}
                                >
                                  <Image src={
                                    item.actionBy?.image ? `/images/${item.actionBy?.image}` : '/user.jpg'}
                                    width={2} height={2}
                                    className='w-2 h-2 rounded-full'
                                    alt='profile'
                                  />   {item.actionBy.username} </span>
                                created a new post called
                                <br />
                                <span className="text-gray-700
          bg-gray-200 rounded-md px-2 py-1 cursor-pointer
        "
                                  onClick={() => {
                                    router.push(`/post/${slugify(item?.post?.title, {
                                      lower: true,
                                      strict: true
                                    })}--${item.post.id}`)
                                  }}

                                >{item?.post?.title}</span>
                              </div>
                            )
                          }
 {/* {
      content: 'Elisa Gabbert is started following you.',
      createdAt: '2024-06-08T18:15:16.377Z',
      type: 'follow',
      actionBy: {
        id: '659fafe2c6b9a72ee5fb4183',
        username: 'Elisa Gabbert',
        image: '1704964135448-1_lopdgvORdngJXzIla7xqFg.jpg',
        email: 'elisa@gmail.com'
      }, */}
                          {
                            item.type === 'follow'  && (
                              <div
                                className=" leading-7 text-gray-700    
                                "
                              >
                                <span className="text-gray-700
          bg-violet-100 rounded-md px-[6px]  mr-1   items-center gap-2 inline-flex cursor-pointer
        "
                                  onClick={() => {
                                    router.push(`/about/@${item.actionBy?.email.split('@')[0]}`)
                                  }}
                                >
                                  <Image src={
                                    item.actionBy?.image ? `/images/${item.actionBy?.image}` : '/user.jpg'}
                                    width={2} height={2}
                                    className='w-2 h-2 rounded-full'
                                    alt='profile'
                                  />   {item.actionBy.username} </span>
                                is started following you.
                              </div>
                            )
                            
                          }

{/* {
      content: ' Matt Traverso liked  the post named TAG KONTROL .',
      createdAt: '2024-06-08T18:45:24.911Z',
      type: 'like',
      actionBy: {
        id: '659ed98cfd0ca6f4d8b9dd3b',
        username: 'Matt Traverso',
        image: '1704909340604-1_KnY2kELiH6Q0KeRPgto7GQ.jpg',
        email: 'matt@gmail.com'
      },
      post: { id: '6659dd755434ec498fd442cf', title: 'TAG KONTROL ' }
    } */}
                          {
                            item.type === 'like' && (
                              <div
                                className=" leading-7 text-gray-700    
                                "
                              >
                                <span className="text-gray-700
          bg-violet-100 rounded-md px-[6px]  mr-1   items-center gap-2 inline-flex cursor-pointer
        "
                                  onClick={() => {
                                    router.push(`/about/@${item.actionBy?.email.split('@')[0]}`)
                                  }}
                                >
                                  <Image src={
                                    item.actionBy?.image ? `/images/${item.actionBy?.image}` : '/user.jpg'}
                                    width={2} height={2}
                                    className='w-2 h-2 rounded-full'
                                    alt='profile'
                                  />   {item.actionBy.username} </span>
                                liked the post named
                                <br />
                                <span className="text-gray-700
          bg-gray-200 rounded-md px-2 py-1 cursor-pointer
        "
                                  onClick={() => {
                                    router.push(`/post/${slugify(item?.post.title, {
                                      lower: true,
                                      strict: true
                                    })}--${item.post.id}`)
                                  }}

                                >{item?.post?.title}</span>
                              </div>
                            )
                          }



                        </p>
                        <p className="text-[11.5px] text-gray-500">
                          {new Date(item.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </a>
                  ))}

                  {notifications.length === 0 && (
                    <div className="flex items-center justify-center text-gray-500 bg-slate-100 p-2 -m-3 mt-[-24px] mr-1">
                      No notifications
                    </div>
                  )}

                </div>

              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
