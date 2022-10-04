import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CoinList } from "../cryptoAPI/api";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { selectCurrencyState } from "../store/cryptoSlice";
import formatMoney from "../utils/fomatCurrency";

const ResultTable = () => {

    const currency = useSelector(selectCurrencyState);

    const [coins, setCoins] = useState([]);

    const coinsElement = coins.map((coin:any, index:number) => {
        const trend24h = coin.market_cap_change_percentage_24h;

        return (
            <tr key={index}>
                <td className="flex gap-4">
                    <div className="w-[50px] h-[50px]">
                        <img src={coin.image} alt={coin.name}/>
                    </div>
                    <div>
                        <h1>{coin.symbol.toUpperCase()}</h1>
                        <p className="opacity-60">{coin.name}</p>
                    </div>
                </td>
                <td>
                    <div>
                        <span>{formatMoney(coin.current_price, currency)}</span>
                    </div>
                </td>
                <td>
                    <div className={`${trend24h > 0 ? "text-green-600" : "text-red-600" }`}>
                        {trend24h > 0 && "+"}
                        {coin.market_cap_change_percentage_24h.toFixed(2)}
                        {"%"}
                    </div>
                </td>
                <td>
                    <div className="text-end">
                        {formatMoney(parseInt(Math.round(coin.market_cap / 1000000).toFixed(2)),currency).replace(".00","M")}
                    </div>
                </td>
            </tr>
        );
    })

    useEffect(()=>{
        (async function fetchData () {
            const { data } = await axios.get(CoinList(currency));
            setCoins(data);
            console.log(data)
        })();
    },[currency])

    return (
        <div>
            <table>
                <thead>
                    <tr className="text-left">
                        <th>Coin</th>
                        <th>Price</th>
                        <th>24h Change</th>
                        <th>Market Cap</th>
                    </tr>
                </thead>
                <tbody>
                    {coinsElement}
                </tbody>
            </table>
        </div>
    );
}

export default ResultTable;