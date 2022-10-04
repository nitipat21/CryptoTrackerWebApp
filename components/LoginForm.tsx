import { faCircleXmark, faEye, faEyeSlash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { FC, useRef, useState } from "react";

const LoginForm:FC = () => {

    const usernameRef = useRef<HTMLInputElement | null>(null);

    const passwordRef = useRef<HTMLInputElement | null>(null);

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState<Boolean>(false);

    const [isWarning, setIsWarning] = useState<Boolean>(false);

    const [focus, setFocus] = useState<String>("");

    const onClickUsername = () => {
        usernameRef.current?.focus();
    }

    const onClickPassword = () => {
        passwordRef.current?.focus();
    }

    const onSubmit = (event:React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();

        if (!username || !password) {
            setIsWarning(true);
        } else {
            // login
        }
        
    }

    return (
        <div className="">
            <div className="py-16">
                <form className="grid gap-6 max-w-[500px] px-8 py-8 m-auto">
                    <p><span>*</span> indicates required field</p>
                    <div onClick={onClickUsername}>
                        <div className="relative cursor-text">
                            <div className={
                                `absolute w-fit bg-neutral-800 top-1/2 left-0 translate-x-4 -translate-y-1/2 select-none transition-all p-1 
                                ${(focus === "username" || username) && "top-0 transition-all text-sm text-purple-400"} 
                                ${focus !== 'username' && "text-neutral-300"}
                                ${(isWarning && !username) && "text-red-400"}
                                `
                            }>* Username or email address</div>
                            <input
                                type="text" 
                                name="username" 
                                ref={usernameRef} 
                                id="username" 
                                onFocus={(event)=>{setFocus(event.target.id)}}
                                onBlur={()=>{setFocus("")}}
                                value={username}
                                onChange={(event)=>{setUsername(event.target.value)}}
                                className={`bg-neutral-800 w-full p-4 rounded-xl border-2 border-solid border-gray-500 outline-none focus:border-purple-400 focus:transition-all ${(isWarning && !username) && "border-2 border-solid border-red-400"}`}
                            />
                            <div className="flex gap-2 absolute top-1/2 right-4 -translate-y-1/2">
                                {(isWarning && !username) && <FontAwesomeIcon icon={faCircleXmark} className={"text-2xl text-red-400"}/>}
                            </div>
                        </div>
                        { (isWarning && !username) && 
                            <div className="flex px-4 gap-2 mt-1">
                                <FontAwesomeIcon icon={faXmark} className={"text-2xl text-red-400"}/>
                                <p>Enter an email/username.</p>
                            </div>
                        }
                    </div>
                    <div onClick={onClickPassword}>
                        <div className="relative cursor-text">
                            <div className={
                                `absolute w-fit bg-neutral-800 top-1/2 left-0 translate-x-4 -translate-y-1/2 select-none transition-all p-1
                                ${(focus === "password" || password) && "top-0 transition-all text-sm text-purple-400"} 
                                ${focus !== "password" && "text-neutral-300"}
                                ${(isWarning && !password) && "text-red-400"}
                                `
                            }>* Password</div>
                            <input 
                                type={`${showPassword ? "text" : "password"}`} 
                                name="password" 
                                ref={passwordRef} 
                                id="password" 
                                onFocus={(event)=>{setFocus(event.target.id)}}
                                onBlur={()=>{setFocus("")}}
                                value={password}
                                onChange={(event)=>{setPassword(event.target.value)}}
                                className={`bg-neutral-800 w-full p-4 rounded-xl border-2 border-solid border-gray-500 outline-none focus:border-purple-400 focus:transition-all ${(isWarning && !password) && "border-2 border-solid border-red-400"}`}
                            />
                            <div className="flex gap-2 absolute top-1/2 right-4 -translate-y-1/2">
                                { showPassword ? 
                                    <FontAwesomeIcon icon={faEye} className={"text-2xl cursor-pointer text-gray-300"} onClick={()=>{setShowPassword(false)}}/>
                                    :
                                    <FontAwesomeIcon icon={faEyeSlash} className={"text-2xl cursor-pointer text-gray-300"} onClick={()=>{setShowPassword(true)}}/>
                                }    
                                {(isWarning && !password) && <FontAwesomeIcon icon={faCircleXmark} className={"text-2xl text-red-400"}/>}
                            </div>
                        </div>
                        { (isWarning && !password) && 
                            <div className="flex px-4 gap-2 mt-1">
                                <FontAwesomeIcon icon={faXmark} className={"text-2xl text-red-400"}/>
                                <p>Enter a password.</p>
                            </div>
                        }
                    </div>
                    <div className="underline hover:text-purple-400 hover:transition-all">
                        <a href="">Forgot your password?</a>
                    </div>
                    <div className="cursor-pointer text-center py-4 rounded-xl border-2 border-solid hover:border-purple-400 hover:text-purple-400 hover:transition-all" onClick={onSubmit}>
                        <span>Log in</span>
                    </div>
                </form>
                <div className="text-center">
                    <p>Not a member? <span className="hover:text-purple-400 hover:transition-all"><Link href={('/newAccount')}>Sign up now</Link></span></p>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;