'use client';
import { useState, useEffect } from 'react'
import Link from 'next/link'
// import { Link as ScrollLink } from 'react-scroll'
import { CgClose, CgMenuRight } from 'react-icons/cg'
import AuthLinks from '@/components/auth-links';
import ThemeSwitcher from '@/components/theme-switcher';
import AccountPopover from '@/components/account-popover';
import LanguageSwitcher from '@/components/language-switcher';
import SearchBar from './searchbar';
import { NotificationsPopover } from '@/components/notifications-popover';
import { useSession } from 'next-auth/react';



export default function Navbar() {
    const { data: session } = useSession() as any
    const [drawerVisible, setDrawerVisible] = useState(false)

    console.log(session)


    return (
        <header className={`dark:bg-opacity-40 border-gray-200 dark:border-b-0 z-30 min-w-full flex flex-col relative  dark:bg-grey-900`}>
            <nav className='  
         2xl:w-full
          w-full  2xl:px-0 mx-auto py-4 hidden sm:flex items-center justify-between  space-x-4        bordser-2 borsder-blue-800
          '>
                <div
                    className='w-3/12 borsder-[4px] bordser-red-700 '
                >
                    <Link href={'/'} className=' transition-colors duration-300 font-bold md:text-[28px] text-slate-700 dark:text-slate-300   text-[24px] '>
                        NEXT BLOG
                    </Link>
                    <br />
                </div>


                <div
                    className='w-9/12 borsder-[4px] bordser-red-700 flex items-center lg:justify-between justify-end  '
                >

                    <SearchBar />


                    <ul className='flex items-center gap-8 font-sans  text-[15px] text-gray-700  flex-none  borsder-2 borsder-blue-500 
                      
                    '>
                        {/* <LanguageSwitcher /> */}
                        <AuthLinks currentUser={session} />

                        {/* <ThemeSwitcher /> */}


                        {session &&
                            <>
                                <NotificationsPopover />

                                <AccountPopover currentUser={session} />
                            </>

                        }
                    </ul>

                </div>

            </nav>









            {/* kucuk ekranlar ıcın  */}

            <nav className='p-4 flex sm:hidden items-center justify-between'>
                <Link href={'/'} className=' transition-colors duration-300 font-bold text-[24px]  text-primary dark:text-slate-300 '>
                    NEXT-BLOG
                </Link>

              

                <div className='flex items-center gap-4'>
                    <ThemeSwitcher />
                    <CgMenuRight
                        className=' cursor-pointer'
                        size={20} onClick={() => setDrawerVisible(true)} />
                </div>
            </nav>


            <div className={`flex min-h-screen w-screen absolute md:hidden top-0 ${drawerVisible ? 'right-0' : 'right-[-100%]'} bottom-0 z-50 ease-in duration-300`}>
                <div className="w-2/4" onClick={() => setDrawerVisible(false)}></div>

                <div className="flex flex-col p-4 gap-5 bg-gray-100/95 backdrop-filter backdrop-blur-sm dark:bg-gray-900/95 w-2/4 items-center text-xl gap-y-8 ">
                    <CgClose className='self-end my-2' size={20} onClick={() => setDrawerVisible(false)} />

                    <Link href={'/'} onClick={() => setDrawerVisible(false)}>
                        Home
                    </Link>

                    <Link href={'/about'} onClick={() => setDrawerVisible(false)}>
                        About
                    </Link>
                    <AuthLinks currentUser={session} />
                </div>
            </div>

        </header>
    )
}
