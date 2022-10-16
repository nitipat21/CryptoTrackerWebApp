import { onAuthStateChanged } from "firebase/auth";
import Head from "next/head";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { cryptoSlice, selectAlertStatusState, selectUserDocIdState, selectUserState, selectUserTrackListState } from "../store/cryptoSlice";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Alert from "./Alert";

type Props = {
    children?: ReactNode;
 }

const Layout = ({ children }: Props) => {

    const dispatch = useDispatch();

    const user = useSelector(selectUserState);

    const userTrackList = useSelector(selectUserTrackListState);

    const userDocId = useSelector(selectUserDocIdState);

    const alertStatus = useSelector(selectAlertStatusState);

    // update data to localstorage and database
    useEffect(()=>{
      if (user) {
        if (userTrackList) {
          localStorage.setItem("trackList", JSON.stringify(userTrackList));
        }
        else {
          localStorage.setItem("trackList", JSON.stringify([]));
        }
      }
      if (userDocId) {
        (async()=> {
          try {
            const docRef = doc(db, "users", userDocId);
            const newFields = { trackList: userTrackList };
            await updateDoc(docRef, newFields);
          } catch (error) {
            dispatch(cryptoSlice.actions.setAlertStatus("fail"));
            dispatch(cryptoSlice.actions.setAlertMessage(`${error}`));
          }
        })();
      }
    },[dispatch, userTrackList, user, userDocId])

    // check auth and get data from localstorage everytime page is refreshed
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            dispatch(cryptoSlice.actions.setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            }));
            dispatch(cryptoSlice.actions.setTrackList(JSON.parse(localStorage.getItem("trackList")!)));
            dispatch(cryptoSlice.actions.setUserDocId(JSON.parse(localStorage.getItem("userDocId")!)));
          } else {
            dispatch(cryptoSlice.actions.setUser(null))
          }
        })
    
        return () => unsubscribe()
    }, [dispatch])

    // clear alert after 3s
    useEffect(()=> {
      if (alertStatus) {
        setTimeout(()=> {
          dispatch(cryptoSlice.actions.setAlertStatus(""));
        }, 3000)
      }
    }, [dispatch, alertStatus])
    
    return (
        <div>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            {alertStatus && <Alert/>}
            <Navbar/>
            {children}
            <Footer/>
        </div>
    );
}

export default Layout;