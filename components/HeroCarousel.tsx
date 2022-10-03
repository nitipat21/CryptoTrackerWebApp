import axios from "axios";
import { useEffect, useState } from "react";
import { TrendingCoins } from "../cryptoAPI/api";
import { selectCurrencyState } from "../store/cryptoSlice";
import { useSelector } from 'react-redux';

const HeroCarousel = () => {

    const currency = useSelector(selectCurrencyState);

    const [trending, setTrending] = useState([]);

    const itemElements = trending.map((coin:any, index:number) => {
        const trend24h = coin.market_cap_change_percentage_24h;

        return (
            <div key={index} className="
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
            h-full">
                <div className="font-bold opacity-60 text-lg">{index + 1}</div>
                <div className="p-4">
                    <img className="w-[120px] h-full aspect-square object-cover" src={coin.image} alt={coin.name}/>
                </div>
                <div>
                    <span className="mr-1 text-neutral-300">
                        {coin.symbol.toUpperCase()}
                    </span>
                    <span className={`${trend24h > 0 ? "text-green-600" : "text-red-600" }`}>
                        {trend24h > 0 && "+"}
                        {coin.market_cap_change_percentage_24h.toFixed(2)}
                        {"%"}
                    </span>
                </div>
                <div className="text-lg">
                    <span className="mr-1">{currency === "USD" ? "$" : "AU$"}</span>
                    <span >{coin.current_price.toFixed(2)}</span>
                </div>
            </div>
        );
    })

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(TrendingCoins(currency));
            setTrending(data);
        })();

      }, []);

    return (
        <div className="overflow-hidden">
            <div className="
            relative 
            overflow-x-auto
            overscroll-contain 
            flex 
            items-baseline 
            snap-mandatory 
            snap-x 
            py-8">
                {itemElements}
            </div>
        </div>
    );
}

export default HeroCarousel;