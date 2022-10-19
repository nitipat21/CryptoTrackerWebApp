import Image from 'next/image'
import React from 'react'

const CommentCard = () => {
  return (
    <div>
        {/* start header */}
        <div className='flex gap-4 items-center'>
            <div className='bg-purple-400 w-8 h-8 rounded-full'>
                {/* <Image layout='fill' src={("/")}/> */}
            </div>
            <div>
                <h1>John Smith</h1>
            </div>
            <div>
                <h1>16 minutes ago</h1>
            </div>
        </div>
        {/* end header */}
    </div>
  )
}

export default CommentCard