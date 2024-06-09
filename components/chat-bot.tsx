import { useChat } from 'ai/react'
import { useSession } from 'next-auth/react'
import { useState, useEffect, useRef } from 'react'

export function ChatBot() {
    const { data: session } = useSession() as any
    const [isOpen, setIsOpen] = useState(false)
    const [chatMessages, setChatMessages] = useState<any[]>([])

    const { messages, input, handleInputChange, handleSubmit, error } = useChat({
        api: '/api/openai'
    })



    const chatContainer = useRef<HTMLDivElement>(null)

    const scroll = () => {
        const { offsetHeight, scrollHeight, scrollTop } = chatContainer.current as HTMLDivElement

        if (scrollHeight >= offsetHeight + scrollTop) {
            chatContainer.current?.scrollTo(0, scrollHeight + 220)
        }
    }


    const handleError = () => {
        if (error) {

            if (chatMessages[chatMessages.length - 1]?.error) {
                return null
            }
            setChatMessages([...chatMessages, {
                content: '404 The model `gpt-4o` does not exist or you do not have access to it.',
                role: 'bot',
                error: true
            }])


        }
    }

    useEffect(() => {
        scroll()
        handleError()
    }, [messages, error, chatMessages])


    return (
        <div
            className='fixed bottom-2 right-[-5px]  text-white rounded-md px-5 py-3'
        >
            <img
                src="/gpt.jpg"
                alt="gptt"
                className="rounded-full  object-contain w-10 h-10 cursor-pointer  hover:scale-110 shadow-lg   transition duration-300 ease-in-out "
                onClick={() => setIsOpen(!isOpen)}
            />

            <div
                className={`absolute bottom-[62px] right-9 
                
                bg-gray-100
                shadow-xl  
                border-gray-100
                z-50
                w-[385px]
                h-[550px]
                rounded-md  ${isOpen ? 'block' : 'hidden'}`}
            >
                <div className="flex items-center justify-between">
                    <h1
                        className="text-sm  rounded-md 
                        rounded-b-none pl-14 pt-5

                        text-zinc-900 bg-zinc-300 font-extrabold p-4 w-full
                        "
                    > Chat Bot
                        <img
                            src="/gpt.jpg"
                            alt="gptt"
                            className="rounded-full  object-contain w-6 h-6    shadow-lg  absolute left-3 top-[18px] "
                            onClick={() => setIsOpen(!isOpen)}
                        />
                    </h1>

                    <button className=' absolute top-4 right-3'
                        onClick={() => {
                            setIsOpen(false)
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div
                    ref={chatContainer}
                    className='flex grow-1 overflow-y-auto p-3 pr-4 h-[442px] bg-zinc-100  text-black pt-8 flex-col gap-8 z-50  '
                >
                    <div
                        className="flex gap-4 items-center  rounded-md h-10 "
                    >
                        <img
                            src="/gpt.jpg"
                            alt="gptt"
                            className="rounded-full  object-contain w-8 h-8    shadow-lg  bg-white p-2 "
                        />
                        <p className="text-[14px] bg-white p-2 rounded-md shadow-sm"
                        >
                            Hello! 🎉 Welcome to Next Blog . How can I assist you today? 😊
                        </p>
                    </div>


                    {
                        chatMessages?.map((message, index) => (
                            <div key={index}

                                className={
                                    `
                     flex gap-3 items-center  rounded-md h-10 
                 ${message.role === 'user' ? 'justify-end' : 'justify-start'}
                 
                     `
                                }
                            >
                                <img
                               
                                    src={
                                        message.role === 'user' ?   `/images/${session?.image}` :  '/gpt.jpg'   
                                    }

                                                
                                    alt="pht"
                                    className="rounded-full  object-contain w-8 h-8    shadow-lg  bg-white p-2 "
                                />
                                <p className=
                                    {`
                     
                     ${message.role === 'user' ? 'bg-violet-200' :
                                            message.error ? 'bg-red-200' :
                                                'bg-white  '}  
                     text-[14px]  p-2 rounded-md shadow-sm

                  ${message.error ? 'text-red-900' : 'text-black'}
                     `}
                                >
                                    {message.content}
                                </p>
                            </div>
                        ))
                    }

                </div>


                <form
                    onSubmit={(e) => {


                        handleSubmit(e)
                        setChatMessages([...chatMessages, {
                            content: input,
                            role: 'user',
                            error: false
                        }])
                    }}
                    className='flex  gap-2 items-center bg-white p-2 rounded-md rounded-t-none'
                >
                    <input
                        type='text'
                        placeholder="Enter your message"
                        name='input-field'
                        value={input}
                        onChange={handleInputChange}
                        className="w-full  p-2 rounded-md 
                            text-sm pl-3 text-gray-900 outline-none
                            "
                        autoComplete='off'
                    />
                    <button type='submit'
                        disabled={!input && error ? true : false}
                        className={`p-2  rounded-md  text-sm   ${!input ? 'cursor-not-allowed text-zinc-700 '
                            : 'text-violet-700 cursor-pointer   '}`}
                    >Send</button>

                </form>


            </div>


        </div>
    )
}