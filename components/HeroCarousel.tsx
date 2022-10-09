import formatMoney from "../utils/fomatCurrency";
import { useSelector } from "react-redux";
import { selectTrendingListState } from "../store/cryptoSlice";
import { useEffect, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const HeroCarousel = () => {

    const trendingList = useSelector(selectTrendingListState);

    const [slide, setSlide] = useState(0);

    const [showItems, setShowItems] = useState(3);

    const { width } = useWindowDimensions();

    const onLeftArrow = () => {
        if (slide > 0) {
            setSlide(prev=> prev - 1)
        }
    }

    const onRightArrow = () => {
        if (slide < 10 - showItems) {
            setSlide(prev=> prev + 1)
        }
    }

    useEffect(()=>{

        if (width?.width! > 640 && width?.width! < 768) {    
          setShowItems(3);
        } else if (width?.width! > 767 && width?.width! < 1024) {
            setShowItems(4);
        } else if (width?.width! > 1024) {
            setShowItems(5);
        } else {
            setShowItems(2);
        }
        setSlide(0);
    },[width?.width])

    const itemElements = trendingList.map((coin:any, index:number) => {
        const trend24h = coin.market_cap_change_percentage_24h;
        return (
            <div 
            key={index}
            style={{transform: `translate(-${slide}00%, 0px)`, transition:"all 0.3s"}} 
            className={`
            flex 
            flex-col 
            flex-shrink-0 
            items-center 
            justify-items-center
            snap-start
            w-1/2 
            sm:w-1/3
            md:w-1/4
            lg:w-1/5
            h-full
            py-8
            bg-neutral-900`}
            >
                <div className="font-bold opacity-60 text-lg">{index + 1}</div>
                <div className="p-4">
                    <Image 
                    height={120}
                    width={120}
                    className="object-cover" 
                    src={coin.image} 
                    alt={coin.name}/>
                </div>
                <div>
                    <span className="mr-1 text-neutral-300">
                        {coin.symbol.toUpperCase()}
                    </span>
                    <span className={`${trend24h > 0 ? "text-green-400" : "text-red-400" }`}>
                        {trend24h > 0 && "+"}
                        {coin.market_cap_change_percentage_24h.toFixed(2)}
                        {"%"}
                    </span>
                </div>
                <div className="text-lg">
                    <span >{formatMoney(coin.current_price)}</span>
                </div>
            </div>
        );
    })

    return (
        <div className="overflow-hidden relative">
            <div className="
            relative 
            overflow-x-hidden 
            flex 
            items-baseline 
            snap-mandatory 
            snap-x 
            py-8"
            >
                {itemElements}
            </div>
            <div className={`flex absolute top-1/2 left-0 h-[82.5%] bg-neutral-800/30 -translate-y-[50%] px-2 ${slide === 0 && "opacity-20"}`}>
                <button onClick={onLeftArrow}><FontAwesomeIcon icon={faAngleLeft} className="text-xl"/></button>
            </div>
            <div className={`flex absolute top-1/2 right-0 h-[82.5%] bg-neutral-800/30 -translate-y-[50%] px-2 ${slide == 10 - showItems && "opacity-20"}`}>
                <button onClick={onRightArrow}><FontAwesomeIcon icon={faAngleRight} className="text-xl"/></button>
            </div>
        </div>
    );
}

export default HeroCarousel;