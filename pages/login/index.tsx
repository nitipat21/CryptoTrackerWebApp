import Layout from "../../components/Layout";
import LoginForm from "../../components/LoginForm";

const Login = () => {
    return (
        <Layout title="Login">
            <div className="bg-neutral-800">
                <LoginForm/>
            </div>
        </Layout>
    );
}

export default Login;