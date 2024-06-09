"use client"
import { Editor } from "@/components/editor"
// import { useSession } from "next-auth/react"

export default  function WritePost () {
  // const { data: session } = useSession()

  return (
    <div
      className=" font-sans mt-3 "
    >
      {/* WritePost - Protected Route */}
      {/* <pre>{JSON.stringify(session)}</pre> */}
      <Editor />
    </div>
  )
}
