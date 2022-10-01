import useWindowDimensions from "../hooks/useWindowDimensions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Sidebar from "./Sidebar";
import { useState } from "react";

const Navbar = () => {

    const { width } = useWindowDimensions();
    
    const [isShowSidebar, setIsShowSidebar] = useState<boolean>(false);

    return (
        <nav className="bg-neutral-900 sticky">
            <div className="flex justify-between items-center px-4 py-4">
                <div>
                    <h1>CurrencyTracker</h1>
                </div>
                <div>
                    { width?.width! > 768 ? 
                    <div className="flex justify-center gap-8">
                        <button>Log in</button>
                        <button>Create You Account</button>
                    </div>
                    :
                    <div>
                        <FontAwesomeIcon icon={faBars} size={"2x"} onClick={()=>{setIsShowSidebar(!isShowSidebar)}}/>
                    </div>}
                </div>
            </div>
            {isShowSidebar && <Sidebar/>}
        </nav>
    );
}

export default Navbar;