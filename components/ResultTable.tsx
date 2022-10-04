import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCoinListState } from "../store/cryptoSlice";
import formatMoney from "../utils/fomatCurrency";

const ResultTable = () => {
    
    const coinsList = useSelector(selectCoinListState);

    const [page, setPage] = useState<number>(1);

    const onRightArrow = () => {
        if (page < 10) {
            setPage(prev => prev + 1)
        }
    }
    
    const onLeftArrow = () => {
        if (page > 1) {
            setPage(prev => prev - 1)
        }
    }

    const coinsElement = coinsList.slice((page - 1) * 10, (page - 1) * 10 + 10).map((coin:any, index:number) => {
        const trend24h = coin.market_cap_change_percentage_24h;

        return (
            <tr key={index} className="border-b-[1px] border-neutral-400 bg-neutral-800 hover:bg-neutral-900 transition-colors cursor-pointer">
                <td className="flex gap-4 justify-start p-6">
                    <div className="w-[50px] h-[50px]">
                        <img src={coin.image} alt={coin.name}/>
                    </div>
                    <div>
                        <h1>{coin.symbol.toUpperCase()}</h1>
                        <p className="opacity-60">{coin.name}</p>
                    </div>
                </td>
                <td className="p-6 text-right">
                    <div>
                        <span>{formatMoney(coin.current_price)}</span>
                    </div>
                </td>
                <td className="p-6 text-right">
                    <div className={`${trend24h > 0 ? "text-green-400" : "text-red-400" }`}>
                        {trend24h > 0 && "+"}
                        {coin.market_cap_change_percentage_24h.toFixed(2)}
                        {"%"}
                    </div>
                </td>
                <td className="p-6">
                    <div className="text-right">
                        {formatMoney(parseInt(Math.round(coin.market_cap / 1000000).toFixed(2))).replace(".00","M")}
                    </div>
                </td>
            </tr>
        );
    })

    return (
        <div className="overflow-x-auto rounded-t-lg">
            <table className="w-full">
                <thead className="bg-violet-600">
                    <tr>
                        <th className="text-left p-6 w-1/4">Coin</th>
                        <th className="text-right p-6 w-1/4">Price</th>
                        <th className="text-right p-6 w-1/4">24h Change</th>
                        <th className="text-right p-6 w-1/4">Market Cap</th>
                    </tr>
                </thead>
                <tbody>
                    {coinsElement}
                </tbody>
            </table>
            <div className="flex justify-center gap-4 absolute left-1/2 -translate-x-1/2 text-xl">
                <div onClick={onLeftArrow}>{"<"}</div>
                <div>{page} - 10</div>
                <div onClick={onRightArrow}>{">"}</div>
            </div>
        </div>
    );
}

export default ResultTable;