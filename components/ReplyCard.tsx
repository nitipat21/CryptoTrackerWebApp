import { faMessage, faShare, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React from 'react'

const ReplyCard = () => {
  return (
    
    <div className='flex gap-4 relative'>
        <div className='
        border-neutral-700 
        border-solid 
        border-b-2 
        border-l-2
        absolute 
        w-[calc(2rem_+_1px)] 
        -left-[calc(1rem_+_0.5px)] 
        -translate-x-1/2 
        -top-4 
        h-8 
        rounded-bl-xl'></div>
        <div className='w-[32px] relative'>
            <div className='bg-purple-400 w-8 h-8 rounded-full'>
                {/* <Image layout='fill' src={("/")}/> */}
            </div>
            {/* <div className='h-[calc(100%_-_2rem)] border-l-2 border-white/30 absolute left-1/2 -translate-x-1/2'></div> */}
        </div>
        <div className='grid gap-4'>
            {/* start header */}
            <div className='flex gap-4 items-center'>
                <div>
                    <h1>John Smith</h1>
                </div>
                <div>
                    <h1>16 minutes ago</h1>
                </div>
            </div>
            {/* end header */}
            
            {/* start comment */}
            <div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos cum recusandae explicabo cumque doloremque magni illo omnis impedit quas dolores.</p>
            </div>
            {/* end comment */}

            {/* start comment tools */}
            <div>
                <div className='flex gap-4 opacity-60 font-bold'>
                    <div className='flex gap-1 items-center'>
                        <FontAwesomeIcon icon={faThumbsUp}/>
                        <span>2</span>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <span><FontAwesomeIcon icon={faMessage}/></span>
                        <span>Reply</span>
                    </div>
                </div>
            </div>
            {/* end comment tools */}

            {/* start reply container */}
            <div>
                
            </div>
            {/* end reply container */}
        </div>
    </div>
  )
}

export default ReplyCard