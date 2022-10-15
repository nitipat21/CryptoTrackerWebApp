import axios from "axios";
import { MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { cryptoSlice, selectTwitterListState, selectTwitterNextTokenState } from "../store/cryptoSlice";

const HeroTwitter = () => {

    const dispatch = useDispatch();

    const twitterList = useSelector(selectTwitterListState);

    const twitterNextToken = useSelector(selectTwitterNextTokenState);

    const [hashtag, setHashtag] = useState<string | undefined>("Cryptocurrency");

    const [isFetching, setIsFetching] = useState<Boolean>(false);

    const tweetElements = twitterList.map((tweet:any) => {
        return (
          <div key={tweet.id} className="flex-shrink-0 w-full">
            <TwitterTweetEmbed key={tweet.id} tweetId={tweet.id} options={{theme: 'dark'}}/>
          </div>
        );
    });
    
    const getTweetNextPage = async () => {
        setIsFetching(true);

        const response = await axios.get(`/api/twitter?&next_token=${twitterNextToken}&hashtag=${hashtag}`);

        dispatch(cryptoSlice.actions.setTwitterList(response.data.result.data));

        dispatch(cryptoSlice.actions.setTwitterNextToken(response.data.result.meta.next_token));

        setIsFetching(false);
    };

    const getTweetWithTag = (event:MouseEvent<HTMLLIElement>) => {
        const newHashtag = event.currentTarget.textContent?.slice(1);

        setHashtag(newHashtag);
        
        (async () => {
            setIsFetching(true);

            const response = await axios.get(`/api/twitter?hashtag=${newHashtag}`);

            dispatch(cryptoSlice.actions.setTwitterList(response.data.result.data));

            dispatch(cryptoSlice.actions.setTwitterNextToken(response.data.result.meta.next_token));

            setIsFetching(false);
        })();
    }

    return (
        <div className="my-16 mx-auto max-w-[1440px]">

            <div className="py-8 grid gap-4 bg-neutral-900 border-solid border border-transparent">
                <h1 className="text-center font-bold text-[1.5rem] lg:text-[1.75rem]">Recent {hashtag} Tweets</h1>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 text-neutral-500 gap-4 lg:text-[1.25rem]">
                    <li 
                    onClick={getTweetWithTag} 
                    className={`
                    cursor-pointer hover:scale-105 transition-all w-fit justify-self-center hover:text-neutral-400
                    ${hashtag === "BTC" ? "text-purple-400" : ""}
                    `}>
                        #BTC
                    </li>
                    <li 
                    onClick={getTweetWithTag} 
                    className={`
                    cursor-pointer hover:scale-105 transition-all w-fit justify-self-center hover:text-neutral-400
                    ${hashtag === "ETH" ? "text-purple-400" : ""}
                    `}>
                        #ETH
                    </li>
                    <li 
                    onClick={getTweetWithTag} 
                    className={`
                    cursor-pointer hover:scale-105 transition-all w-fit justify-self-center hover:text-neutral-400
                    ${hashtag === "XRP" ? "text-purple-400" : ""}
                    `}>
                        #XRP
                    </li>
                    <li 
                    onClick={getTweetWithTag} 
                    className={`
                    cursor-pointer hover:scale-105 transition-all w-fit justify-self-center hover:text-neutral-400
                    ${hashtag === "SOL" ? "text-purple-400" : ""}
                    `}>
                        #SOL
                    </li>
                    <li 
                    onClick={getTweetWithTag} 
                    className={`
                    cursor-pointer hover:scale-105 transition-all w-fit justify-self-center hover:text-neutral-400
                    ${hashtag === "BNB" ? "text-purple-400" : ""}
                    `}>
                        #BNB
                    </li>
                    <li 
                    onClick={getTweetWithTag} 
                    className={`
                    cursor-pointer hover:scale-105 transition-all w-fit justify-self-center hover:text-neutral-400
                    ${hashtag === "DOGE" ? "text-purple-400" : ""}
                    `}>
                        #DOGE
                    </li>
                    <li 
                    onClick={getTweetWithTag} 
                    className={`
                    cursor-pointer hover:scale-105 transition-all w-fit justify-self-center hover:text-neutral-400
                    ${hashtag === "ADA" ? "text-purple-400" : ""}
                    `}>
                        #ADA
                    </li>
                    <li 
                    onClick={getTweetWithTag} 
                    className={`
                    cursor-pointer hover:scale-105 transition-all w-fit justify-self-center hover:text-neutral-400
                    ${hashtag === "LINK" ? "text-purple-400" : ""}
                    `}>
                        #LINK
                    </li>
                    <li 
                    onClick={getTweetWithTag} 
                    className={`
                    cursor-pointer hover:scale-105 transition-all w-fit justify-self-center hover:text-neutral-400
                    ${hashtag === "DOT" ? "text-purple-400" : ""}
                    `}>
                        #DOT
                    </li>
                    <li 
                    onClick={getTweetWithTag} 
                    className={`
                    cursor-pointer hover:scale-105 transition-all w-fit justify-self-center hover:text-neutral-400
                    ${hashtag === "XLM" ? "text-purple-400" : ""}
                    `}>
                        #XLM
                    </li>
                    <li 
                    onClick={getTweetWithTag} 
                    className={`
                    cursor-pointer hover:scale-105 transition-all w-fit justify-self-center hover:text-neutral-400
                    ${hashtag === "Cryptocurrency" ? "text-purple-400" : ""}
                    `}>
                        #Cryptocurrency
                    </li>
                    <li 
                    onClick={getTweetWithTag} 
                    className={`
                    cursor-pointer hover:scale-105 transition-all w-fit justify-self-center hover:text-neutral-400
                    ${hashtag === "Cryptomeme" ? "text-purple-400" : ""}
                    `}>
                        #Cryptomeme
                    </li>
                </ul>
            </div>
            
            <div className='flex flex-col items-center gap-2 overflow-auto h-[600px] py-8 px-4 border-solid border border-purple-400'>
                { isFetching ?
                    <div className="relative w-full h-full">
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 my-0 mx-auto">
                            <div className="btn-spinner h-[60px] w-[60px]"></div>
                        </div>
                    </div>
                    :
                    <>
                        {tweetElements}
                        <div 
                        onClick={getTweetNextPage}
                        className="
                        border 
                        w-1/4 
                        min-w-[160px] 
                        p-4 
                        cursor-pointer 
                        hover:opacity-60 
                        hover:transition-all 
                        hover:scale-105">
                            <h1 className="text-center">More</h1>
                        </div>
                    </>
                }
            </div>

        </div>
    );
}

export default HeroTwitter;