import { faCheck, faCircleXmark, faEye, faEyeSlash, faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FC, useEffect, useRef, useState } from "react";
import { auth, db, usersCollectionRef } from "../config/firebase";
import { addDoc, collection } from '@firebase/firestore';
import { useRouter } from "next/router";
import { updateProfile } from "firebase/auth";
import { getDocs } from '@firebase/firestore';
import { useDispatch } from "react-redux";
import { cryptoSlice } from "../store/cryptoSlice";

const Signup:FC = () => {

    const router = useRouter();

    const dispatch = useDispatch();

    const firstNameRef = useRef<HTMLInputElement | null>(null);

    const lastNameRef = useRef<HTMLInputElement | null>(null);

    const usernameRef = useRef<HTMLInputElement | null>(null);

    const passwordRef = useRef<HTMLInputElement | null>(null);

    const [firstName, setFirstName] = useState("");

    const [lastName, setLastName] = useState("");

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [isWarning, setIsWarning] = useState<boolean>(false);

    const [isStrongPassword, setIsStrongPassword] = useState<boolean>(false);

    const [isEmailFormat, setIsEmailFormat] = useState<boolean>(false);

    const [focus, setFocus] = useState<string>("");

    const [isFetching, setIsFetching] = useState<Boolean>(false);

    const onClickFirstName = () => {
        firstNameRef.current?.focus();
    }

    const onClickLastName = () => {
        lastNameRef.current?.focus();
    }

    const onClickUsername = () => {
        usernameRef.current?.focus();
    }

    const onClickPassword = () => {
        passwordRef.current?.focus();
    }

    const onSubmit = (event:React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();

        // check input
        if (!firstName || !lastName || !username || !isEmailFormat || !isStrongPassword) {
            setIsWarning(true);
            if (!firstName) {
                firstNameRef.current?.focus();
            } else if (!lastName) {
                lastNameRef.current?.focus();
            } else if (!username || !isEmailFormat) {
                usernameRef.current?.focus();
            } else if (!isStrongPassword) {
                passwordRef.current?.focus();
            }
        } else {
            // signup
            (async () => {
                 // start loading animation in button
                setIsFetching(true);
                try {
                    const res = await createUserWithEmailAndPassword(auth, username, password);

                    const user = res.user;
                    
                    // add user data to collection users
                    await addDoc(collection(db, "users"), {
                        uid: user.uid,
                        firstName: firstName,
                        lastName: lastName,
                        tracklist: []
                    })

                    // update display name
                    await updateProfile(auth.currentUser!, {
                        displayName: `${firstName} ${lastName}`, photoURL: ""
                    })
                    
                    // get user data from database
                    const data = await getDocs(usersCollectionRef)
                    // lookup user data by uid
                    data.docs.forEach((user) => {
                        if (user.data().uid === auth.currentUser?.uid) {
                            dispatch(cryptoSlice.actions.setTrackList([]));
                            dispatch(cryptoSlice.actions.setUserDocId(user.id));
                            localStorage.setItem("userDocId", JSON.stringify([]));
                            localStorage.setItem("userDocId", JSON.stringify(user.id));
                        }
                    });
                    // stop loading animation in button
                    setIsFetching(false);
                    // show alert component
                    dispatch(cryptoSlice.actions.setAlertStatus("success"));
                    dispatch(cryptoSlice.actions.setAlertMessage("Signup successful"));
                    router.push('/')

                } catch (error) {
                    // stop loading animation in button
                    setIsFetching(false);
                    // show alert component
                    dispatch(cryptoSlice.actions.setAlertStatus("fail"));
                    dispatch(cryptoSlice.actions.setAlertMessage(`${error}`));
                }
            })();
        }
    }

    // check email pattern
    useEffect(()=> {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(username)) {
            setIsEmailFormat(true);
        } else {
            setIsEmailFormat(false);
        }
    }, [username]);

    // check password strength
    useEffect(()=>{
            const citeria1 = password.length > 8;
            const citeria2 = /\d/.test(password);
            const citeria3 = /[A-Z]/.test(password);
            const citeria4 = /[a-z]/.test(password);
            const citeria5 = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(password);

            if (citeria1 && citeria2 && citeria3 && citeria4 && citeria5) {
                setIsStrongPassword(true);
            } else {
                setIsStrongPassword(false);
            }
    },[password]);

    return (
        <div className="">
            <div className="py-16">
                <form className="grid gap-6 max-w-[500px] px-8 py-8 m-auto">
                    <p><span>*</span> indicates required field</p>
                    <div>
                        <h3 className="font-bold -mb-4">Personal Information</h3>
                    </div>
                    <div className="firstName">
                        <div className="relative cursor-text" onClick={onClickFirstName}>
                            <div className={
                                `absolute w-fit bg-neutral-800 top-1/2 left-0 translate-x-4 -translate-y-1/2 select-none transition-all p-1 
                                ${(focus === "firstName" || firstName) && "top-0 transition-all text-sm text-purple-400"} 
                                ${focus !== 'firstName' && "text-neutral-300"}
                                ${(isWarning && !firstName) && "text-red-400"}
                                `
                            }>* First name</div>
                            <input
                                type="text" 
                                name="firstName" 
                                ref={firstNameRef} 
                                id="firstName" 
                                onFocus={(event)=>{setFocus(event.target.id)}}
                                onBlur={()=>{setFocus("")}}
                                value={firstName}
                                onChange={(event)=>{setFirstName(event.target.value)}}
                                className={`bg-neutral-800 w-full p-4 rounded-xl border-2 border-solid border-gray-500 outline-none focus:border-purple-400 focus:transition-all ${(isWarning && !firstName) && "border-2 border-solid border-red-400"}`}
                            />
                            <div className="flex gap-2 absolute top-1/2 right-4 -translate-y-1/2">
                                {(isWarning && !firstName) && <FontAwesomeIcon icon={faCircleXmark} className={"text-2xl text-red-400"}/>}
                            </div>
                        </div>
                        { (isWarning && !firstName) && 
                            <div className="flex px-4 gap-2 mt-1">
                                <FontAwesomeIcon icon={faXmark} className={"text-2xl text-red-400"}/>
                                <p>Enter your first name.</p>
                            </div>
                        }
                    </div>
                    <div className="lastName">
                        <div className="relative cursor-text" onClick={onClickLastName}>
                            <div className={
                                `absolute w-fit bg-neutral-800 top-1/2 left-0 translate-x-4 -translate-y-1/2 select-none transition-all p-1 
                                ${(focus === "lastName" || lastName) && "top-0 transition-all text-sm text-purple-400"} 
                                ${focus !== 'lastName' && "text-neutral-300"}
                                ${(isWarning && !lastName) && "text-red-400"}
                                `
                            }>* Last Name</div>
                            <input
                                type="text" 
                                name="lastName" 
                                ref={lastNameRef} 
                                id="lastName" 
                                onFocus={(event)=>{setFocus(event.target.id)}}
                                onBlur={()=>{setFocus("")}}
                                value={lastName}
                                onChange={(event)=>{setLastName(event.target.value)}}
                                className={`bg-neutral-800 w-full p-4 rounded-xl border-2 border-solid border-gray-500 outline-none focus:border-purple-400 focus:transition-all ${(isWarning && !lastName) && "border-2 border-solid border-red-400"}`}                            />
                            <div className="flex gap-2 absolute top-1/2 right-4 -translate-y-1/2">
                                {(isWarning && !lastName) && <FontAwesomeIcon icon={faCircleXmark} className={"text-2xl text-red-400"}/>}
                            </div>
                        </div>
                        { (isWarning && !lastName) && 
                            <div className="flex px-4 gap-2 mt-1">
                                <FontAwesomeIcon icon={faXmark} className={"text-2xl text-red-400"}/>
                                <p>Enter your last name.</p>
                            </div>
                        }
                    </div>
                    <div>
                        <h3 className="font-bold -mb-4">Account Security</h3>
                    </div>
                    <div className="username">
                        <div className="relative cursor-text" onClick={onClickUsername}>
                            <div className={
                                `absolute w-fit bg-neutral-800 top-1/2 left-0 translate-x-4 -translate-y-1/2 select-none transition-all p-1 
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
                                className={`bg-neutral-800 w-full p-4 rounded-xl border-2 border-solid border-gray-500 outline-none focus:border-purple-400 focus:transition-all ${(isWarning && !username) && "border-2 border-solid border-red-400"}`}
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
                        { (isWarning && !isEmailFormat) && 
                            <div className="flex px-4 gap-2 mt-1">
                                <FontAwesomeIcon icon={faXmark} className={"text-2xl text-red-400"}/>
                                <p>Invalid email format.</p>
                            </div>
                        }
                        <p className="text-sm mt-2 pb-2 ml-2">This will be your username</p>
                    </div>
                    <div className="password">
                        <div className="relative cursor-text" onClick={onClickPassword}>
                            <div className={
                                `absolute w-fit bg-neutral-800 top-1/2 left-0 translate-x-4 -translate-y-1/2 select-none transition-all p-1 
                                ${(focus === "password" || password) && "top-0 transition-all text-sm text-purple-400"} 
                                ${focus !== 'password' && "text-neutral-300"}
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
                                    <FontAwesomeIcon icon={faEye} className="text-2xl cursor-pointer text-gray-300" onClick={()=>{setShowPassword(false)}}/>
                                    :
                                    <FontAwesomeIcon icon={faEyeSlash} className="text-2xl cursor-pointer text-gray-300" onClick={()=>{setShowPassword(true)}}/>
                                }    
                                {(isWarning && !isStrongPassword) && <FontAwesomeIcon icon={faCircleXmark} className={"text-2xl text-red-400"}/>}
                            </div>
                        </div>
                        { isWarning && 
                            <>
                                <div className="flex px-4 gap-2 mt-1">
                                    {password.length > 8 ? 
                                        <FontAwesomeIcon icon={faCheck} style={{color: '#006241'}}/>
                                        :
                                        <FontAwesomeIcon icon={faXmark} className={"text-2xl text-red-400"}/>
                                    }
                                    <p>From 8 to 25 characters</p>
                                </div>
                                <div className="flex px-4 gap-2 mt-1">
                                    {/\d/.test(password) ?
                                        <FontAwesomeIcon icon={faCheck} style={{color: '#006241'}}/>
                                        :
                                        <FontAwesomeIcon icon={faXmark} className={"text-2xl text-red-400"}/>
                                    }
                                    <p>At least one number</p>
                                </div>
                                <div className="flex px-4 gap-2 mt-1">
                                    {/[A-Z]/.test(password) ?
                                        <FontAwesomeIcon icon={faCheck} style={{color: '#006241'}}/>
                                        :
                                        <FontAwesomeIcon icon={faXmark} className={"text-2xl text-red-400"}/>
                                    }
                                    <p>At least one capital letter</p>
                                </div>
                                <div className="flex px-4 gap-2 mt-1">
                                    {/[a-z]/.test(password) ?
                                        <FontAwesomeIcon icon={faCheck} style={{color: '#006241'}}/>
                                        :
                                        <FontAwesomeIcon icon={faXmark} className={"text-2xl text-red-400"}/>
                                    }
                                    <p>At least one lowercase letter</p>
                                </div>
                                <div className="flex px-4 gap-2 mt-1">
                                    {/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(password) ?
                                        <FontAwesomeIcon icon={faCheck} style={{color: '#006241'}}/>
                                        :
                                        <FontAwesomeIcon icon={faXmark} className={"text-2xl text-red-400"}/>
                                    }
                                    <p>At least one special character such as exclamation point or comma</p>
                                </div>
                            </>
                        }
                        <p className="text-sm mt-2 pb-2 ml-2">Create a password 8 to 25 characters long that includes at least 1 uppercase and 1 lowercase letter, 1 number and 1 special character like an exclamation point or asterisk.</p>
                    </div>
                    <div className="
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
                        hover:transition-all" 
                        onClick={onSubmit}
                    >
                        { isFetching ?
                        <FontAwesomeIcon icon={faSpinner} className={"btn-spinner text-transparent"}/>
                        :
                        <span>Create Account</span>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;