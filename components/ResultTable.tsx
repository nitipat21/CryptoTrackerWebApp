import { useSelector } from "react-redux";
import { selectCoinListState } from "../store/cryptoSlice";
import formatMoney from "../utils/fomatCurrency";

const ResultTable = () => {
    
    const coinsList = useSelector(selectCoinListState);

    const coinsElement = coinsList.map((coin:any, index:number) => {
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
                        <span>{formatMoney(coin.current_price)}</span>
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
                        {formatMoney(parseInt(Math.round(coin.market_cap / 1000000).toFixed(2))).replace(".00","M")}
                    </div>
                </td>
            </tr>
        );
    })

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