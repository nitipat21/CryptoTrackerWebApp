import { faCircleXmark, faEye, faEyeSlash, faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useEffect, useRef, useState } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, usersCollectionRef } from "../config/firebase";
import { getDocs } from '@firebase/firestore';
import { useDispatch } from "react-redux";
import { cryptoSlice } from "../store/cryptoSlice";

const LoginForm:FC = () => {

    const router = useRouter();

    const dispatch = useDispatch();

    const usernameRef = useRef<HTMLInputElement | null>(null);

    const passwordRef = useRef<HTMLInputElement | null>(null);

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState<Boolean>(false);

    const [isWarning, setIsWarning] = useState<Boolean>(false);

    const [focus, setFocus] = useState<String>("");

    const [isEmailFormat, setIsEmailFormat] = useState<boolean>(false);

    const [isFetching, setIsFetching] = useState<Boolean>(false);

    const onClickUsername = () => {
        usernameRef.current?.focus();
    }

    const onClickPassword = () => {
        passwordRef.current?.focus();
    }

    const onLogin = (event:React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        
        // check input
        if (!username || !password || !isEmailFormat) {
            // show warning
            setIsWarning(true);
            if (!username || !isEmailFormat) {
                usernameRef.current?.focus();
            } else if (!password) {
                passwordRef.current?.focus();
            }
        } else {
            (async () => {
                // start loading animation in button
                setIsFetching(true);
                
                try {
                    // sign in
                    await signInWithEmailAndPassword(auth, username, password);

                    // get trackList from database
                    const data = await getDocs(usersCollectionRef);
                               
                    data.docs.forEach((user) => {
                        if (user.data().uid === auth.currentUser?.uid) {
                            dispatch(cryptoSlice.actions.setTrackList(user.data().trackList));
                            dispatch(cryptoSlice.actions.setUserDocId(user.id));

                            if (user.data().trackList) {
                                localStorage.setItem("trackList", JSON.stringify(user.data().trackList));
                            } else {
                                localStorage.setItem("trackList", JSON.stringify([]));
                            }
                            localStorage.setItem("userDocId", JSON.stringify(user.id));
                        }
                    });
                    // stop loading animation in button
                    setIsFetching(false);
                    // show success alert
                    dispatch(cryptoSlice.actions.setAlertStatus("success"));
                    dispatch(cryptoSlice.actions.setAlertMessage("Login successful"));
                    // redirect to home page
                    router.push('/');

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

    const onDemoLogin = (event:React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();

        // clear all input
        setUsername("");
        setPassword("");
        setIsWarning(false);

        (async ()=> {
            try{
                // start loading animation in button
                setIsFetching(true);

                // firebase auth signin
                await signInWithEmailAndPassword(auth, "nitipat.temp@gmail.com", "123456@Ab");
        
                // get trackList from database
                const data = await getDocs(usersCollectionRef);
                                       
                data.docs.forEach((user) => {
                    if (user.data().uid === auth.currentUser?.uid) {
                        dispatch(cryptoSlice.actions.setTrackList(user.data().trackList));
                        dispatch(cryptoSlice.actions.setUserDocId(user.id));
        
                        if (user.data().trackList) {
                            localStorage.setItem("trackList", JSON.stringify(user.data().trackList));
                        } else {
                            localStorage.setItem("trackList", JSON.stringify([]));
                        }
                        localStorage.setItem("userDocId", JSON.stringify(user.id));
                    }
                });
                // stop loading animation in button
                setIsFetching(false)
                // show success alert
                dispatch(cryptoSlice.actions.setAlertStatus("success"));
                dispatch(cryptoSlice.actions.setAlertMessage("Login successful"));
                // redirect to home page
                router.push('/');
            }
            catch(error) {
                // stop loading animation in button
                setIsFetching(false)
                // show fail alert
                dispatch(cryptoSlice.actions.setAlertStatus("fail"));
                dispatch(cryptoSlice.actions.setAlertMessage(`${error}`));
            }
        })();
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
                    <h1 className="text-center text-[2rem] font-bold my-4">Login</h1>
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
                    <div onClick={onClickPassword}>
                        <div className="relative cursor-text">
                            <div className={
                                `absolute w-fit 
                                bg-neutral-800 
                                top-1/2 
                                left-0 
                                translate-x-4 
                                -translate-y-1/2 
                                select-none 
                                transition-all p-1
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
                                ${(isWarning && !password) && "border-2 border-solid border-red-400"}`}
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
                        <Link href={("/resetPassword")}>Forgot your password?</Link>
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
                        onClick={onLogin}
                    >
                        { isFetching && username && password ?
                        <FontAwesomeIcon icon={faSpinner} className={"btn-spinner text-transparent"}/>
                        :
                        <span>Log in</span>}
                    </div>
                    <div className={`
                        flex 
                        justify-center 
                        items-center
                        h-[60px]
                        cursor-pointer 
                        font-bold 
                        border-purple-400 
                        text-center 
                        py-4
                        rounded-xl 
                        border-2 
                        border-solid 
                        hover:border-purple-400 
                        hover:text-purple-400 
                        hover:transition-all `}
                        onClick={onDemoLogin}
                    >
                        { isFetching && !username && !password ?
                        <FontAwesomeIcon icon={faSpinner} className={"btn-spinner text-transparent"}/>
                        :
                        <span>Demo Log in</span>
                        }
                    </div>
                </form>
                <div className="text-center md:mt-8">
                    <p>Not a member? 
                        <span className="hover:text-purple-400 hover:transition-all">
                            <Link href={('/newAccount')}> Sign up now</Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;