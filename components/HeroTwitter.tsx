import axios from "axios";
import { useEffect, useState } from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";

const HeroTwitter = () => {

    const [tweetArray, setTweetArray] = useState<any>([]);

    const [nextToken, setNextToken] = useState<string>("");

    const tweetElements = tweetArray.map((id:string) => {
        return (
          <div key={id} className="flex-shrink-0 w-full">
            <TwitterTweetEmbed tweetId={id} options={{theme: 'dark' }}/>
          </div>
        );
    });
    
    const getTweetNextPage = async () => {
        const response = await axios.get(`/api/twitter?next_token=${nextToken}`);

        const newArray = new Array();

        response.data.result.data.map((data:any) => {
            newArray.push(data.id);
        })

        setTweetArray(newArray);

        setNextToken(response.data.result.meta.next_token);
    };

    useEffect(() => {
    (async() => {
        const response = await axios.get('/api/twitter');
        
        const newArray = new Array();

        response.data.result.data.map((data:any) => {
        newArray.push(data.id);
        })
        
        setTweetArray(newArray);

        setNextToken(response.data.result.meta.next_token);
    })()
    }, []);

    return (
        <div className="my-16 bg-neutral-900">

            <div className="py-8 grid gap-4">
                <h1 className="text-center font-bold text-[1.5rem] lg:text-[1.75rem]">Recent Crypto Twitter</h1>
                <ul className="grid grid-cols-2 text-center md:grid-cols-4 text-neutral-500 gap-4 lg:text-[1.25rem]">
                    <li className="text-purple-400">#crypto</li>
                    <li>#bitcoin</li>
                    <li>#cryptonews</li>
                    <li>#btc</li>
                    <li>#ethereum</li>
                    <li>#blockchain</li>
                    <li>#eth</li>
                    <li>#xrp</li>
                </ul>
            </div>
            
            <div className='flex flex-col items-center gap-2 overflow-auto max-h-[480px] py-8 px-4 bg-black'>
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
            </div>

        </div>
    );
}

export default HeroTwitter;