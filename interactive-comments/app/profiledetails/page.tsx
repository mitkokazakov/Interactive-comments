"use client"
import React, { useState } from 'react'
import Image from 'next/image'

const page = () => {

    const [preview, setPreview] = useState<string | null>(null)

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>){

        const file = e.target.files?.[0]

        if(file){
            const imageUrl = URL.createObjectURL(file)
            setPreview(imageUrl)
        }

    }
  return (
    <div className='h-screen bg-white'>
      <div className='w-full h-full'>
        <div className='h-52 bg-violet-200 relative'>
            <div className='h-32 w-32 rounded-full absolute bottom-[-50%] left-50 translate-x-[-50%] translate-y-[-50%]'>
                <Image src={'/images/random.png'} height={130} width={130} alt='Profile' className='w-full h-full'></Image>
            </div>
        </div>

        <div className='w-full pt-14'>
            <p className='text-center font-bold text-2xl'>Mitko Kazakov</p>

            <p className='text-center font-semibold text-lg mt-5'>sample@gmail.com</p>

            <div className='w-full'>

                <form action="" className='w-full px-3 flex flex-col justify-center items-center gap-2'>
                    <label htmlFor="image" className=' w-full'>Change Profile Image</label>
                    <input type="file" id='image' name='image' placeholder='Browse' onChange={handleOnChange} className='bg-white placeholder:text-gray-400 block w-full py-1.5 px-3 border-1 border-black'/>
                    <div className='w-full'>
                        {/* <Image src={'/images/random.png'} height={100} width={100} alt='Profile' className='w-full h-full'></Image> */}
                        {preview && <img src={preview as string} alt="preview" className='w-full h-full'/>}
                    </div>
                    <button className='bg-amber-300 px-3 py-2 rounded-lg'>Change</button>
                </form>

            </div>
        </div>
      </div>
    </div>
  )
}

export default page
