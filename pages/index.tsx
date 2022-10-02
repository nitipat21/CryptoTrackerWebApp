import type { NextPage } from 'next'
import CryptoHero from '../components/CryptoHero';
import Layout from '../components/Layout'

const Home: NextPage = () => {
  return (
    <Layout title="CryptoTracker">
      <main className="min-h-screen">
        <CryptoHero/>
      </main>
    </Layout>
  )
}

export default Home;