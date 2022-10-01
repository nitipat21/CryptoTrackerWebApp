import useWindowDimensions from "../hooks/useWindowDimensions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from "react";

const Navbar = () => {

    const { width } = useWindowDimensions();
    
    const [isShowSidebar, setIsShowSidebar] = useState<boolean>(false);

    return (
        <nav className="bg-neutral-900 sticky">
            <div className="flex justify-between  px-4 py-8">
                <div>
                    <h1>CryptoTracker</h1>
                </div>
                <div>
                    { width?.width! > 768 ? 
                    <div className="flex justify-center gap-8">
                        <button>Log in</button>
                        <button>Create You Account</button>
                    </div>
                    :
                    <div>
                        <FontAwesomeIcon icon={"bars"} size={"2x"} onClick={()=>{setIsShowSidebar(!isShowSidebar)}}/>
                    </div>}
                </div>
            </div>
            {isShowSidebar && <div className="">hello</div>}
        </nav>
    );
}

export default Navbar;