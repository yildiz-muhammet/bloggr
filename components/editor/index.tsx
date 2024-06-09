
import { useState, useEffect, useRef } from "react"
import service from '@/services/index';
import toast from 'react-hot-toast';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MdOutlineImage } from "react-icons/md";
import Image from "next/image";
// import { IoCloseCircleSharp } from "react-icons/io5";
import { RiCloseLine } from "react-icons/ri";
import { AddTagsPopover } from "../add-tags-popover";
import { Tag } from "@prisma/client";
import { ChatBot } from "../chat-bot";
export const Editor = () => {
    const { data: session } = useSession() as any
    const [isMounted, setIsMounted] = useState<boolean>(false)
    const ref = useRef<any>()
    const [title, setTitle] = useState<string>('')
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedFile, setSelectedFile] = useState<File>();
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

    const router = useRouter()


    const initializeEditor = async () => {
        const EditorJS = (await import("@editorjs/editorjs")).default
        const Header = (await import("@editorjs/header")).default
        // const Embed = (await import("@editorjs/embed"))
        // // const Image = (await import("@editorjs/image")).default
        // const Paragraph = (await import("@editorjs/paragraph")).default
        // const LinkTool = (await import("@editorjs/link")).default
        // const Quote = (await import("@editorjs/quote")).default
        // const Warning = (await import("@editorjs/warning")).default
        // const Marker = (await import("@editorjs/marker")).default
        // const Code = (await import("@editorjs/code")).default

        if (ref.current) {
            const editor = new EditorJS({
                holder: ref.current,
                tools: {
                    header: Header
                    // embed: Embed,
                    // table: Table,
                    // paragraph: Paragraph,
                    // linkTool: LinkTool,
                    // quote: Quote,
                    // warning: Warning,
                    // marker: Marker,
                },
            });

            ref.current = editor
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsMounted(true);
        }
    }, [])

    useEffect(() => {
        const init = async () => {
            await initializeEditor();
        };

        if (isMounted) {
            init();

            return () => {
                if (ref.current) {
                    ref.current = null
                }
            }
        }
    }, [isMounted])




    const save = () => {
        console.log("ref.current :>> ", ref.current);
        if (ref.current) {
            ref.current.save().then(async (outputData: any) => {
                console.log("outputData :>> ", outputData);
                console.log("title :>> ", title);

                let formData = new FormData();

                selectedFile && formData.append("image", selectedFile);
                formData.append("title", title);
                formData.append("content", JSON.stringify(outputData));
                formData.append("relatedtags", JSON.stringify(selectedTags.map((tag) => tag.id)));

                try {
                    const res = await fetch("/api/posts", {
                        method: "POST",
                        body: formData,
                    });

                    console.log("ress >>>", res)

                    toast.success('Post created successfully')

                    router.push('/')

                }
                catch (error) {
                    console.log(error)
                    toast.error('Post could not be created')
                    // setPosts([])
                }

            })
        }
    }

    return (
        <div className="rounded-md max-w-4xl mx-auto border  border-gray-100 p-3 relative">
            <div className=" w-[650px]  mx-auto relative" >
                <input type="text" placeholder=' Enter Title'
                    className='w-full h-10  py-3 outline-none font-bold   pl-0 text-[22px]   mb-2 bg-transparent '
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <AddTagsPopover
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                />

            </div>

            <div
                className=" w-[650px]  mx-auto relative   flex gap-3 my-2 flex-wrap justify-start "
            >
                {
                    selectedTags.map((tag) => (
                        <div
                            key={tag.id}
                            className="flex items-center gap-2 bg-violet-100 p-2 rounded-md w-auto"
                        >
                            <p className="text-gray-800 text-[11px] font-semibold">
                                {tag.name}
                            </p>
                            <button
                                onClick={() => setSelectedTags(selectedTags.filter((t) => t.id !== tag.id))}
                            >
                                <RiCloseLine className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>
                    ))
                }
            </div>


            <div
                className="relative flex flex-col text-gray-400  rounded cursor-pointer mb-3
            w-[650px] mx-auto
        ">


                {selectedImage ? <img src={selectedImage}
                    alt="postimage"
                    className="rounded-md
                         h-[250px]   object-contain
                            w-max mx-auto
                         "

                /> :
                    <>
                        <input type="file" accept="image/*"
                            className="absolute inset-0 z-50 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer
        "
                            onChange={({ target }) => {
                                if (target.files) {
                                    const file = target.files[0];
                                    file && setSelectedImage(URL.createObjectURL(file));
                                    setSelectedFile(file);
                                }
                            }
                            }
                        />
                        <div className="flex 
            flex-row
         items-center justify-center py-3 text-center
            border  rounded-md
            bg-transparent p-3 
            shadow-sm my-2
             border-gray-100 
        " >
                            <div
                                className="flex gap-4 "
                            >
                                <MdOutlineImage className="w-6 h-6 mx-auto text-gray-400" />
                                <p className="
            
                mx-auto text-gray-400
            ">
                                    Select an Image

                                </p>
                            </div>

                        </div>
                    </>
                }

                {/* bir delete butonu ekleyelım  */}
                {selectedImage && <button
                    className="absolute top-3 right-7
                text-white
             rounded-md
                bg-red-500 
            "
                    onClick={() => setSelectedImage("")}
                >
                    <RiCloseLine
                        className="w-6 h-6 mx-auto "
                    />
                </button>}

            </div>


            <div ref={ref} className="rounded-md   min-h-[400px] 
            " />


            <button className=' absolute bottom-5 right-28 bg-violet-500 text-white rounded-md px-5 py-3
                hover:bg-violet-600
                transition duration-300
                ease-in-out
                text-sm
                font-semibold
                disabled:bg-slate-300
                cursor-pointer
                z-30
            '
                disabled={!title}

                onClick={save}
            >
                Publish

            </button>


            <ChatBot />

        </div>

    )
}