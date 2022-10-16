import axios from 'axios';
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { Line } from 'react-chartjs-2';
import { HistoricalChart, SingleCoin } from '../../cryptoAPI/api';
import {CategoryScale} from 'chart.js';
import Chart from 'chart.js/auto';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Client from 'twitter-api-sdk';
import { useState } from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';

Chart.register(CategoryScale);

const TrackerPage = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const parser = new DOMParser();

    const router = useRouter();

    const [isFetching, setIsFetching] = useState<Boolean>(false);

    const [twitterList, setTwitterList] = useState<any[] | undefined>(data.twitterData.data);

    const [twitterNextToken, setTwitterNextToken] = useState<string | undefined>(data.twitterData.meta?.next_token);

    const historicalData= data.historicalData.prices;

    const days = data.days;
    
    const coinData = data.coinData;

    const daysQuery = router.query.days;

    const coinDescription = parser.parseFromString(
        `${coinData.description.en.split(". ")[0] + "."} ${coinData.description.en.split(". ")[1] ? coinData.description.en.split(". ")[1] + "." : ""}`
        ,'text/html'
    );

    const tweetElements = twitterList?.map((tweet:any) => {
        return (
          <div key={tweet.id} className="flex-shrink-0 w-full">
            <TwitterTweetEmbed key={tweet.id} tweetId={tweet.id} options={{theme: 'dark'}}/>
          </div>
        );
    });
    
    const getTweetNextPage = async () => {
        setIsFetching(true);

        const response = await axios.get(`/api/twitter?&next_token=${twitterNextToken}&hashtag=${coinData.symbol.toUpperCase()}`);

        setTwitterList(response.data.result.data);

        setTwitterNextToken(response.data.result.meta.next_token);

        setIsFetching(false);
    };
    
    return (
        <>
            <Head>
                <title>CryptoTracker | {`${coinData.symbol.toUpperCase()}`}</title>
            </Head>
            <main className='grid gap-8 px-4 py-16 sm:px-8 md:px-16'>
                <div className='grid justify-items-center items-center gap-4'>
                    <div className="text-3xl font-bold">
                        <h1>{coinData.name} ({coinData.symbol.toUpperCase()})</h1>
                    </div>
                    <div className='text-xl opacity-60'>
                        <h1>Coin Gecko Rank {coinData.coingecko_rank}</h1>
                    </div>
                    <div className='bg-neutral-800 p-4 rounded-lg'>
                        <Image 
                        src={coinData.image.large} 
                        alt={coinData.name}
                        width={160}
                        height={160}
                        />
                    </div>
                    <div className="max-w-[75ch] py-8">{coinDescription.body.textContent}</div>
                </div>
                <Line
                    className="bg-neutral-800 p-4 rounded-lg"
                    data={{
                        labels: historicalData.map((coin:any) => {
                        let date = new Date(coin[0]);
                        let time =
                        date.getHours() > 12
                            ? `${date.getHours() - 12}:${date.getMinutes() > 10 ? `${date.getMinutes()}` : `0${date.getMinutes()}`} PM`
                            : `${date.getHours()}:${date.getMinutes() > 10 ? `${date.getMinutes()}` : `0${date.getMinutes()}`} AM`;
                            return days === 1 ? time : date.toLocaleDateString();
                        }),
                        datasets: [
                        {
                            data: historicalData.map((coin:any) => coin[1]),
                            label: `Price ( Past ${days} Days ) in ${"A$"}`,
                            borderColor: "#c084fc",
                        },
                        ],
                    }}
                    options={{
                        elements: {
                        point: {
                            radius: 1,
                        },
                        },
                    }}
                />
                <div className='grid grid-cols-2 sm:grid-cols-4 justify-center items-center gap-2'>
                    <div 
                    onClick={()=>router.push((`/tracker/${coinData.id}?days=1`))}
                    className={`${daysQuery === "1" && "bg-purple-600 border-purple-600"} 
                    border border-solid border-purple-400 p-2 rounded-lg text-center hover:scale-105 hover:transition-all cursor-pointer`
                    }>
                        <h1>24 Hours</h1>
                    </div>
                    <div 
                    onClick={()=>router.push((`/tracker/${coinData.id}?days=30`))}
                    className={`${daysQuery === "30" && "bg-purple-600 border-purple-600"} 
                    border border-solid border-purple-400 p-2 rounded-lg text-center hover:scale-105 hover:transition-all cursor-pointer`
                    }>
                        <h1>30 Days</h1>
                    </div>
                    <div 
                    onClick={()=>router.push((`/tracker/${coinData.id}?days=90`))}
                    className={`${daysQuery === "90" && "bg-purple-600 border-purple-600"} 
                    border border-solid border-purple-400 p-2 rounded-lg text-center hover:scale-105 hover:transition-all cursor-pointer`
                    }>
                        <h1>3 Months</h1>
                    </div>
                    <div 
                    onClick={()=>router.push((`/tracker/${coinData.id}?days=365`))}
                    className={`${daysQuery === "365" && "bg-purple-600 border-purple-600"} 
                    border border-solid border-purple-400 p-2 rounded-lg text-center hover:scale-105 hover:transition-all cursor-pointer`
                    }>
                        <h1>1 Years</h1>
                    </div>
                </div>
                <div className='mt-8'>
                    <h1 className="text-center font-bold text-[1.5rem] lg:text-[1.75rem]">Recent {coinData.name} ({coinData.symbol.toUpperCase()}) Tweets</h1>
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
            </main>
        </>
    )
}

export const getServerSideProps = async (context:GetServerSidePropsContext) => {

    const client = new Client(process.env.TWITTER_BEARER_TOKEN as string);

    const next_token = context.query.next_token;

    const coin = context.query.symbol;

    const days = Number(context.query.days);

    const historicalData = await axios.get(HistoricalChart(context.query.coin, days, "AUD"));

    const coinData = await axios.get(SingleCoin(context.query.coin));

    const twitterData =  await client.tweets.tweetsRecentSearch({
        "query": `(cryptocurrency OR cryptonews OR crypto OR blockchain) -onlyfan lang:en ${coin}`,
        "max_results": 10,
        "sort_order": "recency",
        "next_token": `${next_token ? next_token : ""}`
    });

    return { props: { data: {
        historicalData:historicalData.data,
        days:days,
        coinData:coinData.data,
        twitterData:twitterData
    }}}
}

export default TrackerPage;