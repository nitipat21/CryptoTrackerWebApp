import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Sidebar from "./Sidebar";
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
    
    const [isShowSidebar, setIsShowSidebar] = useState<boolean>(false);

    return (
        <nav className="sticky bg-neutral-900">
            <div className="flex justify-between items-center p-4 md:p-6 lg:p-8 relative">
                <div className="flex gap-2">
                    <div className="flex gap-8 items-center">
                        <Link href={('/')} className="font-bold text-lg">
                            <button>CryptoTracker</button>
                        </Link>
                    </div>
                </div>
                <div>
                    <div className="hidden justify-center gap-8 md:flex">
                        <div>
                            <Link href={('/tracker')}>
                                <button>Tracker</button>
                            </Link>
                        </div>
                        <div>
                            <Link href={('/')}>
                                <button>Log in</button>
                            </Link>
                        </div>
                        <div>
                            <Link href={('/')}>
                                <button>Create You Account</button>
                            </Link>
                        </div>
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