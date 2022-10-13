import axios from 'axios';
import { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import Hero from '../components/Hero';
import { TrendingCoins } from '../cryptoAPI/api';
import { cryptoSlice } from '../store/cryptoSlice';

const Home = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const [tweetArray, setTweetArray] = useState<any>([]);

  const [nextToken, setNextToken] = useState<string>("");

  const dispatch = useDispatch();
  
  dispatch(cryptoSlice.actions.setTrendingList(data));

  const tweetElements = tweetArray.map((id:string) => {
    return (
      <div key={id} className="overflow-auto md:w-1/2 lg:w-1/3 flex-shrink-0">
        <TwitterTweetEmbed tweetId={id} options={{theme: 'dark' }}/>
      </div>
    );
  })

  const onClick = async () => {
    const response = await axios.get(`/api/twitter?next_token=${nextToken}`);
    setNextToken(response.data.result.meta.next_token);
    const newArray = new Array();
      response.data.result.data.map((data:any) => {
        newArray.push(data.id);
      })
    setTweetArray(newArray);
  }
  console.log(nextToken)
  useEffect(() => {
    (async() => {
      const response = await axios.get('/api/twitter');
      setNextToken(response.data.result.meta.next_token);
      const newArray = new Array();
      response.data.result.data.map((data:any) => {
        newArray.push(data.id);
      })
      setTweetArray(newArray);
      console.log(newArray)
    })()
  }, [])
  
  return (
    <>
      <Head>
        <title>CryptoTracker | Home</title>
      </Head>
      <main className="min-h-screen">
        <Hero/>
        <div className='flex gap-2 overflow-auto max-w-[1440px] max-h-[360px] my-8 mx-4'>
            {tweetElements}
        </div>
        <button onClick={onClick}>Click</button>
      </main>
    </>
  )
}

export const getServerSideProps = async () => {

  const { data } = await axios.get(TrendingCoins("AUD"));

  return { props: { data } }
}

export default Home;