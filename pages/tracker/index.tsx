import axios from 'axios';
import type { InferGetServerSidePropsType } from 'next'
import { useDispatch } from 'react-redux';
import Layout from '../../components/Layout';
import Tracker from '../../components/Tracker';
import { CoinList } from '../../cryptoAPI/api';
import { cryptoSlice } from '../../store/cryptoSlice';


const TrackerPage = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const dispatch = useDispatch();

    dispatch(cryptoSlice.actions.setCoinList(data));    

    return (
        <Layout title="CryptoTracker">
            <main className="">
                <Tracker/>
            </main>
        </Layout>
    )
}

export const getServerSideProps = async () => {

    const { data } = await axios.get(CoinList("AUD"));

    return { props: { data } }
}

export default TrackerPage;