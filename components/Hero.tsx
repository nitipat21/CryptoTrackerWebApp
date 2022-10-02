import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeroCarousel from "./HeroCarousel";

const Hero = () => {

    return (
        <div>
            <header>Crypto Tracker</header>
            <p>Top 10 by market cap</p>
            <div>
                <div>
                    {/* <FontAwesomeIcon icon={} /> */}
                </div>
                <HeroCarousel/>
                <div>
                    
                </div>
            </div>
        </div>
    );
}

export default Hero;