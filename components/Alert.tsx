import { faCheck, faTimes, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

type Props = {
    title: string
    status: string
 }

const Alert = ({title, status}:Props) => {

    

    return (
        <div className={`
            fixed  
            p-2 
            w-full 
            z-50 
            ${status === "success" ? "bg-green-400" : "bg-red-400"}`}
        >
            <div className={`
            flex 
            justify-center 
            items-center 
            gap-2 relative 
            text-2xl 
            ${status === "success" ? "text-green-800" : "text-red-800"}`}
            >
                <span>
                    {status === "success" ? 
                        <FontAwesomeIcon icon={faCheck}/>
                        :
                        <FontAwesomeIcon icon={faCircleXmark}/>
                    }
                </span>
                <span>
                    <h1>{title}</h1>
                </span>
                <span className="absolute right-2 cursor-pointer text-xl text-neutral-100/80">
                    <FontAwesomeIcon icon={faTimes}/> 
                </span>
            </div>
        </div>
    )
}

export default Alert;