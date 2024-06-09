import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { RiUserFollowFill ,RiUserFollowLine } from 'react-icons/ri'
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import service from '@/services/index';
import  toast from 'react-hot-toast';
type Props = {
    user: any
}


export default function RecommendedUser({user}: Props) {
    const { data: session} = useSession() as any

    const router = useRouter()

    const [followingUser ,  setFollowingUser] = useState<string[]>([])

    console.log(session)

    console.log(user)

    const followUser = async (userId :string ) => {
        if(!session) {
            router.push('/login')
            return
        }


        followingUser.includes(userId) ? setFollowingUser(followingUser.filter(item => item !== userId)) : 
        setFollowingUser([...followingUser , userId])


        try {
            const res = await service.followUser(userId)

            console.log(res.data)

        }

        catch (error) {
            console.log(error)
            toast.error('Something went wrong')

        }
    }




    return (
        <div className='flex items-start justify-between mt-2 border-b border-zinc-100 pb-2 gap-1'>
            
            <Image src={  user.image ?    `/images/${user.image}` : '/user.jpg'}
                   width={22} height={22}
                   className='rounded-full mr-2 pt-1'
                   alt='profile'
                />
            <div className='flex flex-col 
                 w-full 
            '>
                <h6 className='font-semibold text-[12px] text-zinc-800 pb-[2px] cursor-pointer '

                    onClick={
                        () => router.push(`/about/@${user.email.split('@')[0]}`)
                    }

                >{
                    user.username}
                </h6>
                <p className='text-[10px] text-gray-600 font-normal line-clamp-2  pr-1 '>
                        {user.info || 'No bio yet'}
                     </p>
            </div>
            {/* ${followingUser.includes(user.id)  */}

            <button
                className={` px-2 py-2 text-xs font-semibold     transition duration-150 ease-linear self-center rounded-sm  border  group 
                        ${followingUser.includes(user.id)   ? 'bg-violet-400 text-white ' : 'text-zinc-600 hover:text-violet-500 hover:bg-violet-100 hover:border-violet-300'}
                `}
                onClick={() => followUser(user.id)}
            >
                {/* Follow */}
               {/* < RiUserFollowFill
               size={15}
                className='text-zinc-600 group-hover:text-white'
               /> */}
             < RiUserFollowLine
               size={16}
                className= {        followingUser.includes(user.id) 
                      ? 'text-white group-hover:text-white ' : 'text-zinc-600 group-hover:text-violet-500'
                }
                
               />

            </button>

        </div>

    )
}
