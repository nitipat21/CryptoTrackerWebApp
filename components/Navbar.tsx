import useWindowDimensions from "../hooks/useWindowDimensions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Sidebar from "./Sidebar";
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {

    const { width } = useWindowDimensions();
    
    const [isShowSidebar, setIsShowSidebar] = useState<boolean>(false);

    return (
        <nav className="bg-neutral-900 sticky">
            <div className="flex justify-between items-center px-4 py-4">
                <div className="flex gap-8 items-center">
                    <h1 className="font-bold text-lg">CryptoTracker</h1>
                </div>
                <div>
                    { width?.width! > 768 ? 
                    <div className="flex justify-center gap-8">
                        <div>
                            <button>Log in</button>
                        </div>
                        <div>
                            <button>Create You Account</button>
                        </div>
                    </div>
                    :
                    <div>
                        <button>
                            <FontAwesomeIcon icon={faBars} size={"2x"} onClick={()=>{setIsShowSidebar(!isShowSidebar)}}/>
                        </button>
                    </div>}
                </div>
            </div>
            {(isShowSidebar && width?.width! < 768) && <Sidebar/>}
        </nav>
    );
}

export default Navbar;