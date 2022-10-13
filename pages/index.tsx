import axios from 'axios';
import { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import Hero from '../components/Hero';
import HeroTwitter from '../components/HeroTwitter';
import { TrendingCoins } from '../cryptoAPI/api';
import { cryptoSlice } from '../store/cryptoSlice';

const Home = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const dispatch = useDispatch();
  
  dispatch(cryptoSlice.actions.setTrendingList(data));
  
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

  const { data } = await axios.get(TrendingCoins("AUD"));

  return { props: { data } }
}

export default Home;