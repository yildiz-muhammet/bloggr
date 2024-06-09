import React, { useCallback, useEffect, useState } from "react";
import { clsx } from "clsx";
import { FaTimes } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { BsThreeDots } from "react-icons/bs";

import service from "@/services/index";
import toast from "react-hot-toast";

type CommentsDrawerProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    side?: "left" | "right";
    postId: string;
    comments: Comment[];
};

type Comment = {
    content: string;
    createdAt: string;
    author: {
        username: string;
        image: string;
    }
}


export const CommentsDrawer = ({ open, setOpen, side = "right", postId  ,comments}: CommentsDrawerProps) => {
    const { data: session } = useSession() as any
    const [isWriting, setIsWriting] = useState(true);
    const [allComments, setAllComments] = useState<Comment[]>( comments)
    const [content, setContent] = useState("")

    const addComment = async () => {

        try {
            const res = await service.addComment({
                postId: postId,
                content: content
            })
            console.log(res)
            setContent("")
            setIsWriting(false)
            setAllComments([...allComments, {
                content: content,
                createdAt: new Date().toISOString(),
                author: {
                    username: session?.username,
                    image: session?.image
                }
            }])
            toast.success("Comment added successfully")

        }
        catch (error) {
            console.log(error)
            setContent("")
            toast.error("Something went wrong , please try again later")

        }
    }

    return (
        <div
            id={`dialog-${side}`}
            className="relative z-50"
            aria-labelledby="slide-over"
            role="dialog"
            aria-modal="true"
            onClick={() => setOpen(!open)}
        >
            <div
                className={clsx(
                    "fixed inset-0 bg-slate-900 bg-opacity-20 transition-all",
                    {
                        "opacity-100 duration-500 ease-in-out visible": open
                    },
                    { "opacity-0 duration-500 ease-in-out invisible": !open }
                )}
            >
            </div>
            <div className={clsx({ "fixed inset-0   ": open })}>
                <div className="absolute inset-0   ">
                    <div className="pointer-events-none fixed  inset-y-0 right-0 w-96  "
                    >
                        <div className={`${open ? "translate-x-0" : "translate-x-full"}  pointer-events-auto relative w-full h-full transform transition ease-in-out duration-500`}
                            onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                            }}
                        >
                            <div
                                className="flex flex-col h-full overflow-y-auto bg-white p-5  shadow-xl
                                "
                            >

                                <div>
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200"
                                        >
                                            Responses ({allComments?.length})
                                        </h2>
                                        <button
                                            onClick={() => setOpen(false)}
                                            className="text-gray-500 dark:text-gray-400"
                                        >
                                            <FaTimes className="text-[18px] cursor-pointer" />
                                        </button>
                                    </div>
                                    {
                                        session &&
                                        <div className="mt-4  
                                          shadow-md 
                                    px-4 rounded-md bg-gray-50 dark:bg-gray-800 cursor-pointer first-letter:
                                    
                                    transition-all duration-300 ease-in-out
                                    "

                                        >

                                            <div className={`flex items-center gap-2 ${isWriting ? "block pt-3" : "hidden"}
                                        `}

                                            >

                                                <img src={
                                                    session?.image ? `/images/${session.image}`
                                                        : '/user.jpg'
                                                }
                                                    alt="image" className="w-6 h-6 rounded-full" />

                                                <p className="text-gray-800 dark:text-gray-200 text-sm ml-1 text-sm">
                                                    {session?.username}
                                                </p>
                                            </div>
                                            <div className="mt-3">

                                                <textarea
                                                    placeholder="What are your thoughts?"
                                                    className=
                                                    {`block w-full
                                         ${isWriting ? "h-24 pt-2 " : "h-11 pt-4"} 
                                        "   rounded-md  
                                        bg-gray-50 dark:bg-gray-900 resize-none outline-none
                                        text-[12px]   text-gray-800 dark:text-gray-200  
                                        `}
                                                    onFocus={
                                                        () => setIsWriting(true)
                                                    }
                                                    onChange={(e) => setContent(e.target.value)}
                                                    value={content}
                                                ></textarea>
                                                <div className={`
                                            flex justify-end mt-1 gap-4 pb-2
                                            ${isWriting ? "block" : "hidden"}
                                            `}
                                                >
                                                    <button className=" rounded-md text-[12px]"
                                                        onClick={() => setIsWriting(false)}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button className=
                                                        {`
                                                    ${content.length > 0 ? "bg-green-700" : "bg-gray-300 cursor-not-allowed"}
                                                   text-white px-3 py-[5px] text-[12px] rounded-3xl
                                                   hover:bg-green-800 transition-all duration-300 ease-in-out
                                                    `}
                                                        onClick={addComment}

                                                    >
                                                        Respond
                                                    </button>
                                                </div>



                                            </div>
                                        </div>
                                    }

                                    <div
                                        className="mt-8"
                                    >

                                        {
                                            allComments.map((comment, index) => (
                                                <div key={index} className="mt-4
                                                
                                                bg-violet-50 dark:bg-gray-800 p-3 rounded-md shadow-md
                                                ">
                                                    <div className="flex items-center gap-2 relative  ">
                                                        <img src={
                                                            comment.author.image ? `/images/${comment.author.image}` : '/user.jpg'}
                                                            alt="image" className="w-7 h-7 rounded-full  " />

                                                        <div className="pt-1">
                                                            <p className="text-gray-800 dark:text-gray-200 text-sm">
                                                                {comment?.author.username}
                                                            </p>
                                                            <p className="text-gray-500 dark:text-gray-400 text-[11px]">

                                                                {
                                                                    new Date(comment.createdAt).toLocaleDateString(
                                                                        "en-US",
                                                                        {
                                                                            month: "short",
                                                                            day: "numeric",
                                                                            year: "numeric",
                                                                            hour  : "2-digit",
                                                                            minute  :"2-digit",
                                                                        }
                                                                    )
                                                                }
                                                            </p>
                                                        </div>
                                                        <BsThreeDots
                                                            className="text-gray-600 dark:text-gray-400 cursor-pointer right-0  top-3 absolute 
                                                            text-[18px] 
                                                            "
                                                        />
                                                    </div>
                                                    <p className="mt-2 text-gray-800 dark:text-gray-200 text-[12px] p-2 ">
                                                        {comment.content}
                                                    </p>

                                                </div>
                                            ))
                                        }
                                    </div>


                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

