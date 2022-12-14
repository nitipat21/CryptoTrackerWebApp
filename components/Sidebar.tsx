import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../config/firebase";
import { cryptoSlice, selectUserState } from "../store/cryptoSlice";

const Sidebar = () => {

    const rounter = useRouter();

    const dispatch = useDispatch();

    const user = useSelector(selectUserState);

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
        <div className="md:hidden pb-4">
            <ul className="grid justify-center items-center text-center">
                <li className={`${rounter.pathname === "/tracker" && "text-purple-400"} text-lg hover:text-purple-400 hover:transition-all p-4`}><Link href="/tracker">Tracker</Link></li>
                <li className={`${rounter.pathname === "/blog" && "text-purple-400"} hover:text-purple-400 hover:transition-all p-4`}><Link href="/blog">Blog</Link></li>
                {user ?
                    <>
                        <li className={`${rounter.pathname === "/profile" && "text-purple-400"} text-lg hover:text-purple-400 hover:transition-all p-4`}><Link href="/profile">Profile</Link></li>
                        <li className={`hover:text-purple-400 hover:transition-all p-4 text-lg`} onClick={logout}><Link href="/">Log out</Link></li>
                    </>
                    :
                    <>
                        <li className={`${rounter.pathname === "/login" && "text-purple-400"} text-lg hover:text-purple-400 hover:transition-all p-4`}><Link href="/login">Log in</Link></li>
                        <li className={`${rounter.pathname === "/newAccount" && "text-purple-400"} text-lg hover:text-purple-400 hover:transition-all p-4`}><Link href="/newAccount">Create Your Account</Link></li>
                    </>
                }
            </ul>
        </div>
    );
}

export default Sidebar;