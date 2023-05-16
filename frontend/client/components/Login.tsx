'use client'
import React from 'react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-[#11A37F] h-screen text-center">
    <Image
      className="p-20"
      src=""
      width={300}
      height={300}
      alt="logo"
    />

    <button
      onClick={() => signIn("google")}
      className="text-white font-bold text-3xl animate-pulse"
    >
      Sign In to Use EdBot
    </button>
  </div>
  )
}

export default Login