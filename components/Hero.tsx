import HeroCarousel from "./HeroCarousel";

const Hero = () => {

    return (
        <div>
            <header>Crypto Tracker</header>
            <p>Top 10 by market cap</p>
            <div>
                <HeroCarousel/>
            </div>
        </div>
    );
}

export default Hero;