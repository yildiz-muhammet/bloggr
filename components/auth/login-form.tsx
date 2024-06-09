"use client"
import { TSignInSchema, signInSchema } from "@/lib/zod/types"
import { useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from 'next-auth/react'
import toast from "react-hot-toast";
import { useRouter,useSearchParams } from "next/navigation";

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        getValues,
        reset,
        setError
    } = useForm<TSignInSchema>({
        resolver: zodResolver(signInSchema)
    })
    const searchParams = useSearchParams();
    const router = useRouter()

    const onSubmit = async (data: TSignInSchema) => {
        console.log(data)


        const res = await signIn('credentials', {
            ...data,
            redirect: false,
        })
        console.log("res : ", res)

        if (res?.error) {
            setError("email", {
                type: "server",
                message: '',
            });
            setError("password", {
                type: "server",
                message: '',
            });
            toast.error(res.error)
        }
        else {
            const nextUrl = searchParams.get('next') 
            toast.success("Logged in successfully")
            router.refresh()
            router.push( nextUrl ? nextUrl : '/' )

       }



    }
    return (
        <form className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}

        >
            <div className="input-wrapper
      " >
                <label htmlFor="email"
                    className={`label ${errors.email ? 'text-red-400' : 'text-gray-900'}`}
                >
                    Email address
                </label>
                <input type='email' {...register("email")}
                    className={`input  sm:text-sm sm:leading-6
       ${errors.email ? 'ring-2 ring-red-400 ' : 'ring-1 ring-gray-300'}
     `}
                />
                {
                    errors.email && <div className='error-text'>
                        {`${errors.email.message}`}
                    </div>
                }
            </div>

            <div className="input-wrapper">

                <div className="flex items-center justify-between">
                    <label htmlFor="password"
                        className={`label ${errors.password ? 'text-red-400' : 'text-gray-900'}`}
                    >
                        Password
                    </label>
                    <div className="text-[13px] mb-2">
                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Forgot password?
                        </a>
                    </div>
                </div>


                <input type='password' {...register("password",
                )}
                    className={`input  sm:text-sm sm:leading-6
       ${errors.password ? 'ring-2 ring-red-400 ' : 'ring-1 ring-gray-300'} `}
                />
                {
                    errors.password && <p className='error-text'>
                        {`${errors.password.message}`}
                    </p>
                }
            </div>

            <div>
                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                    
                    disabled:bg-gray-300 disabled:cursor-not-allowed
                    "
                >
                    Login
                </button>
            </div>
        </form>
    )
}
