import axios from 'axios';
import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import Hero from '../components/Hero';
import Layout from '../components/Layout'
import Tracker from '../components/Tracker';
import { CoinList } from '../cryptoAPI/api';

export const getServerSideProps: GetServerSideProps = async () => {

  // Fetch data from external API
  const dataUSD = await axios.get(CoinList("USD"));
  const dataAUD = await axios.get(CoinList("AUD"));
  // Pass data to the page via props
  return { props: 
    { coinData: 
      {
        USD: dataUSD.data, AUD:dataAUD.data
      }
    }
  }
}

const Home = ({coinData}:InferGetServerSidePropsType<typeof getServerSideProps> ) => {
  console.log(coinData)

  return (
    <Layout title="CryptoTracker">
      <main className="min-h-screen">
        <Hero/>
        <Tracker/>
      </main>
    </Layout>
  )
}

export default Home;