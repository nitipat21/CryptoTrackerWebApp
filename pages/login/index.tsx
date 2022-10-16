import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import LoginForm from "../../components/LoginForm";
import { auth } from "../../config/firebase";

const Login = () => {

    const router = useRouter();

    useEffect(()=>{
        if (auth.currentUser) {
            router.replace("/");
        }
    },[router])

    return (
        <>
            <Head>
                <title>CryptoTracker | Login</title>
            </Head>
            <main className="bg-neutral-800">
                <LoginForm/>
            </main>
        </>
    );
}

export default Login;