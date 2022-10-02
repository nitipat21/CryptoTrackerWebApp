import axios from "axios";
import { useEffect, useState } from "react";
import { TrendingCoins } from "../cryptoAPI/api";
import { selectCurrencyState } from "../store/cryptoSlice";
import { useSelector } from 'react-redux';

const HeroCarousel = () => {

    const currency = useSelector(selectCurrencyState);

    const [trending, setTrending] = useState([]);

    const itemElements = trending.map((coin:any, index:number) => {
        console.log(coin)

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
            h-full">
                <div className="p-4">
                    <img className="w-full h-full aspect-square" src={coin.image} alt={coin.name}/>
                </div>
                <div>
                    <span className="m-1">{coin.symbol.toUpperCase()}</span>
                    <span>{coin.market_cap_change_percentage_24h}</span>
                </div>
                <div>
                    <span>$</span>
                    <span>{coin.current_price.toFixed(2)}</span>
                </div>
            </div>
        );
    })

    const responsive = {
        0: {
          items: 2,
        },
        512: {
          items: 4,
        },
      };

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(TrendingCoins(currency));
            setTrending(data);
        })();

      }, []);

    return (
        <div className="overflow-hidden">
            <div className="relative overflow-x-scroll flex items-baseline snap-mandatory snap-x">
                {itemElements}
            </div>
        </div>
    );
}

export default HeroCarousel;