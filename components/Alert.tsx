import { faCheck, faTimes, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAlertStatusState, selectAlertMessageState, cryptoSlice } from '../store/cryptoSlice'

const Alert = () => {

    const dispatch = useDispatch();

    const alertStatus = useSelector(selectAlertStatusState);

    const alertMessage = useSelector(selectAlertMessageState);

    const closeAlert = () => {
        dispatch(cryptoSlice.actions.setAlertStatus(""));
    }

    return (
        <div className={`
            fixed  
            p-2 
            w-full 
            z-50 
            ${alertStatus === "success" ? "bg-green-400" : "bg-red-400"}`}
        >
            <div className={`
            flex 
            justify-center 
            items-center 
            gap-2 
            relative 
            ${alertStatus === "success" ? "text-green-800" : "text-red-800"}`}
            >
                <span>
                    {alertStatus === "success" ? 
                        <FontAwesomeIcon icon={faCheck}/>
                        :
                        <FontAwesomeIcon icon={faCircleXmark}/>
                    }
                </span>
                <span>
                    <h1>{alertMessage}</h1>
                </span>
                <span 
                    className="
                    absolute 
                    right-2 
                    cursor-pointer 
                    text-xl 
                    text-neutral-100/80"
                    onClick={closeAlert}
                >
                    <FontAwesomeIcon icon={faTimes}/> 
                </span>
            </div>
        </div>
    )
}

export default Alert;