import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Navbar from "@/containers/navbar"
import { AuthOptions, getServerSession } from "next-auth"


export default async function Layout({ children }: {
    children: React.ReactNode
}) {
  
  
    return (
        <div>
            <Navbar  />

            {children}
        </div>

    )
}
