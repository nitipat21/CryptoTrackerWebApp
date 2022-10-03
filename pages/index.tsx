import type { NextPage } from 'next'
import Hero from '../components/Hero';
import Layout from '../components/Layout'
import Tracker from '../components/Tracker';

const Home: NextPage = () => {
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