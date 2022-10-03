import HeroCarousel from "./HeroCarousel";

const Hero = () => {

    return (
        <div className="bg-neutral-900">
            <div className={`max-w-[1440px] m-auto p-4`}>
                <header className="header text-center text-[2rem] lg:text-[3rem] font-bold">CryptoTracker</header>
                <p className="text-center lg:text-[1.5rem] text-neutral-500">Trending Crypto Currency</p>
                <div>
                    <HeroCarousel/>
                </div>
            </div>
        </div>
    );
}

export default Hero;