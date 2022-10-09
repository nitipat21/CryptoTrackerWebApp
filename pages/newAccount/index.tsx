import Head from "next/head";
import Signup from "../../components/SignUp";

const NewAccount = () => {
    return (
        <>
            <Head>
                <title>CryptoTracker | NewAccount</title>
            </Head>
            <main className="bg-neutral-800">
               <Signup/>
            </main>
        </>
    );
}

export default NewAccount;