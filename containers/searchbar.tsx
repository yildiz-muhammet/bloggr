import React, { useCallback, useState, useEffect, Fragment } from 'react'
import { FiSearch } from 'react-icons/fi'
import service from '@/services/index'
import { Popover, Transition } from '@headlessui/react'

import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { MdQueryBuilder } from 'react-icons/md'
import slugify from 'slugify'
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  const router = useRouter()
  const [suggestions, setSuggestions] = useState([])
  const [selectedTitle, setSelectedTitle] = useState<any>(null)

  useEffect(() => {
    getSearchSuggestions()
  }, [])


  const getSearchSuggestions = useCallback(async () => {

    try {
      const res = await service.getSearchSuggestions()
      console.log(res.data)
      setSuggestions(res.data)
    }
    catch (error) {
      console.log(error)
      setSuggestions([])
    }
  }, [])


  const [query, setQuery] = useState('')

  const filteredResults =
    query === ''
      ? suggestions.slice(0, 10)
      :
      suggestions.filter((sug: any) => sug.title.toLowerCase().includes(query.toLowerCase())).slice(0, 10)


  useEffect(() => {
    if (selectedTitle && selectedTitle.title !== '') {
      router.push(`/post/${slugify(selectedTitle?.title, {
        lower: true,
        strict: true
      })}--${selectedTitle.id}`)
    }
  }
    , [selectedTitle])




  return (


    // <Popover className="relative grow   max-w-[420px]  mr-4 lg:flex hidden  cursor-pointer group 
    //   ">
    //   {({ open }) => (
    //     <>

    //       <Popover.Button
    //         className={` w-full


    //         `}
    //       >
    //         <div className='relative grow   w-full  mr-4 lg:flex hidden  cursor-pointer group '>
    //           <button type="button" 

    //           className= {`
    //           h-10 pl-6 pr-3 flex items-center w-full  space-x-3 font-sans text-left ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm  text-slate-400 dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700
    //           ${open ? 'rounded-lg  rounded-b-none   ' : 'rounded-lg '}
    //           `}

    //           >

    //             <FiSearch className='absolute left-3 top-3 text-slate-300 dark:text-slate-400 '
    //               size={17}
    //             />

    //             <span className="flex-auto text-sm">Search Post</span>



    //             <kbd className="font-sans font-semibold dark:text-slate-500"><abbr title="Control" className="no-underline text-slate-300 dark:text-slate-500 text-sm">Ctrl </abbr> K</kbd></button>

    //         </div>
    //       </Popover.Button>
    //       <Transition
    //         as={Fragment}
    //         enter="transition ease-out duration-200"
    //         enterFrom="opacity-0 translate-y-1"
    //         enterTo="opacity-100 translate-y-0"
    //         leave="transition ease-in duration-150"
    //         leaveFrom="opacity-100 translate-y-0"
    //         leaveTo="opacity-0 translate-y-1"
    //       >
    //         <Popover.Panel className="absolute left-1/2 z-10 mt-10   -translate-x-1/2 transform  font-sans w-[420px]  cursor-auto  ">
    //           <div className="overflow-hidden rounded-lg shadow-lg 
    //           rounded-t-none
    //           ring-1 ring-black/5">
    //             <div className=" pl-3 pt-2">
    //               <span className="text-[12px] font-bold text-violet-600">
    //                     Recommended Posts
    //                 </span>
    //             </div>
    //             <div className="relative grid gap-5 bg-white py-5 pl-4 grid-cols-1">
    //               İÇERİK

    //             </div>

    //           </div>
    //         </Popover.Panel>
    //       </Transition>
    //     </>
    //   )}
    // </Popover>
    <div className="relative grow   max-w-[420px]  mr-4 lg:flex hidden  cursor-pointer group 
         ">
      <Combobox
        value={selectedTitle} onChange={(value: any) => setSelectedTitle(value)}

      //  onClose={() => setQuery('')}

      >
        <ComboboxInput
          aria-label="Assignee"
          displayValue={(sug: any) => sug?.title}
          onChange={(event) => setQuery(event.target.value)}
          className={`
                h-10 pl-10 flex items-center w-full  space-x-3 font-sans text-left ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500 shadow-sm  text-slate-600 rounded-md
                focus:rounded-b-none text-[13px] font-semibold bg-transparent focus:bg-white
                `}
          autoComplete="off"
          placeholder="Search Post"

        />
        <FiSearch className='absolute left-3 top-3 text-slate-300 dark:text-slate-400 '
          size={17}
        />
      

        <ComboboxOptions anchor="bottom"
          className=" mt-[2px] bg-white  
              rounded-md 
              rounded-t-none
           empty:hidden z-50 w-[420px] font-sans
           shadow-lg ring-1 ring-black/5
              "

        >
          <p
            className="text-[13px] font-bold text-violet-600
                  p-3
                  "
          >
            Results for   {
              query === '' ? <span className="ml-1 text-gray-400">
                {`"${'Search Post'}"`}

              </span> :
                <span className="ml-1 text-violet-600">
                  {`"${query}"`}
                </span>
            }

          </p>

          {filteredResults.map((sug: any) => (
            <ComboboxOption key={sug.id} value={sug} className="data-[focus]:bg-violet-100
                p-[10px] cursor-pointer
                "
              // onClick={() => {
              //   router.push(`/post/${slugify(sug.title, {
              //     lower: true,
              //     strict: true
              //   })}--${sug.id}`)
              // }}
              onClick={() => {
                console.log('click')
              }}
            >
              <p
                className="text-black
                  text-[13px] dark:text-gray-100 font-semibold
                "

              >{sug.title}</p>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  )
}  
