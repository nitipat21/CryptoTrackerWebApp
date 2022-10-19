import axios from 'axios';
import { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import Hero from '../components/Hero';
import HeroTwitter from '../components/HeroTwitter';
import { TrendingCoins } from '../cryptoAPI/api';
import { cryptoSlice } from '../store/cryptoSlice';
import fetchTwitterData from '../twitterAPI/api';

const Home = ({ coinData, twitterData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const dispatch = useDispatch();

  dispatch(cryptoSlice.actions.setTrendingList(coinData));

  dispatch(cryptoSlice.actions.setTwitterList(twitterData.data));

  dispatch(cryptoSlice.actions.setTwitterNextToken(twitterData.meta?.next_token));
  
  return (
    <>
      <Head>
        <title>CryptoTracker | Home</title>
      </Head>
      <main className="min-h-screen">
        <Hero/>
        <HeroTwitter/>
      </main>
    </>
  )
}

export const getServerSideProps = async () => {

  const coinData = await axios.get(TrendingCoins("AUD"));

  const twitterData = await fetchTwitterData();

  return { 
    props: { 
      coinData:coinData.data, 
      twitterData:twitterData 
    } 
  }
}

export default Home;