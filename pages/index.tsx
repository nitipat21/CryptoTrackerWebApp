import type { NextPage } from 'next'
import Hero from '../components/Hero';
import Layout from '../components/Layout'

const Home: NextPage = () => {
  return (
    <Layout title="CryptoTracker">
      <main className="min-h-screen">
        <Hero/>
      </main>
    </Layout>
  )
}

export default Home;