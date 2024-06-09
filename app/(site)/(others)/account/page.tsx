"use client"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
export default function AccountPage() {
    const router = useRouter()
    const { data: session } = useSession() as any

    const [uploading, setUploading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(
        ""
    );
    const [selectedFile, setSelectedFile] = useState<File>();
    const [userName, setUserName] = useState<string>('')
    const [userEmail, setUserEmail] = useState<string>('')
    const [info, setInfo] = useState<string>('')

    useEffect(() => {
        setUserName(session?.username)
        setUserEmail(session?.email)
        setInfo(session?.info)
        session?.image && setSelectedImage(`/images/${session?.image}`)
    }, [session])





    const handleUpload = async () => {
        setUploading(true);
        try {
            const formData = new FormData();
            selectedFile && formData.append("image", selectedFile);
            formData.append("username", userName);
            formData.append("email", userEmail);
            formData.append("activeUserEmail", session?.email);
            formData.append("info", info);

            const res = fetch("/api/account/update", {
                method: "POST",
                body: formData,
            });



            console.log(res);

            if (session?.email !== userEmail) {
                signOut()
                toast.success('Your profile has been updated successfully , please login again')
            }
            else {
                toast.success('Your profile  has been updated successfully')
                router.push('/')
                router.refresh()
            }

        } catch (error: any) {
            console.log(error);
        }
        setUploading(false);
    };
    return (
        <div className="max-w-4xl mx-auto mt-10 space-y-6 font-sans
            flex flex-row  justify-between 
             min-h-[380px] relative
        ">
            <div
                className="w-1/2 flex flex-col items-center 
              pt-10 relative
                "
            >
                <input
                    type="file"
                    // hidden
                    onChange={({ target }) => {
                        if (target.files) {
                            const file = target.files[0];
                            file && setSelectedImage(URL.createObjectURL(file));
                            setSelectedFile(file);
                        }
                    }}
                    // tam ortala absolute olarak 

                    className={`
                     absolute top-0    
                     w-44 aspect-video rounded  items-center justify-center border-2 border-dashed cursor-pointer
                     min-h-[230px] mt-10
                    left-1/2 transform -translate-x-1/2  opacity-0
                   `}

                />
                <div className="w-44 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer
                    min-h-[230px]
                "

                >
                    {selectedImage ? (
                        <img src={selectedImage} alt="" />
                    ) : (
                        <div
                            className="w-full h-full flex flex-col items-center justify-center text-center "
                        >
                            <svg
                                className="w-10 h-10 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                            </svg>
                            <span
                                className="text-gray-400 text-sm mt-3"
                            >
                                Select Image</span>
                        </div>
                    )}
                </div>
            </div>
            <div
                className="w-1/2"
            >

                <div className="input-wrapper mb-[12px]">

                    <label htmlFor="username"
                        className={`label  text-gray-500 
                        text-[11px]  font-semibold mb-1 `}
                    >
                        Username
                    </label>


                    <input type='text' id="username"
                        className={`input  sm:text-sm sm:leading-6 ring-1 ring-gray-200  `}
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />

                </div>
                <div className="input-wrapper mb-[12px]" >
                    <label htmlFor="email"
                        className={`label text-gray-500 
                        text-[11px]  font-semibold mb-1
                        `}
                    >
                        Email address
                    </label>
                    <input type='email' id='email'
                        className={`input  sm:text-sm sm:leading-6  ring-1 ring-gray-200 `}
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                    />
                </div>
                <div className="input-wrapper " >
                    <label htmlFor="bio"
                        className={`label  text-gray-500 
                        text-[11px]  font-semibold mb-1`}
                    >
                        Bio
                    </label>
                    <textarea name="bio" id="bio" cols={10} rows={2}
                        className={`input  sm:text-sm sm:leading-6 ring-1 ring-gray-200   resize-none `}
                        value={info}
                        onChange={(e) => setInfo(e.target.value)}
                    ></textarea>
                </div>
            </div>

            {/* <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
            <br />
            <input type="text" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} /> */}



            <button
                onClick={handleUpload}
                disabled={uploading}
                style={{ opacity: uploading ? ".5" : "1" }}
                className="
                
                absolute bottom-8 right-0
                bg-violet-500 p-3  text-center  text-white
                rounded-sm
                 py-2
                hover:bg-violet-600
                transition duration-300
                ease-in-out
                text-[12px]
                font-semibold
                disabled:bg-slate-300
                cursor-pointer
                z-50
                w-[150px]
                
                "
            >
                {uploading ? "  Account Updating..." : " Account Update"}
            </button>
            {/* 
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
                </button>} */}

        </div>
    )
}
