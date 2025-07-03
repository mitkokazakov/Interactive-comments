import React from 'react'
import Comment from './Comment'

const CommentWrapper = () => {
  return (
    <div className='w-full flex flex-col justify-center items-end gap-4'>
      <Comment/>

      <div className='w-[90%] flex flex-col justify-center items-center gap-4 border-l-[1px] border-l-slate-400 pl-5'>
        <Comment/>
        <Comment/>
        <Comment/>

      </div>
    </div>
  )
}

export default CommentWrapper
