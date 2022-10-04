import axios from 'axios';
import { InferGetServerSidePropsType } from 'next';
import { useDispatch } from 'react-redux';
import Hero from '../components/Hero';
import Layout from '../components/Layout'
import { TrendingCoins } from '../cryptoAPI/api';
import { cryptoSlice } from '../store/cryptoSlice';

const Home = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const dispatch = useDispatch();
  
  dispatch(cryptoSlice.actions.setTrendingList(data));

  return (
    <Layout title="CryptoTracker">
      <main className="min-h-screen">
        <Hero/>
      </main>
    </Layout>
  )
}

export const getServerSideProps = async () => {

  const { data } = await axios.get(TrendingCoins("AUD"));

  return { props: { data } }
}

export default Home;