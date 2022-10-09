import axios from 'axios';
import type { InferGetServerSidePropsType } from 'next'
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import Tracker from '../../components/Tracker';
import { CoinList } from '../../cryptoAPI/api';
import { cryptoSlice } from '../../store/cryptoSlice';


const TrackerPage = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const dispatch = useDispatch();

    dispatch(cryptoSlice.actions.setCoinList(data));    

    return (
        <>
            <Head>
                <title>CryptoTracker | Tracker</title>
            </Head>
            <main className="">
                <Tracker/>
            </main>
        </>
    )
}

export const getServerSideProps = async () => {

    const { data } = await axios.get(CoinList("AUD"));

    return { props: { data } }
}

export default TrackerPage;