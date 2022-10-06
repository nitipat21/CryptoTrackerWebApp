import { onAuthStateChanged } from "firebase/auth";
import Head from "next/head";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, db, usersCollectionRef } from "../config/firebase";
import { getFirestore, doc, setDoc, updateDoc } from "firebase/firestore";
import { cryptoSlice, selectUserDocId, selectUserState, selectUserTrackListState } from "../store/cryptoSlice";
import Footer from "./Footer";
import Navbar from "./Navbar";

type Props = {
    children?: ReactNode
    title?: string
 }

const Layout = ({ children, title = 'This is the default title' }: Props) => {

    const dispatch = useDispatch();

    const user = useSelector(selectUserState);

    const userTrackList = useSelector(selectUserTrackListState);

    const userDocId = useSelector(selectUserDocId);

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
          const docRef = doc(db, "users", userDocId);
          const newFields = { trackList: userTrackList };
          await updateDoc(docRef, newFields)
          .then(()=>console.log("update doc"))
          .catch((error)=>console.error(error))
        })();
      }
    },[userTrackList])

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
    }, [])

    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Navbar/>
            {children}
            <Footer/>
        </div>
    );
}

export default Layout;