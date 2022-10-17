import { faMessage } from '@fortawesome/free-regular-svg-icons'
import { faShare, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const PostCard = () => {
  return (
    <div className='
    bg-neutral-800 
    p-4 
    grid 
    gap-4 
    border 
    border-solid 
    border-transparent 
    max-w-[640px] 
    cursor-pointer 
    hover:border-purple-400 
    transition-all 
    sm:rounded-lg'
    >
        
        <div className='text-sm opacity-60'>
            <p>
                <span>Post by Name </span>
                <span>12 hours ago</span>
            </p>
        </div>

        <div className='font-bold text-xl lg:text-2xl'>
            <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, alias.</h1>
        </div>
        
        <div>
            <div className='text-sm text-purple-400'>#bitcoin</div>
        </div>

        <div className='flex gap-4 opacity-60 font-bold'>
            <div className='flex gap-1 items-center'>
                <FontAwesomeIcon icon={faThumbsUp}/>
                <span>2</span>
            </div>
            <div className='flex gap-1 items-center'>
                <span><FontAwesomeIcon icon={faMessage}/></span>
                <span>5</span>
                <span>Comments</span>
            </div>
            <div className='flex gap-1 items-center'>
                <span><FontAwesomeIcon icon={faShare}/></span>
                <span>Share</span>
            </div>
        </div>
    </div>
  )
}
