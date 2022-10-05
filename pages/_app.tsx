import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '@fortawesome/free-brands-svg-icons'
import '@fortawesome/free-regular-svg-icons'
import '@fortawesome/free-solid-svg-icons'
import '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react';
import { wrapper } from '../store/store';
import { Provider } from "react-redux";
import { useRouter } from 'next/router';
import Loading from '../components/Loading';

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {

  const { store, props } = wrapper.useWrappedStore(pageProps);
  
  const [pageLoaded, setPageLoaded] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleStart = (url:any) => (url !== router.asPath) && setLoading(true);
    const handleComplete = (url:any) => (url === router.asPath) && setLoading(false);

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError',  handleComplete)

    return () => {
        router.events.off('routeChangeStart', handleStart)
        router.events.off('routeChangeComplete', handleComplete)
        router.events.off('routeChangeError', handleComplete)
    }
  })

  useEffect(()=>{
    setPageLoaded(true);
  },[])

  return pageLoaded ?
    <Provider store={store}>
      {loading && <Loading/>}
      <Component {...props} />
    </Provider> 
    : null;
}

export default MyApp;
