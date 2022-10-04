import Link from "next/link";
import HeroCarousel from "./HeroCarousel";

const Hero = () => {

    return (
        <div className="">
            <div className={`max-w-[1440px] m-auto pt-8`}>
                <header className="header text-center text-[2rem] lg:text-[3rem] font-bold">CryptoTracker</header>
                <p className="text-center lg:text-[1.5rem] text-neutral-500">Trending Crypto Currency</p>
                <div>
                    <HeroCarousel/>
                </div>
                <div>
                    <Link href={('/tracker')}><h1>Tracker</h1></Link>
                </div>
            </div>
        </div>
    );
}

export default Hero;