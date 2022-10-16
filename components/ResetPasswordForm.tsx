import { faCircleXmark, faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sendPasswordResetEmail } from "firebase/auth";
import React, { FC, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../config/firebase";
import { cryptoSlice } from "../store/cryptoSlice";

const ResetPasswordForm:FC = () => {

    const dispatch = useDispatch();

    const usernameRef = useRef<HTMLInputElement | null>(null);

    const [username, setUsername] = useState("");

    const [isWarning, setIsWarning] = useState<Boolean>(false);

    const [focus, setFocus] = useState<String>("");

    const [isEmailFormat, setIsEmailFormat] = useState<boolean>(false);

    const [isFetching, setIsFetching] = useState<Boolean>(false);

    const onClickUsername = () => {
        usernameRef.current?.focus();
    }

    const onReset = (event:React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();

        // check input
        if (!username || !isEmailFormat) {
            setIsWarning(true);
            usernameRef.current?.focus();
        } else {
            (async () => {
                // start loading animation in button
                setIsFetching(true)

                try {
                    // send password reset email
                    await sendPasswordResetEmail(auth, username);
                    // stop loading animation in button
                    setIsFetching(false);
                    // show success alert
                    dispatch(cryptoSlice.actions.setAlertStatus("success"));
                    dispatch(cryptoSlice.actions.setAlertMessage("Reset password email is sent successfully"));
                } catch (error) {
                    // stop loading animation in button
                    setIsFetching(false);
                    // show fail alert
                    dispatch(cryptoSlice.actions.setAlertStatus("fail"));
                    dispatch(cryptoSlice.actions.setAlertMessage(`${error}`));
                }
            })();
        }
    }

    useEffect(()=> {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(username)) {
            setIsEmailFormat(true);
        } else {
            setIsEmailFormat(false);
        }
    }, [username]);

    return (
        <div className="">
            <div className="py-16">
                <form className="
                grid 
                gap-6 
                max-w-[500px] 
                px-8 
                py-8 
                m-auto 
                border-2 
                border-transparent 
                border-solid 
                md:border-white 
                md:shadow-[0px_0px_5px_2px_rgb(192,132,252)] 
                md:py-16 
                md:px-12 
                rounded-lg"
                >
                    <h1 className="text-center text-[2rem] font-bold my-4">Reset Password</h1>
                    <p><span>*</span> indicates required field</p>
                    <div onClick={onClickUsername}>
                        <div className="relative cursor-text">
                            <div className={
                                `absolute 
                                w-fit 
                                bg-neutral-800 
                                top-1/2 
                                left-0 
                                translate-x-4 
                                -translate-y-1/2 
                                select-none 
                                transition-all 
                                p-1 
                                ${(focus === "username" || username) && "top-0 transition-all text-sm text-purple-400"} 
                                ${focus !== 'username' && "text-neutral-300"}
                                ${(isWarning && !username) && "text-red-400"}
                                `
                            }>* Email address</div>
                            <input
                                type="text" 
                                name="username" 
                                ref={usernameRef} 
                                id="username" 
                                onFocus={(event)=>{setFocus(event.target.id)}}
                                onBlur={()=>{setFocus("")}}
                                value={username}
                                onChange={(event)=>{setUsername(event.target.value)}}
                                className={`
                                bg-neutral-800 
                                w-full 
                                p-4 
                                rounded-xl 
                                border-2 
                                border-solid 
                                border-gray-500 
                                outline-none 
                                focus:border-purple-400 
                                focus:transition-all 
                                ${(isWarning && !username) && "border-2 border-solid border-red-400"}`}
                            />
                            <div className="flex gap-2 absolute top-1/2 right-4 -translate-y-1/2">
                                {(isWarning && !username) && <FontAwesomeIcon icon={faCircleXmark} className={"text-2xl text-red-400"}/>}
                            </div>
                        </div>
                        { (isWarning && !username) && 
                            <div className="flex px-4 gap-2 mt-1">
                                <FontAwesomeIcon icon={faXmark} className={"text-2xl text-red-400"}/>
                                <p>Enter an email.</p>
                            </div>
                        }
                        { (isWarning && !isEmailFormat && username) && 
                            <div className="flex px-4 gap-2 mt-1">
                                <FontAwesomeIcon icon={faXmark} className={"text-2xl text-red-400"}/>
                                <p>Invalid email format.</p>
                            </div>
                        }
                    </div>
                    <div className={`
                        flex 
                        justify-center 
                        items-center
                        h-[60px]
                        cursor-pointer 
                        text-center 
                        py-4 
                        rounded-xl 
                        border-2 
                        border-solid 
                        hover:border-purple-400 
                        hover:text-purple-400 
                        hover:transition-all`}
                        onClick={onReset}
                    >
                        { isFetching && username ?
                        <FontAwesomeIcon icon={faSpinner} className={"btn-spinner text-transparent"}/>
                        :
                        <span>Reset</span>}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ResetPasswordForm;