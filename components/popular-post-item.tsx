// import CategoryBadge from './category-badge'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import slugify from 'slugify'
export default function PopularPostItem(
    { post }: any
) {
    const router = useRouter()
    console.log(post)
    return (
        <div className='flex flex-col  mb-3'>
            {/* <CategoryBadge title='Culture' color='yellow' /> */}


            <div className='flex gap-1 items-center '>
              


                <Image src={
                 post?.author.image ?    `/images/${post?.author.image}`
                   : '/user.jpg'}
                    width={13}
                    height={13}
                    className='rounded-full mr-[2px]'
                    alt='image'
                />
               

                <div
                    className='font-normal text-[10px] text-gray-900 dark:text-gray-400 pt-[3px] cursor-pointer '
                    onClick={ () => router.push(`/about/@${post.author.email.split('@')[0]}`) }

                >
                    {post.author.username} ·  {new Date(post.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                    })}
                </div>


            </div>

            <h6 className=' line-clamp-2  leading-[16px] dark:text-gray-100 
                text-zinc-800 text-[12px] my-[5px] font-bold
                cursor-pointer hover:text-zinc-700 transition-colors duration-300 ease-in-out
            '
            
            onClick={() => {

                router.push(`/post/${slugify(post.title, {
                    lower: true,
                    strict: true
                })
                    }--${post.id}`)
            }}
            >
                {post.title}
            </h6>
        </div>
    )
}
