import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faChartLine, faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { MouseEventHandler, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCoinListState, selectSortState, selectSearchState, selectUserTrackListState, cryptoSlice } from "../store/cryptoSlice";
import formatMoney from "../utils/fomatCurrency";

const ResultTable = () => {
    
    const coinsList = useSelector(selectCoinListState);

    const search = useSelector(selectSearchState);

    const sort = useSelector(selectSortState);

    const userTrackList = useSelector(selectUserTrackListState);

    const dispatch = useDispatch();

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

    const addCoin = (coin:any) => () => {
        dispatch(cryptoSlice.actions.addCoinToTrackList(coin));
        dispatch(cryptoSlice.actions.setAlertStatus("success"));
        dispatch(cryptoSlice.actions.setAlertMessage(`${coin} is added to your list`));
    }

    const deleteCoin = (coin:any) => () => {
        dispatch(cryptoSlice.actions.deleteCoinFromTrackList(coin));
        dispatch(cryptoSlice.actions.setAlertStatus("success"));
        dispatch(cryptoSlice.actions.setAlertMessage(`${coin} is deleted from your list`));
    } 

    const coinsSearched = coinsList.filter((coin:any)=>{
        return coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
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

    const coinOnTrackList = coinSorted.filter((coin:any) => {
        if (sort === "mytracklist") {
            return userTrackList.includes(coin.id)
        } else {
            return coin;
        }
    })

    const coinsElement = coinOnTrackList.slice((page - 1) * 10, (page - 1) * 10 + 10).map((coin:any) => {
        const trend24h = coin.market_cap_change_percentage_24h;
        return (
            <tr key={coin.id} className="border-b-[1px] border-neutral-400 bg-neutral-800 hover:bg-neutral-900 transition-colors">
                <td className="flex gap-4 justify-start p-6 items-center">
                    <div className="shrink-0">
                        <Image 
                        src={coin.image} 
                        alt={coin.name} 
                        width={50}
                        height={50}
                        />
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
                <td className="p-6 z-50">
                    <div className="flex gap-4">
                        <div className="cursor-pointer hover:scale-110 hover:transition-all">
                            <Link href={(`/tracker/${coin.id}?days=1`)} passHref>
                                <a target={"_blank"}>
                                    <FontAwesomeIcon icon={faChartLine} className={`text-2xl transition-all ${trend24h > 0 ? "text-green-400" : "text-red-400" }`}/>
                                </a>
                            </Link>
                        </div>
                        {userTrackList && userTrackList.includes(coin.id) ?
                        <div className="cursor-pointer hover:scale-110 hover:transition-all" onClick={deleteCoin(coin.id)}>
                            <FontAwesomeIcon icon={faSolidHeart} className="text-2xl text-purple-400"/>
                        </div>
                        :   
                        <div className="cursor-pointer hover:scale-110 hover:transition-all" onClick={addCoin(coin.id)}>
                            <FontAwesomeIcon icon={faHeart} className="text-2xl text-purple-400"/>
                        </div>
                        }
                    </div>
                </td>
            </tr>
        );
    })

    // change amount of page by amounth of items
    useEffect(() => {
        if (coinOnTrackList.length / 10 > 1) {
            setPageAmount(coinOnTrackList.length % 10 === 0 ? (coinOnTrackList.length / 10) : (Math.round(coinOnTrackList.length / 10) + 1) );
        } else {
            setPageAmount(1);
        }
    }, [coinOnTrackList.length])
    
    // back to page 1 when users are searching
    useEffect(()=>{
        setPage(1);
    },[search])

    // back to page 1 when users change sort type
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
                        <th className="text-right p-6"></th>
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