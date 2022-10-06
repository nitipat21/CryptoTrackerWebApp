import axios from 'axios';
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { Line } from 'react-chartjs-2';
import { HistoricalChart, SingleCoin } from '../../cryptoAPI/api';
import {CategoryScale} from 'chart.js';
import Chart from 'chart.js/auto';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

Chart.register(CategoryScale);

const TrackerPage = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const historicalData= data.historicalData.prices;

    const days = data.days;
    
    const coinInfo = data.coinInfo;

    const router = useRouter();

    const daysQuery = router.query.days;

    return (
        <Layout title="CryptoTracker">
        <div className='grid gap-8 p-4 sm:p-8 md:p-16'>
            <div className='grid justify-center items-center gap-4'>
                <div className="text-center text-3xl font-bold">
                    <h1>{coinInfo.name} ({coinInfo.symbol.toUpperCase()})</h1>
                </div>
                <div className='text-center text-xl opacity-60'>
                    <h1>Coin Gecko Rank {coinInfo.coingecko_rank}</h1>
                </div>
                <div>
                    <img className="m-auto max-w-[160px] max-h-[160px]" src={coinInfo.image.large} alt={coinInfo.name}/>
                </div>
                <div className="max-w-[75ch] py-8">{(coinInfo.description.en.split(". ")[0])}</div>
            </div>
            <Line
            className="bg-neutral-800 p-4"
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
                onClick={()=>router.push((`/tracker/${coinInfo.id}?days=1`))}
                className={`${daysQuery === "1" && "bg-purple-600 border-purple-600"} 
                border border-solid border-purple-400 p-2 rounded-lg text-center hover:scale-105 hover:transition-all cursor-pointer`
                }>
                    <h1>24 Hours</h1>
                </div>
                <div 
                onClick={()=>router.push((`/tracker/${coinInfo.id}?days=30`))}
                className={`${daysQuery === "30" && "bg-purple-600 border-purple-600"} 
                border border-solid border-purple-400 p-2 rounded-lg text-center hover:scale-105 hover:transition-all cursor-pointer`
                }>
                    <h1>30 Days</h1>
                </div>
                <div 
                onClick={()=>router.push((`/tracker/${coinInfo.id}?days=90`))}
                className={`${daysQuery === "90" && "bg-purple-600 border-purple-600"} 
                border border-solid border-purple-400 p-2 rounded-lg text-center hover:scale-105 hover:transition-all cursor-pointer`
                }>
                    <h1>3 Months</h1>
                </div>
                <div 
                onClick={()=>router.push((`/tracker/${coinInfo.id}?days=365`))}
                className={`${daysQuery === "365" && "bg-purple-600 border-purple-600"} 
                border border-solid border-purple-400 p-2 rounded-lg text-center hover:scale-105 hover:transition-all cursor-pointer`
                }>
                    <h1>1 Years</h1>
                </div>
            </div>
        </div>
        </Layout>
    )
}

export const getServerSideProps = async (context:GetServerSidePropsContext) => {

    const days = Number(context.query.days);

    const historicalData = await axios.get(HistoricalChart(context.params?.coin, days, "AUD"));

    const coinInfo = await axios.get(SingleCoin(context.params?.coin));

    return { props: { data: {
        historicalData:historicalData.data,
        days:days,
        coinInfo:coinInfo.data,
    }}}
}

export default TrackerPage;