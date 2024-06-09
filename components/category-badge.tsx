type Props = {
    title : string 
    color : string
}

export default function CategoryBadge({title,color } : Props) {
   
  return (
    <span
    className={`
        text-[9px]  font-bold    inline px-2 py-1 rounded-full w-[fit-content]
        bg-indigo-500 text-white
        `}
    >
        {title}  
    </span>
    
  )
}
// bg-${color}-300
