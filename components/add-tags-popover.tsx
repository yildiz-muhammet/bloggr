import { useState, useEffect, useCallback } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { FaTags } from "react-icons/fa6";
import service from '@/services/index';
import { Tag } from '@prisma/client';

type Props = {
    selectedTags: Tag[],
    setSelectedTags: (tags: Tag[]) => void
}

export function AddTagsPopover(
    { selectedTags, setSelectedTags }: Props
) {
    const [allTags, setAllTags] = useState<Tag[]>([])

    useEffect(() => {
        getAllTags()
    }, [])


    const getAllTags = useCallback(async () => {

        try {
            const res = await service.getTags()
            console.log(res.data)
            setAllTags(res.data)
            // setIsLoading(false)
        }
        catch (error) {
            // setIsLoading(false)
            console.log(error)
            setAllTags([])
        }
    }, [])


    return (
        <Popover className="absolute right-0 top-0">
            {({ open }) => (
                <>
                    <Popover.Button
                        className={`
            ${open ? 'text-white' : 'text-black/90'}
              bg-gray-200 dark:bg-gray-800 p-[7px] rounded-lg
            group inline-flex items-center    text-base font-medium  focus:outline-none `}
                    >
                        <FaTags className='text-gray-600' />
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
                        <Popover.Panel className="absolute right-0 z-10 mt-3 w-64  -translate-x-0 transform px-1  ">
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                                <div className="bg-gray-50 p-3 pl-3">
                                    <span className="text-[12px] font-bold text-gray-900 text-center">
                                        Add Tags
                                    </span>

                                </div>
                                <div className="relative grid gap-1 bg-white pl-1 pt-1 grid-cols-1
              max-h-72 overflow-y-auto  overflow-x-hidden rounded-lg shadow-lg ring-1 ring-black/5 
              ">
                                    {allTags.map((tag) => (
                                        <div
                                            key={tag.id}
                                            className={`flex items-center p-2 transition duration-150 ease-in-out rounded-sm hover:bg-gray-100 cursor-pointer
                                           pl-2
                                            
                                            ${selectedTags?.find((t) => t.id === tag.id) ? 'bg-violet-100' : ''}` }
                                            onClick={() => {
                                                if (selectedTags?.find((t) => t.id === tag.id)) {
                                                    setSelectedTags(selectedTags.filter((t) => t.id !== tag.id))
                                                } else {
                                                    setSelectedTags([...selectedTags, tag])
                                                }
                                            }}
                                        >
                                            <div className="flex flex-col">
                                                <p className="text-sm font-medium text-gray-700 ">{tag.name}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    )
}

