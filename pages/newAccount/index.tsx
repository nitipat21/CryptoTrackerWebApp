import Layout from "../../components/Layout";
import Signup from "../../components/SignUp";

const NewAccount = () => {
    return (
        <Layout title="New Account">
            <div className="bg-neutral-800">
               <Signup/>
            </div>
        </Layout>
    );
}

export default NewAccount;