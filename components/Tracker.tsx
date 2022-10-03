const Tracker = () => {
    return (
        <div className="py-8 lg:py-16 px-4 sm:px-8 lg:px-16 max-w-[1440px] m-auto">
            <div className="grid gap-8 p-4 lg:bg-neutral-900 lg:p-8 rounded-lg">
                <div>
                    <div className="text-[1.5rem] lg:text-[2rem] text-center">Cryptocurrency By <span>Market Cap</span></div>
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
                <div>
                    {/* table */}
                </div>
            </div>
        </div>
    );
}

export default Tracker;