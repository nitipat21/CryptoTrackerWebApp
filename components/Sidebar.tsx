import { useRouter } from "next/router";

const Sidebar = () => {

    const rounter = useRouter();

    return (
        <div className="md:hidden pb-4">
            <ul className="grid justify-center items-center text-center">
                <li className={`${rounter.pathname === "/tracker" && "text-purple-400"} hover:text-purple-400 hover:transition-all p-4`}><a href="/tracker">Tracker</a></li>
                <li className={`${rounter.pathname === "/blog" && "text-purple-400"} hover:text-purple-400 hover:transition-all p-4`}><a href="/blog">Blog</a></li>
                <li className={`${rounter.pathname === "/login" && "text-purple-400"} hover:text-purple-400 hover:transition-all p-4`}><a href="/login">Log in</a></li>
                <li className={`${rounter.pathname === "/newAccount" && "text-purple-400"} hover:text-purple-400 hover:transition-all p-4`}><a href="/newAccount">Create Your Account</a></li>
            </ul>
        </div>
    );
}

export default Sidebar;