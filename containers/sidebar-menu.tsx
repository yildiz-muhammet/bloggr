"use client";
import PopularPosts from './popular-posts'
import WhoToFollow from './who-to-follow'
import RecommendedTopics from './recommended-topics'
import SavedPosts from './saved-posts'
import { useCallback, useEffect, useState } from 'react'
import service from '@/services/index'
export default function SidebarMenu() {

  const [data, setData] = useState([])

  useEffect(() => {
    getAllUsers()
  }, [])

  const getAllUsers = useCallback(async () => {

    try {
      const res = await service.getAllUsers()

      console.log(res.data)

      setData(res.data)

    }
    catch (error) {
      console.log(error)
      // toast.error('Post could not be created')
      // setPosts([])
    }
  }, [])
  const [scrollTop, setScrollTop] = useState(0);


  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);




  return (
    <div className={`
    sm:w-3/12  hidden  md:block   font-sans  pr-8 space-y-9
    bordser-[4px] bordser-red-700 
       overflow-x-hidden  z-50    
       ${scrollTop > 100 ? 'sticky mt-[auto] bottom-0 ' : 'relative'}`}
    >
      <PopularPosts />
      <WhoToFollow data={data}

      />
      <RecommendedTopics />
      <SavedPosts />


    </div>
  )
}
