import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cryptoSlice, selectSortState, selectSearchState } from "../store/cryptoSlice";
import ResultTable from "./ResultTable"

const Tracker = () => {

    const dispatch = useDispatch();

    const search = useSelector(selectSearchState);

    const filter = useSelector(selectSortState);

    const onSearch = (event:ChangeEvent<HTMLInputElement>) => {
        dispatch(cryptoSlice.actions.setSearch(event.target.value))
    }

    const onSort = (event:ChangeEvent<HTMLSelectElement>) => {
        dispatch(cryptoSlice.actions.setSort(event.target.value))
    }

    return (
        <div className="px-4 sm:px-16 lg:px-32 py-8 max-w-[1440px] m-auto mb-8">
            <div className="grid gap-8 rounded-lg">
                <div>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
                        <span className="text-[1.5rem] lg:text-[2rem]">Cryptocurrency By </span>
                        <span>
                            <div>
                                <select className="bg-neutral-800 p-2 rounded-lg text-lg lg:text-2xl" onChange={onSort} value={filter}>
                                    <option value="market_cap">Market Cap</option>
                                    <option value="market_cap_change_percentage_24h">24h Change</option>
                                    <option value="current_price">Price</option>
                                    <option value="mytracklist">My Tracklist</option>
                                </select>
                            </div>
                        </span>
                    </div>
                </div>
                <div>
                    <input 
                    type={"search"}
                    placeholder="Search for a Cryptocurrency" 
                    className="
                    w-full 
                    p-4 
                    bg-transparent
                    border
                    border-solid
                    border-neutral-300
                    rounded-lg"
                    onChange={onSearch}
                    value={search}
                    ></input>
                </div>
                <div className="overflow-x-auto">
                    <ResultTable/>
                </div>
            </div>
        </div>
    );
}

export default Tracker;