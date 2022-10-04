import ResultTable from "./ResultTable"

const Tracker = () => {
    return (
        <div className="px-4 sm:px-16 lg:px-32 py-8 max-w-[1440px] m-auto">
            <div className="grid gap-8 rounded-lg">
                <div>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
                        <span className="text-[1.5rem] lg:text-[2rem]">Cryptocurrency By </span>
                        <span>
                            <div>
                                <select className="bg-neutral-600 p-2 rounded-lg text-lg lg:text-2xl">
                                    <option value="marketCap">Market Cap</option>
                                    <option value="24hChange">24h Change</option>
                                    <option value="price">Price</option>
                                    <option value="favorite">Favorite</option>
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