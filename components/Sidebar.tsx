import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../config/firebase";
import { cryptoSlice, selectUserState } from "../store/cryptoSlice";

const Sidebar = () => {

    const rounter = useRouter();

    const dispatch = useDispatch();

    const user = useSelector(selectUserState);

    const logout = async () => {
        dispatch(cryptoSlice.actions.setUser(null));
        await signOut(auth);
    }

    return (
        <div className="md:hidden pb-4">
            <ul className="grid justify-center items-center text-center">
                <li className={`${rounter.pathname === "/tracker" && "text-purple-400"} text-lg hover:text-purple-400 hover:transition-all p-4`}><a href="/tracker">Tracker</a></li>
                {/* <li className={`${rounter.pathname === "/blog" && "text-purple-400"} hover:text-purple-400 hover:transition-all p-4`}><a href="/blog">Blog</a></li> */}
                {user ?
                    <>
                        <li className={`${rounter.pathname === "/profile" && "text-purple-400"} text-lg hover:text-purple-400 hover:transition-all p-4`}><a href="/profile">Profile</a></li>
                        <li className={`hover:text-purple-400 hover:transition-all p-4 text-lg`} onClick={logout}><a href="/">Log out</a></li>
                    </>
                    :
                    <>
                        <li className={`${rounter.pathname === "/login" && "text-purple-400"} text-lg hover:text-purple-400 hover:transition-all p-4`}><a href="/login">Log in</a></li>
                        <li className={`${rounter.pathname === "/newAccount" && "text-purple-400"} text-lg hover:text-purple-400 hover:transition-all p-4`}><a href="/newAccount">Create Your Account</a></li>
                    </>
                }
            </ul>
        </div>
    );
}

export default Sidebar;