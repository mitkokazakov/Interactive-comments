"use client"
import React from 'react'
import { signOut } from 'next-auth/react'
import { FiLogOut } from "react-icons/fi";

const LogOut = () => {
  return (
    <button onClick={() => signOut({redirect: true, callbackUrl: "/"})} className='flex justify-start items-center gap-3 py-5 border-t-[1px] border-t-slate-400 cursor-pointer'><FiLogOut /> <p>Log out</p></button>
  )
}

export default LogOut
