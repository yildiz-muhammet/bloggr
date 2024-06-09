import Navbar from "@/containers/navbar";
import MainLayout from "@/containers/main-layout";
import { AuthOptions, getServerSession } from "next-auth";
import { authOptions } from  "@/lib/authOptions"

export default async function Home() {

  const session = await getServerSession(authOptions as AuthOptions)

  console.log(session)

  

  return (
    < >
      <Navbar />
      <MainLayout />
    </>
  )
}