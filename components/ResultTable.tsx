import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCoinListState, selectSortState, selectSearchState } from "../store/cryptoSlice";
import formatMoney from "../utils/fomatCurrency";

const ResultTable = () => {
    
    const coinsList = useSelector(selectCoinListState);

    const search = useSelector(selectSearchState);

    const sort = useSelector(selectSortState);

    const [page, setPage] = useState<number>(1);

    const [pageAmount, setPageAmount] = useState<number>(10);
 
    const onRightArrow = () => {
        if (page < pageAmount) {
            setPage(prev => prev + 1)
            window.scroll(0, 75);
        }
    }
    
    const onLeftArrow = () => {
        if (page > 1) {
            setPage(prev => prev - 1)
            window.scroll(0, 75);
        }
    }

    const coinsSearched = coinsList.filter((coin:any)=>{
            return coin.name.toLowerCase().includes(search) ||coin.symbol.toLowerCase().includes(search)
        })
        

    const coinSorted = coinsSearched.sort((a:any, b:any) => {
        if (sort === "market_cap") {
            return b.market_cap - a.market_cap;
        } else if (sort === "market_cap_change_percentage_24h") {
            return b.market_cap_change_percentage_24h - a.market_cap_change_percentage_24h;
        } else if (sort === "current_price") {
            return b.current_price - a.current_price;
        } else {
            return 0;
        }
    })

    const coinsElement = coinSorted.slice((page - 1) * 10, (page - 1) * 10 + 10).map((coin:any, index:number) => {
        const trend24h = coin.market_cap_change_percentage_24h;

        return (
            <tr key={index} className="border-b-[1px] border-neutral-400 bg-neutral-800 hover:bg-neutral-900 transition-colors cursor-pointer">
                <td className="flex gap-4 justify-start p-6 items-center">
                    <div className="w-[50px] h-[50px] shrink-0">
                        <img src={coin.image} alt={coin.name} />
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

    useEffect(() => {
        if (Math.round(coinsSearched.length / 10) > 1) {
            setPageAmount(Math.round(coinsSearched.length / 10));
        } else {
            setPageAmount(1);
        }
    }, [coinsSearched.length])
    
    useEffect(()=>{
        setPage(1);
    },[search])

    useEffect(()=> {
        setPage(1);
    },[sort])

    return (
        <div className="overflow-x-auto rounded-t-lg w-full">
            <table className="w-full">
                <thead className="bg-violet-600">
                    <tr>
                        <th className="text-left p-6">Coin</th>
                        <th className="text-right p-6">Price</th>
                        <th className="text-right p-6">24h Change</th>
                        <th className="text-right p-6">Market Cap</th>
                    </tr>
                </thead>
                <tbody>
                    {coinsElement}
                </tbody>
            </table>
            <div>
                <div className="flex items-center justify-center gap-4 absolute left-1/2 -translate-x-1/2 text-xl p-4">
                    <div onClick={onLeftArrow} className={`cursor-pointer ${page === 1 && "opacity-30 cursor-default"}`}>{<FontAwesomeIcon icon={faChevronLeft}/>}</div>
                    <div>{page} - {pageAmount}</div>
                    <div onClick={onRightArrow} className={`cursor-pointer ${page === pageAmount && "opacity-30 cursor-default"}`}>{<FontAwesomeIcon icon={faChevronRight}/>}</div>
                </div>
            </div>
        </div>
    );
}

export default ResultTable;