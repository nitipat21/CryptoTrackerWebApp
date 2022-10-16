import Head from "next/head";
import ResetPasswordForm from "../../components/ResetPasswordForm";

const NewAccount = () => {
    return (
        <>
            <Head>
                <title>CryptoTracker | NewAccount</title>
            </Head>
            <main className="bg-neutral-800">
               <ResetPasswordForm/>
            </main>
        </>
    );
}

export default NewAccount;