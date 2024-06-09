import Navbar from "@/containers/navbar"


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
