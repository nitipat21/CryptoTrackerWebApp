import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../components/Layout";
import LoginForm from "../../components/LoginForm";
import { auth } from "../../config/firebase";

const Login = () => {

    const router = useRouter();

    useEffect(()=>{
        if (auth.currentUser) {
            router.replace("/");
        }
    },[])

    return (
        <Layout title="Login">
            <div className="bg-neutral-800">
                <LoginForm/>
            </div>
        </Layout>
    );
}

export default Login;