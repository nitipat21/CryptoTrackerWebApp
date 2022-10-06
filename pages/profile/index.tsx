import { useSelector } from "react-redux";
import Layout from "../../components/Layout";
import { selectUserState, selectUserTrackListState } from "../../store/cryptoSlice";

const Profile = () => {

    const user = useSelector(selectUserState);

    const userTrackList = useSelector(selectUserTrackListState);

    const tracklistElement = userTrackList.map((coin,index) => {
            return  <div key={coin+index}>
                    <span>{index + 1}. </span>
                    <span>{coin}</span>
                </div>
    })

    return (
        <Layout title="Profile">
            <div className="bg-neutral-800 p-8 min-h-screen">
                <div>
                    <h1 className="text-center text-2xl font-bold">Profile</h1>
                </div>
                <div className="grid justify-center my-4 gap-2">
                    <div>
                        <span>Name:</span> <span>{user && user.displayName}</span>                    
                    </div>
                    <div>
                        <span>Email:</span> <span>{user && user.email}</span>
                    </div>
                    <div>
                        <span>My Tracklist:</span> <span>{tracklistElement}</span>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile;