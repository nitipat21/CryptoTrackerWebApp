import Layout from "../../components/Layout";
import SignUpForm from "../../components/SignUpForm";



const NewAccount = () => {
    return (
        <Layout title="New Account">
            <div className="bg-neutral-800">
                <SignUpForm/>
            </div>
        </Layout>
    );
}

export default NewAccount;