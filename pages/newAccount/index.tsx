import Layout from "../../components/Layout";
import SignUpForm from "../../components/signupForm";

const Login = () => {
    return (
        <Layout title="Home">
            <div className="bg-neutral-800">
                <SignUpForm/>
            </div>
        </Layout>
    );
}

export default Login;