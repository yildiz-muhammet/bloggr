import CategoryList from "@/containers/category-list";
import Navbar from "@/containers/navbar";
import MainLayout from "@/containers/main-layout";
import { AuthOptions, getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {

  const session = await getServerSession(authOptions as AuthOptions)

  console.log(session)

  

  return (
    < >
      {/* <CategoryList /> */}
      <Navbar currentUser={session  } />
      <MainLayout />
    </>
  )
}