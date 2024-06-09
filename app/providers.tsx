"use client";

import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import AuthProviders from "@/providers/auth";
import ToasterContext from '@/context/toaster-context';
import ThemeProviders from '@/providers/theme';

type Props = {
    children: React.ReactNode;
};

export function Providers({ children }: Props) {

    const [isMounted, setIsMounted] = useState<boolean>(false)
   

    useEffect(() => {
        if (!isMounted)
            setIsMounted(true)
    }, [])
    if (!isMounted)
        return null

    if (typeof window === 'undefined')
        return null

    else
        return (
            <AuthProviders>
                    <ThemeProviders>
                        {/* <Toaster position="bottom-right"
                            toastOptions={{
                                style: {
                                    fontSize: '13.5px',
                                },
                                duration: 3000,
                            }}
                        /> */}
                         <ToasterContext />
                        {children}
                    </ThemeProviders>
            </AuthProviders>
        );
}