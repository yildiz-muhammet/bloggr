"use client"
import Link from 'next/link'
import ReactCountryFlag from 'react-country-flag'
import { usePathname } from 'next/navigation'

export default function LanguageSwitcher() {
    const pathname = usePathname()

    return (
        <div className="relative inline-block mt-[3px]">
            <button type="button" className="inline-flex w-full justify-center rounded-md   peer " >

                {true ? <ReactCountryFlag countryCode="TR"
                    svg
                    style={{
                        fontSize: '1.3em',
                        lineHeight: '1.3em',
                    }}
                /> : <ReactCountryFlag countryCode="US"
                    svg
                    style={{
                        fontSize: '1.3em',
                        lineHeight: '1.3em',
                    }}
                />

                }
            </button>


            <div className="absolute right-0 z-10 mt-1.2 rounded-md bg-white shadow-lg focus:outline-none
            visibility-hidden opacity-0      
            peer-focus:visible peer-focus:opacity-100 transition-all duration-100 ease-in-out
            w-[130px]"
            >
                <div  >
                    <Link
                        href={pathname}
                        locale='tr'
                    >
                        <div className=" block px-4 py-2 
                             hover:bg-gray-100 hover:dark:bg-accent " >
                            <ReactCountryFlag countryCode="TR"
                                svg
                                style={{
                                    fontSize: '1em',
                                    lineHeight: '1em',
                                }}
                            />
                            <p
                                className="inline-block   ml-[10px] text-gray-500 text-[12px] 
   "
                            >
                                Türkish
                            </p>
                        </div>

                    </Link>

                    <Link
                        href={pathname}
                        locale='en'
                    >
                        <div className=" block px-4 py-2  hover:bg-gray-100 hover:dark:bg-accent" >
                            <ReactCountryFlag countryCode="US"
                                svg
                                style={{
                                    fontSize: '1em',
                                    lineHeight: '1em',
                                }}
                            />
                            <p
                                className="inline-block  ml-[10px]
              text-gray-500 text-[12px] 
            "
                            >
                                English
                            </p>
                        </div>

                    </Link>


                </div>
            </div>
        </div>

    )
}
