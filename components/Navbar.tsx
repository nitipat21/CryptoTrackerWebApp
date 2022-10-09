import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Sidebar from "./Sidebar";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { cryptoSlice, selectUserState } from '../store/cryptoSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

const Navbar = () => {
    
    const [isShowSidebar, setIsShowSidebar] = useState<boolean>(false);

    const rounter = useRouter();

    const user = useSelector(selectUserState);

    const dispatch = useDispatch();

    const logout = () => {
        // clear user data in redux
        dispatch(cryptoSlice.actions.setUser(null));
        dispatch(cryptoSlice.actions.setUserDocId(null));
        dispatch(cryptoSlice.actions.setTrackList([]));
        // clear user data in local storage
        localStorage.clear();
        // sign out from firebase auth
        (async () => {
            await signOut(auth)
        })();
        // show alert component
        dispatch(cryptoSlice.actions.setAlertStatus("success"));
        dispatch(cryptoSlice.actions.setAlertMessage("Logout successful"));
        // redirect to home page
        rounter.push("/");
    }

    return (
        <nav className="bg-neutral-900">
            <div className="flex justify-between items-center p-4 md:p-6 lg:p-8 relative">
                <div className="flex gap-2">
                    <div className="flex gap-8 items-center">
                        <Link href={('/')}>
                            <button className={`${rounter.pathname === "/" && "text-purple-400"} font-bold text-lg hover:text-purple-400 hover:transition-all`}>CryptoTracker</button>
                        </Link>
                    </div>
                </div>
                <div>
                    <div className="hidden items-center justify-center gap-8 md:flex">
                        <div className={`${rounter.pathname === "/tracker" && "text-purple-400"} hover:text-purple-400 hover:transition-all`}>
                            <Link href={('/tracker')}>
                                <button>Tracker</button>
                            </Link>
                        </div>
                        {/* <div className={`${rounter.pathname === "/blog" && "text-purple-400"} hover:text-purple-400 hover:transition-all`}>
                            <Link href={('/tracker')}>
                                <button>Blog</button>
                            </Link>
                        </div> */}
                        { user ?
                        <>
                            <div className={`${rounter.pathname === "/login" && "text-purple-400"} hover:text-purple-400 hover:transition-all`}>
                                <Link href={('/profile')}>
                                    <button>Profile</button>
                                </Link>
                            </div>
                            <div className={`${rounter.pathname === "/newAccount" && "text-purple-400"} cursor-pointer border-2 border-solid border-purple-400 p-3 rounded-xl hover:scale-105 hover:text-purple-400 hover:transition-all`}>
                                <button onClick={logout}>Log out</button>
                            </div>
                        </>
                            :
                        <>
                            <div className={`${rounter.pathname === "/login" && "text-purple-400"} hover:text-purple-400 hover:transition-all`}>
                                <Link href={('/login')}>
                                    <button>Log in</button>
                                </Link>
                            </div>
                            <div className={`${rounter.pathname === "/newAccount" && "text-purple-400"} cursor-pointer border-2 border-solid border-purple-400 p-3 rounded-xl hover:scale-105 hover:text-purple-400 hover:transition-all`}>
                                <Link href={('/newAccount')}>
                                    <button>Create You Account</button>
                                </Link>
                            </div>
                        </>
                        }
                    </div>
                    <div className="md:hidden">
                        <button>
                            <FontAwesomeIcon icon={faBars} size={"2x"} onClick={()=>{setIsShowSidebar(!isShowSidebar)}}/>
                        </button>
                    </div>
                </div>
            </div>
            {isShowSidebar && <Sidebar/>}
        </nav>
    );
}

export default Navbar;