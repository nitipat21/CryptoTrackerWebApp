import { onAuthStateChanged } from "firebase/auth";
import Head from "next/head";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, usersCollectionRef } from "../config/firebase";
import { cryptoSlice, selectUserState } from "../store/cryptoSlice";
import Footer from "./Footer";
import Navbar from "./Navbar";

type Props = {
    children?: ReactNode
    title?: string
 }

const Layout = ({ children, title = 'This is the default title' }: Props) => {

    const dispatch = useDispatch();

    const user = useSelector(selectUserState);

    console.log(user)

    console.log(auth.currentUser)

    console.log(usersCollectionRef)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
                dispatch(cryptoSlice.actions.setUser({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
            }))
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