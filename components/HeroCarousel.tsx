import axios from "axios";
import { useEffect, useState } from "react";
import { TrendingCoins } from "../cryptoAPI/api";
import { selectCurrencyState } from "../store/cryptoSlice";
import { useSelector } from 'react-redux';

const HeroCarousel = () => {

    const currency = useSelector(selectCurrencyState);

    const [trending, setTrending] = useState([]);

    const itemElements = trending.map((coin:any) => {
        console.log(coin)

        return (
            <div className="bg-red-600 grid">
                <div>
                    <img src={coin.image} alt={coin.name}/>
                </div>
                <div>
                    <span>{coin.symbol.toUpperCase()}</span>
                    <span>{coin.market_cap_change_percentage_24h}</span>
                </div>
                <div>
                    <span>$</span>
                    <span>{coin.current_price.toFixed(2)}</span>
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
        <div className="2xl:container 2xl:mx-auto 2xl:px-0 py-3 px-10">
            <div className="flex relative overflow-hidden">
                {itemElements}
            </div>
        </div>
    );
}

export default HeroCarousel;