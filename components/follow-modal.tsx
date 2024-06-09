import { Dialog, Transition } from '@headlessui/react'
import { User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { Fragment, useCallback, useState } from 'react'
type Props = {
  isOpen: boolean,
  closeModal: () => void,
  data: any,
  modalTitle: string,
  followUser: (id: string, active: boolean) => void, 
}


export const FollowModal = ({
  isOpen,
  closeModal,
  data,
  modalTitle,
  followUser,
}: Props) => {
  const { data: session  } = useSession() as any
  console.log(session)
  console.log(data)
  const router = useRouter()
  const userList = modalTitle === 'Followers' ? data.followers : data.following

  const  [followIds , setFollowIds] = useState<string[]>(session?.followingIDs)



  return (
    
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto ">
          <div className="flex min-h-full items-center justify-center p-32 text-center font-sans ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {modalTitle} List
                </Dialog.Title>
          

                <div className="mt-4">
                  <div className="overflow-y-auto h-96">
                    
             {   userList.map((user :any ) => (
                      <div key={user.id} className="flex justify-between items-center border-b border-gray-200 py-2">
                        <div className="flex items-center">
                          <img src={`/images/${user.image}`} alt={"user.username"} className="w-8 h-8 rounded-full"
                          />
                          <p className="ml-5 text-sm text-gray-500 cursor-pointer   hover:text-violet-600"
                               onClick={ () => router.push(`/about/@${user.email.split('@')[0]}`) }
                          
                          >{user.username}</p>
                        </div>
                    {    session?.id !== user.id &&       <button
                          className={` px-5 py-2 rounded-2xl 
                        text-[12px] font-medium 
                        transition duration-300 ease-in-out border border-solid
                        border-violet-600
             ${followIds?.find((item: any) => item === user.id) ? 'bg-white text-violet-600' : 'bg-violet-600 text-white'}

                    `}
                          onClick={ () =>{
                             followUser(user.id ,true)
                             followIds?.includes(user.id) ? setFollowIds(followIds.filter((item: any) => item !== user.id)) : setFollowIds([...followIds, user.id])        }
                            }
                        >
                        
                        {   followIds?.find((item: any) => item === user.id) ? 'Unfollow' : 'Follow'  }
                        </button>
                        }
                      </div>
                    ))} 
                  </div>
                </div>







              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
