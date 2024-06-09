"use client"
import CardItem from '@/components/card-item'
import { FaGripVertical, FaGripHorizontal } from 'react-icons/fa'
import React, { useState } from 'react'

type Props = {
    viewAs: 'grid' | 'list',
    posts : any
}

export default function CardList({ viewAs ,posts}: Props) {
    return (
        <div className={`flex  font-sans 
        relative
            bordser-2 borsder-red-500
            ${viewAs === 'grid' ? 'flex-row flex-wrap   justify-between ' : 'flex-col  '
            }
       `}

        >

            {
                posts?.map((post : any) => (
                    <CardItem
                        key={post.id}
                        viewAs={viewAs}
                        post={post}
                    />
                ))
            }
          
        </div>

    )
}
