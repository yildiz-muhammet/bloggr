import React from 'react'

type Props = {
  title: string
}

export default function SectionTitle(
  { title }: Props
) {
  return (
    <h3
      className='
      text-[14px] font-bold text-gray-800 dark:text-gray-100 mb-3 font-sans
    '
    >
      {title}
    </h3>
  )
}
