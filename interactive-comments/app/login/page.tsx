import LoginForm from '@/components/LoginForm'
import { SiAerlingus } from "react-icons/si";
import React from 'react'

const page = () => {
  return (
    <div className='h-screen bg-[#f3f5f8] flex justify-center items-center font-mono'>
      <div className='flex flex-col justify-center items-center bg-white border-[1px] border-slate-200 rounded-xl px-5 py-8'>
        <div className='flex justify-center items-center gap-4 mb-5'>
          <SiAerlingus className='text-4xl text-green-600'/>
          <p className='text-xl font-bold'>Green Life</p>
        </div>
          <h1 className='text-xl font-bold'>Welcome to Interactive comments</h1>
          <p className='mt-3 text-sm'>Please log in to continue</p>

          <LoginForm />
      </div>
    </div>
  )
}

export default page
