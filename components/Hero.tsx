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
                <div className="flex justify-center gap-8">
                    <div className="border p-4 ">
                        <Link href={('/tracker')}><h1 className="text-center">Track Now</h1></Link>
                    </div>
                    <div className="border p-4 ">
                        <Link href={('/tracker')}><h1 className="text-center">Join Our Blog</h1></Link>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default Hero;