import "./globals.css";

import ThemeSwitcher from "../components/theme-switcher";
import Navbar from "@/containers/navbar";
import {
  Inter,
  Slackey,
  Darumadrop_One
} from 'next/font/google'
import ToasterContext from "@/context/toaster-context";
import ThemeProviders from "@/providers/theme";
import AuthProviders from "@/providers/auth";
import { Providers } from "./providers";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
const inter = Inter({ subsets: ['latin'] })

const london = Darumadrop_One({
  subsets: ['latin-ext'],
  variable: '--font-darumadrop-one',
  weight: '400'
})
// Darumadrop One
export default function RootLayout({ children }:
  { children: React.ReactNode }
) {
  return (
    <html lang="en">
      <body
        className={`${london.className} bg-gray-100/50 dark:bg-gray-900 text-black dark:text-white overflow-x-hidden  min-h-screen   w-full mx-auto  md:px-6 2xl:px-0  lg:w-11/12 2xl:w-9/12
             px-6 relative`
        }
      >
        <section >
          <Providers>

            {children}
          </Providers>

        </section>
      </body>
    </html>
  );
}
