import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import slugify from 'slugify'
import Output from 'editorjs-react-renderer';
import { FiSlack } from 'react-icons/fi'
type Props = {
    post: {
        id: string,
        title: string,
        content: string,
        createdAt: string,
        image: string,
        author: {
            username: string,
            email: string,
            image: string
        },
    }
}
export const  AboutPostItem = ({post} :Props) => {
    const router = useRouter()
    console.log(post)
    return (
        <div className={`
        flex 
         mb-7  
       dark:border-gray-700 pb-7  
       bordesr-2 bordser-green-600
    'flex-row space-x-5   border-b border-gray-200  pl-2 '}
`}
        >
          
            <div className={` w-7/12 space-y-2`}
            >
                <div className={`flex gap-2 items-center
                `} >
                    <Image src={
                        post?.author.image ? `/images/${post?.author.image}`
                            : '/user.jpg'}
                        width={16}
                        height={16}
                        className='rounded-full'
                        alt='image'
                    />
                    <span
                        className='font-medium 
                    text-[11px]
                '
                    >
                        {post.author.username}

                    </span>

                </div>
             
                <div
                    className={`font-extrabold text-gray-800 dark:text-gray-100   line-clamp-1
                    text-[15px] cursor-pointer
                    `}
                    onClick={() => {

                        router.push(`/post/${slugify(post.title, {
                            lower: true,
                            strict: true
                        })
                            }--${post.id}`)
                    }}
                >
                    {post.title}
                </div>

                <div
                    className={`font-medium text-gray-800 dark:text-gray-100  
            line-clamp-2 min-h-[45px]   text-[12px]
        `}
                >
                    <Output
                        data={JSON.parse(post.content)}
                    />
                </div>

                <div
                    className={`flex gap-2 items-center text-gray-600 dark:text-gray-400 pt-2  text-[10px]
                    `}
                >
                    <p>
                        <FiSlack size={14} className='text-violet-600 pb-[2px]' />
                    </p>
                    <p>
                        {
                            Math.floor(Math.random() * 10) + 1
                        }   min read
                    </p>
                    <p> • </p>
                    <p>

                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </p>
                </div>
                {/* <div>
                    <LikeButtonHeart
                        likes={12}
                    />
                </div> */}

            </div>
            <div
                className={`
               w-5/12
                 relative h-[130px] sm:max-w-[220px]
                    cursor-pointer p-6 
                 `}

                onClick={() => {

                    router.push(`/post/${slugify(post.title, {
                        lower: true,
                        strict: true
                    })
                        }--${post.id}`)
                }}
            >

                <Image src=
                    {
                        post?.image ? `/images/${post?.image}`
                            : '/post.png'
                    }
                    // width={500}
                    // height={300}
                    alt='image'
                    fill
                    className='rounded-sm  object-cover' 
                />


            </div>



        </div>
    )
}  