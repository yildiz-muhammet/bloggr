import React, { useState } from 'react'
import Image from 'next/image'
import { FiSlack } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import Output from 'editorjs-react-renderer'
import slugify from 'slugify'
import { BsBookmarkPlus } from "react-icons/bs";
import { BsBookmarkCheckFill } from "react-icons/bs";
import service from '@/services/index'
import { useSession } from 'next-auth/react'
import { FaHandsClapping } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import LazyLoad from 'react-lazy-load';
type Props = {
    viewAs: 'grid' | 'list',
    post: {
        id: string,
        title: string,
        content: string,
        createdAt: string,
        likesCount: number,
        currentTagName: string,
        image: string,
        readingTime: number,
        author: {
            image: string,
            username: string,
            email: string
        },
        comments: [{
            content: string,
            createdAt: Date,
            author: {
                username: string,
                image: string
            }
        }
        ]
    },
   

}

export default function CardItem({ viewAs, post }: Props) {
    const { data: session } = useSession() as any;
    const router = useRouter()
    console.log(post)
    console.log(post.likesCount)
    console.log(session)

    const [savedPostsIds, setSavedPostsIds] = useState(
        session ? session.savedPosts : []
    )

    const [likedController, setLikedController] = useState({
        isLiked: session ? session.likedPosts.includes(post.id) : false,
        count: post?.likesCount
    })


    const savePostForUser = async () => {
        if (!session) {
            router.push('/login')
            return
        }
        console.log("ÇALIŞTI", post.id)

        if (savedPostsIds.includes(post.id)) {
            setSavedPostsIds(savedPostsIds.filter((id: string) => id !== post.id))
        }
        else {
            setSavedPostsIds([...savedPostsIds, post.id])
        }

        try {
            const res = await service.savePostForUser(post.id)
            console.log(res.data)
            // setData(res.data)
            // setIsLoading(false)

        }
        catch (error) {
            router.push('/')

            console.log(error)
            // setIsLoading(false)

            // setData(null)
            // eger hata varsa domdada işlem duzeltılsın 

            setSavedPostsIds(savedPostsIds.filter((id: string) => id !== post.id))


        }


    }

    const likePost = async () => {

        if (!session) {
            router.push('/login')
            return
        }


        setLikedController({
            isLiked: true,
            count: likedController.count + 1
        })

        try {
            const res = await service.likePost(post.id)
            console.log(res.data)
            // setData(res.data)
            // setIsLoading(false)

        }
        catch (error) {
            router.push('/')

            console.log(error)
            // setIsLoading(false)

            // setData(null)
            // eger hata varsa domdada işlem duzeltılsın 

            setLikedController({
                ...likedController,
                count: likedController.count - 1
            })


        }

    }



    return (

        <div className={` flex mb-7   dark:border-gray-700 pb-7  bordesr-2 bordser-green-600
       ${viewAs === 'grid' ? 'sm:w-6/12 w-10/12  flex-col sm:odd:pr-5  sm:even:pl-5  ' : 'flex-row space-x-5   border-b border-gray-200  '}`}
        >
            <div
                className={`
               ${viewAs === 'grid' ? 'w-full' : ' w-5/12'}
               
                 relative h-[220px] sm:min-w-[250px]
                    cursor-pointer
                 `}

                onClick={() => {
                    router.push(`/post/${slugify(post.title, {
                        lower: true,
                        strict: true
                    })}--${post.id}`)

                }}
            >
                <LazyLoad height={220} width={250}  threshold={0.95} offset={120}>
                    <Image
                        src={post?.image ? `/images/${post?.image}` : '/post.png'}
                        alt='image'
                        fill
                        className='rounded-sm'
                    />
                </LazyLoad>

            </div>

            <div className={` ${viewAs === 'grid' ? 'w-full space-y-2  ' : 'w-7/12 space-y-3   '} `}
            >
                <div className={`flex gap-2 items-center
                ${viewAs === 'grid' && 'my-3'}
                `} >
                    <Image src={
                        post?.author.image ? `/images/${post?.author.image}`
                            : '/user.jpg'}
                        width={17}
                        height={18}
                        className='rounded-full'
                        alt='image'
                    />
                    <span
                        className='font-medium   text-[11px] cursor-pointer dark:text-gray-100'
                        onClick={() => router.push(`/about/@${post.author.email.split('@')[0]}`)}
                    >
                        {post.author.username}
                    </span>

                </div>
                <div
                    className={`font-extrabold text-gray-800 dark:text-gray-100   line-clamp-1  
                    cursor-pointer 
                    `}

                    onClick={() => {
                        router.push(`/post/${slugify(post.title, {
                            lower: true,
                            strict: true
                        })}--${post.id}`)
                    }}

                >
                    {post.title}
                </div>
                <div
                    className={`font-medium text-gray-800 dark:text-gray-100  line-clamp-2 min-h-[45px]   max-h-[45px]  ${viewAs === 'grid' ? ' text-[12px]' : ' text-[13px]'} `}
                >
                    <Output
                        data={JSON.parse(post.content)}
                    />
                </div>

                <div
                    className={`flex gap-2 items-center text-gray-600 dark:text-gray-400 pt-2 
                    ${viewAs === 'grid' ? 'text-[10px]' : 'text-[11px]'} 
                    `}
                >
                    <p>
                        <FiSlack size={14} className='text-violet-600 pb-[2px]' />
                    </p>
                    <p>
                        {
                            post?.readingTime
                        }   min read
                    </p>
                    <p> • </p>
                    <p>

                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                        })}
                    </p>
                    {
                        post?.currentTagName &&
                        <>
                            <p> • </p>
                            <div
                                className='bg-gray-200 text-slate-900 px-2 py-1 rounded-xl text-[10px]'
                            >
                                {post.currentTagName}
                            </div>
                        </>

                    }

                </div>
                <div className='flex gap-2 items-center pt-4   rounded-md
                '>


                    <div className='flex gap-2 items-center '
                        onClick={() => likePost()}
                    >
                        <FaHandsClapping className={` ${likedController.isLiked ? 'text-violet-600' : 'text-slate-500 dark:text-gray-400'} text-[18px] hover:text-violet-600 cursor-pointer`}
                        />

                        <p
                            className='text-gray-600  text-sm dark:text-gray-400 pt-1'
                        >
                            {likedController.count}
                        </p>
                    </div>

                    <div className='flex gap-2 items-center ml-4'
                        onClick={() => {
                            router.push(`/post/${slugify(post.title, {
                                lower: true,
                                strict: true
                            })}--${post.id}?open=true`)
                        }}

                    >
                        <FaRegComment
                            className='  text-slate-500 dark:text-gray-400 text-[18px] hover:text-violet-600 cursor-pointer
                    ' />
                        <p className='text-gray-600  text-sm dark:text-gray-400 pt-[2px]'>
                            {
                                post?.comments?.length
                            }
                        </p>
                    </div>
                    <div className='flex-grow' />

                    <div >

                        {
                            session && savedPostsIds.includes(post.id) ? <BsBookmarkCheckFill
                                className='text-violet-500 dark:text-violet-200 cursor-pointer text-[18px] hover:text-violet-500'
                                onClick={() => savePostForUser()}
                            /> : <BsBookmarkPlus
                                className='text-gray-600 dark:text-gray-400 cursor-pointer text-[18px] hover:text-violet-600'
                                onClick={() => savePostForUser()}
                            />
                        }


                    </div>
                    <HiDotsHorizontal
                        className='text-gray-600 dark:text-gray-400 cursor-pointer text-[19px] hover:text-violet-600 ml-2'
                    />
                </div>

            </div>



        </div>
    )
}


