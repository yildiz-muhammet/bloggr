"use client"
import { useEffect, useState } from "react"
import service from '@/services/index';
import dynamic from "next/dynamic";
const Output = dynamic(() => import('editorjs-react-renderer'), { ssr: false })
import { FaRegHeart } from "react-icons/fa6";
import { FaHandsClapping } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CommentsDrawer } from "@/components/comments-drawer";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
const style = {
  paragraph: {
    fontSize: '0.93rem',
    lineHeight: '1.5',
    color: '#333',
    margin: '1rem 0',
  },

  table: {
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      margin: '1rem 0',
    },
    tr: {
      borderBottom: '1px solid #f1f1f1',
      background: '#f8f8f8',
      padding: '0.45rem',
      fontSize: '0.93rem',
    }
    ,
    th: {
      padding: '0.5rem',
      textAlign: 'left',
      fontWeight: 'bold',
      background: 'gray',
      borderRadius: '0',
    },
    td: {
      padding: '0.5rem',
      textAlign: 'left',
      fontWeight: 'normal',
    },

  },
  // image: {
  //   img: {...},
  //   figure: {...},
  //   figcaption: {...}
  // },
  header: {
    h1: {
      fontSize: '21px',
      fontWeight: 'bold',
      margin: '1rem 0',
    },
    h2: {
      fontSize: '20px',
      fontWeight: 'bold',
      margin: '1rem 0',
    },
    h3: {
      fontSize: '18px',
      fontWeight: 'bold',
      margin: '1rem 0',
    },
    h4: {
      fontSize: '15px',
      fontWeight: 'bold',
      margin: '1rem 0',
    },
    h5: {
      fontSize: '13px',
      fontWeight: 'bold',
      margin: '1rem 0',
    },
    h6: {
      fontSize: '11px',
      fontWeight: 'bold',
      margin: '1rem 0',
    },

  },
  quote: {
    container: {
      borderLeft: '5px solid #ccc',
      paddingLeft: '1rem',
      margin: '1.3rem 0',
    },
    content: {
      fontSize: '1rem',
      fontStyle: 'italic',
      color: '#666',
    },
    author: {
      fontSize: '0.8rem',
      fontWeight: 'bold',
      marginTop: '0.5rem',
    },
    message: {
      fontSize: '0.8rem',
    },

    // content: {...},
    // author: {...},
    // message: {...}

  },
  list: {
    container: {
      margin: '1rem 0',
    },
    listItem: {
      fontSize: '1rem',
      color: '#666',
      margin: '0.5rem 0',
    },
    // listItem: {...},
  }
  // linkTool
}

export default function PostDetail({ params }: { params: { slug: string } }) {
  const { data: session } = useSession() as any;
  const router = useRouter()
  const searchParams = useSearchParams()
  const [post, setPost] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [likedController, setLikedController] = useState({
    isLiked: false,
    count: 0
  })
  const [drawerOpen, setDrawerOpen] = useState(searchParams.get('open') || false)
  const [relatedTags, setRelatedTags] = useState<string[]>([])


  const [followStatus, setFollowStatus] = useState(false)



  useEffect(() => {
    getPost()
  }, [params.slug, session?.likedPosts, session?.followersIDs])


  const getPost = async () => {
    const id = params.slug.split('--')[1]

    try {
      const res = await service.getPost(id)
      setPost(res.data.post)
      setLikedController({
        isLiked: session?.likedPosts.includes(res.data.post.id),
        count: res.data?.post?.likesCount
      })
      setRelatedTags(res.data.relatedTagsNames)
      setFollowStatus(
        res.data?.post.author?.followersIDs.includes(session?.id)
      )

      setIsLoading(false)

    }
    catch (error) {
      setIsLoading(false)
      console.log(error)
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

    }
    catch (error) {
      router.push('/')

      console.log(error)
      setLikedController({
        ...likedController,
        count: likedController.count - 1
      })

    }

  }


  const followUser = async () => {
    if (!session) {
      router.push('/login')
      return
    }


    setFollowStatus(!followStatus)


    try {
      const res = await service.followUser(post.authorId)
    }

    catch (error) {
      console.log(error)
      setFollowStatus(!followStatus)
    }

  }





  if (isLoading) {
    return (

      <div className="max-w-4xl mx-auto px-52 "> <div role="status" className="my-7 animate-pulse">  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5">
        </div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[500px] mb-2.5"></div><div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[450px] mb-2.5"></div><div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[380px] mb-2.5"></div><div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px]"></div><span className="sr-only">Loading...</span> </div><div role="status" className="max-w-lg mb-7 animate-pulse"> <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded dark:bg-gray-700"> <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"></path></svg> </div><span className="sr-only">Loading...</span> </div><div role="status" className="my-6 animate-pulse"> <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div><div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[450px] mb-2.5"></div><div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div><div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[500px] mb-2.5"></div><div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[450px] mb-2.5"></div><div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[380px] mb-2.5"></div><div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px]"></div><span className="sr-only">Loading...</span> </div><div role="status" className="my-6 animate-pulse"> <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div><div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[450px] mb-2.5"></div><div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div><div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[500px] mb-2.5"></div><span className="sr-only">Loading...</span> </div><div role="status" className="mb-6 mt-7 animate-pulse"> <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-48 mb-4"></div><div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div><div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[450px] mb-2.5"></div><div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div><div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[500px] mb-2.5"></div><div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[450px] mb-2.5"></div><div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[380px] mb-2.5"></div><div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div><div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[500px] mb-2.5"></div><div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px]"></div><span className="sr-only">Loading...</span> </div><div role="status" className="my-6 animate-pulse"> <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div><div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[450px] mb-2.5"></div><span className="sr-only">Loading...</span> </div></div>
    )
  }






  return (

    <div className="font-sans max-w-2xl mx-auto p-4 mt-3">
      <CommentsDrawer
        open={drawerOpen as boolean}
        setOpen={setDrawerOpen}
        postId={post?.id}
        comments={post?.comments}
      />
      <h2
        className="text-[24px] font-extrabold mb-2 tracking-tight font-body ">
        {post?.title}
      </h2>

      <div className="flex items-center justify-between  mb-3 py-2  border-b  border-t border-gray-100"
      >
        <div className="flex items-center  space-x-3">
          <img src={post?.author?.image ? `/images/${post?.author.image}` : '/user.jpg'}
            alt="image" className="w-8 h-8 rounded-full" />
          <div>
            <div
              className="flex items-center gap-3"
            >
              <h6
                className="text-[13px] font-semibold text-slate-700 "
              >
                {post?.author?.username}
              </h6>

              {
                followStatus ? <button className="text-xs font-semibold text-gray-600 border  rounded-md px-2 py-1 cursor-pointer  transition-all duration-300 ease-in-out hover:text-gray-900"
                  onClick={followUser}
                >Following</button> :

                  <button className="text-xs font-semibold text-violet-600 border rounded-md px-2 py-1 cursor-pointer  transition-all duration-300 ease-in-out hover:text-violet-700  "
                    onClick={followUser}
                  >Follow</button>

              }

            </div>


            <p
              className="text-[11px] text-gray-500 mt-1"
            >
              {
                new Date(post?.createdAt).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })
              }
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3" >
          <div className='flex gap-2 items-center ' onClick={() => likePost()}
          >
            <FaHandsClapping className={` ${likedController.isLiked ? 'text-violet-600' : 'text-slate-500 dark:text-gray-400'} text-[18px] hover:text-violet-600 cursor-pointer`} />
            <p className='text-gray-600  text-sm dark:text-gray-400 pt-1'    >
              {likedController.count}
            </p>
          </div>
          <div className='flex gap-2 items-center ml-4 pt-1' onClick={() => setDrawerOpen(true)}  >
            <FaRegComment
              className='  text-slate-500 dark:text-gray-400 text-[18px] hover:text-violet-600 cursor-pointer  ' />
            <p className='text-gray-600  text-sm dark:text-gray-400 pt-[2px]'>
              {post?.comments.length}
            </p>
          </div>
        </div>

      </div>


      {post?.image && <div className="mb-6"  >
        <Zoom>
          <img src={post?.image && `/images/${post?.image}`}
            alt="image"
            className="w-full h-96 object-cover rounded-lg"
          />

        </Zoom>

      </div>}



      {post && <Output
        data={JSON.parse(post?.content)}
        style={style}
      />}

      {
        relatedTags.length > 0 && <div className="flex items-center gap-3 mt-8">
          <p className="text-sm font-semibold text-gray-500">Related Tags:</p>
          <div className="flex gap-2">
            {
              relatedTags.map((tag, i) => (
                <Link key={i}
                  href={`/?tag=${tag}`} >
                  <p
                    className="text-xs font-semibold text-violet-600 border bg-violet-100 rounded-md px-2 py-1 cursor-pointer hover:bg-violet-200 transition-all duration-300 ease-in-out hover:text-violet-700 dark:bg-violet-900 dark:text-violet-300 dark:hover:bg-violet-800 dark:hover:text-violet-500"
                  >
                    {tag}
                  </p>
                </Link>
              ))
            }
          </div>
        </div>
      }

    </div >

  )
}
