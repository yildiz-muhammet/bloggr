"use client"
import React, { Fragment } from 'react'
import { signOut } from 'next-auth/react'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { BsGrid } from 'react-icons/bs'
import { HiOutlineViewGrid } from 'react-icons/hi'
import { MdOutlineGridView } from 'react-icons/md'
import { BiCheck } from 'react-icons/bi'
import { Menu, Transition } from '@headlessui/react'
type Props = {
    viewAs: 'grid' | 'list'
    setViewAs: React.Dispatch<React.SetStateAction<'grid' | 'list'>>
}

export default function ViewAs({ viewAs, setViewAs }: Props) {
    const [open, setOpen] = React.useState(false)

    return (


        < div className="relative min-w-[85px]  z-10 font-sans col-span-2 flex  justify-end items-center" >
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="">
                        <button type="button"
                            className={`flex  justify-center rounded-md
             px-2 py-2 shadow-md border border-gray-100 
            gap-2 items-center  ${open && 'peer'}    `}

                            onClick={() => setOpen(!open)}
                            onBlur={() => setOpen(false)}
                        >
                            <p
                                className='text-[13px] font-medium text-gray-600 line-clamp-1'
                            >
                                View as
                            </p>
                            {
                                viewAs === 'grid' ?
                                    <MdOutlineGridView
                                        size={17}
                                        className='text-gray-600'
                                    />
                                    :
                                    < AiOutlineUnorderedList
                                        size={19}
                                        className='text-gray-600'

                                    />
                            }


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
                    <Menu.Items className="absolute  mt-2origin-top-right divide-y divide-gray-100   ring-1 ring-black/5 

  rounded-md bg-white shadow-xl  top-10 h-auto p-1   w-[130px]  right-0    
border border-gray-300
                
          ">

                        <div className="px-2 py-1">
                            <Menu.Item>
                                <div className='flex items-center py-2 gap-3   cursor-pointer'
                                    onClick={() => setViewAs('grid')}
                                >
                                    < MdOutlineGridView
                                        size={18}
                                        className={`${viewAs === 'grid' && 'text-violet-500'}`}
                                    />
                                    <p
                                        className={`text-sm font-medium 
                            ${viewAs === 'grid' ? 'text-violet-500' : 'text-gray-600'}
                            `}
                                    >
                                        Grid
                                    </p>
                                    {
                                        viewAs === 'grid' &&
                                        < BiCheck
                                            className='text-violet-500  ml-3'
                                            size={24}
                                        />
                                    }

                                </div>
                            </Menu.Item>

                        </div>
                        <div className="px-2 py-1">
                            <Menu.Item>
                                <div className='flex items-center py-2 gap-3  border-b border-gray-100 cursor-pointer'
                                    onClick={() => { setViewAs('list') }}
                                >
                                    < AiOutlineUnorderedList
                                        size={20}
                                        className={`${viewAs === 'list' && 'text-violet-500'}`}
                                    />
                                    <p
                                        className={`text-sm font-medium 
                            ${viewAs === 'list' ? 'text-violet-500' : 'text-gray-600'}
                            `}
                                    >
                                        List
                                    </p>
                                    {
                                        viewAs === 'list' &&
                                        < BiCheck
                                            className='text-violet-500  ml-3'
                                            size={24}
                                        />
                                    }

                                </div>
                            </Menu.Item>
                        </div>




                    </Menu.Items>
                </Transition>
            </Menu>
        </div >

    )
}
{/* <div className="relative  font-sans  z-30 col-span-2 flex  justify-end items-center min-w-[85px]" >
            <button type="button"
                className={`flex  justify-center rounded-md
             px-2 py-2 shadow-md border border-gray-100 
            gap-2 items-center  ${open && 'peer'}    `}

                onClick={() => setOpen(!open)}
                onBlur={() => setOpen(false)}
            >
                <p
                    className='text-[13px] font-medium text-gray-600 line-clamp-1'
                >
                    View as
                </p>
                {
                    viewAs === 'grid' ?
                        <MdOutlineGridView
                            size={17}
                            className = 'text-gray-600'
                        />
                        :
                        < AiOutlineUnorderedList
                        size={19}
                        className = 'text-gray-600'

                    />
                }

               
            </button>


            <div className={`absolute  rounded-md bg-white shadow-xl focus:outline-none opacity-0  top-10  peer-focus:visible peer-focus:opacity-100 transition-all duration-100 ease-in-out h-auto p-3   w-[130px]  right-0    peer-focus:z-50 
             border border-gray-300
          
           `}
            >

                    <div className='flex items-center py-2 gap-3  border-b border-gray-100 cursor-pointer'
                        onClick={() =>{ setViewAs('list')}}
                    >
                        < AiOutlineUnorderedList
                            size={20}
                            className = {`${viewAs === 'list' && 'text-green-500' }`}
                        />
                        <p
                            className={`text-sm font-medium 
                            ${viewAs === 'list' ? 'text-green-500' : 'text-gray-600' }
                            `}
                        >
                            List
                        </p>
                        {
                        viewAs === 'list' &&
                     < BiCheck
                        className = 'text-green-500  ml-3'
                        size={24}
                     />
                    }

                    </div>

                    <div className='flex items-center py-2 gap-3   cursor-pointer'
                        onClick={() => setViewAs('grid')}
                    >
                         < MdOutlineGridView
                            size={18}
                            className = {`${viewAs === 'grid' && 'text-green-500' }`}
                        />
                        <p
                            className={`text-sm font-medium 
                            ${viewAs === 'grid' ? 'text-green-500' : 'text-gray-600' }
                            `}
                        >
                            Grid
                        </p>
                    {
                        viewAs === 'grid' &&
                     < BiCheck
                        className = 'text-green-500  ml-3'
                        size={24}
                     />
                    }

                    </div>


            </div>
        </div> */}
