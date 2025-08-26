
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaRegUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { authOptions } from '@/lib/authoptions';
import { getServerSession } from 'next-auth';
import FindUserById from '@/actions/findUserById';

const page = async () => {

  const session = await getServerSession(authOptions)

  const userId = session?.user.id as string

  const currentUser = await FindUserById(userId)

  const userImagePath = currentUser?.image != null ? `/uploads/${currentUser.image}` : '/images/unknown.png'

  return (
    <div className='h-screen bg-white'>
      <div className='w-full h-full'>
        <div className='h-52 bg-violet-200 relative flex justify-center items-end '>
            <div className='h-32 w-32 rounded-full mb-[-30px]'>
                <Image src={userImagePath} height={130} width={130} alt='Profile' className='w-full h-full rounded-full'></Image>
            </div>
        </div>

        <div className='w-full pt-14'>
            {/* <p className='text-center font-bold text-2xl'>Mitko Kazakov</p> */}

            <p className='text-center font-semibold text-lg mt-5'>{currentUser?.email}</p>

            <div className='flex flex-col mt-5 px-5'>

                <Link href={'/profiledetails'} className='flex justify-start items-center gap-3 py-5 border-t-[1px] border-t-slate-400'><FaRegUser /> <p>Profile Details</p></Link>
                <Link href={'/'} className='flex justify-start items-center gap-3 py-5 border-t-[1px] border-t-slate-400'><FiLogOut /> <p>Log out</p></Link>

            </div>
        </div>
      </div>
    </div>
  )
}

export default page
