import { faMessage } from '@fortawesome/free-regular-svg-icons'
import { faBold, faEllipsis, faItalic, faShare, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import CommentCard from './CommentCard'

const FullPost = () => {
  return (
    <div className='grid justify-center gap-4'>
        {/* start post section */}
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
                        <span>1</span>
                        <span>Share</span>
                    </div>
                </div>

        </div>
        {/* end post section */}

        {/* start comment section */}
        <div className='
        bg-neutral-800 
        p-4 
        grid 
        gap-4 
        max-w-[640px]
        border 
        border-solid 
        border-transparent 
        sm:rounded-lg'
        >
            {/* start comment tools */}
            <div>
                <div>
                    <textarea 
                    className='w-full min-h-[160px] align-top p-4 bg-transparent border border-b-0 border-solid border-neutral-600 rounded-t-lg'
                    name="comment" 
                    id="comment" 
                    maxLength={1000}></textarea>
                </div>
                <div className='flex items-center gap-4 justify-between py-2 px-4 bg-neutral-900 border border-t-0 border-solid border-transparent rounded-b-xl'>
                    <div>
                        {/* <div><FontAwesomeIcon icon={faBold}/></div> */}
                        {/* <div><FontAwesomeIcon icon={faItalic}/></div> */}
                        <div><FontAwesomeIcon icon={faEllipsis}/></div>
                    </div>
                    <div>
                        <div>
                            <button className='px-4 py-1 bg-neutral-600 rounded-xl'>Comment</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* end comment tools */}
            
            {/* start sort */}
            <div className='border-solid border-b border-b-neutral-600'>
                <div className='pb-1'>
                    <label htmlFor='sortComments'>Sort By:</label>
                    <select name="sortComments" id="sortComments" className='bg-transparent'>
                        <option>Best</option>
                        <option>Recent</option>
                    </select>
                </div>
            </div>
            {/* end sort */}

            {/* start comments container */}
            <div className='grid gap-4'>
                <CommentCard/>
                <CommentCard/>
            </div>
            {/* end comments container */}
        </div>
        {/* end comments section */}
    </div>
  )
}

export default FullPost