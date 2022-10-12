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

  const dispatch = useDispatch();
  
  dispatch(cryptoSlice.actions.setTrendingList(data));

  const tweetElements = tweetArray.map((id:string) => {
    return (
      <div key={id}>
        <TwitterTweetEmbed tweetId={id}/>
      </div>
    );
  })

  useEffect(() => {
    (async() => {
      const result = await axios.get('/api/twitter');
      const newArray = new Array();
      result.data.result.map((data:any) => {
        newArray.push(data.id);
      })
      setTweetArray(newArray);
    })()
  }, [])
  console.log(tweetArray)
  

  return (
    <>
      <Head>
        <title>CryptoTracker | Home</title>
      </Head>
      <main className="min-h-screen">
        <Hero/>
        <div>
          {/* {tweetElements} */}
        </div>
        
      </main>
    </>
  )
}

export const getServerSideProps = async () => {

  const { data } = await axios.get(TrendingCoins("AUD"));

  return { props: { data } }
}

export default Home;